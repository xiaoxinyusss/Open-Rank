import pandas as pd

def merge_excel_files(file1, file2, output_file):
    # 读取第一个 Excel 文件
    df1 = pd.read_excel(file1)
    # 读取第二个 Excel 文件
    df2 = pd.read_excel(file2)
    
    # 通过 'id' 字段将两个 DataFrame 进行合并，使用左连接
    merged_df = pd.merge(df1, df2[['id', '2022Q3', '2022Q4', '2023Q1', '2023Q2', '2023Q3', '2023Q4', '2024Q1', '2024Q2', '2024Q3']], on='id', how='left')
    
    # 将合并后的 DataFrame 保存到新的 Excel 文件中
    merged_df.to_excel(output_file, index=False)
    print(f"合并后的文件已保存到: {output_file}")

# 调用
file1 = 'data_field/repo_list_gitee_company.xlsx'
file2 = 'data_field/repo_gitee_openrank_Q.xlsx'
output_file = 'data_field/field_add_Q_2.xlsx'
merge_excel_files(file1, file2, output_file)


