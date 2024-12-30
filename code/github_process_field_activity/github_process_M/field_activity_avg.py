import pandas as pd
import numpy as np

# 读取 Excel 文件
df = pd.read_excel('merged_data.xlsx')

# 去除包含 0 的行
df = df[(df!= 0).all(axis=1)]

# 筛选出 field 为 Database、Artificial Intelligence 和 Cloud Native 的数据
filtered_df = df[df['field'].isin(['Database', 'Artificial Intelligence', 'Cloud Native'])]

# 定义要处理的列名，范围从 2020Q4 到 2024Q3
columns_to_check = [f'{year}Q{quarter}' for year in range(2020, 2025) for quarter in range(1, 5) 
                  if (year == 2020 and quarter >= 4) or (year > 2020 and year < 2024) or (year == 2024 and quarter <= 3)]

# 按照 field 字段进行分组
grouped_df = filtered_df.groupby('field')

grouped_mean = grouped_df[columns_to_check].mean().round(2)
print(grouped_mean)