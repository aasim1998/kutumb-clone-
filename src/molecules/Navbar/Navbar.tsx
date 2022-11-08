import {Box, BoxProps} from 'atoms/Box';
import {Icon} from 'atoms/Icon';
import {Row} from 'atoms/Row';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {OptionalLocalString} from 'locales/en';
import React from 'react';
import {goBack} from 'services/NavigationService';
import theme from 'styles/theme';
import {deviceHeight, isIOS} from 'utils/device';
import {TextView} from 'atoms/TextView';

type NavbarProps = {
  overrideBack?: () => void;
  title?: OptionalLocalString;
  showBack?: boolean;
  containerProps?: BoxProps;
  renderRight?: React.ReactNode;
  heading?: string;
  renderLeft?: React.ReactNode;
  counting?: OptionalLocalString;
};
export const Navbar = ({
  overrideBack,
  title,
  showBack,
  containerProps,
  renderRight,
  heading,
  renderLeft,
  counting,
}: NavbarProps) => {
  const handleBack = () => {
    if (typeof overrideBack === 'function') {
      overrideBack();
    } else {
      goBack();
    }
  };
  return (
    <Box bg="mainBackground" {...containerProps}>
      <Row
        pt="mll"
        pb="m"
        height="7%"
        width="100%"
        pl="-xxxl"
        pr="xxxl"
        alignItems="baseline"
        justifyContent="flex-start">
        {showBack ? (
          <Touch
            position="absolute"
            ml="xl"
            alignSelf="center"
            top={isIOS ? 5 : 18}
            onPress={handleBack}
            backgroundColor="mainBackground">
            <Icon
              icon="arrow-left"
              size={25}
              color={theme.colors.iconColor}
              onPress={handleBack}
            />
          </Touch>
        ) : null}
        {heading && (
          <Box
            top={70}
            left={30}
            marginVertical="s"
            zIndex={999}
            position="absolute"
            backgroundColor="mainBackground">
            <Text variant="normalText" color="black" localeId={title} />
          </Box>
        )}
        {renderRight ? (
          <Box
            right={30}
            zIndex={999}
            alignSelf="center"
            // top={isIOS ? 10 : 22}
            position="absolute">
            {renderRight}
          </Box>
        ) : (
          <Box />
        )}
        {renderLeft ? (
          <Box left={30} alignSelf="center" zIndex={999} position="absolute">
            {title && (
              <Text variant="text_2xl" color="black" localeId={title} />
            )}
            {renderLeft}
          </Box>
        ) : (
          <Box />
        )}
      </Row>
      {title && (
        <Box
          pl="xl"
          pr="xl"
          width="100%"
          mb="-xl"
          mt={deviceHeight < 780 ? 'xs' : isIOS ? 's' : 'ml'}>
          <Box
            width="100%"
            backgroundColor="mainBackground"
            alignSelf="flex-start"
            alignItems="baseline">
            <TextView
              variant="text_2xl"
              color="black"
              text={title}
              renderChildren={true}>
              {counting && (
                <Text
                  variant="text_sm"
                  color="black"
                  localeId={` (${counting})`}
                />
              )}
            </TextView>
          </Box>
        </Box>
      )}
    </Box>
  );
};
