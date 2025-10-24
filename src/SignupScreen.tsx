// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../App';

// type SignupNavProp = StackNavigationProp<RootStackParamList, 'Signup'>;

// interface Props {
//   navigation: SignupNavProp;
// }

// const SignupScreen: React.FC<Props> = ({ navigation }) => {
//   const [fullName, setFullName] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSignup = async () => {
//     if (!fullName || !username || !email || !password || !confirmPassword) {
//       return Alert.alert('Error', 'All fields are required');
//     }
//     if (password !== confirmPassword) {
//       return Alert.alert('Error', 'Passwords do not match');
//     }

//     const data = await AsyncStorage.getItem('users');
//     const users = data ? JSON.parse(data) : [];

//     if (users.some((u: any) => u.username === username)) {
//       return Alert.alert('Error', 'Username already exists');
//     }

//     const newUser = { fullName, username, email, password };
//     users.push(newUser);
//     await AsyncStorage.setItem('users', JSON.stringify(users));

//     Alert.alert('Success', 'Signup successful!');
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} style={styles.input} />
//       <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
//       <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
//       <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.input} />

//       <TouchableOpacity style={styles.button} onPress={handleSignup}>
//         <Text style={styles.buttonText}>Signup</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SignupScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 15 },
//   button: { backgroundColor: '#28A745', padding: 15, borderRadius: 8 },
//   buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
// });




// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../App';

// type SignupNavProp = StackNavigationProp<RootStackParamList, 'Signup'>;

// interface Props {
//   navigation: SignupNavProp;
// }

// const SignupScreen: React.FC<Props> = ({ navigation }) => {
//   const [fullName, setFullName] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSignup = async () => {
//     if (!fullName || !username || !email || !password || !confirmPassword) {
//       return Alert.alert('Error', 'All fields are required');
//     }
//     if (password !== confirmPassword) {
//       return Alert.alert('Error', 'Passwords do not match');
//     }

//     const data = await AsyncStorage.getItem('users');
//     const users = data ? JSON.parse(data) : [];

//     if (users.some((u: any) => u.username === username)) {
//       return Alert.alert('Error', 'Username already exists');
//     }

//     // if (users.some((u: any) => u.email === email)) {
//     //   return Alert.alert('Error', 'Email already exists');
//     // }

//     const newUser = {
//       name: fullName, // ✅ store using "name" key so profile shows it
//       username,
//       email,
//       password,
//       profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // ✅ default avatar
//     };

//     users.push(newUser);
//     await AsyncStorage.setItem('users', JSON.stringify(users));

//     Alert.alert('Success', 'Signup successful!');
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//         style={styles.input}
//         autoCapitalize="none"
//       />
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//         autoCapitalize="none"
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Confirm Password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSignup}>
//         <Text style={styles.buttonText}>Signup</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SignupScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   button: { backgroundColor: '#28A745', padding: 15, borderRadius: 8 },
//   buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type SignupNavProp = StackNavigationProp<RootStackParamList, 'Signup'>;

interface Props {
  navigation: SignupNavProp;
}

const dummyImages = [
  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  'https://cdn-icons-png.flaticon.com/512/219/219969.png',
  'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
  'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
];

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string>(dummyImages[0]);
  const [imageIndex, setImageIndex] = useState(0);

  // 🔹 Dummy image switcher
  const pickDummyImage = () => {
    const nextIndex = (imageIndex + 1) % dummyImages.length;
    setProfileImage(dummyImages[nextIndex]);
    setImageIndex(nextIndex);
  };

  const handleSignup = async () => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      return Alert.alert('Error', 'All fields are required');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    const data = await AsyncStorage.getItem('users');
    const users = data ? JSON.parse(data) : [];

    if (users.some((u: any) => u.username === username)) {
      return Alert.alert('Error', 'Username already exists');
    }

    const newUser = {
      name: fullName,
      username,
      email,
      password,
      profileImage, // 👈 use dummy selected image
    };

    users.push(newUser);
    await AsyncStorage.setItem('users', JSON.stringify(users));

    Alert.alert('Success', 'Signup successful!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Dummy Profile Image Section */}
      <TouchableOpacity onPress={pickDummyImage} style={styles.imageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.changeText}>Tap to change image</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: { backgroundColor: '#28A745', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  imageContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeText: {
    marginTop: 8,
    color: '#007BFF',
    fontSize: 13,
  },
});
