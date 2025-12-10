// Pizzerian palautteenanto

import React, { useEffect, useMemo, useRef, useState } from 'react';

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX_MESSAGE_LEN = 5000;   
const MIN_MESSAGE_LEN = 10;      

// Helper: get API base from Vite env (fallback to relative)
function useApiBase() {
  return useMemo(() => {
    const base = import.meta?.env?.VITE_API_URL?.trim();
    if (!base) return '';
    return base.endsWith('/') ? base.slice(0, -1) : base;
  }, []);
}

export default function FeedbackForm({ className = '' }) {
  const user = null;   
  const token = null;  

  const apiBase = useApiBase();
  const abortRef = useRef(null);

  // Controlled inputs
  const [email, setEmail] = useState(user?.email ?? '');
  const [message, setMessage] = useState('');

  // UI state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');

  const [website, setWebsite] = useState(''); 

  // Clean up: abort pending fetch when unmounting
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  // Validate inputs
  function validate() {
    const nextErrors = {};

    const emailTrimmed = email.trim();
    const msgTrimmed = message.trim();

    // If logged in, email can be auto-filled or even optional on server;
    // but keeping client-side validation avoids accidental empties.
    if (!emailTrimmed) {
      nextErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(emailTrimmed)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!msgTrimmed) {
      nextErrors.message = 'Feedback message is required.';
    } else if (msgTrimmed.length < MIN_MESSAGE_LEN) {
      nextErrors.message = `Please write at least ${MIN_MESSAGE_LEN} characters.`;
    } else if (msgTrimmed.length > MAX_MESSAGE_LEN) {
      nextErrors.message = `Message must be under ${MAX_MESSAGE_LEN} characters.`;
    }

    return nextErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    setSuccess('');
    const validationErrors = validate();
    setErrors(validationErrors);

    if (website) return;

    if (Object.keys(validationErrors).length > 0) return;

    if (isSubmitting) return; 
    setIsSubmitting(true);

    const payload = {
      user_id: user?.id ?? null,
      email: email.trim(),
      text: message.trim(),
    };

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(`${apiBase}/api/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!res.ok) {
        let msg = `Submit failed (HTTP ${res.status})`;
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
          if (data?.errors && typeof data.errors === 'object') {
            setErrors(prev => ({ ...prev, ...data.errors }));
          }
        } catch {
          /* ignore parse errors */
        }
        throw new Error(msg);
      }

      // Expect 201 Created (or 200 OK) – both fine
      setSuccess('Thanks! Your feedback has been submitted.');
      setMessage('');

    } catch (err) {
      if (err.name === 'AbortError') return; 
      setServerError(err.message || 'Network error while sending feedback.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={`feedback-form ${className}`}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="feedback-status"
    >
      <h2 className="feedback-form__title">Send us your feedback</h2>

      <div style={{ position: 'absolute', left: '-10000px', top: 'auto' }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="feedback-form__group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
          }}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          required
        />
        {errors.email && (
          <div id="email-error" className="feedback-form__error" role="alert">
            {errors.email}
          </div>
        )}
      </div>

      <div className="feedback-form__group">
        <label htmlFor="message">Your feedback</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell us what went well or what we can improve…"
          value={message}
          onChange={(e) => {
            const next = e.target.value;
            setMessage(next.length > MAX_MESSAGE_LEN ? next.slice(0, MAX_MESSAGE_LEN) : next);
            if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
          }}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          required
        />
        <div className="feedback-form__counter">
          {message.trim().length}/{MAX_MESSAGE_LEN}
        </div>
        {errors.message && (
          <div id="message-error" className="feedback-form__error" role="alert">
            {errors.message}
          </div>
        )}
      </div>

      <div className="feedback-form__actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Sending…' : 'Send feedback'}
        </button>
      </div>

      <div id="feedback-status" className="feedback-form__status" aria-live="polite">
        {success && <p className="feedback-form__success">{success}</p>}
        {serverError && <p className="feedback-form__error" role="alert">{serverError}</p>}
      </div>
    </form>
  );
}
