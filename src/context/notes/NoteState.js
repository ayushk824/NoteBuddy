//import { useState } from 'react';
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3000";
  const notesInitial = [
    {
      _id: "65ec45fc5854779a81dc8ddec",
      user: "65c280cd6516b02728665cd0",
      title: "Hello",
      description: "Goof morning ",
      tag: "bye",
      date: "2024-03-09T11:20:28.691Z",
      __v: 0,
    },
    {
      _id: "65ec46025854779a81dc7ddee",
      user: "65c280cd6516b02728665cd0",
      title: "New Note",
      description: "this is update note our new feature ",
      tag: "bye",
      date: "2024-03-09T11:20:34.537Z",
      __v: 0,
    },
    {
      _id: "65ec45fc5854779a861dcddec",
      user: "65c280cd6516b02728665cd0",
      title: "Hello",
      description: "Goof morning ",
      tag: "bye",
      date: "2024-03-09T11:20:28.691Z",
      __v: 0,
    },
    {
      _id: "65ec46025854779a851dcddee",
      user: "65c280cd6516b02728665cd0",
      title: "New Note",
      description: "this is update note our new feature ",
      tag: "bye",
      date: "2024-03-09T11:20:34.537Z",
      __v: 0,
    },
    {
      _id: "65ec45fc5854779a481dcddec",
      user: "65c280cd6516b02728665cd0",
      title: "Hello",
      description: "Goof morning ",
      tag: "bye",
      date: "2024-03-09T11:20:28.691Z",
      __v: 0,
    },
    {
      _id: "65ec460258547793a81dcddee",
      user: "65c280cd6516b02728665cd0",
      title: "New Note",
      description: "this is update note our new feature ",
      tag: "bye",
      date: "2024-03-09T11:20:34.537Z",
      __v: 0,
    },
    {
      _id: "65ec45fc58547792a81dcddec",
      user: "65c280cd6516b02728665cd0",
      title: "Hello",
      description: "Goof morning ",
      tag: "bye",
      date: "2024-03-09T11:20:28.691Z",
      __v: 0,
    },
    {
      _id: "65ec460258514779a81dcddee",
      user: "65c280cd6516b02728665cd0",
      title: "New Note",
      description: "this is update note our new feature ",
      tag: "bye",
      date: "2024-03-09T11:20:34.537Z",
      __v: 0,
    },
  ];
  const [notes, setnotes] = useState(notesInitial);

  
    const addNote = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjMjgwY2Q2NTE2YjAyNzI4NjY1Y2QwIn0sImlhdCI6MTcwOTY1MDAwM30.9SmFsYZrLwJg2iXfqHG2smIuEAOXtt9gKMnwVZy1iPU",
        },
        body: JSON.stringify({ title , description,tag }),
      });

  };
  const deleteNote = (id) => {
    console.log("deleteing note with the id:" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjMjgwY2Q2NTE2YjAyNzI4NjY1Y2QwIn0sImlhdCI6MTcwOTY1MDAwM30.9SmFsYZrLwJg2iXfqHG2smIuEAOXtt9gKMnwVZy1iPU",
      },
      body: JSON.stringify({ title , description,tag }),
    });
    const json = await response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
