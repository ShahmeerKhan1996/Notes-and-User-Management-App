import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type UserProfileNavProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;

interface Props {
  navigation: UserProfileNavProp;
}

const UserProfile: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  );

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const loggedUser = await AsyncStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setName(user.name || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
      if (user.profileImage) setProfileImage(user.profileImage);
    }
  };

  const migrateNotesToNewUsername = async (oldUsername: string, newUsername: string) => {
    const oldKey = `notes_${oldUsername}`;
    const newKey = `notes_${newUsername}`;
    const oldNotes = await AsyncStorage.getItem(oldKey);
    if (oldNotes) {
      await AsyncStorage.setItem(newKey, oldNotes);
      await AsyncStorage.removeItem(oldKey);
    }
  };

  const handleSave = async () => {
    try {
      const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
      const usersData = JSON.parse(await AsyncStorage.getItem('users') || '[]');

      const oldUsername = loggedUser.username;
      const newUsername = username.trim();

      const proceedSave = async () => {
 
        if (oldUsername && oldUsername !== newUsername) {
          await migrateNotesToNewUsername(oldUsername, newUsername);
        }

 
        const updatedUser = {
          ...loggedUser,
          name,
          username: newUsername,
          email,
          profileImage,
        };


        const updatedUsers = usersData.map((u: any) =>
          u.username === oldUsername ? updatedUser : u
        );


        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        await AsyncStorage.setItem('loggedUser', JSON.stringify(updatedUser));

        Alert.alert('Success', 'Profile updated successfully!');
        navigation.replace('NotesList');
      };

      if (oldUsername !== newUsername) {
        Alert.alert(
          'Confirm Username Change',
          'Changing your username will move all your existing notes to your new username.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: proceedSave },
          ]
        );
      } else {
        await proceedSave();
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profileImage }} style={styles.avatar} />

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  saveButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
