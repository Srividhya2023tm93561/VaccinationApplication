from flask import Blueprint, request, jsonify, send_file
from db import students_col
import pandas as pd
import io

reports_bp = Blueprint('reports', __name__)

# Get a list of students with vaccination details, filterable by vaccine
@reports_bp.route('/reports', methods=['GET'])
def get_reports():
    filter_vaccine = request.args.get('filter')
    query = {"vaccine_name": filter_vaccine} if filter_vaccine else {}
    data = list(students_col.find(query))
    for s in data:
        s['_id'] = str(s['_id'])
    return jsonify(data)

# Export the report in different formats
@reports_bp.route('/reports/export', methods=['GET'])
def export_report():
    export_format = request.args.get('format')
    data = list(students_col.find())
    df = pd.DataFrame(data)
    df.drop(columns=['_id'], inplace=True)

    if export_format == 'csv':
        output = io.StringIO()
        df.to_csv(output, index=False)
        output.seek(0)
        return send_file(io.BytesIO(output.read().encode()), mimetype='text/csv', download_name='report.csv')

    if export_format == 'pdf':
        return jsonify({"message": "PDF export not implemented in demo"})

    return jsonify({"message": "Unsupported format"})
