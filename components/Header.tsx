import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SquarePen as PenSquare, UserPlus } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showNewChat?: boolean;
  showNewPost?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showNewChat = false,
  showNewPost = false
}) => {
  const theme = useTheme();
  const router = useRouter();
  
  return (
    <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        {title}
      </Text>
      <View style={styles.actions}>
        {showNewChat && (
          <IconButton
            icon={() => <UserPlus size={24} color={theme.colors.primary} />}
            size={24}
            onPress={() => {}}
          />
        )}
        {showNewPost && (
          <IconButton
            icon={() => <PenSquare size={24} color={theme.colors.primary} />}
            size={24}
            onPress={() => {}}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  actions: {
    flexDirection: 'row',
  },
});