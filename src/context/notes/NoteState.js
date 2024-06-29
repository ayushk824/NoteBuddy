
//import { useState } from 'react';            
import { useState } from 'react';
import noteContext from './noteContext';

const NoteState =(props)=>{
    const notesInitial = [
        {
          "_id": "65ec45fc5854779a81dcddec",
          "user": "65c280cd6516b02728665cd0",
          "title": "Hello",
          "description": "Goof morning ",
          "tag": "bye",
          "date": "2024-03-09T11:20:28.691Z",
          "__v": 0
        },
        {
          "_id": "65ec46025854779a81dcddee",
          "user": "65c280cd6516b02728665cd0",
          "title": "New Note",
          "description": "this is update note our new feature ",
          "tag": "bye",
          "date": "2024-03-09T11:20:34.537Z",
          "__v": 0
        },
        {
            "_id": "65ec45fc5854779a81dcddec",
            "user": "65c280cd6516b02728665cd0",
            "title": "Hello",
            "description": "Goof morning ",
            "tag": "bye",
            "date": "2024-03-09T11:20:28.691Z",
            "__v": 0
          },
          {
            "_id": "65ec46025854779a81dcddee",
            "user": "65c280cd6516b02728665cd0",
            "title": "New Note",
            "description": "this is update note our new feature ",
            "tag": "bye",
            "date": "2024-03-09T11:20:34.537Z",
            "__v": 0
          },
          {
            "_id": "65ec45fc5854779a81dcddec",
            "user": "65c280cd6516b02728665cd0",
            "title": "Hello",
            "description": "Goof morning ",
            "tag": "bye",
            "date": "2024-03-09T11:20:28.691Z",
            "__v": 0
          },
          {
            "_id": "65ec46025854779a81dcddee",
            "user": "65c280cd6516b02728665cd0",
            "title": "New Note",
            "description": "this is update note our new feature ",
            "tag": "bye",
            "date": "2024-03-09T11:20:34.537Z",
            "__v": 0
          },
          {
            "_id": "65ec45fc5854779a81dcddec",
            "user": "65c280cd6516b02728665cd0",
            "title": "Hello",
            "description": "Goof morning ",
            "tag": "bye",
            "date": "2024-03-09T11:20:28.691Z",
            "__v": 0
          },
          {
            "_id": "65ec46025854779a81dcddee",
            "user": "65c280cd6516b02728665cd0",
            "title": "New Note",
            "description": "this is update note our new feature ",
            "tag": "bye",
            "date": "2024-03-09T11:20:34.537Z",
            "__v": 0
          }
      ]
      const [notes, setnotes] = useState(notesInitial)

    return(
        <noteContext.Provider value={{notes , setnotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
 export default NoteState;