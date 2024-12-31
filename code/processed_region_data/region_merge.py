import pandas as pd
import re
from collections import Counter

# 读取 Excel 文件中的数据
file_path = r"D:\course2024\openrank\code\region\region_counts_C.xlsx"
df = pd.read_excel(file_path)

# 假设数据在第一列为“项”，第二列为“出现次数”，根据实际情况调整列名
# 你可以查看一下实际的列名（例如：print(df.columns)）来确认
# 假设列名为“项”和“出现次数”
if '项' not in df.columns or '出现次数' not in df.columns:
    print("列名不匹配，请检查列名")
    exit()

# 步骤 1: 标准化数据，忽略大小写，去掉"China"，去掉标点符号
normalized_data = []

for _, row in df.iterrows():
    location = row['项']
    
    # 如果项的值是 NaN 或非字符串类型，跳过
    if not isinstance(location, str):
        continue
    
    count = row['出现次数']
    
    # 转小写，去掉"China"和标点符号，清除多余的空格
    normalized_location = re.sub(r'[^\w\s,]', '', location.strip().lower())  # 清除标点符号并转小写
    normalized_location = normalized_location.replace('china', '').strip()  # 移除 "china"
    
    normalized_data.append((normalized_location, count))

# 步骤 2: 统计去重后的地址出现次数
counter = Counter()

for location, count in normalized_data:
    counter[location] += count

# 步骤 3: 将统计结果转换为 DataFrame
result_df = pd.DataFrame(counter.items(), columns=["项", "出现次数"])

# 步骤 4: 输出到新的 Excel 文件
output_path = r"D:\course2024\openrank\code\region\processed_region_merge_C.xlsx"
result_df.to_excel(output_path, index=False)

print(f"处理结果已输出到 '{output_path}'")
