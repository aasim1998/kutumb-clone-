import React, { useMemo, forwardRef } from 'react';
import { createText, ColorProps } from '@shopify/restyle';
import i18n from 'i18n-js';
import { Theme } from 'styles/theme';
import { LocaleString, OptionalLocalString } from 'locales/en';
import { isLocale } from 'utils/locale';

export const TextBase = createText<Theme>();

export type TextProps = React.ComponentPropsWithRef<typeof TextBase> &
  ColorProps<Theme> & {
    text?: OptionalLocalString;
    ref?: any;
    values?: Record<string, string>;
    renderChildren?: boolean;
  };

export const TextView = forwardRef<typeof TextBase, TextProps>(
  ({ text, children, values, renderChildren, ...props }, ref) => {
    const isLocalText = useMemo(() => isLocale(text), [text]);

    const textToBeDisplayed = useMemo(() => {
      if (text && isLocalText) {
        return i18n.t(text , values);
      } else {
        return text || children || null;
      }
    }, [text, children, values]);
    const fontFamily = props.fontFamily ? 'IBMPlexSans-light' : undefined;
    return (
      <TextBase fontFamily={fontFamily} ref={ref as any} color='zBlack' {...props}>
        {textToBeDisplayed}
        {renderChildren === true ? children || null : null}
      </TextBase>
    );
  },
);
