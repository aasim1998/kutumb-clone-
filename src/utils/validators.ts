import {LocaleString} from 'locales/en';
/* eslint-disable no-useless-escape */
import * as yup from 'yup';

// const phoneRegExp = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$/;
export const onlyNumber = /^[0-9]*$/;
export const floatNumber = /^((\+|-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/;
export const nameRegExp = /^(?=.{1,60}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/;
export const passwordRegExp =
  /^(?:(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-z]).*)$/;
export const descriptionRegExp = /^(?=.{1,255}$)[\w ]+$/;

/^(?:(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;

export const noSpaceRegExp = /^\S*$/; // a string consisting only of non-whitespaces
export const einRegex = /^\d{2}\-?\d{7}$/;
export const usernameRegex = /^[a-zA-Z0-9]+$/;
export const validateRequiredEmail = () =>
  yup.string().email('validation.email').required('validation.email.required');

export const validateRequiredEmailContact = () =>
  yup.string().email('validation.email');
export const validateRequiredPhone = () =>
  yup
    .string()
    .required('validation.phone.required')
    .min(10, 'validation.phone');

export const validateRequiredPassword = (messages?: {
  required?: LocaleString;
  max?: LocaleString;
  inValid?: LocaleString;
}) =>
  yup
    .string()
    .matches(noSpaceRegExp, 'validation.password.invalid.space')
    // .matches(passwordRegExp, 'validation.password.invalid')
    .min(5, 'validation.password.min')
    .max(25, messages?.max || 'validation.password.max')
    .required(messages?.required || 'validation.password.required');

export const validateConfirmPasswordRequired = () =>
  yup
    .string()
    .required('validation.confirm.old.new.password.required')
    .min(5, 'validation.password.min');

export const validateFirstName = () =>
  yup
    .string()
    .matches(nameRegExp, 'validation.firstname.invalid')
    .required('validation.firstname.required');

export const validateLastName = () =>
  yup
    .string()
    .matches(nameRegExp, 'validation.lastname.invalid')
    .required('validation.lastname.required');

export const validateRequiredFirstName = (messages?: {
  required?: LocaleString;
  max?: LocaleString;
  inValid?: LocaleString;
}) =>
  yup
    .string()
    .matches(nameRegExp, messages?.inValid || 'validation.firstname.invalid')
    .max(25, messages?.max || 'validation.name.max')
    .required(messages?.required || 'validation.firstname.required');

export const validateName = () =>
  yup.string().matches(nameRegExp, 'validation.name.invalid');

export const validateRequiredName = () =>
  validateName()
    .required('validation.name.required')
    .max(25, 'validation.name.max');

export const validateRequiredLastName = () =>
  yup
    .string()
    .matches(nameRegExp, 'validation.lastname.invalid')
    .required('validation.lastname.required')
    .max(25, 'validation.name.max');

export const validateRequiredsLastName = () =>
  validateRequiredLastName().required('validation.lastname.required');

export const validateEmail = () =>
  yup.string().trim().email('validation.email');

export const OptionalStringField = () => yup.string().notRequired();

export const validateSummryRequired = () =>
  yup.string().required('validation.summry.required');

export const validateOldPasswordRequired = () =>
  yup
    .string()
    .required('validation.old.password.required')
    .min(5, 'validation.password.min');
export const validateNewPasswordRequired = () =>
  yup
    .string()
    .required('validation.new.password.required')
    .min(5, 'validation.password.min');

export const validateConfirmOldNewPasswordRequired = () =>
  yup
    .string()
    .matches(passwordRegExp, 'validation.password.strong')
    .matches(noSpaceRegExp, 'validation.password.invalid.space')
    .min(5, 'validation.password.min')
    .required('validation.confirm.old.new.password.required');

export const validateRequiredField = () =>
  yup
    .string()
    .matches(nameRegExp, 'validation')
    .required('validation.summry.required');

export const validateLabelRelationField = (msg?: LocaleString) =>
  yup.string().required(msg ? msg : 'validation.message.required');

export const validateDescriptionRequiredField = () =>
  yup
    .string()
    .matches(descriptionRegExp, 'validation.description.invalid.symbols')
    .required('validation.summry.required');

export const validateRequiredAmount = () =>
  yup
    .string()
    .required('validation.summry.required')
    .matches(onlyNumber, 'validation.amount');

export const validateRequired25letters = () =>
  yup
    .string()
    .required('validation.summry.required')
    .max(25, 'validation.max.letters');
