from flask import Blueprint, jsonify
from db import students_col, drives_col
from datetime import datetime

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard', methods=['GET'])
def get_dashboard():
    # Get total number of students
    total = students_col.count_documents({})

    # Get number of vaccinated students
    vaccinated = students_col.count_documents({"vaccination_status": "Vaccinated"})

    # Get upcoming vaccination drives
    upcoming = list(drives_col.find({"date": {"$gte": datetime.now().strftime('%Y-%m-%d')}}))

    return jsonify({
        "total_students": total,
        "vaccinated_students": vaccinated,
        "upcoming_drives": [{"date": d["date"], "vaccines_available": d["vaccines_available"]} for d in upcoming]
    })
