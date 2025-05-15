import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Surface, Avatar, Divider, Badge, useTheme, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Header } from '@/components/Header';

export default function ChatsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { chats, chatRequests } = useSelector((state: RootState) => state.chat);
  const [searchQuery, setSearchQuery] = React.useState('');

  const navigateToChat = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigateToChat(item.id)}
      activeOpacity={0.7}
    >
      <Surface style={styles.chatItem}>
        <View style={styles.avatarContainer}>
          <Avatar.Text 
            size={50} 
            label={item.username.substring(0, 2).toUpperCase()} 
            backgroundColor={theme.colors.secondaryContainer}
            color={theme.colors.onSecondaryContainer}
          />
          {item.online && (
            <View style={[styles.onlineIndicator, { backgroundColor: theme.colors.primary }]} />
          )}
        </View>
        
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={[styles.username, { color: theme.colors.onSurface }]}>
              @{item.username}
            </Text>
            <Text style={[styles.timestamp, { color: theme.colors.outline }]}>
              {item.lastMessageTime}
            </Text>
          </View>
          
          <Text 
            style={[
              styles.lastMessage, 
              { color: item.unreadCount > 0 ? theme.colors.onSurface : theme.colors.onSurfaceVariant }
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
        </View>
        
        {item.unreadCount > 0 && (
          <Badge 
            size={24}
            style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}
          >
            {item.unreadCount}
          </Badge>
        )}
      </Surface>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );

  const renderRequestItem = ({ item }) => (
    <Surface style={[styles.requestItem, { backgroundColor: theme.colors.surfaceVariant }]}>
      <View style={styles.requestHeader}>
        <Avatar.Text 
          size={40} 
          label={item.username.substring(0, 2).toUpperCase()}
          backgroundColor={theme.colors.secondaryContainer}
          color={theme.colors.onSecondaryContainer}
        />
        <View style={styles.requestInfo}>
          <Text style={[styles.requestUsername, { color: theme.colors.onSurface }]}>
            @{item.username}
          </Text>
          <Text style={[styles.requestDistance, { color: theme.colors.outline }]}>
            {item.distance} away • {item.timeAgo}
          </Text>
        </View>
      </View>
      
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={[styles.ignoreButton, { borderColor: theme.colors.outline }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.ignoreText, { color: theme.colors.outline }]}>Ignore</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.acceptButton, { backgroundColor: theme.colors.primary }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.acceptText, { color: theme.colors.onPrimary }]}>Accept</Text>
        </TouchableOpacity>
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chats" showNewChat />
      
      <Searchbar
        placeholder="Search chats"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
        iconColor={theme.colors.outline}
      />
      
      {chatRequests.length > 0 && (
        <View>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurfaceVariant }]}>
            Chat Requests ({chatRequests.length})
          </Text>
          <FlatList
            data={chatRequests}
            renderItem={renderRequestItem}
            keyExtractor={(item) => `request-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.requestsContainer}
          />
        </View>
      )}
      
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurfaceVariant }]}>
        Chats
      </Text>
      
      {chats.length > 0 ? (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => `chat-${item.id}`}
          contentContainerStyle={styles.chatsContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
            No chats yet
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.outline }]}>
            Discover friends nearby to start chatting
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 28,
    height: 48,
  },
  searchInput: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  requestsContainer: {
    paddingHorizontal: 16,
  },
  requestItem: {
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 260,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  requestInfo: {
    marginLeft: 12,
  },
  requestUsername: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  requestDistance: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ignoreButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  ignoreText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
  },
  acceptButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  acceptText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
  },
  chatsContainer: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: 'white',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 16,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  unreadBadge: {
    marginLeft: 8,
  },
  divider: {
    marginLeft: 82,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
    paddingHorizontal: 32,
    textAlign: 'center',
  },
});