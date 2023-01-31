import React, { useContext, useState } from 'react';
import context from '../Context-Notes/noteContext';

function NoteItem(props) {
    const {deleteNote} = useContext(context);

    return (
        <div className="col-md-3">
            <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{props.note.title}</h5>
                        <p className="card-text">{props.note.description}</p>
                        <i className="fa-solid fa-trash" onClick={()=>{return deleteNote(props.note._id)}}></i>
                        <i className="fa-solid fa-pen-to-square mx-3"></i>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
