import pandas as pd

# 从 Excel 文件读取数据（注意：这里你写的是 CSV 文件，但注释说是 Excel 文件，我按照 CSV 处理）
repo_data = pd.read_csv("user_data_with_locations_async.csv")

# 删除 region 列中为空白的数据条（注意：列名应该是 'location'，而不是 'region'）
repo_data_cleaned = repo_data.dropna(subset=['location'])

# 对每个地区的数据条目数进行汇总
region_counts = repo_data_cleaned.groupby('location').size().reset_index(name='counts')

# 将结果保存为 Excel 文件
region_counts.to_csv("user_region_counts.csv", index=False)
