import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type ProfileNavProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;

interface Props {
  navigation: ProfileNavProp;
}

const UserProfile: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('https://cdn-icons-png.flaticon.com/512/3135/3135715.png'); // default image

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
    if (!loggedUser.username) return;

    setFullName(loggedUser.fullName || '');
    setUsername(loggedUser.username || '');
    setEmail(loggedUser.email || '');
    setPassword(loggedUser.password || '');
  };

  const saveProfile = async () => {
    if (!fullName || !username || !email || !password) {
      return Alert.alert('Error', 'All fields are required');
    }

    // Get all users and update the current one
    const data = await AsyncStorage.getItem('users');
    const users = data ? JSON.parse(data) : [];
    const updatedUsers = users.map((u: any) =>
      u.username === username ? { ...u, fullName, email, password } : u
    );

    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

    const updatedUser = { fullName, username, email, password };
    await AsyncStorage.setItem('loggedUser', JSON.stringify(updatedUser));

    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: profileImage }} style={styles.image} />
      </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput value={fullName} onChangeText={setFullName} style={styles.input} />

      <Text style={styles.label}>Username</Text>
      <TextInput value={username} editable={false} style={[styles.input, styles.disabled]} />

      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back to Notes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  image: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#007BFF' },
  label: { alignSelf: 'flex-start', fontWeight: 'bold', marginTop: 10 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  disabled: { backgroundColor: '#f0f0f0' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, width: '100%', marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  backButton: { marginTop: 15 },
  backText: { color: '#007BFF', fontWeight: '600' },
});
