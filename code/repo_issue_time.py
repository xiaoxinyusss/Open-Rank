import aiohttp
import asyncio
import pandas as pd

# 异步获取仓库贡献者信息
async def get_contributors_gitee(session, repo_name):
    url_repo_contributors = f"https://oss.open-digger.cn/gitee/{repo_name}/issue_resolution_duration.json"
    try:
        async with session.get(url_repo_contributors) as response:
            response.raise_for_status()
            contributors_data = await response.json()
            return contributors_data
    except Exception as e:
        print(f"Error fetching data for {repo_name}: {e}")
        return {}  # 返回空字典

# 提取2024Q3的数据

def extract_quarter_data(contributors_data):
    # 获取 'avg' 部分中的季度数据，如果没有则返回0
    avg_data = contributors_data.get("avg", {})
    return {
        "2024Q3": avg_data.get("2024Q3", 0),  # 从 'avg' 部分提取 2024Q3 数据
    }

# 异步主函数，用于批量处理多个仓库
async def process_repositories():
    # 从 Excel 文件读取数据
    repo_data = pd.read_excel("data/repo_list_gitee_company.xlsx")
    repo_data = repo_data[:1]  # 仅处理前1行数据，去掉此行将处理整个数据集
    
    # 存储所有仓库的异步任务
    tasks = []
    
    # 初始化一个空列表，用于存储季度数据
    quarter_data_list = []
    
    # 使用 aiohttp.Session 对象来管理会话
    async with aiohttp.ClientSession() as session:
        # 为每个仓库创建异步任务
        for i in range(len(repo_data)):
            #platform = repo_data['platform'][i]
            repo_name = repo_data['repo_name'][i]
            task = asyncio.create_task(fetch_and_extract_data(session, repo_name))
            tasks.append(task)
        
        # 等待所有任务完成
        results = await asyncio.gather(*tasks)
        
        # 将结果保存到季度数据列表
        for result in results:
            quarter_data_list.append(result)
    
    # 将季度数据添加到 repo_data DataFrame 中
    quarter_columns = ["2024Q3"]
    
    quarter_df = pd.DataFrame(quarter_data_list, columns=quarter_columns)
    repo_data = pd.concat([repo_data, quarter_df], axis=1)

    # 保存为新的 Excel 文件
    repo_data.to_excel("data/repo_field_issue_Q2.xlsx", index=False)
    print("Data has been saved to repo_field_issue_Q2.xlsx")

# 异步获取和提取数据的封装函数
async def fetch_and_extract_data(session, repo_name):
    contributors_data = await get_contributors_gitee(session, repo_name)
    quarter_data = extract_quarter_data(contributors_data)
    return quarter_data

# 运行异步任务
if __name__ == "__main__":
    asyncio.run(process_repositories())
