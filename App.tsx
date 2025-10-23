import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import NotesListScreen from './src/NotesListScreen';
import AddNoteScreen from './src/AddNoteScreen';
import NoteDetailScreen from './src/NoteDetailScreen';
import UserProfile from './src/UserProfile';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  NotesList: undefined;
  AddNote: undefined;
  NoteDetail: { noteId: string };
  UserProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup' }} />
        <Stack.Screen name="NotesList" component={NotesListScreen} options={{ title: 'My Notes' }} />
        <Stack.Screen name="AddNote" component={AddNoteScreen} options={{ title: 'Add Note' }} />
        <Stack.Screen name="NoteDetail" component={NoteDetailScreen} options={{ title: 'Note Detail' }} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ title: 'User Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
