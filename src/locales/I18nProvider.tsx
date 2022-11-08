import React, { FC, useCallback } from 'react';
import i18n from 'i18n-js';
import { en } from '../locales/en';
import { useAuth } from 'context/Authentication';

// export const defaultLanguage = en;
export const I18nProvider: FC = ({ children }) => {
  const {
    state: { language },
  } = useAuth();

  const child = useCallback(() => {
    i18n.translations = {
      en,
    };
    i18n.locale = language;
    i18n.fallbacks = true;
    i18n.missingTranslation = () => null;
    i18n.defaultSeparator = '__';

    console.log('--->', language);

    return <>{children}</>;
  }, [children, language]);

  return child();
};
