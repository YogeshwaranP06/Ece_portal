import pandas as pd
import json

file_path = r"C:\Users\yogesh\Downloads\ECE - Company List for Skill Set and Campus Drive_2027 Batch.xlsx"
try:
    df = pd.read_excel(file_path, sheet_name='ECE', header=3)
    
    # Clean up empty rows
    df = df.dropna(subset=['Company Name'])
    
    domain_skills = {}
    
    # Skills start from column 'C / C++' onwards. Let's find its index.
    cols = df.columns.tolist()
    start_idx = cols.index('C / C++')
    
    skill_cols = cols[start_idx:]
    
    for index, row in df.iterrows():
        domain = row['Domain']
        if pd.isna(domain):
            continue
        domain = str(domain).strip()
        
        if domain not in domain_skills:
            domain_skills[domain] = set()
            
        for skill in skill_cols:
            val = row[skill]
            if val == True or str(val).strip().lower() in ['true', 'yes', 'y', '1']:
                # Clean up skill name (sometimes has newlines or multiple spaces)
                clean_skill = str(skill).replace('\n', ' ').strip()
                domain_skills[domain].add(clean_skill)
                
    # Convert sets to sorted lists for output
    for domain in domain_skills:
        domain_skills[domain] = sorted(list(domain_skills[domain]))
        
    with open('domain_skills.json', 'w') as f:
        json.dump(domain_skills, f, indent=4)
        
    print("Successfully extracted domain skills to domain_skills.json")
except Exception as e:
    print(f"Error: {e}")
