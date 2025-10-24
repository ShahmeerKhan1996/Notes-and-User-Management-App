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

  // const deleteNote = async (id: number) => {
  //   const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
  //   const updatedNotes = notes.filter((note) => note.id !== id);
  //   setNotes(updatedNotes);
  //   await AsyncStorage.setItem(`notes_${loggedUser.username}`, JSON.stringify(updatedNotes));
  // };

  // const confirmDelete = (id: number) => {
  //   Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
  //     { text: 'Cancel', style: 'cancel' },
  //     { text: 'Delete', style: 'destructive', onPress: () => deleteNote(id) },
  //   ]);
  // };

    const deleteNote = async (id: number) => {
    try {
      const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser') || '{}');
      if (!loggedUser.username) return;

      // Make sure to convert id to number for comparison
      const updatedNotes = notes.filter((note) => note.id !== Number(id));

      // Update state so FlatList removes the card immediately
      setNotes(updatedNotes);

      // Update AsyncStorage
      await AsyncStorage.setItem(`notes_${loggedUser.username}`, JSON.stringify(updatedNotes));
    } catch (error) {
      console.log('Error deleting note:', error);
    }
  };


  const logout = async () => {
    await AsyncStorage.removeItem('loggedUser');
    navigation.replace('Login');
  };

  const renderItem = ({ item }: { item: Note }) => (
    <View style={styles.noteCard}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text numberOfLines={1} style={styles.noteDesc}>{item.description}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.btn, styles.viewBtn]}
          onPress={() => navigation.navigate('NoteDetail', { noteId: String(item.id) })}
        >
          <Text style={styles.btnText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.editBtn]}
          onPress={() => navigation.navigate('AddNote', { noteId: item.id })}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.deleteBtn]}
          onPress={() => deleteNote(item.id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.header}>Your Notes</Text>

  //     <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddNote')}>
  //       <Text style={styles.addButtonText}>+ Add Note</Text>
  //     </TouchableOpacity>

  //     <FlatList
  //       data={notes}
  //       keyExtractor={(item) => item.id.toString()}
  //       renderItem={renderItem}
  //       ListEmptyComponent={<Text style={styles.emptyText}>No notes yet.</Text>}
  //     />

  //     <TouchableOpacity onPress={logout} style={styles.logout}>
  //       <Text style={styles.logoutText}>Logout</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
  <View style={styles.container}>
    <Text style={styles.header}>Your Notes</Text>

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

    {/* Go to Profile Button */}
    <TouchableOpacity
      style={styles.profileButton}
      onPress={() => navigation.navigate('UserProfile')}
    >
      <Text style={styles.profileButtonText}>Go to Profile</Text>
    </TouchableOpacity>

    {/* Logout Button */}
    <TouchableOpacity onPress={logout} style={styles.logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

};

export default NotesListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  noteCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginVertical: 6,
  },

  profileButton: {
  backgroundColor: '#28A745',
  padding: 12,
  borderRadius: 8,
  marginTop: 10,
},
profileButtonText: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
},

  noteTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  noteDesc: { color: '#666', marginTop: 4 },
  buttonRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  viewBtn: { backgroundColor: '#007BFF' },
  editBtn: { backgroundColor: '#FFC107' },
  deleteBtn: { backgroundColor: '#FF4444' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  addButton: { backgroundColor: '#007BFF', padding: 12, borderRadius: 8, marginVertical: 10 },
  addButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  logout: { marginTop: 20, alignSelf: 'center' },
  logoutText: { color: 'red', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#777', marginTop: 20 },
});
