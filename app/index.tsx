import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { RootState } from '@/store';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const { isAuthenticated, onboardingComplete } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Hide splash screen once we determine where to redirect
    SplashScreen.hideAsync();
  }, []);

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  if (!onboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});