import React from 'react';
import {Timeline} from '../timeline';
import {Activities} from '../activities';
import {Box} from 'atoms/Box';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions} from 'react-native';
import theme from 'styles/theme';
import {Text} from 'atoms/Text';
import {Navbar} from 'molecules/Navbar';

const width = Dimensions.get('window').width;
const Tab = createMaterialTopTabNavigator();

export const Home = () => {
  return (
    <Box bg="mainBackground" height="100%" pt={'m'} flex={1}>
      <Navbar
        renderLeft={
          <Text variant="text_2xl" color="black" localeId="home.title" />
        }
      />
      <Box minHeight="100%" ml="ml" mr="m">
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.colors.zBlack,
            tabBarInactiveTintColor: theme.colors.inactiveColor,
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.zBlack,
            },
            tabBarContentContainerStyle: {
              bottom: theme.spacing['-s'],
              marginTop:theme.spacing['-ml'],
            },
            swipeEnabled: false,
          }}>
          <Tab.Screen
            name="Timeline"
            component={Timeline}
            options={{
              tabBarLabelStyle: {
                textTransform: 'capitalize',
                fontSize: theme.spacing.m,
                fontWeight: '600',
                marginLeft: theme.spacing['-s'],
                marginRight: theme.spacing['-mxxxl'],
              },
              tabBarIndicatorContainerStyle: {
                marginHorizontal: width * 0.2,
                paddingHorizontal: width * 0.27,
              },
            }}
          />
          <Tab.Screen
            name="Recent Activities"
            component={Activities}
            options={{
              tabBarLabelStyle: {
                textTransform: 'capitalize',
                fontSize: theme.spacing.m,
                fontWeight: '600',
                marginLeft: theme.spacing['-xxl'],
                marginRight: theme.spacing['xm'],
              },
              tabBarIndicatorContainerStyle: {
                paddingHorizontal: width * 0.13,
              },
            }}
          />
        </Tab.Navigator>
      </Box>
    </Box>
  );
};
