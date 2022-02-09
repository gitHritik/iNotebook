import React, { useContext,useEffect,useRef ,useState} from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Addnotes from "./Addnotes";
import Noteitem from "./Noteitem";

function Notes(props) {
  const context = useContext(noteContext);
  let history = useHistory();
  const { notes,getNotes,editNotes } = context;
  const [note, setnote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => { 
         getNotes()
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) =>{
        ref.current.click();
        setnote({id:currentNote._id, etitle : currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
      
  }
  const handleclick = (e) => {
    console.log("Update the note....",note);
    editNotes(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully","success")
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnotes showAlert = {props.showAlert} />
     
          <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
          </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value={note.etitle}
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={note.edescription}
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            value={note.etag}
            onChange={onChange}
          />
        </div>
      </form>
                </div>
                <div className="modal-footer">
                  <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button disabled={note.edescription.length < 5 || note.etitle.length < 5} onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
                </div>
              </div>
            </div>
          </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        <div className="container">
        {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((notes) => {
          return <Noteitem key={notes._id} updateNote={updateNote}  showAlert = {props.showAlert} notes={notes}/>;
        })}
      </div>
    </>
  );
}

export default Notes;
