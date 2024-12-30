import pandas as pd

# 读取第一个 Excel 文件
field_file = r"D:\course2024\openrank\code\github_process_M\field_process_openrank.xlsx"
df_field = pd.read_excel(field_file)

# 读取第二个 Excel 文件
activity_file = r"D:\course2024\openrank\code\github_process_M\repo_github_activity_M.xlsx"

# 确保路径正确，且文件存在
try:
    df_activity = pd.read_excel(activity_file)
except FileNotFoundError:
    print(f"文件 {activity_file} 未找到，请检查路径是否正确。")
    exit()

# 合并两个数据框，按照 id 和 repo_name 进行合并
df_merged = pd.merge(df_field, df_activity, on=["id", "repo_name"], how="inner")

# 选择需要的列，并重新排序，保留所有月份列
month_columns = [col for col in df_merged.columns if col not in ["id", "platform", "repo_name", "field"]]

# 将所有的月份列与需要的其他列一起选择
df_merged = df_merged[["id", "platform", "repo_name", "field"] + month_columns]

# 输出结果到一个新的 Excel 文件
output_file = r"D:\course2024\openrank\code\github_process_M\merged_data.xlsx"
df_merged.to_excel(output_file, index=False)

print(f"合并后的文件已保存至 {output_file}")
