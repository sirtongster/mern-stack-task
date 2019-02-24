const router = require('express').Router();
const { Task } = require('../models');

router.get('/task', async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json( tasks );
  } catch (err) {
    next(err);
  }
});

router.get('/task/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.json( task );
  } catch (err) {
    next(err);
  }
});

router.post('/task', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const tasks = await Task.create({title, description});
    res.json( {tasks, status: 'task created correctly'} );
  } catch (err) {
    next(err);
  }
})

router.put('/task/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findByIdAndUpdate(id, { title, description });

    res.json( {task, status: 'task updated correctly'} );
  } catch (err) {
    next(err);
  }

});
    
router.delete('/task/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    res.json( {task, status: 'task deleted correctly'} );
  } catch (err) {
    next(err);
  }
})

module.exports = router;