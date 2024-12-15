
import aiohttp
import asyncio
import pandas as pd
import requests
from aiohttp import ClientSession

# 异步获取贡献者信息的函数
async def get_contributors(repo_name: str, session: ClientSession) -> dict:
    url_repo_contributors = f"https://oss.open-digger.cn/github/{repo_name}/meta.json"
    try:
        async with session.get(url_repo_contributors) as response:
            response.raise_for_status()
            contributors_data = await response.json()
            return contributors_data
    except Exception as e:
        print(f"Error fetching data for {repo_name}: {e}")
        return {}

# 提取地区信息
def extract_region(contributors_dict):
    for label in contributors_dict.get('labels', []):
        if label.get('type') == 'Region-0':
            return label.get('name')
    return None

# 异步获取数据并提取地区
async def fetch_and_extract_region(repo_names: list) -> list:
    async with aiohttp.ClientSession() as session:
        tasks = []
        for repo_name in repo_names:
            tasks.append(get_contributors(repo_name, session))
        contributors_list = await asyncio.gather(*tasks)

        regions = [extract_region(contributors) for contributors in contributors_list]
        return regions

# 从 Excel 文件读取数据
repo_data = pd.read_excel("data/repo_list_gitee.xlsx")
# 异步获取地区信息
repo_names = repo_data['repo_name'].tolist()  # 获取所有 repo_name 列表
regions = asyncio.run(fetch_and_extract_region(repo_names))  # 异步调用

# 将地区信息添加到 DataFrame
repo_data['region'] = regions

# 导出为 CSV 文件
repo_data.to_csv('repo_data_with_region_github.csv', index=False)
