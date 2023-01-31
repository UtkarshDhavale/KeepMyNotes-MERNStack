import React, { useContext, useState } from 'react';
import context from '../Context-Notes/noteContext';

function AddNote() {

    const{addNote} = useContext(context);
    const [note, setNote] = useState({title:"",description:"",tag:"Default"});

    const handleOnClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    };

    const handleOnChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value});
    }

    return (
        <div>
            <div className="container my-3">
                <h3>Add a Notes</h3>
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleOnChange} placeholder="Enter a Title" />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={handleOnChange} placeholder="Ente a Description" />
                    </div>
                    <div className="my-3">
                        <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote
