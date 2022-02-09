const express =require("express");
const { ResultWithContext } = require("express-validator/src/chain");
const router=express.Router();
const fetchuser = require("../Middleware/Fetchuser")
const Notes = require("../modals/Notes");
const { body, validationResult } = require('express-validator');
const User = require("../modals/User");

//Rotue 1: Get all the user related notes by Get : /api/notes/fetchalluser:login required
router.get('/fetchalluser',fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
        
    }catch (error) {
        console.log(error);
        res.status(500).json("Catching some error")
    }
})
//Rotue 2: Add notes in user user related notes by Post: /api/notes/addnotes:login required
router.post('/addnotes',fetchuser,[
    body('title','Enter the valid title').isLength({ min: 5 }),
    body('description','Enter the valid Description').isLength({ min: 5 }),
],async (req,res)=>{
    try {
     const {title,description,tag} = req.body;

     //If there is error exist then these function run
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
        title,description,tag,user:req.user.id
    })
    const savenote = await note.save();
     res.json(savenote);

    } catch (error) {
        console.log(error);
        res.status(500).json("Catching some error")
    }
})
//Rotue 3: update the nodes and crete new nodes Put : /api/notes/updatenote:login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body;

    //create new note
    const newNote = {};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //find note to update it
    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("Not found")};

    if(note.user.toString() !== req.user.id){
        res.status(401).send("Not authorized")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
})
//Rotue 4: Delete the nodes and crete new nodes Delete : /api/notes/updatenote:login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    //find note to update it
    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("Not found")};
     
    //If the node is of the same user
    if(note.user.toString() !== req.user.id){
        res.status(401).send("Not authorized")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted", note : note});
})
module.exports=router;