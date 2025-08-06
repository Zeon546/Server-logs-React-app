# Server Logs Viewer

A simple full-stack web application to query and view Apache access log entries filtered by date and time. Built with **FastAPI** (Python) as the backend and **React** as the frontend.

---

## Features

- Query Apache access logs within a user-specified start and end datetime range
- Minimal and clean React frontend user interface
- FastAPI backend with CORS enabled for seamless frontend-backend communication during development
- Returns matching log entries in JSON format
- Error handling for invalid date formats and missing log files

---

## Project Structure

```
server-logs-viewer/
├── backend/
│   └── main.py          # FastAPI backend API
├── frontend/
│   └── App.js           # Main React component
│   └── App.css          # CSS styles
└── README.md
```

---

## Prerequisites

- Python 3.8 or higher
- Node.js (v14+) and npm or yarn
- Apache server with access logs typically found at `/var/log/apache2/access.log`  
  *(Adjust log path in `main.py` if different)*

---

## Setup and Run Instructions

### 1. Backend (FastAPI)

**Install dependencies:**

```bash
pip install fastapi uvicorn python-dateutil
```

**Run the backend API:**

```bash
uvicorn main:app --reload
```

- The backend server will start on: `http://127.0.0.1:8000`
- Make sure the user running the backend has read permissions for the Apache log file

---

### 2. Frontend (React)

**Install dependencies:**

```bash
npm install axios
```
or
```bash
yarn add axios
```

**Start the React app:**

```bash
npm start
```

- The frontend runs on: `http://localhost:3000` by default

---

## Usage

1. Open the React frontend in your browser at `http://localhost:3000`
2. Enter the **start date/time** and **end date/time** in the form fields (ISO format: YYYY-MM-DDTHH:MM:SS)
3. Click the **Get Logs** button
4. Matching Apache log entries within the specified time range will be displayed in JSON format

---

## API Endpoints

### GET /access-logs/

Query Apache access logs within a specified date/time range.

**Parameters:**
- `start_time` (required): Start datetime in ISO format (e.g., "2025-08-06T00:00:00")
- `end_time` (required): End datetime in ISO format (e.g., "2025-08-06T12:00:00")

**Example Request:**

```http
GET /access-logs/?start_time=2025-08-06T00:00:00&end_time=2025-08-06T12:00:00
```

**Sample JSON Response:**

```json
{
  "log_entries": [
    "127.0.0.1 - - [06/Aug/2025:08:30:25 +0000] \"GET /index.html HTTP/1.1\" 200 2326 \"-\" \"Mozilla/5.0...\"",
    "192.168.1.100 - - [06/Aug/2025:09:15:42 +0000] \"POST /api/data HTTP/1.1\" 201 543 \"-\" \"curl/7.68.0\""
  ]
}
```

**Error Responses:**
- `400 Bad Request`: Invalid datetime format or missing parameters
- `404 Not Found`: Log file not found or no entries in the specified time range

---

## Technical Details

### Backend (main.py)
- Built with FastAPI framework
- Uses `python-dateutil` for flexible datetime parsing
- Reads Apache access logs from `/var/log/apache2/access.log`
- Expects Apache log timestamp format: `%d/%b/%Y:%H:%M:%S`
- CORS middleware enabled for cross-origin requests

### Frontend (App.js)
- React functional component with hooks
- Uses Axios for HTTP requests
- State management for datetime inputs, logs, errors, and loading status
- Displays results in formatted JSON

---

## Notes

- The backend expects Apache log timestamps in the format `%d/%b/%Y:%H:%M:%S` (e.g., `06/Aug/2025:08:30:25`)
- CORS is currently configured to allow all origins - restrict this for production use
- Update the log file path in `main.py` if your Apache logs are stored elsewhere
- Ensure the backend process has read permissions for the Apache log file
- The application assumes standard Apache Combined Log Format

---

## Potential Improvements

- Add log parsing for different Apache log formats
- Implement pagination for large result sets
- Add log entry filtering by IP, status code, or request type
- Enhance frontend UI with better date/time pickers
- Add authentication and authorization
- Implement log file rotation handling

---

## License

MIT License

---
