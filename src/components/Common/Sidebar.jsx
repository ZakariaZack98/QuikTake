import React, { useContext, useEffect, useState } from 'react'
import _ from '../../lib/lib'
import NotePopUp from './NotePopUp';
import { NotesDataContext } from '../../Contexts/NoteDataContext';
import { auth, db } from '../../../Database/firebase.config';
import { onValue, ref } from 'firebase/database';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const [showAddNotePrompt, setShowAddNotePrompt] = useState(false);
  const {notesData, setNotesData} = useContext(NotesDataContext);
  const sidebarData = _.sidebarOpts;

  useEffect(() => {
    const notesRef = ref(db, `notes/${auth.currentUser.uid}`);
    const unsub = onValue(notesRef, noteSnapshots => {
      const updatedNotesData = [];
      if(noteSnapshots.exists()) {
        noteSnapshots.forEach(singleNoteSnap => {
          updatedNotesData.push(singleNoteSnap.val())
        })
        setNotesData(updatedNotesData.sort((a, b) => b.timeStamp - a.timeStamp));
      } else toast.error('No notes found');
    })
    return () => unsub();
  }, [notesData])

  return (
    <>
      {showAddNotePrompt && <NotePopUp onNoteClose={setShowAddNotePrompt}/>}
      <div className='px-3 py-6 border-e-1 border-gray-300 dark:border-gray-600 h-full font-poppins bg-white dark:bg-gray-800'>
      <p className="font-medium text-gray-700 dark:text-white">QuikTake</p>
      <div className="sidebarOpts flex flex-col items-center gap-y-5 mt-5">
        {
          sidebarData?.map((item, idx)=> (
            <div key={item.label} className={`w-15 h-15 rounded-full flex justify-center items-center cursor-pointer ${item.colorClass}`} onClick={idx === 0 ? () => setShowAddNotePrompt(true) : null}>
              <span className='text-white text-2xl'>
                <item.icon/>
              </span>
            </div>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default Sidebar
