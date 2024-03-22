import React from "react";
//import AddCardIcon from '@material-ui/icons/AddCard';

function AddNote(props) {
    const [newNote, setNewNote] = React.useState({
        _id: props.id, title: "", content: ""
    });

    function newItem(event) {
        const currentValue = event.target.value;
        const currentName = event.target.name;
        setNewNote((prevValue) => {
            return ({...prevValue, [currentName]: currentValue});
        });
    }

    return(
            <div className="note">
                <input type="text" onChange={newItem} value={newNote.title} name="title" placeholder="Title" />
                <input type="text" onChange={newItem} value={newNote.content} name="content" placeholder="Content" />
                <button onClick={() => {
                    props.forAddingNote(newNote);
                }}>Add</button>
            </div>
        
    );
}

export default AddNote;