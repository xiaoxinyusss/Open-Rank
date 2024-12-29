import pandas as pd

def replace_tags(tag):
    target_tags = ["Cloud Native", "Artificial Intelligence", "Database", "Big Data"]
    for target_tag in target_tags:
        if target_tag.lower() in tag.lower():  # 将比较操作转换为小写，避免大小写敏感问题
            return target_tag
    return tag

def process_fields(input_file, output_file):
    # 读取原始数据
    df = pd.read_excel(input_file)
    
    # 打印列名检查列是否包含 'repo', 'field', 'id'
    print("列名: ", df.columns)

    # 存储处理后的数据
    processed_rows = []

    for _, row in df.iterrows():
        # 获取原始标签并按,分隔
        original_tags = row['field'].split(',')

        # 替换标签并去重
        processed_tags = set(replace_tags(tag.strip()) for tag in original_tags)

        # 为每个仓库和标签生成一条记录，包含 'id' 字段
        for tag in processed_tags:
            processed_rows.append({'id': row['id'], 'repo_name': row['repo_name'], 'field': tag})

    # 创建新的DataFrame并写入输出文件
    processed_df = pd.DataFrame(processed_rows)
    processed_df.to_excel(output_file, index=False)

# 使用该函数
input_file = 'data_field/repo_list_github_field.xlsx'
output_file = 'data_field/field_process.xlsx'
process_fields(input_file, output_file)
