import React from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import AddNote from "../components/AddNote.jsx"

async function getAllNotes() {
    console.log("call triggered!");
    try {
        const dbNotes = await axios.get("http://localhost:8000/");
        console.log(dbNotes.data);
        return dbNotes.data;
    } catch (error) {
        console.log("Failed to connect to backend!");
    }
}

const notes = await getAllNotes();

function App(){
    
    const [allNotes, updateNotes] = React.useState(notes);
    console.log(allNotes);

    function noteCard(note) {
        return(
            <Note 
                key= {note._id}
                id= {note._id}
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
            <AddNote id={(allNotes.length + 1)}  forAddingNote= {addNew} />
            {allNotes.map(noteCard)}
            <Footer></Footer>
        </div>
    );
}

export default App;