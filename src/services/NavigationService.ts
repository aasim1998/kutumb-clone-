/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  NavigationContainerRef,
  DrawerActions,
  StackActions,
  CommonActions,
  TabActions,
} from '@react-navigation/native';
import { Routes } from 'typings/types/navigation.types';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: Routes, params?: Record<string, any>) {
  navigationRef.current?.navigate(name, params);
}

export function replaceNavigate(name: Routes, params?: Record<string, any>) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function dispatchNavigate(name: Routes, params?: Record<string, any>) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

export function goBack() {
  navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
}

export function jumpTo(name: Routes, params?: Record<string, any>) {
  navigationRef.current?.dispatch(TabActions.jumpTo(name, params));
}

export function resetNavigationStack() {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    }),
  );
}

export function resetNavigate(name: Routes, params?: Record<string, any>) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name, params }],
    }),
  );
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

export function pop(count?: number) {
  navigationRef.current?.dispatch(StackActions.pop(count || 1));
}

