import React, {useMemo, forwardRef} from 'react';
import {createText, ColorProps} from '@shopify/restyle';
import i18n from 'i18n-js';
import {Theme} from 'styles/theme';
import {OptionalLocalString} from 'locales/en';
import {isLocale} from 'utils/locale';

export const TextBase = createText<Theme>();

export type TextProps = React.ComponentPropsWithRef<typeof TextBase> &
  ColorProps<Theme> & {
    localeId?: OptionalLocalString;
    ref?: any;
    values?: Record<string, string>;
  };

export const Text = forwardRef<typeof TextBase, TextProps>(
  ({localeId, children, values, ...props}, ref) => {
    const isLocalText = useMemo(() => isLocale(localeId), [localeId]);
    const textToBeDisplayed = useMemo(() => {
      if (localeId && isLocalText) {
        return i18n.t(localeId, values);
      } else {
        return localeId || children || null;
      }
    }, [localeId, isLocalText, values, children]);
    const fontFamily = props.fontFamily ? 'IBMPlexSans-light' : undefined;
    return (
      <TextBase fontFamily={fontFamily} ref={ref as any} {...props}>
        {textToBeDisplayed}
      </TextBase>
    );
  },
);
