import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{
   const notesArr = [
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
        "_id": "63bc5a3479f71c60b2aaee52",
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
        "_id": "63bc5a3479f71c60b2aaee52",
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
        "_id": "63bc5a3479f71c60b2aaee52",
        "user": "63ba7c0f3ccc3c9b03805a72",
        "title": "Set Alarm",
        "description": "Wake up at 6 AM",
        "tag": "Alarm",
        "date": "2023-01-09T18:17:24.784Z",
        "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesArr);

   return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
   );
}

export default NoteState;