import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type AddNoteNavProp = StackNavigationProp<RootStackParamList, 'AddNote'>;
type AddNoteRouteProp = RouteProp<RootStackParamList, 'AddNote'>;

interface Props {
  navigation: AddNoteNavProp;
  route: AddNoteRouteProp;
}

interface Note {
  id: number;
  title: string;
  description: string;
}

const AddNoteScreen: React.FC<Props> = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const noteId = route.params?.noteId;

  useEffect(() => {
    if (noteId) {
      setIsEditMode(true);
      loadNoteForEdit(noteId);
    }
  }, [noteId]);

  const loadNoteForEdit = async (id: number) => {
    const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
    const storedNotes = await AsyncStorage.getItem(`notes_${loggedUser.username}`);
    const notes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];
    const noteToEdit = notes.find((n) => n.id === id);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDescription(noteToEdit.description);
    }
  };

  const saveNote = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please enter both title and description.');
      return;
    }

    const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
    const storedNotes = await AsyncStorage.getItem(`notes_${loggedUser.username}`);
    let notes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];

    if (isEditMode && noteId) {
      notes = notes.map((n) =>
        n.id === noteId ? { ...n, title, description } : n
      );
      Alert.alert('Success', 'Note updated successfully!');
    } else {
      const newNote: Note = {
        id: Date.now(),
        title,
        description,
      };
      notes.push(newNote);
      Alert.alert('Success', 'Note added successfully!');
    }

    await AsyncStorage.setItem(`notes_${loggedUser.username}`, JSON.stringify(notes));
    navigation.replace('NotesList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{isEditMode ? 'Edit Note' : 'Add Note'}</Text>

      <TextInput
  style={styles.input}
  placeholder="Enter Title"
  value={title}
  onChangeText={setTitle}
/>
      
      <TextInput
  style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
  placeholder="Enter Description"
  value={description}
  onChangeText={setDescription}
  multiline
/>

      <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
        <Text style={styles.saveButtonText}>
          {isEditMode ? 'Update Note' : 'Save Note'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
