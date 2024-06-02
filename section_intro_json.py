import json

# Read JSON data from a file
with open('sectionintro.json', 'r') as file:
    data = json.load(file)

# Update the content field
for entry in data:
    entry["Content"] = f"<h1>{entry['Section']}</h1> <p>Random Text</p>"

# Write updated JSON data to a new file
with open('sectionintro.json', 'w') as file:
    json.dump(data, file, indent=4)
