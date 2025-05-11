from pymongo import MongoClient

# Use the MongoDB service defined in docker-compose
client = MongoClient("mongodb://mongodb:27017/")
db = client['vaccination_app']

students_col = db['students']
drives_col = db['drives']
