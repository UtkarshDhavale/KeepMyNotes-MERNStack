import React, { useContext, useEffect, useRef, useState } from 'react';
import context from '../Context-Notes/noteContext';
import NoteItem from './NoteItem';

function Notes() {
    const { notes, fetchNotes, editNote } = useContext(context);

    useEffect(() => {
        fetchNotes();
    });

    const ref = useRef(null);
    const refClose = useRef(null);

    //const{addNote} = useContext(context);
    const [note, setNote] = useState({eid:'',etitle:'',edescription:'',etag:''});

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({eid:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }

    const handleOnClick=(e)=>{
        console.log("Click",note);
        editNote(note.eid,note.etitle,note.edescription,note.etag);
        refClose.current.click();
    };

    const handleOnChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value});
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit a Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <form>
                                    <div className="form-group my-3">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={handleOnChange} placeholder="Enter a Title" minLength={5} required />
                                    </div>
                                    <div className="form-group my-3">
                                        <label htmlFor="description">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleOnChange} placeholder="Ente a Description" minLength={5} required />
                                    </div>
                                    <div className="form-group my-3">
                                        <label htmlFor="tag">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleOnChange} placeholder="Ente a Tag" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h3>Your Notes</h3>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
