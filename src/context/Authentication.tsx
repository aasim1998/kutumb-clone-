import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
  createAction,
} from 'utils/context';
import i18n from 'i18n-js';
import {showErrorMessage, showSuccessMessage} from 'utils/toast';
import {AUTH_KEYS, hydrate, persist, unpersist} from 'utils/storage';
import {enabledHeadersFromStorage, removeHeaders} from 'utils/api/utils';
import {goBack, navigate} from 'services/NavigationService';
import {api} from 'utils/api/api';
import {LoginResponse, SignUpResponse, User} from 'typings/auth.type';

export type AuthState = {
  language: string;
  loginLoading?: boolean;
  isLoggedIn?: boolean;
  user?: any;
  signUpLoading?: boolean;
  signUpResponse?: SignUpResponse;
  loginResponse?: LoginResponse;
  authenticating?: boolean;
  isAppLoading: boolean;
  logoutLoading: boolean;
  forgotPasswordLoading: boolean;
  changePasswordLoading?: boolean;
  resetAccountLoading: boolean;
  deleteAccountLoading: boolean;
  resendConfirmationLoading: boolean;
};

const initialState: AuthState = {
  language: 'en',
  loginLoading: false,
  isLoggedIn: false,
  user: {},
  forgotPasswordLoading: false,
  signUpLoading: false,
  signUpResponse: undefined,
  authenticating: false,
  loginResponse: undefined,
  isAppLoading: true,
  logoutLoading: false,
  changePasswordLoading: false,
  resetAccountLoading: false,
  deleteAccountLoading: false,
  resendConfirmationLoading: false,
};

const actions = {
  login: createAsyncActions('LOGIN'),
  changeLanguage: createAction('CHANGE_LANGUAGE'),
  setAuthentication: createAction('AUTHENTICATION'),
  logout: createAsyncActions('LOGOUT'),
  changePassword: createAsyncActions('CHANGE_PASSWORD'),
  signUp: createAsyncActions('SIGNUP'),
  forgotPassword: createAsyncActions('FORGOT_PASSWORD'),
  resetAccount: createAsyncActions('RESET ACCOUNT'),
  deleteAccount: createAsyncActions('DELETE ACCOUNT'),
  resendConfirmation: createAsyncActions('RESEND_CONFIRMATION'),
};

const authReducer = createReducer<AuthState>({
  [`${actions.login.loading}`]: state => ({
    ...state,
    loginLoading: true,
  }),
  [`${actions.login.success}`]: (state, {payload}) => ({
    ...state,
    loginLoading: false,
    user: payload?.user,
    isLoggedIn: true,
  }),
  [`${actions.login.failure}`]: state => ({
    ...state,
    loginLoading: false,
  }),
  [`${actions.changePassword.loading}`]: state => ({
    ...state,
    changePasswordLoading: true,
  }),
  [`${actions.changePassword.success}`]: state => ({
    ...state,
    changePasswordLoading: false,
  }),
  [`${actions.changePassword.failure}`]: state => ({
    ...state,
    changePasswordLoading: false,
  }),
  [`${actions.changeLanguage}`]: (state, {payload}) => ({
    ...state,
    language: payload,
  }),
  [`${actions.setAuthentication}`]: (state, {payload}) => ({
    ...state,
    loginResponse: payload?.loginResponse,
    isLoggedIn: payload?.isLoggedIn,
    authenticating: false,
    isAppLoading: false,
  }),
  [`${actions.signUp.loading}`]: state => ({
    ...state,
    signUpLoading: true,
  }),
  [`${actions.signUp.success}`]: state => ({
    ...state,
    signUpLoading: false,
    isSignUp: true,
  }),
  [`${actions.signUp.failure}`]: state => ({
    ...state,
    signUpLoading: false,
  }),
  [`${actions.forgotPassword.loading}`]: state => ({
    ...state,
    forgotPasswordLoading: true,
  }),
  [`${actions.forgotPassword.success}`]: state => ({
    ...state,
    forgotPasswordLoading: false,
  }),
  [`${actions.forgotPassword.failure}`]: state => ({
    ...state,
    forgotPasswordLoading: false,
  }),
  [`${actions.logout.loading}`]: state => ({
    ...state,
    logoutLoading: true,
  }),
  [`${actions.logout.success}`]: (state, {payload}) => ({
    ...state,
    logoutLoading: false,
    user: payload?.user,
    isLoggedIn: false,
  }),
  [`${actions.logout.failure}`]: state => ({
    ...state,
    logoutLoading: false,
  }),
  [`${actions.logout}`]: state => ({
    ...state,
    isLoggedIn: false,
  }),
  [`${actions.resetAccount.loading}`]: state => ({
    ...state,
    resetAccountLoading: true,
  }),
  [`${actions.resetAccount.success}`]: state => ({
    ...state,
    resetAccountLoading: false,
  }),
  [`${actions.resetAccount.failure}`]: state => ({
    ...state,
    resetAccountLoading: false,
  }),
  [`${actions.deleteAccount.loading}`]: state => ({
    ...state,
    deleteAccountLoading: true,
  }),
  [`${actions.deleteAccount.success}`]: (state, {payload}) => ({
    ...state,
    deleteAccountLoading: false,
    user: payload?.user,
    isLoggedIn: false,
  }),
  [`${actions.deleteAccount.failure}`]: state => ({
    ...state,
    deleteAccountLoading: false,
  }),
  [`${actions.resendConfirmation.loading}`]: state => ({
    ...state,
    resendConfirmationLoading: true,
  }),
  [`${actions.resendConfirmation.success}`]: state => ({
    ...state,
    resendConfirmationLoading: false,
  }),
  [`${actions.resendConfirmation.failure}`]: state => ({
    ...state,
    resendConfirmationLoading: false,
  }),
});

