import React from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import AddNote from "../components/AddNote.jsx"

async function getAllNotes() {
    try {
        const dbNotes = await axios.get("http://localhost:8000/");
        return dbNotes.data;
    } catch (error) {
        console.log("Failed to connect to backend!");
    }
}

var allNotes = await getAllNotes();

function App(){

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

    async function addNew(newNote) {
        try {
            const newData = await axios.post("http://localhost:8000/", newNote);
            allNotes = newData.data;
        } catch (error) {
            console.log("Unable to add new note!");
        }
    }

    async function deleteNote(id) {
        try {
            await axios.delete(`http://localhost:8000/${id}`);
        } catch (error) {
            console.log("Unable to delete selected note!");
        }
    }

    const lastId = allNotes[allNotes.length-1]._id;

    return(
        <div>
            <Header></Header>
            <AddNote id={lastId + 1}  forAddingNote= {addNew} />
            {allNotes.map(noteCard)}
            <Footer></Footer>
        </div>
    );
}

export default App;