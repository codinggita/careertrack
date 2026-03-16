const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  dateApplied: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);
