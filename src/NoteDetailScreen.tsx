import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type NoteDetailRouteProp = RouteProp<RootStackParamList, 'NoteDetail'>;
type NoteDetailNavProp = StackNavigationProp<RootStackParamList, 'NoteDetail'>;

interface Props {
  route: NoteDetailRouteProp;
  navigation: NoteDetailNavProp;
}

interface Note {
  id: number;
  title: string;
  description: string;
}

const NoteDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { noteId } = route.params;
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    try {
      const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
      const storedNotes = await AsyncStorage.getItem(`notes_${loggedUser.username}`);
      const notesList: Note[] = storedNotes ? JSON.parse(storedNotes) : [];
      const selectedNote = notesList.find((n) => n.id === Number(noteId));
      setNote(selectedNote || null);
    } catch (error) {
      console.error('Error loading note:', error);
    }
  };

  const deleteNote = async () => {
    try {
      const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
      if (!loggedUser.username) return;

      const storedNotes = await AsyncStorage.getItem(`notes_${loggedUser.username}`);
      const notesList: Note[] = storedNotes ? JSON.parse(storedNotes) : [];

      // Remove the note immediately
      const updatedNotes = notesList.filter((n) => n.id !== Number(noteId));

      // Update AsyncStorage
      await AsyncStorage.setItem(`notes_${loggedUser.username}`, JSON.stringify(updatedNotes));
      navigation.replace('NotesList');

      // Navigate back to NotesList (card will disappear there immediately)
      navigation.replace('NotesList');
    } catch (error) {
      console.log('Error deleting note:', error);
    }
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Note not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.description}>{note.description}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('AddNote', { noteId: note.id })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={deleteNote}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, color: '#222' },
  description: { fontSize: 16, lineHeight: 22, color: '#555' },
  buttonRow: {
  flexDirection: 'row',
  marginTop: 30,
  justifyContent: 'flex-end', // align buttons to right
  gap: 10, // add spacing between buttons
},
  button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  editButton: { backgroundColor: '#007BFF' },
  deleteButton: { backgroundColor: '#FF4444' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  errorText: { textAlign: 'center', color: 'red', fontSize: 18, marginTop: 40 },
});
