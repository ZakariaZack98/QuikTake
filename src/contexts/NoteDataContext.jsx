import React, { createContext, useState } from 'react'

const NotesDataContext = createContext();
const NotesDataProvider = ({children}) => {
const [notesData, setNotesData] = useState([])

  return (
    <NotesDataContext.Provider value={{notesData, setNotesData}}>
      {children}
    </NotesDataContext.Provider>
  )
}

export {NotesDataContext, NotesDataProvider}
