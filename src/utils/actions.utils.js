import { ref, remove, set } from "firebase/database";
import { auth, db } from "../../Database/firebase.config";
import { toast } from "react-toastify";

/**
 * Deletes a note from the Realtime Database.
 * @param {string} noteId - The unique ID of the note to delete.
 * @returns {Promise<void>} - A promise that resolves when the note is deleted.
 */
export const deleteNote = async (noteId) => {
  const noteRef = ref(db, `notes/${auth.currentUser.uid}/${noteId}`);
  try {
    await remove(noteRef);
    toast.warn("Note deleted.");
  } catch (error) {
    toast.error(`Error deleting note: ${error.message}`);
  }
};

/**
 * Updates a note in the Realtime Database.
 * @param {object} noteData - The note data to update.
 * @param {string} noteId - The unique ID of the note to update.
 * @returns {Promise<void>} - A promise that resolves when the note is updated.
 */
export const editNote = async (noteData, noteId) => {
  const noteRef = ref(db, `notes/${auth.currentUser.uid}/${noteId}`);
  try {
    await set(noteRef, noteData);
    toast.success('Note updated.')
  } catch (error) {
    toast.error(`Error editing note: ${error.message}`);
  }
}

/**
 * Toggles a note's starred status in the Realtime Database.
 * @param {string} noteId - The unique ID of the note to toggle.
 * @param {boolean} isStarred - Whether the note should be starred or not.
 * @returns {Promise<void>} - A promise that resolves when the note is updated.
 */
export const toggleStar = async (noteId, isStarred) => {
  const noteStarRef = ref(db, `notes/${auth.currentUser.uid}/${noteId}/isStarred`);
  try {
    await set(noteStarRef, isStarred);
  } catch (error) {
    toast.error(`Error adding/removing star: ${error.message}`)
  }
}