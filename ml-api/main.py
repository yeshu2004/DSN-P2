from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your Next.js app
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load the trained model
model = tf.keras.models.load_model('best_model2.keras')

# Preprocess the image
def preprocess_image(image: Image.Image) -> np.ndarray:
    img = image.resize((224, 224))  # Match IMG_SIZE from your ML code
    img_array = np.array(img)
    img_array = tf.keras.applications.efficientnet.preprocess_input(img_array)  # Use EfficientNet preprocessingS
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# API endpoint to classify an image
@app.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    try:
        # Read the image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Preprocess the image
        processed_image = preprocess_image(image)

        # Make prediction
        prediction = model.predict(processed_image)
        probability = prediction[0][0]
        print(f"Raw Prediction: {probability}")  # Debug log

        # Determine result
        result = {
            "prediction": "Real" if probability > 0.5 else "AI-Generated",
            "confidence": f"{probability * 100:.1f}%" if probability > 0.5 else f"{(1 - probability) * 100:.1f}%"
        }

        return {"status": "success", "result": result}
    except Exception as e:
        print(f"Error: {e}")  # Debug log
        return {"status": "error", "message": str(e)}

# Run the API
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)