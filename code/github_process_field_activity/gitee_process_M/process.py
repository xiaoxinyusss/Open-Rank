import pandas as pd

def merge_excel_files(file1, file2, output_file):
    # 读取第一个 Excel 文件
    df1 = pd.read_excel(file1)
    # 读取第二个 Excel 文件
    df2 = pd.read_excel(file2)
    
    # 通过 'id' 字段将两个 DataFrame 进行合并，使用左连接
    merged_df = pd.merge(df1, df2[['id', '2023-12', '2024-01', '2024-02', '2024-03', '2024-04', '2024-05','2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11']], on='id', how='left')
    
    # 将合并后的 DataFrame 保存到新的 Excel 文件中
    merged_df.to_excel(output_file, index=False)
    print(f"合并后的文件已保存到: {output_file}")

# 调用
file1 = "repo_list_gitee_company.xlsx"
file2 = "repo_gitee_activity_M.xlsx"
output_file = 'field_activity_M.xlsx'
merge_excel_files(file1, file2, output_file)