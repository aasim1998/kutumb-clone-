import i18n from 'i18n-js';
import { en, LocaleString } from 'locales/en';

export function isLocale(heading: any): heading is LocaleString {
  return typeof en[heading] === 'string';
}

export const translate = (text: LocaleString, values?: Record<string, any>) => {
  return i18n.t(text || '', values);
};
