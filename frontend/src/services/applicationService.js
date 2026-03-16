const API_URL = 'http://localhost:5000/api/applications';

/**
 * Fetch all applications for a specific user with filtering/pagination.
 * @param {string} userId
 * @param {object} params - search, status, priority, sort, page, limit
 */
export const getApplications = async (userId, params = {}) => {
  const queryParams = new URLSearchParams({ userId, ...params }).toString();
  const response = await fetch(`${API_URL}?${queryParams}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch applications');
  }
  return response.json();
};

/**
 * Create a new internship application.
 * @param {object} applicationData
 */
export const createApplication = async (applicationData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create application');
  }
  return response.json();
};

/**
 * Update an existing application.
 * @param {string} id
 * @param {object} applicationData
 */
export const updateApplication = async (id, applicationData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update application');
  }
  return response.json();
};

/**
 * Delete an application.
 * @param {string} id
 */
export const deleteApplication = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete application');
  }
  return response.json();
};

/**
 * Fetch all interviews for a specific user.
 * @param {string} userId
 */
export const getInterviews = async (userId) => {
  const response = await fetch(`${API_URL}/interviews?userId=${userId}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch interviews');
  }
  return response.json();
};
