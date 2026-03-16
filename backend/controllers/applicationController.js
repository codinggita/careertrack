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

// Get all applications for a user with filtering, sorting and pagination
const getApplications = async (req, res) => {
  try {
    const { userId, search, status, priority, sort, page = 1, limit = 6 } = req.query;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Build Query
    const query = { userId };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    let sortOption = { dateApplied: -1 }; // Default
    if (sort) {
      const [field, order] = sort.split('_');
      sortOption = { [field]: order === 'desc' ? -1 : 1 };
    } else if (sort === 'company_asc') {
       sortOption = { companyName: 1 };
    } else if (sort === 'company_desc') {
       sortOption = { companyName: -1 };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const totalApplications = await Application.countDocuments(query);
    const applications = await Application.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      applications,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalApplications / parseInt(limit)),
      totalApplications
    });
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
