from fastapi import FastAPI, HTTPException, File
from datetime import datetime,timedelta
from dateutil import parser
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/access-logs/")
def get_logs(start_time: str, end_time: str):
    try:
        stime = parser.parse(start_time)
        etime = parser.parse(end_time)
    except parser.ParserError as e:
        raise HTTPException(status_code=400, detail=f"Invalid datetime format: {str(e)}") 

    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid datetime format")
    if not start_time or not end_time:
        raise HTTPException(status_code=400, detail="Both start_time and end_time are required")

    log_entries = []
    log_path = '/var/log/apache2/access.log'
    try:
        with open(log_path, 'r') as file:
            for line in file:
                timestamp_str = line.split(' ')[3][1:]
                log_timestamp = datetime.strptime(timestamp_str, '%d/%b/%Y:%H:%M:%S')

                if stime <= log_timestamp <= etime:
                    log_entries.append(line)
    except FileNotFoundError:
            raise HTTPException(status_code=404, detail="Log file not found")
    if not log_entries:
        raise HTTPException(status_code=404,detail="Log file not found")
    return {"log_entries":log_entries}
