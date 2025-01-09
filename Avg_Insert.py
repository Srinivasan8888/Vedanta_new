import requests
from datetime import datetime
import random
import statistics

BASE_URL = 'http://15.207.173.73:4000/api/v1'

def create_sensor(data):
    url = f"{BASE_URL}/avgTemp"  # Assuming this is the endpoint for AverageModel
    print(f"Data being sent: {data}")
    response = requests.post(url, params=data)
    print(f"Request URL: {url}, Status Code: {response.status_code}, Response: {response.text}")
    return response.json()

def generate_sensor_data(sensor_id, start_sensor, end_sensor):
    # Generate temperature values for sensors
    temperatures = [random.uniform(230.0, 250.0) for _ in range(start_sensor, end_sensor + 1)]
    
    # Calculate average temperature
    avg_temperature = statistics.mean(temperatures)
    
    data = {
        'id': f'bb{sensor_id}',  # Using busbar ID as the identifier
        'Avg': f'{avg_temperature:.2f}',  # Average temperature
        'time': datetime.now().isoformat() + 'Z'  # Current time in ISO 8601 format
    }
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
    result = create_sensor(data)
    print(f"Busbar {sensor_id} response: {result}")