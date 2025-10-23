import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
    const storedNotes = await AsyncStorage.getItem(`notes_${loggedUser.username}`);
    setNotes(storedNotes ? JSON.parse(storedNotes) : []);
  };

  const deleteNote = async (id: number) => {
    const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    await AsyncStorage.setItem(`notes_${loggedUser.username}`, JSON.stringify(updatedNotes));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedUser');
    navigation.replace('Login');
  };

  const renderItem = ({ item }: { item: Note }) => (
    <View style={styles.note}>
      <TouchableOpacity
        onPress={() => navigation.navigate('NoteDetail', { noteId: String(item.id) })}
      >
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text numberOfLines={1} style={styles.noteDesc}>
          {item.description}
        </Text>
      </TouchableOpacity>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('AddNote', { noteId: item.id })}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert('Confirm Delete', 'Delete this note?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => deleteNote(item.id) },
            ])
          }
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Notes</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNote')}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No notes yet.</Text>}
      />

      <TouchableOpacity onPress={logout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotesListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
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
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  editButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  actionText: { color: '#fff', fontWeight: 'bold' },
  logout: { marginTop: 20, alignSelf: 'center' },
  logoutText: { color: 'red', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#777' },
});
