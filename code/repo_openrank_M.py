import aiohttp
import asyncio
import pandas as pd

# 异步获取仓库贡献者信息
async def get_contributors_gitee(session, platform, repo_name):
    url_repo_contributors = f"https://oss.open-digger.cn/{platform}/{repo_name}/openrank.json"
    try:
        async with session.get(url_repo_contributors) as response:
            response.raise_for_status()
            contributors_data = await response.json()
            return contributors_data
    except Exception as e:
        print(f"Error fetching data for {repo_name}: {e}")
        return {}  # 返回空字典

# 提取 202008 到 202411 的数据
def extract_quarter_data(contributors_data):
    quarter_data = {
        "2020-08": contributors_data.get("2020-08", 0),
        "2020-09": contributors_data.get("2020-09", 0),
        "2020-10": contributors_data.get("2020-10", 0),
        "2020-11": contributors_data.get("2020-11", 0),
        "2020-12": contributors_data.get("2020-12", 0),
        "2021-01": contributors_data.get("2021-01", 0),
        "2021-02": contributors_data.get("2021-02", 0),
        "2021-03": contributors_data.get("2021-03", 0),
        "2021-04": contributors_data.get("2021-04", 0),
        "2021-05": contributors_data.get("2021-05", 0),
        "2021-06": contributors_data.get("2021-06", 0),
        "2021-07": contributors_data.get("2021-07", 0),
        "2021-08": contributors_data.get("2021-08", 0),
        "2021-09": contributors_data.get("2021-09", 0),
        "2021-10": contributors_data.get("2021-10", 0),
        "2021-11": contributors_data.get("2021-11", 0),
        "2021-12": contributors_data.get("2021-12", 0),
        "2022-01": contributors_data.get("2022-01", 0),
        "2022-02": contributors_data.get("2022-02", 0),
        "2022-03": contributors_data.get("2022-03", 0),
        "2022-04": contributors_data.get("2022-04", 0),
        "2022-05": contributors_data.get("2022-05", 0),
        "2022-06": contributors_data.get("2022-06", 0),
        "2022-07": contributors_data.get("2022-07", 0),
        "2022-08": contributors_data.get("2022-08", 0),
        "2022-09": contributors_data.get("2022-09", 0),
        "2022-10": contributors_data.get("2022-10", 0),
        "2022-11": contributors_data.get("2022-11", 0),
        "2022-12": contributors_data.get("2022-12", 0),
        "2023-01": contributors_data.get("2023-01", 0),
        "2023-02": contributors_data.get("2023-02", 0),
        "2023-03": contributors_data.get("2023-03", 0),
        "2023-04": contributors_data.get("2023-04", 0),
        "2023-05": contributors_data.get("2023-05", 0),
        "2023-06": contributors_data.get("2023-06", 0),
        "2023-07": contributors_data.get("2023-07", 0),
        "2023-08": contributors_data.get("2023-08", 0),
        "2023-09": contributors_data.get("2023-09", 0),
        "2023-10": contributors_data.get("2023-10", 0),
        "2023-11": contributors_data.get("2023-11", 0),
        "2023-12": contributors_data.get("2023-12", 0),
        "2024-01": contributors_data.get("2024-01", 0),
        "2024-02": contributors_data.get("2024-02", 0),
        "2024-03": contributors_data.get("2024-03", 0),
        "2024-04": contributors_data.get("2024-04", 0),
        "2024-05": contributors_data.get("2024-05", 0),
        "2024-06": contributors_data.get("2024-06", 0),
        "2024-07": contributors_data.get("2024-07", 0),
        "2024-08": contributors_data.get("2024-08", 0),
        "2024-09": contributors_data.get("2024-09", 0),
        "2024-10": contributors_data.get("2024-10", 0),
        "2024-11": contributors_data.get("2024-11", 0),
    }
    return quarter_data

# 异步主函数，用于批量处理多个仓库
async def process_repositories():
    # 从 Excel 文件读取数据
    repo_data = pd.read_excel("data/repo_list_gitee.xlsx")
    #repo_data=repo_data[:1]
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
        
        # 将结果保存到月份数据列表
        for result in results:
            quarter_data_list.append(result)
    
    # 将季度数据添加到 repo_data DataFrame 中
    quarter_columns = [
    "2020-08", "2020-09", 
    "2020-10","2020-10", "2020-11", "2020-12", "2021-01", "2021-02", "2021-03", "2021-04", "2021-05", 
    "2021-06", "2021-07", "2021-08", "2021-11", "2021-12", "2022-01", "2022-02", "2022-03", 
    "2022-04", "2022-05", "2022-06", "2022-07", "2022-08", "2022-09", "2022-10", "2022-11", 
    "2022-12", "2023-01", "2023-02", "2023-03", "2023-04", "2023-05", "2023-06", "2023-07", 
    "2023-08", "2023-09", "2023-10", "2023-11", "2023-12", "2024-01", "2024-02", "2024-03", 
    "2024-04", "2024-05", "2024-06", "2024-07", "2024-08", "2024-09","2024-10","2024-11"
    ]
    
    quarter_df = pd.DataFrame(quarter_data_list, columns=quarter_columns)
    repo_data = pd.concat([repo_data, quarter_df], axis=1)

    # 保存为新的 Excel 文件
    repo_data.to_excel("repo_gitee_openrank_M.xlsx", index=False)
    print("Data has been saved to repo_gitee_openrank_M.xlsx")

# 异步获取和提取数据的封装函数
async def fetch_and_extract_data(session, platform, repo_name):
    contributors_data = await get_contributors_gitee(session, platform, repo_name)
    quarter_data = extract_quarter_data(contributors_data)
    return quarter_data

# 运行异步任务
if __name__ == "__main__":
    asyncio.run(process_repositories())
