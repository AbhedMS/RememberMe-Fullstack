import React from "react";
//import DeleteIcon from '@mui/icons/Delete';

function Note(props) {

    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <form onSubmit={() => { props.toDelete(props.id)}}>
                <button type="submit">Delete</button>
            </form>
        </div>
    );
}

export default Note;