import pandas as pd
import matplotlib.pyplot as plt

file_path = r'D:\programming\openrank\process_repo_list_github_field\tags_repositories_sorted.xlsx'  
df_tag_counts = pd.read_excel(file_path, sheet_name="Tag Counts")

df_filtered = df_tag_counts[df_tag_counts["Count"] > 50]

tags = df_filtered["Tag"]
counts = df_filtered["Count"]

plt.figure(figsize=(14, 8)) 
bars = plt.bar(tags, counts, color='skyblue')

for bar in bars:
    yval = bar.get_height()
    plt.text(bar.get_x() + bar.get_width() / 2, yval + 10,  
             round(yval, 0), ha='center', va='bottom', fontsize=12)

new_labels = []
for tag in tags:
    new_tag = tag.replace('-', '\n') 
    new_labels.append(new_tag)

plt.xticks(ticks=range(len(tags)), labels=new_labels, rotation=45, ha='right', fontsize=10)

plt.title("Tag Counts > 50", fontsize=16)
plt.xlabel("Tag", fontsize=14)
plt.ylabel("Count", fontsize=14)

plt.tight_layout()

plt.show()
