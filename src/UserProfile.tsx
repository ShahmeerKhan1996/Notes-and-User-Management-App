// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../App';

// type NotesListNavProp = StackNavigationProp<RootStackParamList, 'NotesList'>;

// interface Props {
//   navigation: NotesListNavProp;
// }

// interface Note {
//   id: number;
//   title: string;
//   description: string;
// }

// const NotesListScreen: React.FC<Props> = ({ navigation }) => {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [profileImage, setProfileImage] = useState(
//     'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
//   );

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       loadNotes();
//       loadProfileImage();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const loadNotes = async () => {
//     const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
//     const storedNotes = await AsyncStorage.getItem(`notes_${loggedUser.username}`);
//     setNotes(storedNotes ? JSON.parse(storedNotes) : []);
//   };

//   const loadProfileImage = async () => {
//     const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
//     if (loggedUser?.profileImage) {
//       setProfileImage(loggedUser.profileImage);
//     }
//   };

//   const logout = async () => {
//     await AsyncStorage.removeItem('loggedUser');
//     navigation.replace('Login');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header with Title + Profile Icon */}
//       <View style={styles.headerRow}>
//         <Text style={styles.title}>Your Notes</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
//           <Image source={{ uri: profileImage }} style={styles.profileIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* Add Note Button */}
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate('AddNote')}
//       >
//         <Text style={styles.addButtonText}>+ Add Note</Text>
//       </TouchableOpacity>

//       {/* Notes List */}
//       <FlatList
//         data={notes}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.note}
//             onPress={() => navigation.navigate('NoteDetail', { noteId: String(item.id) })}
//           >
//             <Text style={styles.noteTitle}>{item.title}</Text>
//             <Text numberOfLines={1} style={styles.noteDesc}>
//               {item.description}
//             </Text>
//           </TouchableOpacity>
//         )}
//         ListEmptyComponent={<Text style={styles.emptyText}>No notes yet.</Text>}
//       />

//       {/* Logout */}
//       <TouchableOpacity onPress={logout} style={styles.logout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default NotesListScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   title: { fontSize: 24, fontWeight: 'bold' },
//   profileIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#007BFF',
//   },
//   addButton: {
//     backgroundColor: '#007BFF',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   addButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
//   note: {
//     backgroundColor: '#f9f9f9',
//     padding: 12,
//     borderRadius: 8,
//     marginVertical: 5,
//   },
//   noteTitle: { fontSize: 16, fontWeight: 'bold' },
//   noteDesc: { color: '#555' },
//   emptyText: { textAlign: 'center', marginTop: 20, color: '#777' },
//   logout: { marginTop: 20, alignSelf: 'center' },
//   logoutText: { color: 'red', fontWeight: 'bold' },
// });


// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const UserProfile: React.FC = () => {
//   const [fullName, setFullName] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [profileImage, setProfileImage] = useState('https://cdn-icons-png.flaticon.com/512/3135/3135715.png');

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   const loadUserData = async () => {
//     const userData = await AsyncStorage.getItem('loggedUser');
//     if (userData) {
//       const user = JSON.parse(userData);
//       setFullName(user.fullName || '');
//       setUsername(user.username || '');
//       setEmail(user.email || '');
//       if (user.profileImage) setProfileImage(user.profileImage);
//     }
//   };

//   const saveUserData = async () => {
//     const userData = { fullName, username, email, profileImage };
//     await AsyncStorage.setItem('loggedUser', JSON.stringify(userData));

//     // Optional: also update in "users" array if needed
//     const usersData = await AsyncStorage.getItem('users');
//     if (usersData) {
//       let users = JSON.parse(usersData);
//       users = users.map((u: any) =>
//         u.username === username ? userData : u
//       );
//       await AsyncStorage.setItem('users', JSON.stringify(users));
//     }

//     Alert.alert('Success', 'Profile updated successfully!');
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: profileImage }} style={styles.profileImage} />
//       <Text style={styles.label}>Full Name</Text>
//       <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />
//       <Text style={styles.label}>Username</Text>
//       <TextInput style={styles.input} value={username} onChangeText={setUsername} editable={false} />
//       <Text style={styles.label}>Email</Text>
//       <TextInput style={styles.input} value={email} onChangeText={setEmail} />

//       <TouchableOpacity style={styles.saveButton} onPress={saveUserData}>
//         <Text style={styles.saveButtonText}>Save</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default UserProfile;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, alignItems: 'center' },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 20,
//     borderWidth: 2,
//     borderColor: '#007BFF',
//   },
//   label: { alignSelf: 'flex-start', marginBottom: 5, fontWeight: 'bold' },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//   },
//   saveButton: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 8,
//     width: '100%',
//     marginTop: 10,
//   },
//   saveButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
// });

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

  const handleSave = async () => {
    try {
      const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
      const usersData = JSON.parse(await AsyncStorage.getItem('users') || '[]');

      // Create updated user object
      const updatedUser = {
        ...loggedUser,
        name,
        username,
        email,
        profileImage,
      };

      // Replace old user with updated user in array
      const updatedUsers = usersData.map((u: any) =>
        u.username === loggedUser.username ? updatedUser : u
      );

      // Save updates
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      await AsyncStorage.setItem('loggedUser', JSON.stringify(updatedUser));

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
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
