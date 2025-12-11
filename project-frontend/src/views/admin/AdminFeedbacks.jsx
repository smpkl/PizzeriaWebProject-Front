// Adminsivun palautteidenhallinta

import React, { useEffect, useState } from 'react';

const AdminFeedbacks = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const adminToken = localStorage.getItem('adminToken');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch all feedbacks when component mounts
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setErrorMsg('');

      try {
        const res = await fetch(`${baseUrl}feedbacks`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            Authorization: 'Bearer ' + adminToken,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to load feedbacks (status: ${res.status})`);
        }

        const data = await res.json();
        setFeedbacks(Array.isArray(data.feedbacks) ? data.feedbacks : []);
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
        setErrorMsg('Failed to load feedbacks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle new feedback submission via FeedbackForm
  const handleSubmit = async (newFeedback) => {
    setErrorMsg('');

    try {
      const res = await fetch(`${baseUrl}feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: 'Bearer ' + adminToken,
        },
        body: JSON.stringify(newFeedback),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit feedback (status: ${res.status})`);
      }

      const created = await res.json();

      // Append the newly created feedback to the list
      setFeedbacks((prev) => [...prev, created]);
      
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setErrorMsg('Failed to submit feedback. Please check your input and try again.');
    }
  };

  if (loading) {
    return <p>Loading feedbacks...</p>;
  }

  return (
    <div className="admin-feedbacks">
      <h2>Admin Feedbacks</h2>

      {errorMsg && (
        <div
          style={{
            background: '#ffe5e5',
            color: '#b00020',
            padding: '8px 12px',
            borderRadius: 6,
            marginBottom: 12,
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Display list of feedbacks */}
      <div className="feedback-list" style={{ marginTop: 16 }}>
        {feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          feedbacks.map((fb) => (
<div
              key={fb.id}
              className="feedback-item"
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 12,
                marginBottom: 8,
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>{fb.email}</strong>
              </p>
              <p style={{ margin: '4px 0' }}>{fb.feedback}</p>
              <p style={{ margin: '2px 0' }}>Status: {fb.status}</p>
              <p style={{ margin: '2px 0' }}>Received: {fb.received}</p>
              <p style={{ margin: '2px 0' }}>
                Handled: {fb.handled ?? '—'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFeedbacks;
