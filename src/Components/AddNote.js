import React, { useContext, useState } from 'react';
import context from '../Context-Notes/noteContext';

function AddNote() {

    const{addNote} = useContext(context);
    const [note, setNote] = useState({title:"",description:"",tag:""});

    const handleOnClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
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
                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={handleOnChange} placeholder="Enter a Title" minLength={5} required />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange} placeholder="Ente a Description" minLength={5} required  />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleOnChange} placeholder="Ente a Tag" />
                    </div>
                    <div className="my-3">
                        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote
