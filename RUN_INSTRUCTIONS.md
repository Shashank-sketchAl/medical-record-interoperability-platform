# How to Run the Medical Record Interoperability Platform

This project consists of two parts: a **Python Flask Backend** and a **React Frontend**. You need to run both simultaneously effectively.

## Prerequisites
- **Python 3.8+**
- **Node.js** and **npm**

## Step 1: Start the Backend (API)
The backend handles the data processing and NLP.

1. Open a terminal/command prompt.
2. Navigate to the backend directory:
   ```powershell
   cd backend
   ```
3. (Optional but recommended) Create and activate a virtual environment:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate
   ```
4. Install dependencies (if you haven't already):
   ```powershell
   pip install -r requirements.txt
   ```
   *Note: If you have trouble installing scispacy, you may need to install the build tools for Visual Studio.*
5. Run the server:
   ```powershell
   python app.py
   ```
   You should see: `Running on http://127.0.0.1:5000`

## Step 2: Start the Frontend (Website)
The frontend is the user interface you interact with.

1. Open a **new** terminal window (keep the backend running).
2. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Start the development server:
   ```powershell
   npm run dev
   ```
5. Open your browser and go to the link shown (usually `http://localhost:5173`).

## Using the App
1. You will see the Dashboard.
2. Use the "Upload Medical Record" form to paste text like:
   > Patient John Doe. Diagnosed with Type 2 Diabetes on 2024-01-15. Prescribed Metformin.
3. Click **Process Record**.
4. The timeline on the right will update with the extracted events.
