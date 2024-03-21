import React from "react";
//import DeleteIcon from '@mui/icons/Delete';

function Note(props) {

    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={() => {
                props.toDelete(props.id)
            }}>Delete</button>
        </div>
    );
}

export default Note;