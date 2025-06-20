import React, { useState } from "react";
import { FaPen, FaStar, FaTrash } from "react-icons/fa6";
import NotePopUp from "./NotePopUp";
import { toast } from "react-toastify";
import { DeleteNote, ToggleStar } from "../../utils/actions.utils";

const NoteThumbCard = ({ noteData }) => {
  const { id, date, title, bgColor, isStarred } = noteData;
  const [showNote, setShowNote] = useState(false);


  const handleDelete = async (e) => {
    e.stopPropagation();
    await DeleteNote(id);
  }

  const handleStar = async e => {
    e.stopPropagation();
    await ToggleStar(id, !isStarred);
  }

  return (
    <>
      {showNote && <NotePopUp noteData={noteData} onNoteClose={setShowNote} onToggleStar={handleStar}/>}
      <div
        className={`max-w-1/5 flex flex-col justify-between aspect-square rounded-3xl ${bgColor} p-3 cursor-pointer duration-200 hover:scale-105 text-white`}
        onClick={() => setShowNote(true)}>
        <div>
          <p className="text-lg" style={{ position: "relative", margin: 0 }}>
            <span className="starred" style={{ float: "right", display: "inline-block", marginLeft: "8px" }}>
              <span
                className="text-lg cursor-pointer rounded-full w-10 h-10 flex justify-center items-center text-white"
                style={{background: `${isStarred ? "#fcc43e" : "black"}`}}
                onClick={e => handleStar(e)}
                >
                <FaStar />
              </span>
            </span>
            {title}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text text-sm">{date}</p>
          <div className="flex items-center gap-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex justify-center items-center">
              <span className="text-lg text-white">
                <FaPen />
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-red-500 flex justify-center items-center">
              <span className="text-lg text-white" onClick={e => handleDelete(e)}>
                <FaTrash />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteThumbCard;
