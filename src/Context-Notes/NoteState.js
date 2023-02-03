import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{

const host = 'http://localhost:5000';

  const notesArr = [];
  const [notes, setNotes] = useState(notesArr);

  const fetchNotes = async()=>{
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("authToken")
        },
    });
    const json = await response.json();
    setNotes(json);
  }
  
  //addNotes
  const addNote= async (title,description,tag)=>{
    //Add Note API

    const response = await fetch(`${host}/api/notes/addenote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("authToken")
        },
        body: JSON.stringify({title,description,tag}) 
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  }

  //deleteNotes
  const deleteNote= async(id)=>{
    //DeleteNote API

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("authToken")
        },
    });

    const newNotes = notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
  }

  //editNotes
  const editNote= async (id,title,description,tag)=>{
    //EditNote API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("authToken")
        },
        body: JSON.stringify({title,description,tag}) 
    });
      
    const json = await response.json();

    for(let index = 0; index<notes.length;index++){
        if(notes[index]._id===id){
          notes[index].title = title;
          notes[index].description = description;
          notes[index].tag = tag;
        }
    }
    
  }

   return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
   );
}

export default NoteState;