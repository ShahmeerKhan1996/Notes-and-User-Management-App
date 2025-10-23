import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type NotesListNavProp = StackNavigationProp<RootStackParamList, 'NotesList'>;

interface Props {
  navigation: NotesListNavProp;
}

interface Note {
  id: number;
  title: string;
  description: string;
}

const NotesListScreen: React.FC<Props> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [profileImage, setProfileImage] = useState(
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotes();
      loadProfileImage();
    });
    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
    const storedNotes = await AsyncStorage.getItem(`notes_${loggedUser.username}`);
    setNotes(storedNotes ? JSON.parse(storedNotes) : []);
  };

  const loadProfileImage = async () => {
    const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
    if (loggedUser?.profileImage) {
      setProfileImage(loggedUser.profileImage);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedUser');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header with Title + Profile Icon */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Your Notes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <Image source={{ uri: profileImage }} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Add Note Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNote')}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.note}
            onPress={() => navigation.navigate('NoteDetail', { noteId: String(item.id) })}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text numberOfLines={1} style={styles.noteDesc}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No notes yet.</Text>}
      />

      {/* Logout */}
      <TouchableOpacity onPress={logout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotesListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  note: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
  noteTitle: { fontSize: 16, fontWeight: 'bold' },
  noteDesc: { color: '#555' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#777' },
  logout: { marginTop: 20, alignSelf: 'center' },
  logoutText: { color: 'red', fontWeight: 'bold' },
});
