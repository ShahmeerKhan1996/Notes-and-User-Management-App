
import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type LoginNavProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginNavProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerLeft: () => null });
  }, [navigation]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
  try {
    const storedUsers = await AsyncStorage.getItem('users');

    if (!storedUsers) {
      Alert.alert('Error', 'No registered users found.');
      return;
    }

    const users = JSON.parse(storedUsers);

    const input = username.trim().toLowerCase();
    const user = users.find(
      (u: any) =>
        (u.username.toLowerCase() === input || u.email.toLowerCase() === input) &&
        u.password === password
    );

    if (user) {
      await AsyncStorage.setItem('loggedUser', JSON.stringify(user));
      navigation.replace('NotesList'); 
    } else {
      Alert.alert('Error', 'Invalid username/email or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
};


  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1001/1001259.png' }}
        style={styles.logo}
      />
      <TextInput
        placeholder="Username or Email"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>No account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 40 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { textAlign: 'center', marginTop: 15, color: '#007BFF' },
});

