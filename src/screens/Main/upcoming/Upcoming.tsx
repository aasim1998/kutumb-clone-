import React from 'react';
import { Box } from 'atoms/Box';
import { useAuth } from 'context/Authentication';
import { Navbar } from 'molecules/Navbar';
import { Text } from 'atoms/Text';

export const Upcoming = () => {
  const {
    actions: { changeLanguage },
  } = useAuth();
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Navbar
      renderLeft={
        <Text variant="text_2xl" color="black" localeId="upcoming.title" />
      } />
    </Box>
  );
};
