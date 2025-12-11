// Adminsivun palautteidenhallinta

import React, { useEffect, useState } from 'react';
import FeedbackForm from './FeedbackForm';

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch all feedbacks when component mounts
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setErrorMsg('');

      try {
        const res = await fetch('/api/feedback', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to load feedbacks (status: ${res.status})`);
        }

        const data = await res.json();
        setFeedbacks(Array.isArray(data) ? data : []);
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
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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

      {/* Feedback form for adding new feedback */}
      <FeedbackForm onSubmit={handleSubmit} />

      {/* Display list of feedbacks */}
      <div className="feedback-list" style={{ marginTop: 16 }}>
        {feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb.id ?? fb._id ?? `${fb.user}-${fb.createdAt ?? Math.random()}`}
              className="feedback-item"
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 12,
                marginBottom: 8,
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>{fb.user ?? 'Anonymous'}</strong>: {fb.comment}
              </p>
              {typeof fb.rating !== 'undefined' && (
                <p style={{ margin: '6px 0 0' }}>Rating: {fb.rating}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFeedbacks;
