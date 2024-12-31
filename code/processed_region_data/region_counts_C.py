import pandas as pd
from collections import Counter
import re

# 1. 提取地区信息并处理
data = """
Sergey Fedorov
Sergey Fedorov
Taiwan
hoshi-hiyouga
hoshi-hiyouga
Beijing, China
zR
zR
China
ruki
ruki
Shanghai, China
neverland
neverland
Hangzhou, China
Fangjun Kuang
Fangjun Kuang
Peking
Liang Zhang
Liang Zhang
Beijing China
Archer
Archer
HangZhou
Michael
Michael
Shanghai
Anthony Fu
Anthony Fu
China
Xuanwo
Xuanwo
null
Arvin Xu
Arvin Xu
Hangzhou
wanghe
wanghe
Beijing, China
D
D
Kunming, China
William Cheng
William Cheng
Hong Kong
Xiang Xiao
Xiang Xiao
Beijing
afc163
afc163
Hangzhou, China
JEECG
JEECG
北京
Aleksana
Aleksana
Chengdu, Sichuan, China
Jeffrey Chen
Jeffrey Chen
Guangdong, China
Kefu Chai
Kefu Chai
Shanghai, China
Jingsong Lee
Jingsong Lee
Hangzhou China
Yingwei Zheng
Yingwei Zheng
Shenzhen
weishu
weishu
China
wū yāng
wū yāng
Shenzhen, China
Cheng Pan
Cheng Pan
Hangzhou, China
Lyu Han
Lyu Han
China
Jintao
Jintao
Hangzhou China
Chia-Ping Tsai
Chia-Ping Tsai
Taiwan
Tianling Shen
Tianling Shen
Chongqing, China
A1lo
A1lo
Hangzhou, China
tison
tison
Guangzhou
youkaichao
youkaichao
Beijing, China
an-lee
an-lee
@Shenzhen
Goooler
Goooler
Chengdu, China
Frost Ming
Frost Ming
Shenzhen, China
Yang Luo
Yang Luo
Beijing
Alex Li
Alex Li
Shanghai, China.
白铭骢 (Mingcong Bai)
白铭骢 (Mingcong Bai)
Wuhan, China
Cyrus Leung
Cyrus Leung
Hong Kong
屈轩
屈轩
Xi'an
Johnson Chu
Johnson Chu
Hong Kong
方帅
方帅
Beijing
zirain
zirain
Hangzhou,China
YunLiu
YunLiu
Shanghai
Yuchao Yan
Yuchao Yan
Shanghai, China
Nyakku Shigure
Nyakku Shigure
Beijing, China
吴晟 Wu Sheng
吴晟 Wu Sheng
Beijing(China), SF(US)
Argo Zhang
Argo Zhang
China
Y.
Y.
Shen Zhen China
Aaron
Aaron
Hang Zhou
Gaius
Gaius
Hangzhou
xile611
xile611
Hang Zhou
Deeka Wong
Deeka Wong
HongKong
二货爱吃白萝卜
二货爱吃白萝卜
Shanghai, China
ielgnaw
ielgnaw
Shenzhen, China
tisfeng
tisfeng
Shenzhen, China
Peter Dave Hello
Peter Dave Hello
Taiwan, R.O.C
աӄա
աӄա
Hong Kong
Andy Zhang
Andy Zhang
Shanghai
Darcy Shen
Darcy Shen
Hangzhou
Zexi Li
Zexi Li
Beijing
Jim Huang
Jim Huang
Taipei City, Taiwan
nihui
nihui
Shanghai
Liangbin Lian
Liangbin Lian
Shenzhen,CN
sendaoYan
sendaoYan
hangzhou
Man, Jianting (Meco)
Man, Jianting (Meco)
Shenyang, China | Windsor, Canada
Wenchen Fan
Wenchen Fan
Hangzhou, China
Dongdong Tian
Dongdong Tian
Wuhan, China
nate.river
nate.river
China,Chongqing
Derek Su
Derek Su
Taipei, Taiwan
Hengfei Yang
Hengfei Yang
Shanghai
张祖建
张祖建
Wuhan
Jason Lee
Jason Lee
Chengdu, China
Wenzhuo Liu
Wenzhuo Liu
Shanghai
weizhoublue
weizhoublue
ShangHai
uye
uye
HangZhou, China
liaoxuezhi
liaoxuezhi
beijing
Shiming Zhang
Shiming Zhang
Shanghai
许杰友 Jieyou Xu (Joe)
许杰友 Jieyou Xu (Joe)
Shanghai, China
Yancheng Zheng
Yancheng Zheng
Shanghai
Tiger Xu / Zhonghu Xu
Tiger Xu / Zhonghu Xu
Hangzhou,China
Dapeng Zhang
Dapeng Zhang
Shanghai, China
Mister-Hope
Mister-Hope
ChangChun Jilin China
hydai
hydai
Taiwan
btea
btea
HangZhou,China
Bryan
Bryan
Beijing, China
lijianan
lijianan
Hangzhou, China
panbingkun
panbingkun
Beijing
Anton Kochkov
Anton Kochkov
China, Shanghai
James Yeung
James Yeung
Shanghai
Felix Yan
Felix Yan
Wuhan, Hubei, China
Kent Yao
Kent Yao
Hangzhou, China
Evan You
Evan You
Singapore
ZhangJian He
ZhangJian He
ShenZhen, GuangDong, China
Kevin Su
Kevin Su
Taiwan
David Ko
David Ko
Taiwan
Jarrett Ye
Jarrett Ye
Qingyuan, Guangdong, China
V
V
Kunming, China  
Michael
Michael
Shanghai
Liang Zhang
Liang Zhang
Beijing China
neverland
neverland
Hangzhou, China
William Cheng
William Cheng
Hong Kong
Fangjun Kuang
Fangjun Kuang
Peking
lijianan
lijianan
Hangzhou, China
tison
tison
Guangzhou
MadCcc
MadCcc
Shanghai
A1lo
A1lo
Hangzhou, China
afc163
afc163
Hangzhou, China
fit2cloudrd
fit2cloudrd
Beijing
Andy Zhang
Andy Zhang
Shanghai
Weizhen Wang
Weizhen Wang
Shanghai,China
Goooler
Goooler
Chengdu, China
fisker Cheung
fisker Cheung
China
D
D
Kunming, China
guoguangwu
guoguangwu
china
Ryan Wang
Ryan Wang
Chengdu, China
Jinzhe Zeng
Jinzhe Zeng
Nanjing, China
wū yāng
wū yāng
Shenzhen, China
ChuijkYahus
ChuijkYahus
China
Anthony Fu
Anthony Fu
China
MistEO
MistEO
HangZhou, China
Xiang Xiao
Xiang Xiao
Beijing
Qiming Teng
Qiming Teng
Beijing, China
ruki
ruki
Shanghai, China
Alex Li
Alex Li
Shanghai, China.
Cheng Pan
Cheng Pan
Hangzhou, China
Kudo Chien
Kudo Chien
Taipei, Taiwan
Kefu Chai
Kefu Chai
Shanghai, China
weizhoublue
weizhoublue
ShangHai
docschina
docschina
China
Shuduo Sang
Shuduo Sang
Toronto, ON, Canada
btea
btea
HangZhou,China
Felix Yan
Felix Yan
Wuhan, Hubei, China
glepnir
glepnir
China
zirain
zirain
Hangzhou,China
Kenshin Wang
Kenshin Wang
China
Danny Chan
Danny Chan
Hangzhou China
YangJie
YangJie
Beijing
Liangbin Lian
Liangbin Lian
Shenzhen,CN
Tiger Xu / Zhonghu Xu
Tiger Xu / Zhonghu Xu
Hangzhou,China
Paco Xu
Paco Xu
Shanghai, China
liaoxuezhi
liaoxuezhi
beijing
kiner-tang
kiner-tang
China
wuhuizuo
wuhuizuo
ShenZhen
Yuchao Yan
Yuchao Yan
Shanghai, China
Deeka Wong
Deeka Wong
HongKong
zhengkunwang
zhengkunwang
Beijing
LoveSy
LoveSy
Hong Kong
吴晟 Wu Sheng
吴晟 Wu Sheng
Beijing(China), SF(US)
Y.
Y.
Shen Zhen China
liaochuntao
liaochuntao
ShengZhen
Gaius
Gaius
Hangzhou
fengmk2
fengmk2
Hangzhou, China
Tzu-ping Chung
Tzu-ping Chung
Taipei, Taiwan
Tianling Shen
Tianling Shen
Chongqing, China
Derek Su
Derek Su
Taipei, Taiwan
Mister-Hope
Mister-Hope
ChangChun Jilin China
Ben Ye
Ben Ye
China
messense
messense
Shanghai, China
yihong
yihong
China
Frost Ming
Frost Ming
Shenzhen, China
Jarrett Ye
Jarrett Ye
Qingyuan, Guangdong, China
Peter Dave Hello
Peter Dave Hello
Taiwan, R.O.C
Bairui Su
Bairui Su
New York, NY
智障派森
智障派森
China
Shiming Zhang
Shiming Zhang
Shanghai
三咲智子
三咲智子
China
lin onetwo
lin onetwo
ShanghaiTech University
Xiaopeng Han
Xiaopeng Han
China
Anton Kochkov
Anton Kochkov
China, Shanghai
David Ko
David Ko
Taiwan
Taojunshen
Taojunshen
China
my-git9
my-git9
China
陈帅
陈帅
浙江杭州
Nyakku Shigure
Nyakku Shigure
Beijing, China
Bobby Rong
Bobby Rong
Guangzhou, China
Dapeng Zhang
Dapeng Zhang
Shanghai, China
屈轩
屈轩
Xi'an
Jason Ren
Jason Ren
Beijing,China
Peter Lai
Peter Lai
Taiwan
Man, Jianting (Meco)
Man, Jianting (Meco)
Shenyang, China | Windsor, Canada
Littlegnal
Littlegnal
Shanghai
ClarkXia
ClarkXia
hangzhou
xixirangrang
xixirangrang
Hangzhou
magodo
magodo
Shanghai, China
Amumu
Amumu
Shenzhen, China
Pahud Hsieh
Pahud Hsieh
Taipei
Eiinu
Eiinu
北京
LongYinan
LongYinan
Shanghai, China
nihui
nihui
Shanghai
Yancheng Zheng
Yancheng Zheng
Shanghai
Shixiang Wang (王诗翔)
Shixiang Wang (王诗翔)
Guangzhou, China
capdiem
capdiem
HangZhou
James Yeung
James Yeung
Shanghai
Johnson Chu
Johnson Chu
Hong Kong
zhwesky2010
zhwesky2010
Beijing
Liang Zhang
Liang Zhang
Beijing China
neverland
neverland
Hangzhou, China
afc163
afc163
Hangzhou, China
MadCcc
MadCcc
Shanghai
fit2cloudrd
fit2cloudrd
Beijing
Qiming Teng
Qiming Teng
Beijing, China
fisker Cheung
fisker Cheung
China
A1lo
A1lo
Hangzhou, China
Anthony Fu
Anthony Fu
China
tison
tison
Guangzhou
Andy Zhang
Andy Zhang
Shanghai
William Cheng
William Cheng
Hong Kong
罗泽轩
罗泽轩
Guangzhou,China
D
D
Kunming, China
Man, Jianting (Meco)
Man, Jianting (Meco)
Shenyang, China | Windsor, Canada
三咲智子
三咲智子
China
docschina
docschina
China
Xiang Xiao
Xiang Xiao
Beijing
Goooler
Goooler
Chengdu, China
Michael
Michael
Shanghai
Fangjun Kuang
Fangjun Kuang
Peking
Jinzhe Zeng
Jinzhe Zeng
Nanjing, China
messense
messense
Shanghai, China
Shuduo Sang
Shuduo Sang
Toronto, ON, Canada
Tzu-ping Chung
Tzu-ping Chung
Taipei, Taiwan
Rick
Rick
China
Kenshin Wang
Kenshin Wang
China
wū yāng
wū yāng
Shenzhen, China
LoveSy
LoveSy
Hong Kong
Weizhen Wang
Weizhen Wang
Shanghai,China
Kudo Chien
Kudo Chien
Taipei, Taiwan
timothyqiu
timothyqiu
China
Jiashuo Li
Jiashuo Li
Shanghai, China
MistEO
MistEO
HangZhou, China
吴晟 Wu Sheng
吴晟 Wu Sheng
Beijing(China), SF(US)
ruki
ruki
Shanghai, China
magodo
magodo
Shanghai, China
my-git9
my-git9
China
JounQin
JounQin
Nanjing, Jiangsu, PRC
Alex Li
Alex Li
Shanghai, China.
zirain
zirain
Hangzhou,China
Tiger Xu / Zhonghu Xu
Tiger Xu / Zhonghu Xu
Hangzhou,China
yihuang
yihuang
China
Tianling Shen
Tianling Shen
Chongqing, China
Bobby Rong
Bobby Rong
Guangzhou, China
陈帅
陈帅
浙江杭州
kevwan
kevwan
China
Felix Yan
Felix Yan
Wuhan, Hubei, China
Wenchen Fan
Wenchen Fan
Hangzhou, China
chihsuan
chihsuan
China
Ryan Wang
Ryan Wang
Chengdu, China
Cheng Pan
Cheng Pan
Hangzhou, China
Paco Xu
Paco Xu
Shanghai, China
Dapeng Zhang
Dapeng Zhang
Shanghai, China
fengmk2
fengmk2
Hangzhou, China
Frost Ming
Frost Ming
Shenzhen, China
Yang Luo
Yang Luo
Beijing
vector
vector
HangZhou China
Yuchao Yan
Yuchao Yan
Shanghai, China
LongYinan
LongYinan
Shanghai, China
Heng Lu
Heng Lu
Shanghai
liangxia
liangxia
China
Sukka
Sukka
City of Science which is not in China
jw-foss
jw-foss
China
RainbowMango
RainbowMango
China
Dadiorchen
Dadiorchen
Beijing, China
Zhengqiang Duan
Zhengqiang Duan
Nanjing
nihui
nihui
Shanghai
Kefu Chai
Kefu Chai
Shanghai, China
pan93412
pan93412
China
Gaius
Gaius
Hangzhou
ZhangJian He
ZhangJian He
ShenZhen, GuangDong, China
Mister-Hope
Mister-Hope
ChangChun Jilin China
wolfboys
wolfboys
China
Peter Lai
Peter Lai
Taiwan
Jintao Zhang
Jintao Zhang
Beijing
jdneo
jdneo
China
utzcoz
utzcoz
Beijing, China
lance6716
lance6716
China
lijinke666
lijinke666
China
Wenjun Ruan
Wenjun Ruan
Shanghai China
Kante Yin
Kante Yin
Shanghai, China
Alex Chi
Alex Chi
Shanghai, China
yxxhero
yxxhero
China
Dongdong Tian
Dongdong Tian
Wuhan, China
ClarkXia
ClarkXia
hangzhou
kezhenxu94
kezhenxu94
China
工业废水
工业废水
China
YangJie
YangJie
Beijing
Yikun Jiang
Yikun Jiang
Xi'an, China
czy88840616
czy88840616
China
John Niang
John Niang
Code world
David Ko
David Ko
Taiwan
Johnson Chu
Johnson Chu
Hong Kong
wey-gu
wey-gu
China
lijianan
lijianan
Hangzhou, China
visiky
visiky
HANGZHOU (杭州)
李铭昕
李铭昕
上海
Zhenglai Zhang
Zhenglai Zhang
Shanghai China
Yang Luo
Yang Luo
Beijing
题叶
题叶
Shanghai, China
Felix Yan
Felix Yan
Wuhan, Hubei, China
Anthony Fu
Anthony Fu
China
Pahud Hsieh
Pahud Hsieh
Taipei
Huan (李卓桓)
Huan (李卓桓)
Carpe Diem, Seize the Day.
Chun-Sheng, Li
Chun-Sheng, Li
Taipei, Taiwan
JounQin
JounQin
Nanjing, Jiangsu, PRC
Rick
Rick
China
xrkffgg
xrkffgg
Beijing, China
陈帅
陈帅
浙江杭州
Alex Li
Alex Li
Shanghai, China.
Goooler
Goooler
Chengdu, China
沈唁
沈唁
Xi'an, China
吴晟 Wu Sheng
吴晟 Wu Sheng
Beijing(China), SF(US)
ishine
ishine
shanghai
Tzu-ping Chung
Tzu-ping Chung
Taipei, Taiwan
afc163
afc163
Hangzhou, China
Man, Jianting (Meco)
Man, Jianting (Meco)
Shenyang, China | Windsor, Canada
罗泽轩
罗泽轩
Guangzhou,China
Jinzhe Zeng
Jinzhe Zeng
Nanjing, China
Alex Chi
Alex Chi
Shanghai, China
Johnny Chen
Johnny Chen
Shanghai, China
neverland
neverland
Hangzhou, China
lin onetwo
lin onetwo
ShanghaiTech University
Tianling Shen
Tianling Shen
Chongqing, China
messense
messense
Shanghai, China
kezhenxu94
kezhenxu94
China
Andy Zhang
Andy Zhang
Shanghai
hustcc
hustcc
HangZhou, China
gaokai
gaokai
HuBei.WuHan
tison
tison
Guangzhou
一丝
一丝
China
Jiashuo Li
Jiashuo Li
Shanghai, China
ruki
ruki
Shanghai, China
Dongdong Tian
Dongdong Tian
Wuhan, China
惜别
惜别
Hangzhou, Zhejiang, China
fisker Cheung
fisker Cheung
China
云游君
云游君
China
haizhilin
haizhilin
ShenZhen, China
李铭昕
李铭昕
上海
工业废水
工业废水
China
yihong
yihong
China
Kenshin Wang
Kenshin Wang
China
卡色
卡色
shanghai, china
visiky
visiky
HANGZHOU (杭州)
Huli
Huli
Taipei, Taiwan
yi_Xu
yi_Xu
China
Shixiang Wang (王诗翔)
Shixiang Wang (王诗翔)
Guangzhou, China
Yi Shen
Yi Shen
Shanghai, China
Johnny Wang
Johnny Wang
China, Shenzhen
littletomatodonkey
littletomatodonkey
Shanghai, China
琚致远
琚致远
China
赵延
赵延
Chengdu, China
utzcoz
utzcoz
Beijing, China
Vince
Vince
PingXiang / JiangXi / China
John Niang
John Niang
Code world
Lei Chen
Lei Chen
Shanghai China
geffzhang
geffzhang
Shenzhen,China
石头
石头
Wuxi ⇄ AnHui, China
D
D
Kunming, China
Android轮子哥
Android轮子哥
Guangzhou,China
Zhongxiang Wang
Zhongxiang Wang
Zhengzhou, China
LongYinan
LongYinan
Shanghai, China
JeremyWuuuuu
JeremyWuuuuu
Shanghai, China
吴伟杰
吴伟杰
Beijing, China 北京
Liang Zhang
Liang Zhang
Beijing China
EGOIST
EGOIST
China
Dadiorchen
Dadiorchen
Beijing, China
Jintao Zhang
Jintao Zhang
Beijing
骑马小猫
骑马小猫
Beijing
居戎氏
居戎氏
Beijing, China
Yurun
Yurun
China JiangSu WuXi
Dahan Gong
Dahan Gong
Beijing, China
rxliuli
rxliuli
Beijing
Freeman(Yue) Fang
Freeman(Yue) Fang
Beijing, China
CuiLiang
CuiLiang
BeiJing
迷渡
迷渡
Tianjin, China
Daniel Povey
Daniel Povey
Beijing
Winlin
Winlin
beijing
三咲智子
三咲智子
China
Jinguo Liu
Jinguo Liu
Beijing, China
Ryan Wang
Ryan Wang
Chengdu, China
肖恒
肖恒
China
Zeyu Chen
Zeyu Chen
Shenzhen
Neo
Neo
Taipei
Wang Han
Wang Han
Beijing, China
Shiwen Cheng
Shiwen Cheng
Beijing, China
张逸帆
张逸帆
Suzhou, Jiangsu Province, China
clayGao
clayGao
Taiwan
Wenkai Yin(尹文开)
Wenkai Yin(尹文开)
Beijing, China
luhc228
luhc228
Hangzhou, China
快乐的老鼠宝宝
快乐的老鼠宝宝
Changping District,Beijing,China
Jason
Jason
Beijing
Embbnux Ji
Embbnux Ji
Xiamen, China
vector
vector
HangZhou China
Even
Even
Wuhan, China
QiuJiangkun
QiuJiangkun
Hong Kong, China 
"""  # 将提供的长文本数据复制到这里

# 第一步：按行拆分数据并去除空行
lines = data.strip().split('\n')
cleaned_data = [line.strip() for line in lines if line.strip()]

# 第二步：去除相邻重复项（两个重复项都不保留）
unique_data = []
i = 0
while i < len(cleaned_data):
    if i + 1 < len(cleaned_data) and cleaned_data[i] == cleaned_data[i + 1]:
        # 如果相邻项相等，跳过这两个项
        i += 2
    else:
        unique_data.append(cleaned_data[i])
        i += 1

# 第三步：统计出现次数
counter = Counter(unique_data)

# 将结果转换为 DataFrame
result_df = pd.DataFrame(counter.items(), columns=["项", "出现次数"])

# 第四步：输出到 Excel 文件
result_df.to_excel("region_counts_C.xlsx", index=False)

print("统计结果已输出")
