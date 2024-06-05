import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { app } from "../firebase.js";

export default function Profile() {
  const {currentUser} = useSelector(state => (state.user))
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() =>{
    if(file) {
      handleImagUpload(file);
    }
  }, [file])

  const handleImagUpload = (img) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const fileNamePath = 'images/' + fileName
    const storageRef = ref(storage,fileNamePath);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setFilePerc(Math.round(progress))
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        setFileUploadError(true);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({...formData, avatar: downloadURL})
        });
        
      })

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <form className='flex flex-col gap-4'>
        <input 
          onChange={(e) => setFile(e.target.files[0])}
          type='file' 
          ref={fileRef} 
          hidden accept='image/*'>
        </input>
          <img 
            onClick={() => fileRef.current.click()} 
            src={formData.avatar || currentUser.avatar}
            className='rounded-full h-24 w-24 object-cover self-center mt-2'>
          </img>
          <p className='text-sm self-center'>
            {fileUploadError ? 
            <span className='text-red-700'>Error Image Upload (image must be less than 2 mb)</span>:
            filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
            ) : (
              ''
            )}
          </p>
          <h1 className='text-3xl text-center font-semibold'>Profile</h1>
          <input
            type='text'
            placeholder= 'username'
            id='username'
            className='border p-3 rounded-lg' >
          </input>
          <input 
            type='text'
            placeholder='email'
            id='email'
            className='border p-3 rounded-lg' >
          </input>
          <input 
            type='password' 
            placeholder= 'password'
            id='password'
            className='border p-3 rounded-lg' >
          </input>
          <button
            className='bg-slate-700 text-white p-3 rounded-lg uppercase 
            hover:opacity-90 disabled:opacity-75'>
              Update
          </button>
      </form>

        <div className='flex gap-2 mt-5 justify-between'>
            <span className='text-red-700 cursor-pointer'>Delete Account</span>
            <span className='text-blue-700 cursor-pointer'>Sign Out</span>
        </div>

    </div>
  )
}
