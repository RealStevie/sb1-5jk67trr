import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, FlatList, TextInput as RNTextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme, Avatar, IconButton, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Paperclip, Send, Smile, MoveVertical as MoreVertical } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function ChatDetail() {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();
  const inputRef = useRef<RNTextInput>(null);
  const { chats } = useSelector((state: RootState) => state.chat);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  const currentChat = chats.find(chat => chat.id.toString() === id);
  
  useEffect(() => {
    // Populate messages from mock data
    setMessages([
      {
        id: 1,
        text: 'Hey there! How are you?',
        sender: 'other',
        timestamp: '10:30 AM'
      },
      {
        id: 2,
        text: 'I\'m good! Just checking out this new app. What about you?',
        sender: 'self',
        timestamp: '10:32 AM'
      },
      {
        id: 3,
        text: 'Same here! It\'s pretty cool that we can only chat with people nearby.',
        sender: 'other',
        timestamp: '10:33 AM'
      },
      {
        id: 4,
        text: 'Yeah, it makes everything feel more real and connected to my actual location.',
        sender: 'self',
        timestamp: '10:34 AM'
      },
      {
        id: 5,
        text: 'Have you met anyone interesting so far?',
        sender: 'other',
        timestamp: '10:35 AM'
      }
    ]);
  }, [id]);
  
  const handleSend = () => {
    if (message.trim().length === 0) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'self',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };
  
  const renderMessage = ({ item }) => {
    const isSelf = item.sender === 'self';
    
    return (
      <Animated.View 
        entering={FadeInUp.duration(300).delay(50 * item.id)}
        style={[
          styles.messageContainer,
          isSelf ? styles.selfMessageContainer : styles.otherMessageContainer
        ]}
      >
        <Surface 
          style={[
            styles.messageBubble,
            isSelf 
              ? { backgroundColor: theme.colors.primaryContainer } 
              : { backgroundColor: theme.colors.surfaceVariant }
          ]}
        >
          <Text style={[
            styles.messageText,
            { color: isSelf ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant }
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.timestampText,
            { color: isSelf ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant, opacity: 0.7 }
          ]}>
            {item.timestamp}
          </Text>
        </Surface>
      </Animated.View>
    );
  };
  
  const renderListHeaderComponent = () => (
    <View style={styles.chatInfoContainer}>
      <Surface style={[styles.chatInfoCard, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Avatar.Text 
          size={60}
          label={currentChat?.username.substring(0, 2).toUpperCase() || 'U'}
          backgroundColor={theme.colors.secondaryContainer}
          color={theme.colors.onSecondaryContainer}
        />
        <Text style={[styles.chatInfoUsername, { color: theme.colors.onSurface }]}>
          @{currentChat?.username || 'username'}
        </Text>
        <Text style={[styles.chatInfoDistance, { color: theme.colors.outline }]}>
          {currentChat?.distance || '0.5km away'}
        </Text>
        <Text style={[styles.chatInfoNote, { color: theme.colors.onSurfaceVariant }]}>
          You're chatting with someone nearby. Keep it friendly!
        </Text>
      </Surface>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="auto" />
      
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.headerLeft}>
          <IconButton
            icon={() => <ArrowLeft size={24} color={theme.colors.onSurface} />}
            onPress={() => router.back()}
          />
          <View style={styles.headerUserInfo}>
            <Avatar.Text 
              size={40}
              label={currentChat?.username.substring(0, 2).toUpperCase() || 'U'}
              backgroundColor={theme.colors.secondaryContainer}
              color={theme.colors.onSecondaryContainer}
            />
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerUsername, { color: theme.colors.onSurface }]}>
                @{currentChat?.username || 'username'}
              </Text>
              <Text style={[styles.headerStatus, { color: theme.colors.outline }]}>
                {currentChat?.online ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>
        
        <IconButton
          icon={() => <MoreVertical size={24} color={theme.colors.onSurface} />}
          onPress={() => {}}
        />
      </View>
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.messagesList}
          ListHeaderComponent={renderListHeaderComponent}
          inverted={false}
        />
        
        <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
          <IconButton
            icon={() => <Paperclip size={22} color={theme.colors.outline} />}
            size={22}
            onPress={() => {}}
            style={styles.attachButton}
          />
          <RNTextInput
            ref={inputRef}
            style={[styles.input, { color: theme.colors.onSurface, borderColor: theme.colors.outlineVariant }]}
            value={message}
            onChangeText={setMessage}
            placeholder="Message"
            placeholderTextColor={theme.colors.outline}
            multiline
          />
          <IconButton
            icon={() => <Smile size={22} color={theme.colors.outline} />}
            size={22}
            onPress={() => {}}
            style={styles.emojiButton}
          />
          <IconButton
            icon={() => <Send size={22} color={theme.colors.primary} />}
            size={22}
            onPress={handleSend}
            style={styles.sendButton}
            disabled={message.trim().length === 0}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingRight: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: 8,
  },
  headerUsername: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
  },
  headerStatus: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 32,
  },
  chatInfoContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  chatInfoCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: '80%',
  },
  chatInfoUsername: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    marginTop: 8,
  },
  chatInfoDistance: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  chatInfoNote: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 4,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  selfMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
  },
  timestampText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 11,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  attachButton: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 120,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
  },
  emojiButton: {
    marginHorizontal: 4,
  },
  sendButton: {
    marginLeft: 4,
  },
});