import pandas as pd
import json
import sys

file_path = r"C:\Users\yogesh\Downloads\Company List (ECE) (1).xlsx"
try:
    df = pd.read_excel(file_path, sheet_name='Faculty skill')
    # Print columns
    print("Columns:", df.columns.tolist())
    
    # Dump to json
    df = df.fillna("")
    records = df.to_dict(orient='records')
    
    with open('faculty_data.json', 'w', encoding='utf-8') as f:
        json.dump(records, f, indent=2, ensure_ascii=False)
        
    print(f"Exported {len(records)} records to faculty_data.json")
    print("First record:", records[0] if records else "None")
except Exception as e:
    print(f"Error: {e}")
