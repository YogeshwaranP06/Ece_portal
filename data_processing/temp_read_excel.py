import pandas as pd

file_path = r"C:\Users\yogesh\Downloads\ECE - Company List for Skill Set and Campus Drive_2027 Batch.xlsx"
try:
    df = pd.read_excel(file_path, sheet_name='ECE', header=None)
    for i in range(5):
        print(f"Row {i}:", df.iloc[i].tolist())
except Exception as e:
    print(f"Error: {e}")
