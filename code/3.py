# import easygraph as eg
import pandas as pd
import requests
from itertools import combinations
import matplotlib.pyplot as plt

def get_contributors(platform, repo_name):
    url_repo_contributors = f"https://oss.open-digger.cn/{platform}/{repo_name}/community_openrank.json"
    try:
        response = requests.get(url_repo_contributors)
        response.raise_for_status()
        contributors_data = response.json()
        
        # 将所有年份的贡献者合并成一个集合
        contributors = set()
        for year, contributors_list in contributors_data.items():
            contributors.update(contributors_list)
        return contributors
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data for {repo_name}: {e}")
        return set()


# 读取项目列表
repo_data = pd.read_csv("data/repo_list.csv")
repo_data = repo_data[:5]  # 只处理前几行测试



print(f"Original number of repositories: {len(repo_data)}")  # 输出原始仓库数量
repo_data['contributors'] = repo_data.apply(
    lambda row: get_contributors(row['platform'], row['repo_name']), axis=1
)

# # 删除没有贡献者的仓库
# # filtered_repo_data = repo_data[repo_data['contributors'] != 0]
# filtered_repo_data = repo_data[repo_data['contributors'].apply(lambda x: len(x) > 0)]
# filtered_repo_data.drop('contributors', axis=1, inplace=True)

# print(f"Filtered number of repositories (with contributors): {len(filtered_repo_data)}")  # 输出过滤后的仓库数量
# # 保存为原文件或新文件
# filtered_repo_data.to_csv("data/repo_list_filtered.csv", index=False)  # 保存更新后的数据




# # 将项目名称和贡献者列表映射到一个字典
# repo_contributors = dict(zip(repo_data['repo_name'], repo_data['contributors']))

# # 计算项目间的相似性
# similarity_scores = {}
# for (repo1, contrib1), (repo2, contrib2) in combinations(repo_contributors.items(), 2):
#     common_contributors = contrib1.intersection(contrib2)
#     if common_contributors:
#         score = len(common_contributors) / ((len(contrib1) + len(contrib2)) / 2)
#         similarity_scores[(repo1, repo2)] = score

repo_contributors = get_contributors("github", "odoo/odoo")
print("Contributors for repo:", repo_contributors)


# # # Louvain 社区检测
# import networkx as nx
# import community as community_louvain
# # 创建图
# # 图的节点是仓库名
# G = nx.Graph()
# for repo in repo_contributors.keys():
#     G.add_node(repo)

# for (repo1, repo2), score in similarity_scores.items():
#     G.add_edge(repo1, repo2, weight=score)

# # nx_graph = G.to_networkx()
# community = community_louvain.best_partition(G, weight="weight")

# # community = eg.functions.community.louvain.best_partition(G, weight="weight")
# print("Detected project communities:", community)

# # 输出图信息
# print("Nodes:", G.nodes())
# print("Edges:", G.edges(data=True))

# # 绘制图
# plt.figure(figsize=(10, 8))
# pos = nx.spring_layout(G, seed=42)  # 布局方式
# nx.draw(G, pos, with_labels=True, node_size=500, node_color='skyblue', font_size=10, font_weight='bold', edge_color='gray')
# plt.title("Project Similarity Network")
# plt.show()
