import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Card, Avatar, Chip, IconButton, Divider, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { UPDATES } from '@/data/mockData';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';

export default function UpdatesScreen() {
  const theme = useTheme();

  const renderUpdateItem = ({ item }) => (
    <Card style={styles.card} mode="outlined">
      <Card.Title
        title={`@${item.username}`}
        subtitle={item.timeAgo}
        titleStyle={styles.postTitle}
        subtitleStyle={styles.postSubtitle}
        left={(props) => (
          <Avatar.Text
            {...props}
            label={item.username.substring(0, 2).toUpperCase()}
            backgroundColor={theme.colors.secondaryContainer}
            color={theme.colors.onSecondaryContainer}
          />
        )}
        right={(props) => (
          <Chip style={styles.locationChip} textStyle={styles.locationChipText}>
            {item.location}
          </Chip>
        )}
      />
      <Card.Content>
        <Text style={[styles.postText, { color: theme.colors.onSurface }]}>
          {item.text}
        </Text>
        {item.image && (
          <Image 
            source={{ uri: item.image }} 
            style={styles.postImage} 
            resizeMode="cover"
          />
        )}
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <View style={styles.actionButton}>
          <IconButton
            icon={() => <Heart size={20} color={item.liked ? theme.colors.error : theme.colors.outline} />}
            size={20}
            onPress={() => {}}
          />
          <Text style={[styles.actionText, { 
            color: item.liked ? theme.colors.error : theme.colors.outline
          }]}>
            {item.likes}
          </Text>
        </View>
        <View style={styles.actionButton}>
          <IconButton
            icon={() => <MessageCircle size={20} color={theme.colors.outline} />}
            size={20}
            onPress={() => {}}
          />
          <Text style={[styles.actionText, { color: theme.colors.outline }]}>
            {item.comments}
          </Text>
        </View>
        <View style={styles.actionButton}>
          <IconButton
            icon={() => <Share2 size={20} color={theme.colors.outline} />}
            size={20}
            onPress={() => {}}
          />
          <Text style={[styles.actionText, { color: theme.colors.outline }]}>
            Share
          </Text>
        </View>
      </Card.Actions>
      <Divider />
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Troski Updates" showNewPost />
      
      <FlatList
        data={UPDATES}
        renderItem={renderUpdateItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 8,
  },
  card: {
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  postTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
  },
  postSubtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
  },
  locationChip: {
    marginRight: 16,
    height: 28,
  },
  locationChipText: {
    fontSize: 12,
  },
  postText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    height: 200,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  cardActions: {
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    marginLeft: -8,
  },
});