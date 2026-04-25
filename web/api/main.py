from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sys
import os

# Add the cli/src directory to sys.path to import hashprobe core
# This is a fallback in case it's not installed in the environment
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, "../../"))
cli_src = os.path.join(project_root, "cli/src")
sys.path.append(cli_src)

from hashprobe.core.detector import detect_hash

app = FastAPI(title="HashProbe API")

# Configure CORS for Next.js development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HashRequest(BaseModel):
    hash_value: str

@app.get("/")
async def root():
    return {"status": "online", "message": "HashProbe API is running"}

@app.post("/api/detect")
async def api_detect_hash(request: HashRequest):
    try:
        results = detect_hash(request.hash_value)
        return {"hash": request.hash_value, "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
