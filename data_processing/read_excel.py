import pandas as pd
import json

try:
    file_path = r'C:\Users\yogesh\Downloads\Company List (ECE) (1).xlsx'
    xl = pd.ExcelFile(file_path)
    print("Sheets:", xl.sheet_names)
    
    # Try to find a sheet with "competition" in it
    sheet_name = None
    for name in xl.sheet_names:
        if 'competition' in name.lower() or 'ece' in name.lower():
            if 'competition' in name.lower():
                sheet_name = name
                break
            elif not sheet_name:
                sheet_name = name
            
    if sheet_name:
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        df = df.dropna(how='all')
        print(f"--- Data from sheet '{sheet_name}' ---")
        print(df.head(10).to_string())
        
        with open('competitions_data.json', 'w', encoding='utf-8') as f:
            f.write(df.to_json(orient='records'))
    else:
        print("Could not find a competition sheet.")
        
except Exception as e:
    print(f"Error: {e}")
