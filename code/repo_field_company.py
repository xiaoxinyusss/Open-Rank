import aiohttp
import asyncio
import pandas as pd

'''
# 异步获取贡献者信息的函数
async def get_contributors(repo_name, session):
    url_repo_contributors = f"https://oss.open-digger.cn/github/{repo_name}/meta.json"
    try:
        async with session.get(url_repo_contributors) as response:
            response.raise_for_status()
            contributors_data = await response.json()
            # 从返回的数据中提取技术类别标签
            tech_labels = []
            for label in contributors_data.get('labels', []):
                # 检查 type 是否存在且不是 None
                if label.get('type') and label['type'].startswith('Tech'):
                    tech_labels.append(label['name'])
            return tech_labels
    except Exception as e:
        print(f"Error fetching data for {repo_name}: {e}")
        return []

# 异步主函数，处理多个仓库
async def fetch_tech_labels(repo_names):
    async with aiohttp.ClientSession() as session:
        tasks = []
        for repo_name in repo_names:
            tasks.append(get_contributors(repo_name, session))
        results = await asyncio.gather(*tasks)  # 并发获取所有仓库的技术标签
        return results

# 读取 Excel 文件
repo_data = pd.read_excel("data/repo_list_github.xlsx")

# 获取所有仓库的名称列表
repo_names = repo_data['repo_name'].tolist()

# 使用异步方式获取所有技术类别标签
tech_labels_list = asyncio.run(fetch_tech_labels(repo_names))

# 将技术类别标签合并成字符串并添加为新的字段 'field'
tech_categories = [', '.join(labels) for labels in tech_labels_list]
repo_data['field'] = tech_categories

# 保存为 CSV 文件
repo_data.to_csv("repo_data_with_tech_labels.csv", index=False)

print("数据已成功保存为 repo_data_with_tech_labels.csv")
'''


# 异步获取公司信息的函数
async def get_contributors(repo_name, session):
    url_repo_contributors = f"https://oss.open-digger.cn/gitee/{repo_name}/meta.json"
    try:
        async with session.get(url_repo_contributors) as response:
            response.raise_for_status()
            contributors_data = await response.json()
            # 从返回的数据中提取公司标签
            company_labels = []
            for label in contributors_data.get('labels', []):
                # 检查 label 类型是否是 Company
                if label.get('type') == 'Company':
                    company_labels.append(label['name'])
            return company_labels
    except Exception as e:
        print(f"Error fetching data for {repo_name}: {e}")
        return []

# 异步主函数，处理多个仓库
async def fetch_company(repo_names):
    async with aiohttp.ClientSession() as session:
        tasks = []
        for repo_name in repo_names:
            tasks.append(get_contributors(repo_name, session))
        results = await asyncio.gather(*tasks)  # 并发获取所有仓库的公司标签
        return results

# 读取 Excel 文件
repo_data = pd.read_excel("data/repo_list_gitee.xlsx")

# 获取所有仓库的名称列表
repo_names = repo_data['repo_name'].tolist()

# 使用异步方式获取所有公司信息
company_labels_list = asyncio.run(fetch_company(repo_names))

# 将公司标签合并成字符串并添加为新的字段 'company'
company_names = [', '.join(labels) for labels in company_labels_list]
repo_data['company'] = company_names

# 保存为 CSV 文件
repo_data.to_csv("repo_data_with_company_gitee.csv", index=False)

print("数据已成功保存为 repo_data_with_company_gitee.csv")

