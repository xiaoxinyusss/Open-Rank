import pandas as pd

# 读取 Excel 文件
file_path = r'D:\course2024\openrank\code\region\processed_region_merge_C.xlsx'
df = pd.read_excel(file_path)

# 合并相同地区的出现次数
df_merged = df.groupby('地区', as_index=False)['出现次数'].sum()

# 按“出现次数”列降序排序
df_merged_sorted = df_merged.sort_values(by='出现次数', ascending=False)

# 保存排序后的数据到原文件路径
df_merged_sorted.to_excel(file_path, index=False)

print(f"数据已合并并降序排列并保存到 {file_path}")
