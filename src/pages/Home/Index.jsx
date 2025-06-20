import React, { useContext } from 'react'
import SearchBox from '../../components/Home/Search'
import _ from '../../lib/lib'
import NoteThumbCard from '../../components/Common/NoteThumbCard';
import { NotesDataContext } from '../../Contexts/NoteDataContext';

const Home = () => {
  const {notesData} = useContext(NotesDataContext);
  return (
    <div className='w-full h-full py-6 px-12 font-poppins bg-white dark:bg-gray-800'>
      <SearchBox/>
      <h1 className='text-gray-700 dark:text-white my-5 text-5xl font-medium '>Notes</h1>
      <div className="notesGrid flex flex-wrap gap-4 items-start">
        {
          notesData?.map(note => (
            <NoteThumbCard key={note.id} noteData={note}/>
          ))
        }
      </div>
    </div>
  )
}

export default Home
