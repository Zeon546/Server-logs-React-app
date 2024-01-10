import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const AccessLogFormat = () => {
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [logs, setLogs] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const makeQuery = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/access-logs/?start_time=${startDateTime}&end_time=${endDateTime}`);
      setLogs(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching access logs:', error);
      setError('Error fetching access logs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Access Log Query</h2>
      <div>
        <label>Start Time:</label>
        <input type="datetime-local" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)}/>
      </div>
      <div>
        <label>End Time:</label>
        <input type="datetime-local" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)}/>
      </div>
      <button onClick={makeQuery}>Access logs</button>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
        <div>
          <h3>Access Logs:</h3>
          <pre>{JSON.stringify(logs, null, 2)}</pre>
        </div>
    </div>
  );
};

export default AccessLogFormat;
