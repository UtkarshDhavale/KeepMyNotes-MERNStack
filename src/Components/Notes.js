import React, { useContext } from 'react';
import context from '../Context-Notes/noteContext';
import NoteItem from './NoteItem';


function Notes() {
    const { notes, setnotes } = useContext(context);
    return (
        <div className="row my-3">
            <h3>Your Notes</h3>
            {notes.map((note) => {
                return <NoteItem key={note._id} note={note}/>
            })}
        </div>
    )
}

export default Notes
