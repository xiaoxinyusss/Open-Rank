import pandas as pd
from collections import Counter


def replace_tags(tag):
    target_tags = ["Cloud Native", "Artificial Intelligence", "Database", "Big Data"]
    for target_tag in target_tags:
        if target_tag.lower() in tag.lower():  # 将比较操作转换为小写，避免大小写敏感问题
            return target_tag
    return tag



df = pd.read_excel("repo_list_github_field.xlsx")


def process_tags(row):
    all_tags = row["field"].split(', ')
    processed_tags = [replace_tags(tag.strip()) for tag in all_tags]
    return ', '.join(processed_tags)


df["field"] = df.apply(process_tags, axis=1)


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

# 使用相对路径保存文件
output_file_path = '/data_field/tags_repositories_statistics.xlsx'
with pd.ExcelWriter(output_file_path) as writer:
    tag_df_sorted.to_excel(writer, sheet_name="Tag Counts", index=False)
    tags_repositories_sorted_df.to_excel(writer, sheet_name="Tags with Repositories", index=False)


print(f"Output saved to {output_file_path}")