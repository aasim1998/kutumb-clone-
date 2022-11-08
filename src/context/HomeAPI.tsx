import {useCallback, useReducer} from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import {api} from 'utils/api/api';
import {HomeTimelineProps} from 'typings/homeTimeline.type';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {showErrorMessage} from 'utils/toast';

export type HomeState = {
  timelineListLoading: boolean;
  timelineList: Array<HomeTimelineProps>;
  timelinePageData: any;
};
const initialState: HomeState = {
  timelineListLoading: false,
  timelineList: [],
  timelinePageData: null,
};

const actions = {
  getTimelineList: createAsyncActions('GET_TIMELINE_LIST'),
  clearTimelineList: createAsyncActions('CLEAR_TIMELINE_LIST'),
};

const homeReducer = createReducer<HomeState>({
  [`${actions.getTimelineList.loading}`]: state => ({
    ...state,
    timelineListLoading: true,
  }),
  [`${actions.getTimelineList.success}`]: (state, {payload}) => ({
    ...state,
    timelineListLoading: false,
    timelineList: [...state?.timelineList, ...payload?.payload.data],
    timelinePageData: payload?.payload.pagy,
  }),
  [`${actions.getTimelineList.failure}`]: state => ({
    ...state,
    timelineListLoading: false,
  }),
  [`${actions.clearTimelineList.success}`]: state => ({
    ...state,
    timelineListLoading: false,
    timelineList: [],
    timelinePageData: null,
  }),
});

export const {
  useContext: useHome,
  Context: HomeContext,
  Provider: HomeProvider,
  TestProvider: TestHomeProvider,
} = createContainer(() => {
  const [{...state}, dispatch] = useReducer(homeReducer, initialState);

  const getTimelineList = useCallback(async (pageNumber?: number) => {
    dispatch(actions.getTimelineList.loading());
    const userID: any = await hydrate(AUTH_KEYS.user);
    try {
      const {data} = await api.get<Array<HomeTimelineProps>>(
        `${userID.account_id}/api/dashboard?page=${
          pageNumber ? pageNumber : 1
        }.json`,
      );
      if (data.success) {
        dispatch(
          actions.getTimelineList.success({
            payload: data,
          }),
        );
      } else {
        showErrorMessage(`${data.message}`);
        dispatch(actions.getTimelineList.failure());
      }
    } catch (e) {
      showErrorMessage(`${e}`);
      dispatch(actions.getTimelineList.failure());
    }
  }, []);

  const clearTimelineList = () => {
    dispatch(actions.clearTimelineList.success());
  };

  return {
    state: {
      ...state,
    },
    actions: {
      getTimelineList,
      clearTimelineList,
    },
  };
});

export default useHome;
