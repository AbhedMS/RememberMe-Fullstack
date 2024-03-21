import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import notes from "../notes.js";
import AddNote from "../components/AddNote.jsx"

function App(){
    const [allNotes, updateNotes] = React.useState(notes);

    function noteCard(note) {
        return(
            <Note 
                key= {note.key}
                id= {note.key}
                title= {note.title}
                content = {note.content}
                toDelete= {deleteNote}
            />
        );
    }

    function addNew(newNote) {
        console.log("Added");
        console.log(newNote);
        updateNotes([...allNotes, newNote]);
        console.log(allNotes);
    }

    function deleteNote(id) {
        console.log(allNotes);
        updateNotes((prevNotes) => {
            return prevNotes.filter((arr, index) => {
                return index !== id;
            });
        })
        console.log(allNotes);
    }

    return(
        <div>
            <Header></Header>
            <AddNote id={allNotes.length}  forAddingNote= {addNew} />
            {allNotes.map(noteCard)}
            <Footer></Footer>
        </div>
    );
}

export default App;