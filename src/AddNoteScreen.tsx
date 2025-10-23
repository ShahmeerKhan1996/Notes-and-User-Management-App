import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type AddNoteNavProp = StackNavigationProp<RootStackParamList, 'AddNote'>;

interface Props {
  navigation: AddNoteNavProp;
}

const AddNoteScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveNote = async () => {
    if (!title.trim() || !description.trim()) {
      return Alert.alert('Error', 'Please fill in all fields');
    }

    const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
    const notesKey = `notes_${loggedUser.username}`;
    const storedNotes = await AsyncStorage.getItem(notesKey);
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    const newNote = { id: Date.now(), title, description };
    const updatedNotes = [...notes, newNote];
    await AsyncStorage.setItem(notesKey, JSON.stringify(updatedNotes));

    navigation.goBack(); // return to NotesListScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Note</Text>
      <TextInput
        placeholder="Note Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Note Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: '#28A745', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
