import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Phone, Mail, Lock } from 'lucide-react-native';

export default function AuthScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationMode, setVerificationMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleAuth = async () => {
    if (verificationMode) {
      // Verify OTP
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        dispatch(login({
          id: '1',
          username: 'troski_user',
          phoneNumber,
          email
        }));
        setIsLoading(false);
      }, 1500);
      return;
    }

    if (authMode === 'signin') {
      // Handle sign in
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setVerificationMode(true);
        setIsLoading(false);
      }, 1500);
    } else {
      // Handle sign up
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setVerificationMode(true);
        setIsLoading(false);
      }, 1500);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  const handleSocialAuth = (provider: 'google' | 'apple') => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      dispatch(login({
        id: '1',
        username: 'troski_user',
        phoneNumber: '',
        email: 'user@example.com'
      }));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar style="dark" />
      
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Troski Chat</Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          {verificationMode 
            ? 'Enter verification code' 
            : authMode === 'signin' 
              ? 'Sign in to continue' 
              : 'Create a new account'}
        </Text>
      </View>
      
      {verificationMode ? (
        <Animated.View entering={FadeInUp.duration(400)} style={styles.formContainer}>
          <Text style={[styles.verificationText, { color: theme.colors.onSurface }]}>
            We sent a verification code to {phoneNumber || email}
          </Text>
          
          <TextInput
            label="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            style={styles.input}
            keyboardType="number-pad"
            autoComplete="sms-otp"
            maxLength={6}
            mode="outlined"
          />
          
          <Button
            mode="contained"
            onPress={handleAuth}
            style={styles.button}
            loading={isLoading}
            disabled={isLoading || verificationCode.length < 4}
          >
            Verify & Continue
          </Button>
          
          <TouchableOpacity 
            onPress={() => setVerificationMode(false)}
            style={styles.linkContainer}
          >
            <Text style={[styles.link, { color: theme.colors.primary }]}>
              Didn't receive a code? Resend
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeInUp.duration(400)} style={styles.formContainer}>
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            keyboardType="phone-pad"
            left={<TextInput.Icon icon={() => <Phone size={20} color={theme.colors.outline} />} />}
            mode="outlined"
          />
          
          {authMode === 'signup' && (
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon={() => <Mail size={20} color={theme.colors.outline} />} />}
              mode="outlined"
            />
          )}
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon={() => <Lock size={20} color={theme.colors.outline} />} />}
            mode="outlined"
          />
          
          <Button
            mode="contained"
            onPress={handleAuth}
            style={styles.button}
            loading={isLoading}
            disabled={isLoading || phoneNumber.length < 10}
          >
            {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>
          
          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />
            <Text style={[styles.dividerText, { color: theme.colors.outline }]}>or continue with</Text>
            <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />
          </View>
          
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: theme.colors.outlineVariant }]}
              onPress={() => handleSocialAuth('google')}
              activeOpacity={0.7}
            >
              <Image 
                source={{ uri: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' }} 
                style={styles.socialIcon} 
                resizeMode="contain"
              />
              <Text style={[styles.socialButtonText, { color: theme.colors.onSurface }]}>Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: theme.colors.outlineVariant }]}
              onPress={() => handleSocialAuth('apple')}
              activeOpacity={0.7}
            >
              <Image 
                source={{ uri: 'https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png' }} 
                style={styles.socialIcon} 
                resizeMode="contain"
              />
              <Text style={[styles.socialButtonText, { color: theme.colors.onSurface }]}>Apple</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={toggleAuthMode} style={styles.linkContainer}>
            <Text style={styles.linkText}>
              {authMode === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <Text style={[styles.link, { color: theme.colors.primary }]}>
                {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
              </Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      
      <View style={styles.footerContainer}>
        <Text style={[styles.footerText, { color: theme.colors.outline }]}>
          By continuing, you agree to our
        </Text>
        <View style={styles.footerLinksContainer}>
          <TouchableOpacity>
            <Text style={[styles.footerLink, { color: theme.colors.primary }]}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={[styles.footerText, { color: theme.colors.outline }]}> & </Text>
          <TouchableOpacity>
            <Text style={[styles.footerLink, { color: theme.colors.primary }]}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    width: '48%',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialButtonText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  linkText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  link: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  footerText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
  },
  footerLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLink: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
  },
  verificationText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});