// src/services/firebaseNotes.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Note } from '../types';

const NOTES_COLLECTION = 'notes';
const ARCHIVED_NOTES_COLLECTION = 'archived_notes';

// Convert Firestore document to Note type
const convertToNote = (docId: string, data: any): Note => {
  return {
    _id: docId,
    title: data.title || '',
    content: data.content || '',
    createdAt: data.createdAt instanceof Timestamp 
      ? data.createdAt.toDate().toISOString() 
      : new Date().toISOString(),
    reminderDatetime: data.reminderDatetime || null,
    reminderSent: data.reminderSent || false,
  };
};

// Get all notes for a user
export const getUserNotes = async (userId: string): Promise<Note[]> => {
  const notesRef = collection(db, NOTES_COLLECTION);
  const q = query(
    notesRef,
    where('userId', '==', userId)
  );
  
  const querySnapshot = await getDocs(q);
  const notes = querySnapshot.docs.map(doc => convertToNote(doc.id, doc.data()));
  
  // Sort on the client side instead
  return notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Create a new note
export const createNote = async (
  userId: string,
  data: { title: string; content: string; reminderDatetime?: string | null }
): Promise<Note> => {
  const notesRef = collection(db, NOTES_COLLECTION);
  const docRef = await addDoc(notesRef, {
    userId,
    title: data.title || '',
    content: data.content || '',
    reminderDatetime: data.reminderDatetime || null,
    reminderSent: false,
    createdAt: serverTimestamp(),
  });
  
  const docSnap = await getDoc(docRef);
  return convertToNote(docRef.id, docSnap.data());
};

// Update a note
export const updateNote = async (
  noteId: string,
  data: { title: string; content: string; reminderDatetime?: string | null }
): Promise<Note> => {
  const noteRef = doc(db, NOTES_COLLECTION, noteId);
  await updateDoc(noteRef, {
    title: data.title,
    content: data.content,
    reminderDatetime: data.reminderDatetime || null,
    updatedAt: serverTimestamp(),
  });
  
  const docSnap = await getDoc(noteRef);
  return convertToNote(noteId, docSnap.data());
};

// Delete a note (move to archive)
export const deleteNote = async (noteId: string, userId: string): Promise<void> => {
  // Get the note first
  const noteRef = doc(db, NOTES_COLLECTION, noteId);
  const noteSnap = await getDoc(noteRef);
  
  if (!noteSnap.exists()) {
    throw new Error('Note not found');
  }
  
  const noteData = noteSnap.data();
  
  // Add to archived collection
  const archivedRef = collection(db, ARCHIVED_NOTES_COLLECTION);
  await addDoc(archivedRef, {
    userId,
    title: noteData.title || '',
    content: noteData.content || '',
    createdAt: noteData.createdAt,
    archivedAt: serverTimestamp(),
  });
  
  // Delete from notes collection
  await deleteDoc(noteRef);
};

// Get archived notes
export const getArchivedNotes = async (userId: string): Promise<Note[]> => {
  const archivedRef = collection(db, ARCHIVED_NOTES_COLLECTION);
  const q = query(
    archivedRef,
    where('userId', '==', userId)
  );
  
  const querySnapshot = await getDocs(q);
  const notes = querySnapshot.docs.map(doc => convertToNote(doc.id, doc.data()));
  
  // Sort on the client side instead
  return notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Permanently delete an archived note
export const deleteArchivedNote = async (noteId: string): Promise<void> => {
  const noteRef = doc(db, ARCHIVED_NOTES_COLLECTION, noteId);
  await deleteDoc(noteRef);
};
