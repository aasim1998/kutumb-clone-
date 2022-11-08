import React from 'react';
import {Alert} from 'react-native';

export const AlertComponent = ({title}) => {
  return Alert.alert(title);
};
