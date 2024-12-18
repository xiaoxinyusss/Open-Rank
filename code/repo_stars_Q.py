import aiohttp
import asyncio
import pandas as pd

# 异步获取仓库贡献者信息
async def get_contributors_gitee(session, platform, repo_name):
    url_repo_contributors = f"https://oss.open-digger.cn/{platform}/{repo_name}/stars.json"
    try:
        async with session.get(url_repo_contributors) as response:
            response.raise_for_status()
            contributors_data = await response.json()
            return contributors_data
    except Exception as e:
        print(f"Error fetching data for {repo_name}: {e}")
        return {}  # 返回空字典

# 提取 2020Q4 到 2024Q3 的数据
def extract_quarter_data(contributors_data):
    quarter_data = {
        "2020Q4": contributors_data.get("2020Q4", 0),
        "2021Q1": contributors_data.get("2021Q1", 0),
        "2021Q2": contributors_data.get("2021Q2", 0),
        "2021Q3": contributors_data.get("2021Q3", 0),
        "2021Q4": contributors_data.get("2021Q4", 0),
        "2022Q1": contributors_data.get("2022Q1", 0),
        "2022Q2": contributors_data.get("2022Q2", 0),
        "2022Q3": contributors_data.get("2022Q3", 0),
        "2022Q4": contributors_data.get("2022Q4", 0),
        "2023Q1": contributors_data.get("2023Q1", 0),
        "2023Q2": contributors_data.get("2023Q2", 0),
        "2023Q3": contributors_data.get("2023Q3", 0),
        "2023Q4": contributors_data.get("2023Q4", 0),
        "2024Q1": contributors_data.get("2024Q1", 0),
        "2024Q2": contributors_data.get("2024Q2", 0),
        "2024Q3": contributors_data.get("2024Q3", 0),
    }
    return quarter_data

# 异步主函数，用于批量处理多个仓库
async def process_repositories():
    # 从 Excel 文件读取数据
    repo_data = pd.read_excel("data/repo_list_gitee.xlsx")
    
    # 存储所有仓库的异步任务
    tasks = []
    
    # 初始化一个空列表，用于存储季度数据
    quarter_data_list = []
    
    # 使用 aiohttp.Session 对象来管理会话
    async with aiohttp.ClientSession() as session:
        # 为每个仓库创建异步任务
        for i in range(len(repo_data)):
            platform = repo_data['platform'][i]
            repo_name = repo_data['repo_name'][i]
            task = asyncio.create_task(fetch_and_extract_data(session, platform, repo_name))
            tasks.append(task)
        
        # 等待所有任务完成
        results = await asyncio.gather(*tasks)
        
        # 将结果保存到季度数据列表
        for result in results:
            quarter_data_list.append(result)
    
    # 将季度数据添加到 repo_data DataFrame 中
    quarter_columns = [
        "2020Q4", "2021Q1", "2021Q2", "2021Q3", "2021Q4",
        "2022Q1", "2022Q2", "2022Q3", "2022Q4", "2023Q1", 
        "2023Q2", "2023Q3", "2023Q4", "2024Q1", "2024Q2", "2024Q3"
    ]
    
    quarter_df = pd.DataFrame(quarter_data_list, columns=quarter_columns)
    repo_data = pd.concat([repo_data, quarter_df], axis=1)

    # 保存为新的 Excel 文件
    repo_data.to_excel("repo_gitee_stars_Q.xlsx", index=False)
    print("Data has been saved to repo_gitee_stars_Q.xlsx")

# 异步获取和提取数据的封装函数
async def fetch_and_extract_data(session, platform, repo_name):
    contributors_data = await get_contributors_gitee(session, platform, repo_name)
    quarter_data = extract_quarter_data(contributors_data)
    return quarter_data

# 运行异步任务
if __name__ == "__main__":
    asyncio.run(process_repositories())
