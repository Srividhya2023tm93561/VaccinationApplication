# Step 1: Use the official Python image
FROM python:3.9-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the requirements file to the container
COPY requirements.txt /app/

# Step 4: Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of the application code to the container
COPY . /app/

# Step 6: Expose port 5000 for the Flask application
EXPOSE 5000

# Step 7: Command to run the Flask app
CMD ["python", "app.py"]
