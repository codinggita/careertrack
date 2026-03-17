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

router.post('/', createApplication);
router.get('/', getApplications);
router.get('/interviews', getInterviews);
router.get('/upcoming-interviews', getUpcomingInterviews);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
