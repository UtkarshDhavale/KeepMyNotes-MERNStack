import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{

    const host = 'http://localhost:5000';

   const notesArr = [
    {
      "_id": "63bc5a33479f71c60b2aaee52",
      "user": "63ba7c0f3ccc3c9b03805a72",
      "title": "Set Alarm",
      "description": "Wake up at 6 AM",
      "tag": "Alarm",
      "date": "2023-01-09T18:17:24.784Z",
      "__v": 0
    },
    {
        "_id": "63bc5a3479f71c60b2aaee52",
        "user": "63ba7c0f3ccc3c9b03805a72",
        "title": "Set Alarm",
        "description": "Wake up at 6 AM",
        "tag": "Alarm",
        "date": "2023-01-09T18:17:24.784Z",
        "__v": 0
    },
    {
        "_id": "63bc5a34719f71c60b2aaee52",
        "user": "63ba7c0f3ccc3c9b03805a72",
        "title": "Set Alarm",
        "description": "Wake up at 6 AM",
        "tag": "Alarm",
        "date": "2023-01-09T18:17:24.784Z",
        "__v": 0
    },
    {
        "_id": "63bc5a3479f7rt1c60b2aaee52",
        "user": "63ba7c0f3ccc3c9b03805a72",
        "title": "Set Alarm",
        "description": "Wake up at 6 AM",
        "tag": "Alarm",
        "date": "2023-01-09T18:17:24.784Z",
        "__v": 0
    },
    {
        "_id": "63bc5a3479f711c60b2aaee52",
        "user": "63ba7c0f3ccc3c9b03805a72",
        "title": "Set Alarm",
        "description": "Wake up at 6 AM",
        "tag": "Alarm",
        "date": "2023-01-09T18:17:24.784Z",
        "__v": 0
    },
    {
        "_id": "63bc5a3479f71c160b2aaee52",
        "user": "63ba7c0f3ccc3c9b03805a72",
        "title": "Set Alarm",
        "description": "Wake up at 6 AM",
        "tag": "Alarm",
        "date": "2023-01-09T18:17:24.784Z",
        "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesArr);
  
  //addNotes
  const addNote= async (title,description,tag)=>{
    //TODO: Add Note API

    const response = await fetch(`${host}/api/notes/addenote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYTdjMGYzY2NjM2M5YjAzODA1YTcyIn0sImlhdCI6MTY3MzE5MDkzNn0.bA86dTpqarkIMh_UmmfB_oTvBPKfPWamKb0mq5EFG-4'
        },
        body: JSON.stringify({title,description,tag}) 
    });

    const note = [
        {
            "_id": "63bc85sa3479f71c160b2aaee52",
            "user": "63ba7c0f3ccc3c9b03805a72",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-01-09T18:17:24.784Z",
            "__v": 0
        }
    ];

    setNotes(notes.concat(note));

  }

  //deleteNotes
  const deleteNote=(id)=>{
    //TODO: add deleteNote API
    const newNotes = notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
  }

  //editNotes
  const editNote= async (id,title,description,tag)=>{
    //TODO: add editNote API

    const response = await fetch(`${host}/api/notes/fetchnotes${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYTdjMGYzY2NjM2M5YjAzODA1YTcyIn0sImlhdCI6MTY3MzE5MDkzNn0.bA86dTpqarkIMh_UmmfB_oTvBPKfPWamKb0mq5EFG-4'
        },
        body: JSON.stringify({title,description,tag}) 
    });
      
    const json = response.json();

    for(let index = 0; index<notes.length;index++){
        const element = notes[index];
        if(element._id===id){
            element.title = title;
            element.description = description;
            element.tag = tag;
        }
    }
    
  }

   return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
   );
}

export default NoteState;