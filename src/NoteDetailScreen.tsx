import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type NoteDetailRouteProp = RouteProp<RootStackParamList, 'NoteDetail'>;

interface Props {
  route: NoteDetailRouteProp;
}

interface Note {
  id: number;
  title: string;
  description: string;
}

const NoteDetailScreen: React.FC<Props> = ({ route }) => {
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
    </View>
  );
};

export default NoteDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, color: '#222' },
  description: { fontSize: 16, lineHeight: 22, color: '#555' },
  errorText: { textAlign: 'center', color: 'red', fontSize: 18, marginTop: 40 },
});
