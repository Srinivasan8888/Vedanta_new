import requests
from datetime import datetime
import random
import statistics
import time

BASE_URL = 'http://15.207.173.73:4000/api/v1'

def create_sensor(data):
    url = f"{BASE_URL}/avgTemp"
    # Using query parameters to match the controller's req.query
    params = {
        'id': data['id'],
        'Avgtemp': data['Avgtemp'],      # Matches the controller's 'Avg' field
        'time': data['time']     # Matches the controller's 'time' field
    }
    print(f"Data being sent: {params}")
    response = requests.post(url, params=params)  # Using params instead of json
    print(f"Request URL: {url}, Status Code: {response.status_code}, Response: {response.text}")
    return response.json()

def generate_sensor_data():
    # Generate temperature values for all sensors (1-108)
    temperatures = [random.uniform(230.0, 250.0) for _ in range(1, 109)]
    
    # Calculate average temperature
    avg_temperature = statistics.mean(temperatures)
    
    data = {
        'id': '1604',  # Static ID as requested
        'Avgtemp': f'{avg_temperature:.2f}',  # Average temperature
        'time': datetime.now().isoformat() + 'Z'  # Current time in ISO 8601 format
    }
    return data

# Main execution
if __name__ == "__main__":
    while True:
        data = generate_sensor_data()
        result = create_sensor(data)
        print(f"Response: {result}")
        time.sleep(1)  # Sleep for 1 second before the next iteration