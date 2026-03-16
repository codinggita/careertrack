const express = require('express');
const router = express.Router();
const {
  createApplication,
  getApplications,
  getInterviews,
  getUpcomingInterviews,
  updateApplication,
  deleteApplication
} = require('../controllers/applicationController');

// All routes are mounted under /api/applications in server.js
router.post('/', createApplication);
router.get('/', getApplications);
router.get('/interviews', getInterviews);
router.get('/upcoming-interviews', getUpcomingInterviews);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
