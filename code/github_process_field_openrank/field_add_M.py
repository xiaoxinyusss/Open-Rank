import pandas as pd
import os


def merge_excel_files(file1, file2, output_file):
    # 读取第一个 Excel 文件
    df1 = pd.read_excel(file1)
    # 读取第二个 Excel 文件
    df2 = pd.read_excel(file2)
    
    # 通过 'id' 字段将两个 DataFrame 进行合并，使用左连接
    merged_df = pd.merge(df1, df2[['id', 'month_records']], on='id', how='left')
    
    # 将合并后的 DataFrame 保存到新的 Excel 文件中
    merged_df.to_excel(output_file, index=False)
    print(f"合并后的文件已保存到: {output_file}")


# 示例调用
file1 = 'data_field/field_process.xlsx'
file2 = 'data_field/repo_github_openrank_M2.xlsx'
output_file = 'data_field/field_add.xlsx'


# 确保目录存在
if not os.path.exists('data_field'):
    os.makedirs('data_field')


merge_excel_files(file1, file2, output_file)