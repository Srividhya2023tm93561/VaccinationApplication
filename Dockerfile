# Use official Python image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files into the container
COPY . /app/

# Expose port 5000 for Flask
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
