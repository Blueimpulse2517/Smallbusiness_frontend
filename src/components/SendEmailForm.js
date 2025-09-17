import React, { useState } from 'react';

export default function SendEmailForm() {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    text: '',
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();
      alert(result.message || 'Email sent!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="to" placeholder="Recipient Email" onChange={handleChange} />
      <input name="subject" placeholder="Subject" onChange={handleChange} />
      <textarea name="text" placeholder="Message" onChange={handleChange} />
      <button type="submit">Send Email</button>
    </form>
  );
}