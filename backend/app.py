from flask import Flask
from flask_cors import CORS
from routes.dashboard import dashboard_bp
from routes.students import students_bp
from routes.reports import reports_bp
from routes.drives import drives_bp

app = Flask(__name__)
CORS(app)

# Register blueprints for different routes
app.register_blueprint(dashboard_bp, url_prefix='/api')
app.register_blueprint(students_bp, url_prefix='/api')
app.register_blueprint(reports_bp, url_prefix='/api')
app.register_blueprint(drives_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

