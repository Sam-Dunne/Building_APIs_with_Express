const express = require('express');
const ChirpStore = require('../utils/chirpstore')
const router = express.Router();

// GET /api/chirps/  => all chirps
router.get('/', (req,res) => {
    const allChirps = ChirpStore.GetChirps()
    res.json(allChirps);
});


// GET /api/chirps/123  =>  get userid 123 deets
router.get('/:id/', (req,res) => {
    const id = req.params.id;
    const oneChirp = ChirpStore.GetChirp(id);
    res.json(oneChirp);
});

// POST /api/chirps  =>  adds new chirp 
router.post('/', (req,res) => {
    const newChirp = req.body;
    ChirpStore.CreateChirp(newChirp);
    res.json({resMessage: `new chirp added`, newChirp});
});

// PUT /api/chirps/123  =>  updates a Chirp by id 
router.put('/:id', (req,res) => {
    const id = req.params.id;
    const editedChirp = req.body;
    ChirpStore.UpdateChirp(id, editedChirp)
    res.json({resMessage: `updated id #${id}`, editedChirp});
})

// DELETE /api/chirps/123  =>  deletes a Chirp by id 
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    ChirpStore.DeleteChirp(id);
    res.json({resMessage: `deleted chirp id: ${id}`});
})

module.exports = router;