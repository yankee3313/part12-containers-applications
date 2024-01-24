const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis')

router.get('/', async (req, res) => {
  const added_todos = await getAsync('added_todos');
  res.send({
     added_todos: added_todos ? Number(added_todos) : 0
  });
 });

module.exports = router;
