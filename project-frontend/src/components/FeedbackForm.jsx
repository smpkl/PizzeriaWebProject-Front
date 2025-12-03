// Pizzerian palautteenanto

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FeedbackForm({
  currentUser = null,
  apiBaseUrl,
  onSubmitted,
  labels,
  showCancel = false,
  compact = false,
}) {
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const t = {
    title: labels?.title ?? 'Give us your feedback',
    email: labels?.email ?? 'Email',
    message: labels?.message ?? 'Your message',
    submit: labels?.submit ?? 'Send feedback',
    cancel: labels?.cancel ?? 'Cancel',
    success: labels?.success ?? 'Thanks! Your feedback was sent.',
  };

  const baseUrl = useMemo(() => {
    const vite = typeof import !== 'undefined' && import.meta?.env?.VITE_API_URL;
    const cra = typeof process !== 'undefined' && process?.env?.REACT_APP_API_URL;
    return apiBaseUrl ?? vite ?? cra ?? '';
  }, [apiBaseUrl]);

  const validate = () => {
    const errors = [];
    if (!email || !emailRegex.test(email)) errors.push('Please provide a valid email.');
    const trimmed = message.trim();
    if (trimmed.length < 5) errors.push('Message is too short (min 5 characters).');
    if (trimmed.length > 1000) errors.push('Message is too long (max 1000 characters).');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    const errors = validate();
    if (errors.length) {
      setResult({ type: 'err', msg: errors.join(' ') });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
        credentials: 'include',
        body: JSON.stringify({
          user_id: currentUser?.id ?? null,
          email,
          feedback: message.trim(),
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      setResult({ type: 'ok', msg: t.success });
      setMessage('');
      if (!currentUser?.email) setEmail('');
      if (onSubmitted) onSubmitted();
    } catch (err) {
      setResult({
        type: 'err',
        msg: err?.message ?? 'Could not send feedback. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setMessage('');
    if (!currentUser?.email) setEmail('');
    setResult(null);
  };

  const cls = (s) => (compact ? `${s} compact` : s);

  return (
    <>
    <form onSubmit={handleSubmit} className={cls('feedback-form')} aria-labelledby="fb-title"/>
      <h2 id="fb-title" className="fb-title">{t.title}</h2>
      <div className="fb-field">
        <label htmlFor="fb-email">{t.email}</label>
        <input
          id="fb-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
      </>
  )}