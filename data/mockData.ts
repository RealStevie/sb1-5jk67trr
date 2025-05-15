// Mock data for the application

// Sample users nearby for discovery
export const NEARBY_USERS = [
  {
    id: 1,
    username: 'traveler42',
    distance: '0.3km',
    interests: ['Photography', 'Hiking', 'Music'],
  },
  {
    id: 2,
    username: 'coffeeaddict',
    distance: '0.5km',
    interests: ['Coffee', 'Books', 'Art'],
  },
  {
    id: 3,
    username: 'techguru',
    distance: '0.7km',
    interests: ['Technology', 'Gaming', 'Movies'],
  },
  {
    id: 4,
    username: 'fitnessfreak',
    distance: '1.2km',
    interests: ['Fitness', 'Nutrition', 'Running'],
  },
  {
    id: 5,
    username: 'foodie_explorer',
    distance: '1.5km',
    interests: ['Cooking', 'Travel', 'Photography'],
  },
];

// Sample chat conversations
export const CHATS = [
  {
    id: '1',
    userId: 'user1',
    username: 'traveler42',
    lastMessage: 'Do you know any good coffee shops around here?',
    lastMessageTime: '10:30 AM',
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    userId: 'user2',
    username: 'coffeeaddict',
    lastMessage: "I'll be there in 5 minutes",
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    online: false,
  },
  {
    id: '3',
    userId: 'user3',
    username: 'techguru',
    lastMessage: 'Did you try the new feature?',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
    online: true,
  },
];

// Sample chat requests
export const CHAT_REQUESTS = [
  {
    id: '4',
    userId: 'user4',
    username: 'fitnessfreak',
    distance: '1.2km away',
    timeAgo: '5 min ago',
  },
  {
    id: '5',
    userId: 'user5',
    username: 'foodie_explorer',
    distance: '1.5km away',
    timeAgo: '10 min ago',
  },
];

// Sample updates/posts
export const UPDATES = [
  {
    id: 1,
    username: 'traveler42',
    text: 'Just found this amazing coffee shop downtown! The atmosphere is perfect for working remotely and the coffee is incredible. Anyone around want to meet up?',
    image: 'https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Downtown',
    timeAgo: '15 min ago',
    likes: 24,
    comments: 5,
    liked: true,
  },
  {
    id: 2,
    username: 'techguru',
    text: "There's a tech meetup happening tonight at the innovation hub. Anyone interested in machine learning should definitely check it out!",
    location: 'Innovation Hub',
    timeAgo: '2 hours ago',
    likes: 17,
    comments: 3,
    liked: false,
  },
  {
    id: 3,
    username: 'fitnessfreak',
    text: 'Morning run through the park was incredible today. The weather is perfect!',
    image: 'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'City Park',
    timeAgo: '4 hours ago',
    likes: 42,
    comments: 8,
    liked: false,
  },
];

// List of interests for user selection
export const INTERESTS = [
  'Art',
  'Books',
  'Coffee',
  'Cooking',
  'Fashion',
  'Fitness',
  'Gaming',
  'Hiking',
  'Movies',
  'Music',
  'Photography',
  'Programming',
  'Running',
  'Sports',
  'Technology',
  'Travel',
  'Writing',
  'Yoga',
];

// Sample avatars
export const AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/png?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/png?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/png?seed=Max',
  'https://api.dicebear.com/7.x/avataaars/png?seed=Sasha',
  'https://api.dicebear.com/7.x/avataaars/png?seed=Zoe',
  'https://api.dicebear.com/7.x/avataaars/png?seed=Alex',
];