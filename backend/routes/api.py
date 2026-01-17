from flask import Blueprint, request, jsonify
from services.nlp_service import extract_entities
from datetime import datetime

api_bp = Blueprint('api', __name__)

# Mock database
patients_db = {} 

@api_bp.route('/upload', methods=['POST'])
def upload_record():
    data = request.json
    text = data.get('text', '')
    patient_id = data.get('patientId', 'default')
    
    if not text:
        return jsonify({"error": "No text provided"}), 400

    extraction_result = extract_entities(text)
    
    # Simple logic to create distinct events from entities for the timeline
    # In a real app, we'd parse dates and match entities to dates.
    # Here we just timestamp the upload.
    
    record_event = {
        "id": len(patients_db.get(patient_id, [])) + 1,
        "date": datetime.now().isoformat(),
        "type": "Upload",
        "description": "Uploaded Medical Record",
        "extracted_entities": extraction_result.get('entities', []),
        "raw_text": text
    }
    
    if patient_id not in patients_db:
        patients_db[patient_id] = []
    
    patients_db[patient_id].append(record_event)
    
    return jsonify({"message": "Processed successfully", "data": record_event})

@api_bp.route('/patients/<patient_id>/timeline', methods=['GET'])
def get_timeline(patient_id):
    events = patients_db.get(patient_id, [])
    # Sort by date (descending)
    sorted_events = sorted(events, key=lambda x: x['date'], reverse=True)
    return jsonify(sorted_events)

@api_bp.route('/patients/<patient_id>/report', methods=['GET'])
def get_report(patient_id):
    events = patients_db.get(patient_id, [])
    # Generate a simple text summary
    report_lines = [f"Patient Report for {patient_id}", "="*30]
    for event in events:
        report_lines.append(f"Date: {event['date']}")
        report_lines.append(f"Type: {event['type']}")
        report_lines.append("Entities Found:")
        for ent in event['extracted_entities']:
            report_lines.append(f"  - {ent['text']} ({ent['label']})")
        report_lines.append("-" * 20)
        
    return jsonify({"report": "\n".join(report_lines)})
