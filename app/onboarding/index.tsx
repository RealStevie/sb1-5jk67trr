import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Button, TextInput, useTheme, Chip, RadioButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { completeOnboarding } from '@/store/slices/authSlice';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { INTERESTS, AVATARS } from '@/data/mockData';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react-native';

type OnboardingStep = 'name' | 'age' | 'sex' | 'interests' | 'username' | 'avatar';

export default function OnboardingScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('name');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  
  const getStepIndex = (step: OnboardingStep) => {
    const steps: OnboardingStep[] = ['name', 'age', 'sex', 'interests', 'username', 'avatar'];
    return steps.indexOf(step) + 1;
  };
  
  const handleNext = () => {
    switch (currentStep) {
      case 'name':
        setCurrentStep('age');
        break;
      case 'age':
        setCurrentStep('sex');
        break;
      case 'sex':
        setCurrentStep('interests');
        break;
      case 'interests':
        setCurrentStep('username');
        break;
      case 'username':
        setCurrentStep('avatar');
        break;
      case 'avatar':
        completeOnboardingProcess();
        break;
    }
  };
  
  const handleBack = () => {
    switch (currentStep) {
      case 'age':
        setCurrentStep('name');
        break;
      case 'sex':
        setCurrentStep('age');
        break;
      case 'interests':
        setCurrentStep('sex');
        break;
      case 'username':
        setCurrentStep('interests');
        break;
      case 'avatar':
        setCurrentStep('username');
        break;
    }
  };
  
  const completeOnboardingProcess = () => {
    dispatch(completeOnboarding({
      name,
      age: parseInt(age),
      sex,
      interests: selectedInterests,
      username,
      avatar: selectedAvatar
    }));
  };
  
  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, interest]);
      }
    }
  };
  
  const isStepValid = () => {
    switch (currentStep) {
      case 'name':
        return name.trim().length > 0;
      case 'age':
        return age.trim().length > 0 && parseInt(age) >= 18 && parseInt(age) <= 100;
      case 'sex':
        return sex.trim().length > 0;
      case 'interests':
        return selectedInterests.length >= 1;
      case 'username':
        return username.trim().length >= 3;
      case 'avatar':
        return selectedAvatar.trim().length > 0;
      default:
        return false;
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 'name':
        return (
          <Animated.View 
            entering={FadeInRight.duration(300)} 
            exiting={FadeOutLeft.duration(300)}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: theme.colors.onSurface }]}>
              What's your name?
            </Text>
            <Text style={[styles.stepDescription, { color: theme.colors.onSurfaceVariant }]}>
              Enter your full name or a name you'd like to be called.
            </Text>
            <TextInput
              mode="outlined"
              label="Your Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              autoCapitalize="words"
              autoComplete="name"
            />
          </Animated.View>
        );
      
      case 'age':
        return (
          <Animated.View 
            entering={FadeInRight.duration(300)} 
            exiting={FadeOutLeft.duration(300)}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: theme.colors.onSurface }]}>
              How old are you?
            </Text>
            <Text style={[styles.stepDescription, { color: theme.colors.onSurfaceVariant }]}>
              You must be at least 18 years old to use Troski Chat.
            </Text>
            <TextInput
              mode="outlined"
              label="Your Age"
              value={age}
              onChangeText={setAge}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={3}
            />
            {age && (parseInt(age) < 18 || parseInt(age) > 100) && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                You must be between 18 and 100 years old
              </Text>
            )}
          </Animated.View>
        );
      
      case 'sex':
        return (
          <Animated.View 
            entering={FadeInRight.duration(300)} 
            exiting={FadeOutLeft.duration(300)}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: theme.colors.onSurface }]}>
              What's your gender?
            </Text>
            <Text style={[styles.stepDescription, { color: theme.colors.onSurfaceVariant }]}>
              Select the option that best describes you.
            </Text>
            
            <RadioButton.Group onValueChange={value => setSex(value)} value={sex}>
              <TouchableOpacity 
                style={[
                  styles.radioOption,
                  sex === 'male' && { backgroundColor: theme.colors.primaryContainer }
                ]}
                onPress={() => setSex('male')}
                activeOpacity={0.7}
              >
                <RadioButton value="male" color={theme.colors.primary} />
                <Text style={[
                  styles.radioText,
                  { color: sex === 'male' ? theme.colors.onPrimaryContainer : theme.colors.onSurface }
                ]}>
                  Male
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.radioOption,
                  sex === 'female' && { backgroundColor: theme.colors.primaryContainer }
                ]}
                onPress={() => setSex('female')}
                activeOpacity={0.7}
              >
                <RadioButton value="female" color={theme.colors.primary} />
                <Text style={[
                  styles.radioText,
                  { color: sex === 'female' ? theme.colors.onPrimaryContainer : theme.colors.onSurface }
                ]}>
                  Female
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.radioOption,
                  sex === 'other' && { backgroundColor: theme.colors.primaryContainer }
                ]}
                onPress={() => setSex('other')}
                activeOpacity={0.7}
              >
                <RadioButton value="other" color={theme.colors.primary} />
                <Text style={[
                  styles.radioText,
                  { color: sex === 'other' ? theme.colors.onPrimaryContainer : theme.colors.onSurface }
                ]}>
                  Other
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.radioOption,
                  sex === 'prefer_not_to_say' && { backgroundColor: theme.colors.primaryContainer }
                ]}
                onPress={() => setSex('prefer_not_to_say')}
                activeOpacity={0.7}
              >
                <RadioButton value="prefer_not_to_say" color={theme.colors.primary} />
                <Text style={[
                  styles.radioText,
                  { color: sex === 'prefer_not_to_say' ? theme.colors.onPrimaryContainer : theme.colors.onSurface }
                ]}>
                  Prefer not to say
                </Text>
              </TouchableOpacity>
            </RadioButton.Group>
          </Animated.View>
        );
      
      case 'interests':
        return (
          <Animated.View 
            entering={FadeInRight.duration(300)} 
            exiting={FadeOutLeft.duration(300)}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: theme.colors.onSurface }]}>
              Select your interests
            </Text>
            <Text style={[styles.stepDescription, { color: theme.colors.onSurfaceVariant }]}>
              Choose up to 5 interests to help find like-minded people.
            </Text>
            
            <View style={styles.interestsContainer}>
              {INTERESTS.map(interest => (
                <Chip
                  key={interest}
                  selected={selectedInterests.includes(interest)}
                  onPress={() => handleInterestToggle(interest)}
                  style={[
                    styles.interestChip,
                    selectedInterests.includes(interest) && { backgroundColor: theme.colors.secondaryContainer }
                  ]}
                  textStyle={[
                    styles.interestChipText,
                    { color: selectedInterests.includes(interest) ? theme.colors.onSecondaryContainer : theme.colors.onSurfaceVariant }
                  ]}
                >
                  {interest}
                </Chip>
              ))}
            </View>
            
            <Text style={[styles.selectionCount, { color: theme.colors.outline }]}>
              {selectedInterests.length}/5 selected
            </Text>
          </Animated.View>
        );
      
      case 'username':
        return (
          <Animated.View 
            entering={FadeInRight.duration(300)} 
            exiting={FadeOutLeft.duration(300)}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: theme.colors.onSurface }]}>
              Create a username
            </Text>
            <Text style={[styles.stepDescription, { color: theme.colors.onSurfaceVariant }]}>
              This is how others will see you on Troski Chat.
            </Text>
            <TextInput
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
              autoComplete="username"
              maxLength={15}
            />
            {username && username.length < 3 && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                Username must be at least 3 characters
              </Text>
            )}
          </Animated.View>
        );
      
      case 'avatar':
        return (
          <Animated.View 
            entering={FadeInRight.duration(300)} 
            exiting={FadeOutLeft.duration(300)}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: theme.colors.onSurface }]}>
              Choose an avatar
            </Text>
            <Text style={[styles.stepDescription, { color: theme.colors.onSurfaceVariant }]}>
              Pick an avatar that represents you.
            </Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.avatarsContainer}
            >
              {AVATARS.map((avatar, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.avatarOption,
                    selectedAvatar === avatar && { 
                      borderColor: theme.colors.primary,
                      borderWidth: 3
                    }
                  ]}
                  onPress={() => setSelectedAvatar(avatar)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: avatar }}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity
                style={[styles.avatarOption, styles.cameraOption]}
                onPress={() => {}}
                activeOpacity={0.7}
              >
                <Camera size={32} color={theme.colors.onSurfaceVariant} />
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        );
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.stepIndicator, { color: theme.colors.primary }]}>
          Step {getStepIndex(currentStep)} of 6
        </Text>
        {currentStep !== 'name' && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeft size={24} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.progressContainer}>
        {['name', 'age', 'sex', 'interests', 'username', 'avatar'].map((step, index) => (
          <View 
            key={index}
            style={[
              styles.progressStep,
              { 
                backgroundColor: getStepIndex(currentStep as OnboardingStep) > index + 1 
                  ? theme.colors.primary
                  : getStepIndex(currentStep as OnboardingStep) === index + 1
                    ? theme.colors.primaryContainer
                    : theme.colors.surfaceVariant
              }
            ]}
          />
        ))}
      </View>
      
      <View style={styles.content}>
        {renderStep()}
      </View>
      
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.nextButton}
          disabled={!isStepValid()}
          contentStyle={styles.buttonContent}
          icon={currentStep === 'avatar' ? undefined : ({ size, color }) => (
            <ChevronRight size={size} color={color} />
          )}
          iconPosition="right"
        >
          {currentStep === 'avatar' ? 'Finish' : 'Continue'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
  },
  stepIndicator: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    marginBottom: 32,
  },
  input: {
    backgroundColor: 'transparent',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
  },
  radioText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  interestChip: {
    margin: 4,
  },
  interestChipText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
  },
  selectionCount: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'right',
  },
  errorText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    marginTop: 8,
  },
  avatarsContainer: {
    paddingVertical: 16,
  },
  avatarOption: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  cameraOption: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 24,
  },
  nextButton: {
    borderRadius: 28,
  },
  buttonContent: {
    paddingVertical: 6,
  },
});