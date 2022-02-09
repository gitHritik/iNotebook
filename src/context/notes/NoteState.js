import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const Host = "http://localhost:5000"
const notesInitial = []
    const  [notes, setnotes] = useState(notesInitial);
     
    //getNotes notes
    const getNotes= async ()=>{
       //To do api calls
       const response = await fetch(`${Host}/api/notes/fetchalluser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZGM0NTk1MmZhODgwYjMxYzhhZmQ2In0sImlhdCI6MTY0NDAyMDgyNX0.DQszMxcFzipH-YDRe0zn6l_o7fTQySpH5OWK00YOIsA"
        },
         
      });
      const json = await response.json()
          setnotes(json)
    }
    //Add notes
    const addNotes=async (title,description,tag)=>{
       //To do api calls
       const response = await fetch(`${Host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZGM0NTk1MmZhODgwYjMxYzhhZmQ2In0sImlhdCI6MTY0NDAyMDgyNX0.DQszMxcFzipH-YDRe0zn6l_o7fTQySpH5OWK00YOIsA"
        },
        body: JSON.stringify({title,description,tag}) 
      });
      const note = await response.json()
      setnotes(notes.concat(note))

       //To addnotes function
     
          
    }

    //Delete notes
    const deletenote= async (id)=>{
      //To do api calls
      const response = await fetch(`${Host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZGM0NTk1MmZhODgwYjMxYzhhZmQ2In0sImlhdCI6MTY0NDAyMDgyNX0.DQszMxcFzipH-YDRe0zn6l_o7fTQySpH5OWK00YOIsA"
        },
      });
      const json= response.json();
      //To delete a note
          const newNote = notes.filter((note)=>{return note._id !== id })
          setnotes(newNote);
    }
    //editnotes
    const editNotes= async (id,title,description,tag)=>{
       //To do api calls
       const response = await fetch(`${Host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZGM0NTk1MmZhODgwYjMxYzhhZmQ2In0sImlhdCI6MTY0NDAyMDgyNX0.DQszMxcFzipH-YDRe0zn6l_o7fTQySpH5OWK00YOIsA"
        },
        body: JSON.stringify({title,description,tag}) 
      });
      const json= response.json();

       //To edit a notes
       let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }   
        setnotes(newNotes)
    }
  return (
    <NoteContext.Provider value={{notes,addNotes,deletenote,editNotes,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
