const express = require('express');
const {
  createJob,
  deleteJob,
  getAdminJobs,
  getPublishedJobs,
  updateJob,
} = require('../controllers/jobController');
const {
  applyForJob,
  deleteJobApplication,
  getJobApplications,
  getResumeDownload,
} = require('../controllers/jobApplicationController');
const { authorize, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getPublishedJobs);
router.post('/:jobId/apply', applyForJob);

router.use(protect, authorize('admin', 'super_admin'));
router.get('/admin', getAdminJobs);
router.get('/applications', getJobApplications);
router.get('/applications/:applicationId/resume', getResumeDownload);
router.delete('/applications/:applicationId', deleteJobApplication);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;