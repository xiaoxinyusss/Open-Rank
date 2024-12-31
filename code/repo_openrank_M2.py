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

# 提取所有月份数据并将其放在一个字段“month_records”
def extract_monthly_data(contributors_data):
    # 过滤出以年份-月份格式的数据
    month_records = {month: contributors_data.get(month, 0) for month in contributors_data if len(month) == 7 and month[4] == '-'}
    return {"month_records": month_records}

# 异步主函数，用于批量处理多个仓库
async def process_repositories():
    # 从 Excel 文件读取数据
    repo_data = pd.read_excel("data/repo_list_gitee_company.xlsx")
    
    # 存储所有仓库的异步任务
    tasks = []
    
    # 初始化一个空列表，用于存储月份数据
    month_data_list = []
    
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
            month_data_list.append(result)
    
    # 将月份数据添加到 repo_data DataFrame 中
    month_records_column = "month_records"
    
    # 将提取的月份数据加入到 repo_data 中
    repo_data[month_records_column] = month_data_list

    # 保存为新的 Excel 文件
    repo_data.to_excel("repo_gitee_openrank_M2.xlsx", index=False)
    print("Data has been saved to repo_gitee_openrank_M2.xlsx")

# 异步获取和提取数据的封装函数
async def fetch_and_extract_data(session, platform, repo_name):
    contributors_data = await get_contributors_gitee(session, platform, repo_name)
    month_data = extract_monthly_data(contributors_data)
    return month_data

# 运行异步任务
if __name__ == "__main__":
    asyncio.run(process_repositories())
