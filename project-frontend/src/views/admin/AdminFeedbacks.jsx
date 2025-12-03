// Adminsivun palautteidenhallinta

import React, { useEffect, useState } from 'react';
import './AdminFeedbacks.css';

function AdminFeedbacks() {
  const [newFeedbacks, setNewFeedbacks] = useState([]);
  const [handledFeedbacks, setHandledFeedbacks] = useState([]);

  useEffect(() => {
    fetch('/api/feedbacks')
      .then(res => res.json())
      .then(data => {
        setNewFeedbacks(data.filter(f => f.status === 'received'));
        setHandledFeedbacks(data.filter(f => f.status === 'handled'));
      });
  }, []);

  const markAsHandled = async (id) => {
    await fetch(`/api/feedbacks/${id}/handle`, { method: 'PUT' });
    setNewFeedbacks(prev => prev.filter(f => f.id !== id));
    const handledItem = newFeedbacks.find(f => f.id === id);
    setHandledFeedbacks(prev => [...prev, { ...handledItem, status: 'handled', handled: new Date() }]);
  };

  const archiveFeedback = async (id) => {
    await fetch(`/api/feedbacks/${id}`, { method: 'DELETE' });
    setHandledFeedbacks(prev => prev.filter(f => f.id !== id));
  };

  return (
    <>
    <div className="admin-feedbacks">
      </div>
      <h1>PALAUTTEET</h1>
      <div className="feedback-container">
        </div>
        <div className="column">
          <h2>UUDET</h2>
          {newFeedbacks.map(f => (
            <FeedbackCard key={f.id} data={f} onHandle={markAsHandled} />
          ))}
        </div>
        <div className="column">
          </div>
          </>
          )};
