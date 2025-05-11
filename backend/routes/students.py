from flask import Blueprint, request, jsonify
from db import students_col
import csv, io

students_bp = Blueprint('students', __name__)

# Add a new student
@students_bp.route('/students', methods=['POST'])
def add_student():
    data = request.json
    students_col.insert_one(data)
    return jsonify({"message": "Student added successfully"})

# Bulk upload student details via CSV
@students_bp.route('/students/bulk', methods=['POST'])
def bulk_upload():
    file = request.files['file']
    stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
    reader = csv.DictReader(stream)
    students = list(reader)
    students_col.insert_many(students)
    return jsonify({"message": "Bulk upload successful"})

# List all students
@students_bp.route('/students', methods=['GET'])
def list_students():
    students = list(students_col.find())
    for s in students:
        s['_id'] = str(s['_id'])
    return jsonify(students)
