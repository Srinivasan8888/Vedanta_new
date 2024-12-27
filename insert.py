import requests
from datetime import datetime, timezone

# Base URL for the API
BASE_URL = 'http://localhost:4000/api/v1'  # Replace with your actual API URL

# Function to create a sensor
def create_sensor(sensor_number, data):
    url = f"{BASE_URL}/createSensor{sensor_number}"
    print(f"Data being sent: {data}")  # Added logging
    response = requests.post(url, params=data)
    print(f"Request URL: {url}, Status Code: {response.status_code}, Response: {response.text}")  # Added logging
    return response.json()

# Function to generate sensor data
def generate_sensor_data(sensor_id, start_sensor, end_sensor):
    # Generate temperature values and include current time
    data = {
        'id':'1604',
        'busbar': f'bb{sensor_id}',
        'time': datetime.now(timezone.ist).isoformat() + 'Z'  # Current UTC time in ISO 8601 format
    }
    # Dynamically add temperature data for sensors
    for i in range(start_sensor, end_sensor + 1):
        data[f'sensor{i}'] = f'{i * 1.5:.2f}'  # Example temperature value (can be customized)
    return data

# Insert data for each sensor
sensor_ranges = {
    1: (1, 14),
    2: (15, 20),
    3: (21, 28),
    4: (29, 32),
    5: (33, 38),
    6: (39, 54),
    7: (55, 74),
    8: (75, 82),
    9: (83, 90),
    10: (91, 108),
}

for sensor_id, (start, end) in sensor_ranges.items():
    data = generate_sensor_data(sensor_id, start, end)
    result = create_sensor(sensor_id, data)
    print(f"Sensor {sensor_id} response: {result}")