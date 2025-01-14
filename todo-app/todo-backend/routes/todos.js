const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const { setAsync, getAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  getAsync('added_todos').then((value) => {
    setAsync('added_todos', Number(value) + 1);
 });

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  console.log(req)
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log(req.body)
  Object.assign(req.todo, req.body);
  await req.todo.save();
  res.send(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;
