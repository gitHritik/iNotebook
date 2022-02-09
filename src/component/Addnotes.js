import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnotes = (props) => {
  const context = useContext(noteContext);
  const { addNotes } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleclick = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag);
    setnote({  title: "",description: "",  tag: ""}) 
    props.showAlert("Added successfully","success")
  }

   

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={note.title}
            name="title"
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
            id="description"
            value={note.description}
            name="description"
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
            id="tag"
            value={note.tag}
            name="tag"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <button disabled={note.description.length < 5 || note.title.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}>
          Add Notes
        </button>
      </form>
    </div>
  );
};

export default Addnotes;
