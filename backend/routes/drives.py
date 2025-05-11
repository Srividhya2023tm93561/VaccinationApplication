from flask import Blueprint, request, jsonify
from db import drives_col
from bson.objectid import ObjectId

drives_bp = Blueprint('drives', __name__)

# Create a new vaccination drive
@drives_bp.route('/drives', methods=['POST'])
def create_drive():
    data = request.json
    data['status'] = 'Pending'
    drives_col.insert_one(data)
    return jsonify({"message": "Drive created successfully"})

# Get list of all drives
@drives_bp.route('/drives', methods=['GET'])
def get_drives():
    drives = list(drives_col.find())
    for d in drives:
        d['_id'] = str(d['_id'])
    return jsonify(drives)

# Update details of a vaccination drive
@drives_bp.route('/drives/<id>', methods=['PUT'])
def update_drive(id):
    data = request.json
    drive = drives_col.find_one({"_id": ObjectId(id)})
    if drive["status"] == "Completed":
        return jsonify({"error": "Cannot edit completed drive"}), 403
    drives_col.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"message": "Drive updated successfully"})
