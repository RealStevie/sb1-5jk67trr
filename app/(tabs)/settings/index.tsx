import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List, Switch, Divider, Avatar, useTheme, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { Header } from '@/components/Header';
import { User, Bell, Shield, MapPin, Moon, CircleHelp as HelpCircle, LogOut, Smartphone, Eye, Lock, Globe } from 'lucide-react-native';

export default function SettingsScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [darkMode, setDarkMode] = React.useState(false);
  const [locationEnabled, setLocationEnabled] = React.useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.profileSection, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Avatar.Text 
            size={80} 
            label={user?.username?.substring(0, 2).toUpperCase() || 'U'}
            backgroundColor={theme.colors.primaryContainer}
            color={theme.colors.onPrimaryContainer}
          />
          <Text style={[styles.username, { color: theme.colors.onSurface }]}>
            @{user?.username || 'username'}
          </Text>
          <Button 
            mode="outlined" 
            onPress={() => {}}
            style={styles.editProfileButton}
          >
            Edit Profile
          </Button>
        </View>
        
        <List.Section>
          <List.Subheader style={styles.sectionHeader}>Account</List.Subheader>
          
          <List.Item
            title="Personal Information"
            titleStyle={styles.listItemTitle}
            left={props => <User {...props} size={24} color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <Divider />
          
          <List.Item
            title="Privacy"
            titleStyle={styles.listItemTitle}
            left={props => <Lock {...props} size={24} color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <Divider />
          
          <List.Item
            title="Security"
            titleStyle={styles.listItemTitle}
            left={props => <Shield {...props} size={24} color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>
        
        <List.Section>
          <List.Subheader style={styles.sectionHeader}>Preferences</List.Subheader>
          
          <List.Item
            title="Notifications"
            titleStyle={styles.listItemTitle}
            left={props => <Bell {...props} size={24} color={theme.colors.primary} />}
            right={props => 
              <Switch 
                value={notificationsEnabled} 
                onValueChange={setNotificationsEnabled}
                color={theme.colors.primary}
              />
            }
          />
          
          <Divider />
          
          <List.Item
            title="Location Services"
            titleStyle={styles.listItemTitle}
            description="Required for finding nearby users"
            descriptionStyle={styles.listItemDescription}
            left={props => <MapPin {...props} size={24} color={theme.colors.primary} />}
            right={props => 
              <Switch 
                value={locationEnabled} 
                onValueChange={setLocationEnabled}
                color={theme.colors.primary}
              />
            }
          />
          
          <Divider />
          
          <List.Item
            title="Dark Mode"
            titleStyle={styles.listItemTitle}
            left={props => <Moon {...props} size={24} color={theme.colors.primary} />}
            right={props => 
              <Switch 
                value={darkMode} 
                onValueChange={setDarkMode}
                color={theme.colors.primary}
              />
            }
          />
          
          <Divider />
          
          <List.Item
            title="Language"
            titleStyle={styles.listItemTitle}
            description="English (US)"
            descriptionStyle={styles.listItemDescription}
            left={props => <Globe {...props} size={24} color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>
        
        <List.Section>
          <List.Subheader style={styles.sectionHeader}>Support</List.Subheader>
          
          <List.Item
            title="Help & Support"
            titleStyle={styles.listItemTitle}
            left={props => <HelpCircle {...props} size={24} color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <Divider />
          
          <List.Item
            title="About Troski"
            titleStyle={styles.listItemTitle}
            left={props => <Smartphone {...props} size={24} color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <Divider />
          
          <List.Item
            title="Privacy Policy"
            titleStyle={styles.listItemTitle}
            left={props => <Eye {...props} size={24} color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>
        
        <Button 
          mode="outlined" 
          onPress={handleLogout}
          style={[styles.logoutButton, { borderColor: theme.colors.error }]}
          textColor={theme.colors.error}
          icon={({ size, color }) => <LogOut size={size} color={color} />}
        >
          Log Out
        </Button>
        
        <Text style={[styles.versionText, { color: theme.colors.outline }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 8,
  },
  username: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    marginTop: 8,
    marginBottom: 12,
  },
  editProfileButton: {
    borderRadius: 20,
  },
  sectionHeader: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
  },
  listItemTitle: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
  },
  listItemDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  versionText: {
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    marginTop: 12,
  },
});