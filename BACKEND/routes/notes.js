const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//route 1: Fetch all notes using GET- api/notes/fetchnotes Login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Something Went Wrong!!");
    }
})

//route 2: Add notes and tagged to given user id Post- api/notes/addenote
router.post('/addenote',fetchuser,
    body('title', 'Title shuld contains min 3 characters').isLength({ min: 3 }),
    body('description', 'Title shuld contains min 5 characters').isLength({ min: 5 }),
    async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;

        const note = new Notes({
            title: title,
            description: description,
            tag: tag,
            user:req.user.id
        });
        
        const savednote = await note.save();
        res.json(savednote);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Something Went Wrong!!");
    }
})

//route 3: Update notes Post- 
router.put('/updatenote/:id',fetchuser,async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const newnote = {};
        if(title){newnote.title = title};
        if(description){newnote.description = description};
        if(tag){newnote.tag = tag};

        let note = await Notes.findById(req.params.id);

        if(!note){res.status(404).send("Not Found");}

        if(note.user.toString()!==req.user.id){res.status(401).send("Unauthorized");}

        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        res.json({note});

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Something Went Wrong!!");
    }
})

module.exports = router;