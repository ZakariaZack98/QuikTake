import React, { useRef, useState } from "react";
import _ from "../../lib/lib";
import { IoClose } from "react-icons/io5";
import AutoResizeTextarea from "./AutoResizeTextarea";
import { FaPhotoFilm, FaStar } from "react-icons/fa6";
import { uploadFilesToCloudinary } from "../../utils/uploadFile.utils";
import { toast } from "react-toastify";
import { UpdateNote } from "../../utils/actions.utils";
import { auth } from "../../../Database/firebase.config";

const NotePopUp = ({ noteData, onNoteClose, onToggleStar }) => {
  const newNoteData = {
    id: auth.currentUser?.uid + Date.now(),
    timeStamp: Date.now(),
    date: new Date().toDateString(),
    title: "",
    desc: "",
    bgColor: "bg-purple-500",
  };
  const fileInputRef = useRef(null);
  const [updatedNoteData, setUpdatedNoteData] = useState(noteData || newNoteData);
  const { id, title, desc, photoUrls, bgColor, isStarred } = updatedNoteData;

  const handleClrChange = (color) => {
    setUpdatedNoteData({ ...updatedNoteData, bgColor: color });
  };

  const handleTitleChange = (title) => {
    setUpdatedNoteData({ ...updatedNoteData, title });
  };

  const handleDescChange = (desc) => {
    setUpdatedNoteData({ ...updatedNoteData, desc });
  };

  const handleStar = e => {
    setUpdatedNoteData({...updatedNoteData, isStarred: !isStarred});
    onToggleStar(e);
  }

  const openUploadPrompt = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handles the file input's change event by uploading the selected files to Cloudinary
   * and updating the note's photoUrls state with the secure URLs returned from Cloudinary.
   * If the note already has photos, appends the newly uploaded photos to the existing array.
   * @param {Event} event - The file input's change event.
   * @returns {Promise<void>} - A promise that resolves when the file upload is complete.
   */
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files) {
      const secureUrls = await uploadFilesToCloudinary(files);
      let updatedPhotoUrls;
      if(photoUrls && photoUrls.length > 0) {
        updatedPhotoUrls = photoUrls.concat(secureUrls);
      } else updatedPhotoUrls = secureUrls;
      setUpdatedNoteData({ ...updatedNoteData, photoUrls: updatedPhotoUrls });
    }
  };

  /**
   * Closes the note pop-up and updates the note in the Realtime Database.
   * If the title or description are empty, shows an error toast and does nothing.
   */
  const handleSaveAndClose = async () => {
    if(title.length === 0 || desc.length === 0) {
      toast.error('Title/desc should not be empty');
      return;
    }
    onNoteClose(false);
    try {
      await UpdateNote(updatedNoteData, id);
    } catch (error) {
      toast.error(`Error updating note: ${error.message}`)
    }
  }

  const colors = _.noteColors;
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.69)] z-50 font-poppins">
      <span
        className="close absolute right-5 top-5 text-white text-4xl cursor-pointer"
        onClick={handleSaveAndClose}>
        <IoClose />
      </span>
      <div className={`board w-4/10 h-19/20 p-5 overflow-x-auto ${bgColor} rounded-2xl shadow-2xl text-white`}>
        <div className="head flex justify-between items-center">
          <div className="colors flex items-center gap-x-2">
            {colors?.map((color) => (
              <div
                key={color}
                className={`${
                  color === bgColor ? " border-4" : " border-2"
                } border-white rounded-md w-10 h-10 ${color} cursor-pointer`}
                onClick={() => handleClrChange(color)}></div>
            ))}
          </div>
          <span
            className="text-lg cursor-pointer rounded-full w-10 h-10 flex justify-center items-center text-white"
            style={{ background: `${isStarred ? "#fcc43e" : "black"}`,}}
            onClick={e => handleStar(e)}
            >
            <FaStar />
          </span>
        </div>
        <div className="title my-5">
          <p className="text-xl">Title:</p>
          <AutoResizeTextarea value={title} onChange={handleTitleChange} fontSizeClass={"text-2xl font-semibold"} />
        </div>
        <div className="desc my-5">
          <p className="text-xl">Description:</p>
          <AutoResizeTextarea value={desc} onChange={handleDescChange} />
        </div>
        <div className="photos my-5 flex flex-col gap-y-4">
          {photoUrls?.map((photoUrl, idx) => (
            <picture key={idx}>
              <img src={photoUrl} alt="" className="w-full object-cover object-center rounded-md" />
            </picture>
          ))}
        </div>
        <div className="addPhoto">
          <input
            ref={fileInputRef}
            type="file"
            accept="images/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            className="flex gap-x-2 px-4 py-1 rounded-md border-2 w-fit bg-[rgba(255,255,255,0.25)] cursor-pointer"
            onClick={openUploadPrompt}>
            <span>
              <FaPhotoFilm />
            </span>
            <p className="text-sm">Upload Images</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePopUp;
