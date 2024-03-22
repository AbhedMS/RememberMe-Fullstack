import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import AddNote from "../components/AddNote.jsx"

async function getAllNotes() {
    console.log("call triggered!");
    try {
        const dbNotes = await axios.get("http://localhost:8000/");
        return dbNotes.data;
    } catch (error) {
        console.log("Failed to connect to backend!");
    }
}

// async function postNewNote(noteToAdd) {
//     try {
//         console.log(noteToAdd);
//         const newData = await axios.post("http://localhost:8000/", noteToAdd);
//         return newData.data;
//     } catch (error) {
//         console.log("Unable to add new note!");
//     }
// }

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