export const {
  useContext: useAuth,
  Context: AuthContext,
  Provider: AuthProvider,
  TestProvider: TestAuthProvider,
} = createContainer(() => {
  const [{language, ...state}, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  const changeLanguage = useCallback(async () => {
    dispatch(actions.changeLanguage('fr'));
    i18n.reset();
  }, []);

  const getUserFromStorage = useCallback(async () => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    const user = await hydrate<string>(AUTH_KEYS.user);
    if (token && user) {
      await enabledHeadersFromStorage();
      dispatch(
        actions.setAuthentication({
          isLoggedIn: true,
          loginResponse: user,
        }),
      );
    } else {
      dispatch(actions.setAuthentication({isLoggedIn: false}));
    }
  }, []);

  const setUserInfo = useCallback(async (token: string, user: User) => {
    await persist(AUTH_KEYS.token, token);
    await persist(AUTH_KEYS.user, user);
    await enabledHeadersFromStorage();
    dispatch(actions.setAuthentication({isLoggedIn: true, user: user}));
  }, []);

  const login = useCallback(
    async (values: {api_user: {email: string; password: string}}) => {
      dispatch(actions.login.loading());
      try {
        const {data} = await api.post<LoginResponse>('api/login.json', values);

        if (data.success) {
          showSuccessMessage(`${data.message}`);
          await persist(AUTH_KEYS.token, data.data.jwt);
          await persist(AUTH_KEYS.user, data.data.user);
          dispatch(actions.login.success({loginResponse: data.data}));
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.login.failure());
        }
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.login.failure());
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setUserInfo],
  );

  const changePassword = useCallback(async values => {
    const updatedValue = {
      api_user: {
        original_password: values.profileOldPassword,
        new_password: values.profileNewPassword,
        new_password_confirmation: values.profileConfirmPassword,
      },
    };
    dispatch(actions.changePassword.loading());
    try {
      const user: any = await hydrate(AUTH_KEYS.user);
      const {data} = await api.patch(
        `${user.account_id}/api/settings/password.json`,
        updatedValue,
      );
      console.log('test', data);
      if (data.success === false) {
        showErrorMessage(`${data.message}`);
        dispatch(actions.changePassword.failure());
      } else {
        showSuccessMessage(`${data.message}`);
        dispatch(actions.changePassword.success());
        goBack();
      }
    } catch (e) {
      console.log(e);
      showErrorMessage(`${e}`);
      dispatch(actions.changePassword.failure());
    }
  }, []);

  const signUp = useCallback(
    async (values: {
      api_user: {
        first_name: string;
        last_name: string;
        password: string;
        password_confirmation: string;
        email: string;
      };
    }) => {
      dispatch(actions.signUp.loading());
      try {
        const {data} = await api.post<SignUpResponse>('api/users.json', values);
        if (data.success) {
          dispatch(actions.signUp.success({signUpResponse: data.data}));
          navigate('ConfirmEmail');
        } else {
          showErrorMessage(`${data.message}`);
          dispatch(actions.signUp.failure());
        }
      } catch (e) {
        console.log('Error', e);
        showErrorMessage(`${e}`);
        dispatch(actions.signUp.failure());
      }
    },
    [],
  );

  const forgotPassword = useCallback(
    async (values: {
      api_user: {
        email: string;
      };
    }) => {
      dispatch(actions.forgotPassword.loading());
      try {
        const {data} = await api.post('/api/password.json', values);
        if (data.success === false) {
          showErrorMessage(`${data.message}`);
          dispatch(actions.forgotPassword.failure());
        } else {
          dispatch(actions.forgotPassword.success());
          navigate('EmailSent');
        }
      } catch (e) {
        console.log(e);
        showErrorMessage(`${e}`);
        dispatch(actions.forgotPassword.failure());
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    dispatch(actions.logout.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.delete(`${userID.account_id}/api/logout`);
      showSuccessMessage(`${data.message}`);
      await unpersist(AUTH_KEYS.token);
      await unpersist(AUTH_KEYS.fcmtoken);
      removeHeaders();
      dispatch(actions.logout.success({user: undefined}));
    } catch (e) {
      showErrorMessage(`${e}`);
      dispatch(actions.logout.failure());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserInfo]);

  const resetAccount = useCallback(async () => {
    dispatch(actions.resetAccount.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get(`${user.account_id}/api/reset.json`)
      .then(async res => {
        if (res.data.success) {
          showSuccessMessage(`${res.data.message}`);
          dispatch(actions.resetAccount.success());
        } else {
          showErrorMessage(`${res.data.message}`);
          dispatch(actions.resetAccount.failure());
        }
      })
      .catch(e => {
        showErrorMessage(`${e}`);
        dispatch(actions.resetAccount.failure());
      });
  }, []);

  const deleteAccount = useCallback(async () => {
    dispatch(actions.deleteAccount.loading());
    const user: any = await hydrate(AUTH_KEYS.user);
    await api
      .get(`${user.account_id}/api/destroy.json`)
      .then(async res => {
        if (res.data.success) {
          showSuccessMessage(`${res.data.message}`);
          await unpersist(AUTH_KEYS.token);
          await unpersist(AUTH_KEYS.fcmtoken);
          removeHeaders();
          dispatch(actions.deleteAccount.success());
          dispatch(actions.deleteAccount.success({user: undefined}));
          dispatch(actions.deleteAccount.success({isLogedIn: false}));
          navigate('SignUpScreen');
        } else {
          showErrorMessage(`${res.data.message}`);
          dispatch(actions.deleteAccount.failure());
        }
      })
      .catch(e => {
        showErrorMessage(`${e}`);
        dispatch(actions.resetAccount.failure());
      });
  }, []);

  const resendConfirmation = useCallback(
    async (values: {
      api_user: {
        email: string;
      };
    }) => {
      dispatch(actions.resendConfirmation.loading());
      try {
        const {data} = await api.post('/api/confirmation.json', values);
        if (data.success === false) {
          showErrorMessage(`${data.message}`);
          dispatch(actions.resendConfirmation.failure());
        } else {
          dispatch(actions.resendConfirmation.success());
          navigate('ResendConfirmationSent');
        }
      } catch (e) {
        showErrorMessage(`${e}`);
        dispatch(actions.resendConfirmation.failure());
      }
    },
    [],
  );

  return {
    state: {
      ...state,
      language,
    },
    actions: {
      changeLanguage,
      login,
      getUserFromStorage,
      logout,
      forgotPassword,
      signUp,
      changePassword,
      resetAccount,
      deleteAccount,
      resendConfirmation,
    },
  };
});

export default useAuth;
