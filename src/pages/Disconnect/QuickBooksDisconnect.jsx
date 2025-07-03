import React from 'react';

const QuickBooksDisconnect = () => {
  return (
    <div style={styles.container}>
      <img
        src="/quickbooks-logo.png"
        alt="QuickBooks"
        style={styles.logo}
      />
      <h1 style={styles.heading}>Disconnected from QuickBooks</h1>
      <p style={styles.message}>
        Your account has been successfully disconnected from QuickBooks.
      </p>
      <p style={styles.subMessage}>
        You can reconnect anytime from your account settings.
      </p>
      <a href="/" style={styles.button}>Go to Dashboard</a>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f6f7f8',
    minHeight: '100vh',
  },
  logo: {
    width: '120px',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '28px',
    color: '#2e7d32',
  },
  message: {
    fontSize: '16px',
    marginTop: '20px',
    color: '#333',
  },
  subMessage: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '40px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#2e7d32',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
  },
};

export default QuickBooksDisconnect;