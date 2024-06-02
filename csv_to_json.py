import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    # Read CSV file and convert it to a list of dictionaries
    with open(csv_file_path, 'r', encoding='utf-8-sig') as csv_file:  # Specify 'utf-8-sig' encoding to handle BOM
        csv_reader = csv.DictReader(csv_file)
        data = list(csv_reader)

    # Write the data to a JSON file
    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Example usage:
csv_file_path = 'Enactive Annotations.csv'
json_file_path = 'annotation_data.json'
csv_to_json(csv_file_path, json_file_path)
