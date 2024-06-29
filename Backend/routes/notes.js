const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1: fetching all notes 
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("some error occurred");
  }
});
//route 2 : add a new note  using post :(login required)
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "enter  valid title").isLength({ min: 3 }),
    body("description", "description should be greater than 5 words").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      //catches error internal code errors
      console.error(error.message);
      res.status(500).json("Internal server error");
    }
  }
);
//route 3: Update a note  using PUT "/api/auth/updatenote" :(login required)
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
      const { title, description, tag } = req.body;
      const newNote={};
      if (title){newNote.title = title};
      if (description){newNote.description = description};
      if (tag){newNote.tag = tag};

      let note = await Note.findById(req.params.id);
      if(!note){return res.status(404).send("not found")};
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
      }
      note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note});
      
    
    }

 )
 router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
      try{
      let note = await Note.findById(req.params.id);
      if(!note){return res.status(404).send("not found")};
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
      }
      note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been Deleted", note: note});
      }catch(error){
          console.error(error.message);
          res.status(501).send("Internal Server error");
      }
      
    
    }

 )
module.exports = router;
