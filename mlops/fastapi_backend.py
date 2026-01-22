
import os
import time
import base64
import cv2
import numpy as np
import mlflow
import mlflow.keras
from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI(title="Freshness Inference Service")

# MLflow configuration
MLFLOW_TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000")
mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)

# Load production models
def load_model(model_name: str):
    try:
        model_uri = f"models:/{model_name}/Production"
        return mlflow.keras.load_model(model_uri)
    except Exception as e:
        print(f"Error loading model {model_name}: {e}")
        return None

detector = load_model("fruit-detector")
classifier = load_model("freshness-classifier")
regressor = load_model("shelf-life-regressor")

class InferenceResult(BaseModel):
    label: str
    freshness: str
    days_remaining: float
    confidence: float
    bbox: List[float]
    latency_ms: float

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": time.time()}

@app.post("/predict", response_model=List[InferenceResult])
async def predict(file: UploadFile = File(...)):
    start_time = time.time()
    contents = await file.read()
    nparr = np.fromstring(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image")

    # 1. Detection Step (Placeholder for YOLO logic)
    # detections = detector.predict(img) 
    detections = [{"box": [10, 10, 100, 100], "class": "Apple", "score": 0.98}]

    results = []
    for det in detections:
        # Crop fruit for classification
        x, y, w, h = det["box"]
        crop = img[y:y+h, x:x+w]
        
        # 2. Freshness Classification
        # fresh_label = classifier.predict(crop)
        fresh_label = "Fresh"
        
        # 3. Shelf-life Regression
        # days = regressor.predict(crop)
        days = 5.4

        results.append(InferenceResult(
            label=det["class"],
            freshness=fresh_label,
            days_remaining=days,
            confidence=det["score"],
            bbox=det["box"],
            latency_ms=(time.time() - start_time) * 1000
        ))

    return results

@app.get("/model/metadata")
async def get_metadata():
    return {
        "detector_version": "v1.4",
        "classifier_version": "v2.1",
        "regressor_version": "v1.1",
        "env": "production"
    }
