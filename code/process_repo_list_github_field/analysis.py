import pandas as pd
from collections import Counter

file_path = r'D:\programming\openrank\process_repo_list_github_field\repo_list_github_field.xlsx'  
df = pd.read_excel(file_path)

all_tags = ', '.join(df["field"]).split(', ') 
tag_counts = Counter(all_tags)

tag_df = pd.DataFrame(tag_counts.items(), columns=["Tag", "Count"])

tag_df_sorted = tag_df.sort_values(by="Count", ascending=False).reset_index(drop=True)

print(tag_df_sorted)

tags_with_repositories = []

for idx, row in df.iterrows():
    tags = row["field"].split(', ')  
    for tag in tags:
        tags_with_repositories.append((tag, row["repo_name"]))  

tags_repositories_df = pd.DataFrame(tags_with_repositories, columns=["Tag", "Repository"])

tags_repositories_sorted_df = tags_repositories_df.groupby("Tag").agg(
    {"Repository": lambda x: list(x)}).reset_index()

print(tags_repositories_sorted_df)


output_file_path = r'D:\programming\openrank\process_repo_list_github_field\tags_repositories_sorted.xlsx'  
with pd.ExcelWriter(output_file_path) as writer:
    tag_df_sorted.to_excel(writer, sheet_name="Tag Counts", index=False)
    tags_repositories_sorted_df.to_excel(writer, sheet_name="Tags with Repositories", index=False)

print(f"Output saved to {output_file_path}")
