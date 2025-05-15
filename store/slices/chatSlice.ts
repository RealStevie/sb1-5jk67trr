import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CHATS, CHAT_REQUESTS } from '@/data/mockData';

interface Message {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  read: boolean;
}

interface Chat {
  id: string;
  userId: string;
  username: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  distance?: string;
}

interface ChatRequest {
  id: string;
  userId: string;
  username: string;
  distance: string;
  timeAgo: string;
}

interface ChatState {
  chats: Chat[];
  chatRequests: ChatRequest[];
  messages: { [chatId: string]: Message[] };
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: CHATS,
  chatRequests: CHAT_REQUESTS,
  messages: {},
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendChatRequest: (state, action: PayloadAction<string>) => {
      // In a real app, this would send a request to the API
      // For now, we'll just log it
      console.log(`Chat request sent to user ${action.payload}`);
    },
    acceptChatRequest: (state, action: PayloadAction<string>) => {
      const requestIndex = state.chatRequests.findIndex(req => req.id === action.payload);
      
      if (requestIndex !== -1) {
        const request = state.chatRequests[requestIndex];
        
        // Add to chats
        state.chats.push({
          id: request.id,
          userId: request.userId,
          username: request.username,
          lastMessage: 'Chat started',
          lastMessageTime: 'Just now',
          unreadCount: 0,
          online: true,
          distance: request.distance,
        });
        
        // Remove from requests
        state.chatRequests.splice(requestIndex, 1);
      }
    },
    declineChatRequest: (state, action: PayloadAction<string>) => {
      state.chatRequests = state.chatRequests.filter(req => req.id !== action.payload);
    },
    sendMessage: (state, action: PayloadAction<{ chatId: string, message: string }>) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      
      if (chat) {
        // Update chat preview
        chat.lastMessage = message;
        chat.lastMessageTime = 'Just now';
        
        // Add message to conversation
        if (!state.messages[chatId]) {
          state.messages[chatId] = [];
        }
        
        state.messages[chatId].push({
          id: Date.now().toString(),
          text: message,
          senderId: 'self', // In a real app, this would be the current user's ID
          receiverId: chat.userId,
          timestamp: new Date().toISOString(),
          read: false,
        });
      }
    },
    markChatAsRead: (state, action: PayloadAction<string>) => {
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) {
        chat.unreadCount = 0;
      }
      
      // Mark all messages as read
      if (state.messages[action.payload]) {
        state.messages[action.payload] = state.messages[action.payload].map(msg => ({
          ...msg,
          read: true,
        }));
      }
    },
  },
});

export const { 
  sendChatRequest, 
  acceptChatRequest, 
  declineChatRequest,
  sendMessage,
  markChatAsRead,
} = chatSlice.actions;

export default chatSlice.reducer;