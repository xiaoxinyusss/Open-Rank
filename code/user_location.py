import aiohttp
import asyncio
import pandas as pd

# 异步获取贡献者信息的函数
async def get_contributors_async(repo_name: str, session: aiohttp.ClientSession) -> dict:
    url_repo_contributors = f"https://oss.open-digger.cn/gitee/{repo_name}/meta.json"
    try:
        async with session.get(url_repo_contributors) as response:
            if response.status == 200:
                contributors_data = await response.json()
                return contributors_data
            else:
                print(f"Failed to fetch data for {repo_name}: HTTP {response.status}")
                return {}
    except Exception as e:
        print(f"Error fetching data for {repo_name}: {e}")
        return {}

# 提取位置信息的函数
def extract_location(contributor_data: dict) -> str:
    if 'info' in contributor_data and 'location' in contributor_data['info']:
        return contributor_data['info']['location']
    return "No location provided"

# 主异步函数：并发获取贡献者数据并提取位置信息
async def fetch_all_contributors(repo_names: list) -> list:
    async with aiohttp.ClientSession() as session:
        tasks = [get_contributors_async(repo_name, session) for repo_name in repo_names]
        contributors_data = await asyncio.gather(*tasks)
        locations = [extract_location(data) for data in contributors_data]
        return locations

# 主函数：读取数据、调用异步处理、保存结果
def main():
    # 从 Excel 文件读取数据
    try:
        repo_data = pd.read_excel("data/user_list_gitee.xlsx")
        #repo_data=repo_data[:10]
    except FileNotFoundError:
        print("输入文件未找到，请检查文件路径。")
        return
    except Exception as e:
        print(f"读取文件时发生错误: {e}")
        return

    # 确保 repo_name 列存在
    if 'actor_login' not in repo_data.columns:
        print("输入数据中缺少 'actor_login' 列，请检查文件内容。")
        return

    # 获取所有actor_login
    repo_names = repo_data['actor_login'].tolist()

    # 异步获取位置信息
    locations = asyncio.run(fetch_all_contributors(repo_names))

    # 将位置信息添加到 DataFrame
    repo_data['location'] = locations

    # 保存结果为 CSV 文件
    output_file = 'user_data_with_locations_gitee.csv'
    try:
        repo_data.to_csv(output_file, index=False)
        print(f"数据处理完成，结果已保存到 '{output_file}'。")
    except Exception as e:
        print(f"保存文件时发生错误: {e}")

# 执行主函数
if __name__ == "__main__":
    main()
