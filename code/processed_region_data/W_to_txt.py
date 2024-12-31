import pandas as pd

# 读取 CSV 文件，使用原始字符串以避免转义字符问题
df = pd.read_csv(r"D:/course2024/openrank/code/processed_region_data/aggregated_country_counts.csv")

# 将 DataFrame 转换为 JavaScript 格式
data_js_format = "data: [\n"
for index, row in df.iterrows():
    country = row['country']
    total_counts = row['total_counts']
    data_js_format += f'    {{ name: "{country}", value: {total_counts} }},\n'
    
# 去掉最后的逗号和换行符
data_js_format = data_js_format.rstrip(',\n') + '\n'
data_js_format += "]"

# 将结果写入文件，确保路径格式正确
with open(r"D:/course2024/openrank/code/processed_region_data/aggregated_country_counts.txt", "w", encoding="utf-8") as f:
    f.write(data_js_format)

print("文件已生成：aggregated_country_counts.txt")
