const express = require('express');
const router  = express.Router();
const filter  = require('./filter.js');

// Routes that is used for filter
router.post('/', filter.request);

// Loading balance get request
//- @return 200 stataus
router.get('/', (req, res) => {
  res.status(200).end();
});

module.exports = router;