const express = require('express');

const router = express.Router();

const { getAllIssues, getIssue
} = require('../controllers/issues');


router.get('/issues', getAllIssues);
router.get('/issues/:id', getIssue);

module.exports = router;