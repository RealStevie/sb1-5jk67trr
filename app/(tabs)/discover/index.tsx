import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Surface, Button, Avatar, Chip, useTheme, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { sendChatRequest } from '@/store/slices/chatSlice';
import { NEARBY_USERS } from '@/data/mockData';
import { MapPin, Users } from 'lucide-react-native';
import { Header } from '@/components/Header';

export default function DiscoverScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [nearbyUsers, setNearbyUsers] = useState([]);

  useEffect(() => {
    // Simulate fetching nearby users
    setTimeout(() => {
      setNearbyUsers(NEARBY_USERS);
      setLoading(false);
    }, 1500);
  }, []);

  const handleSendRequest = (userId) => {
    dispatch(sendChatRequest(userId));
  };

  const renderUserCard = ({ item }) => (
    <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
      <View style={styles.cardHeader}>
        <Avatar.Text 
          size={50} 
          label={item.username.substring(0, 2).toUpperCase()} 
          backgroundColor={theme.colors.primaryContainer}
          color={theme.colors.primary}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.username, { color: theme.colors.onSurface }]}>@{item.username}</Text>
          <View style={styles.distanceContainer}>
            <MapPin size={14} color={theme.colors.outline} />
            <Text style={[styles.distance, { color: theme.colors.outline }]}>
              {item.distance} away
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.interestsContainer}>
        {item.interests.map((interest, index) => (
          <Chip 
            key={index} 
            style={styles.interestChip}
            textStyle={{ color: theme.colors.onSecondaryContainer, fontSize: 12 }}
          >
            {interest}
          </Chip>
        ))}
      </View>
      
      <Button 
        mode="contained" 
        onPress={() => handleSendRequest(item.id)}
        style={styles.requestButton}
      >
        Send Chat Request
      </Button>
    </Surface>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Find Friends" />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.onSurfaceVariant }]}>
            Scanning for nearby users...
          </Text>
        </View>
      ) : nearbyUsers.length > 0 ? (
        <FlatList
          data={nearbyUsers}
          renderItem={renderUserCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Users size={60} color={theme.colors.outline} />
          <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
            No users found nearby
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.outline }]}>
            Move to a different location or try again later
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
  listContainer: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    marginLeft: 16,
  },
  username: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  interestChip: {
    margin: 4,
    backgroundColor: 'rgba(103, 80, 164, 0.12)',
  },
  requestButton: {
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Medium',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
  },
});