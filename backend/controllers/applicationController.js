const Application = require('../models/Application');

// Create new internship application
const createApplication = async (req, res) => {
  try {
    const { companyName, role, location, dateApplied, status, priority, notes, userId } = req.body;
    
    // In a real app with JWT, userId would come from req.user.id
    // For now, we take it from the request body or assume a logged-in user context
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const application = new Application({
      userId,
      companyName,
      role,
      location,
      dateApplied,
      status,
      priority,
      notes
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all applications for a user
const getApplications = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const applications = await Application.find({ userId }).sort({ dateApplied: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an application
const updateApplication = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an application
const deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication
};
