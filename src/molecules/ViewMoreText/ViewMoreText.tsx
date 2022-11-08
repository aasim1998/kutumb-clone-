import {Box} from 'atoms/Box';
import {Text, TextProps} from 'atoms/Text';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type ViewMoreTextProps = TextProps & {
  numberOfLines: number;
};

export const ViewMoreText: FC<ViewMoreTextProps> = ({
  children,
  localeId,
  numberOfLines,
  ...props
}) => {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState<any>(undefined);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  useEffect(() => {
    textShown ? setNumLines(undefined) : setNumLines(numberOfLines);
  }, [textShown]);

  const onTextLayout = useCallback(
    e => {
      if (e.nativeEvent.lines.length > numberOfLines && !textShown) {
        setShowMoreButton(true);
        setNumLines(numberOfLines);
      }
    },
    [textShown],
  );

  return (
    <Box>
      <Text
        numberOfLines={numLines}
        onTextLayout={onTextLayout}
        {...props}
        localeId={localeId}/>
      {showMoreButton ? (
        <TouchableOpacity onPress={toggleTextShown}>
          <Text
            color="primary"
            fontWeight="700"
            fontSize={13}
            localeId={textShown ? 'Read Less' : 'Read More'}
          />
        </TouchableOpacity>
      ) : null}
    </Box>
  );
};
