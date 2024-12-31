var myChart;  // 声明全局变量

$(document).ready(function() {
    echarts_1();
    // 初始化第一个图表
    echarts_4();
    echarts_31();
    echarts_23();
    // 给按钮绑定点击事件
    $('#cloudNativeButton').on('click', function() {
        switchChart('cloud-native');
    });

    $('#aiButton').on('click', function() {
        switchChart('ai');
    });

    $('#databaseButton').on('click', function() {
        switchChart('database');
    });

    $('#averageButton').on('click', function() {
        switchChart('average');
    });
});



function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));
     var data = [{
        title: '**省'
    },
    ['本周'],
    [{
        name: '文本1',
        max: 150
    }, {
        name: '文本2',
        max: 150
    }, {
        name: '文本3',
        max: 150
    }, {
        name: '文本4',
        max: 150
    }, {
        name: '文本5',
        max: 150
    }],
    [43, 100, 28, 3, 150],
]
option = {

    color: ['#9DD060', '#35C96E', '#4DCEF8'],

    tooltip: {},
  
    radar: {
        center: ['50%', '50%'],
	 radius: ["25%", "70%"],
		
        name: {
            textStyle: {
                color: '#72ACD1'
            }
        },

          splitLine: {

              lineStyle: {

                  color: 'rgba(255,255,255,.0',

                  width: 2

              }

          },
          axisLine: {
              lineStyle: {
                  color: 'rgba(255,255,255,0.2)',
                  width: 1,
                  type: 'dotted'

              },

          },
        splitArea: {
            areaStyle: {
                  color: ['rgba(255,255,255,.1)', 'rgba(255,255,255,0)']
              }
        },
        indicator: data[2]
    },
    series: [{
        name: '',
        type: 'radar',
        data: [{
                areaStyle: {
                    normal: {
                        opacity: 0.3,
                    }
                },
                value: data[3],
                name: data[1][0]
            },
            {
                areaStyle: {
                    normal: {
                        opacity: 0.3,
                    }
                },
                value: data[4],
                name: data[1][1]
            },
            {
                areaStyle: {
                    normal: {
                        opacity: 0.3,
                    }
                },
                value: data[5],
                name: data[1][2]
            }
        ]
    }]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
 
//配置activity切换
// 云原生图表配置
var cloudNativeOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['llvm/llvm-project', 'grafana/grafana', 'kubernetes/kubernetes', 'ClickHouse/ClickHouse', 'keycloak/keycloak	'],  // 添加折线4和折线5
        top: '0%',
        textStyle: {
            color: "#fff",
            fontSize: '10',
        },
        itemGap: 10
    },
    grid: {
        left: '0%',
        top: '40px',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['202312', '202401', '202402', '202403', '202404', '202405', '202406', '202407', '202408', '202409', '202410', '202411'],
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            interval: 1,  // 每个标签都显示
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
            }
        },
        min: 600,  // 纵轴最小值
        max: 5500  // 纵轴最大值
    }],
    series: [{
        name: 'llvm/llvm-project',
        type: 'line',
        smooth: true,
        data: [3712.05, 4733.47, 4311.16, 4805.10, 4789.38, 4863.77, 4635.97, 5168.52, 5135.21, 4841.52, 5072.69, 4766.16],  
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'grafana/grafana',
        type: 'line',
        smooth: true,
        data: [1200.89, 1812.85, 1839.79, 1654.97, 1588.21, 1533.28, 1475.13, 1605.69, 1537.50, 1447.98, 1611.32, 1534.07],  
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'kubernetes/kubernetes',
        type: 'line',
        smooth: true,
        data:[963.48, 1301.36, 1356.98, 1300.72, 1319.84, 1381.97, 1363.52, 1550.42, 1299.59, 1480.92, 1620.57, 1302.28], 
        itemStyle: {
            normal: {
                color: '#f1c40f',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'ClickHouse/ClickHouse',  // 新添加的折线
        type: 'line',
        smooth: true,
        data: [925.01, 1064.36, 1022.43, 1185.27, 1109.42, 1210.63, 1081.46, 1297.51, 1261.23, 1012.56, 1083.74, 1032.56],
        itemStyle: {
            normal: {
                color: '#9b59b6',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'keycloak/keycloak',  // 新添加的折线
        type: 'line',
        smooth: true,
        data: [636.87, 840.16, 794.50, 855.32, 841.89, 802.49, 853.73, 834.91, 725.78, 775.24, 984.08, 788.08],
        itemStyle: {
            normal: {
                color: '#e74c3c',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }]
};

// 人工智能图表配置
var aiOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['pytorch/pytorch', 'langchain-ai/langchain', 'vllm-project/vllm', 'huggingface/transformers', 'ggerganov/llama.cpp'], 
        top: '0%',
        textStyle: {
            color: "#fff",
            fontSize: '10',
        },
        itemGap: 10
    },
    grid: {
        left: '0%',
        top: '40px',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['202312', '202401', '202402', '202403', '202404', '202405', '202406', '202407', '202408', '202409', '202410', '202411'],
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            interval: 1,  // 每个标签都显示
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
            }
        },
        min: 500,  // 纵轴最小值
        max: 3000  // 纵轴最大值
    }],
    series: [{
        name: 'pytorch/pytorch',
        type: 'line',
        smooth: true,
        data: [2020.71, 2257.89, 2429.07, 2453.79, 2536.57, 2585.83, 2557.17, 2648.74, 2845.89, 2445.42, 2629.82, 2486.86],  
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'langchain-ai/langchain',
        type: 'line',
        smooth: true,
        data: [1766.43, 1922.47, 1792.93, 1906.65, 1527.27, 1472.22, 1517.86, 1451.41, 1117.90, 1080.45, 1021.36, 856.23],  
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'vllm-project/vllm',
        type: 'line',
        smooth: true,
        data:[893.04, 883.06, 909.45, 1226.46, 1362.67, 1243.66, 1443.86, 1861.39, 1973.03, 1724.16, 1772.42, 1600.35], 
        itemStyle: {
            normal: {
                color: '#f1c40f',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'huggingface/transformers',  // 新添加的折线
        type: 'line',
        smooth: true,
        data: [1056.89, 1225.94, 1148.23, 1294.57, 1212.06, 1155.16, 1094.84, 1297.69, 1387.58, 1239.29, 1382.78, 1038.52],
        itemStyle: {
            normal: {
                color: '#9b59b6',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'ggerganov/llama.cpp',  // 新添加的折线
        type: 'line',
        smooth: true,
        data: [914.11, 929.78, 955.78, 1000.29, 1151.05, 1158.02, 910.40, 994.85, 794.01, 706.53, 597.75, 669.85],
        itemStyle: {
            normal: {
                color: '#e74c3c',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }]
};

// 数据库图表配置
var databaseOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['ClickHouse/ClickHouse', 'apache/doris', 'elastic/elasticsearch', 'StarRocks/starrocks', 'cockroachdb/cockroach'],  // 添加折线4和折线5
        top: '0%',
        textStyle: {
            color: "#fff",
            fontSize: '10',
        },
        itemGap: 10
    },
    grid: {
        left: '0%',
        top: '40px',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['202312', '202401', '202402', '202403', '202404', '202405', '202406', '202407', '202408', '202409', '202410', '202411'],
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            interval: 1,  // 每个标签都显示
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
            }
        },
        min: 500,  // 纵轴最小值
        max: 1400  // 纵轴最大值
    }],
    series: [{
        name: 'ClickHouse/ClickHouse',
        type: 'line',
        smooth: true,
        data: [925.01,1064.36,1022.43,1185.27,1109.42,1210.63,1081.46,1297.51,1261.23,1012.56,1083.74,1032.56],  
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'apache/doris',
        type: 'line',
        smooth: true,
        data: [1180.28,1176.66,967.18,1220.62,1095.81,1100.97,1075.42,1187.61,1139.48,982.63,930.21,1071.15],  
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'elastic/elasticsearch',
        type: 'line',
        smooth: true,
        data:[832.03,1005.34,842.52,961.57,994.17,1020.55,947.47,970.51,926.16,1068.54,1362.86,1178.26], 
        itemStyle: {
            normal: {
                color: '#f1c40f',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'StarRocks/starrocks',  // 新添加的折线
        type: 'line',
        smooth: true,
        data: [990.71,1078.22,803.09,855.04,824.65,790.18,676.78,819.68,737.65,652.07,619.57,592.66],
        itemStyle: {
            normal: {
                color: '#9b59b6',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'cockroachdb/cockroach',  // 新添加的折线
        type: 'line',
        smooth: true,
        data: [663.53,651.48,633.35,708.95,715.52,691.79,708.40,765.14,785.87,759.96,878.41,814.89],
        itemStyle: {
            normal: {
                color: '#e74c3c',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }]
};


// 均值对比图表配置
var averageOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['云原生', '数据库', '人工智能'],
        top: '5%',
        textStyle: {
            color: "#fff",
            fontSize: '12',
        },
        itemGap: 35
    },
    grid: {
        left: '0%',
        top: '40px',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['202312', '202401', '202402', '202403', '202404', '202405', '202406', '202407', '202408', '202409', '202410', '202411'],
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            interval: 1,  // 每两个月显示一个标签
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
            }
        },
        min: 60,  // 纵轴最小值
        max: 180  // 纵轴最大值
    }],
    series: [{
        name: '云原生',
        type: 'line',
        smooth: true,
        data: [103.87, 125.48, 115.56, 121.59, 122.75, 122.04, 115.46, 121.50, 117.08, 113.94, 119.41, 107.42],
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: '数据库',
        type: 'line',
        smooth: true,
        data: [96.02, 107.09, 98.18, 110.60, 106.30, 105.50, 100.08, 107.45, 104.74, 103.41, 104.10, 96.84],
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: '人工智能',
        type: 'line',
        smooth: true,
        data:[116.09, 127.05, 113.56, 131.17, 121.87, 115.60, 109.68, 118.48, 113.29, 102.13, 103.05, 94.27],
        itemStyle: {
            normal: {
                color: '#f1c40f',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }]
};



function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('echart4'));
        var myChart66 = echarts.init(document.getElementById('echart66'));
        var myChart2 = echarts.init(document.getElementById('echart3'));
        var myChart88 = echarts.init(document.getElementById('echart88'));
        //var myChart99 = echarts.init(document.getElementById('echart99')); // 用于堆叠柱状图

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['云原生', '数据库', '人工智能'],
        
                top:'2%',
                textStyle: {
                    color: "rgba(255,255,255,.5)",
                    fontSize: '12',
        
                },
                itemWidth: 12,
                itemHeight: 12,
                itemGap: 35
            },
            grid: {
                left: '0%',
                top:'40px',
                right: '0%',
                bottom: '0%',
               containLabel: true
            },
            xAxis: [{
                type: 'category',
                      data: ['2023Q3', '2024Q4', '2024Q1', '2024Q2', '2024Q3', ],
                axisLine: {
                    show: true,
                 lineStyle: {
                        color: "rgba(255,255,255,.1)",
                        width: 1,
                        type: "solid"
                    },
                },
                
                axisTick: {
                    show: false,
                },
                axisLabel:  {
                        interval: 0,
                       // rotate:50,
                        show: true,
                        splitNumber: 15,
                        textStyle: {
                             color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                    },
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                   //formatter: '{value} %'
                    show:true,
                     textStyle: {
                             color: "rgba(255,255,255,.6)",
                            fontSize: '14',
                        },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1	)",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    lineStyle: {
                       color: "rgba(255,255,255,.1)",
                    }
                }
            }],
            series: [{
                name: '云原生',
                type: 'bar',
                data: [68.38, 65.54, 67.74, 62.92, 68.42],
                barWidth:'15%', //柱子宽度
               // barGap: 1, //柱子之间间距
                itemStyle: {
                    normal: {
                        color:'#2f89cf',
                        opacity: 1,
                        barBorderRadius: 5,
                    }
                }
            }, {
                name: '数据库',
                type: 'bar',
                data: [61.05, 56.27, 72.98, 68.80, 64.10],
                barWidth:'15%',
               // barGap: 1,
                itemStyle: {
                    normal: {
                        color:'#62c98d',
                        opacity: 1,
                        barBorderRadius: 5,
                    }
                }
            },{
                name: '人工智能',
                type: 'bar',
                data: [397.87, 258.77, 236.13, 200.90, 170.605],
                barWidth:'15%',
               // barGap: 1,
                itemStyle: {
                    normal: {
                        color:'#FFA500',
                        opacity: 1,
                        barBorderRadius: 5,
                    }
                }
            },
            ]
        };
        option2 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['云原生', '数据库', '人工智能'],
        top: '5%',
        textStyle: {
            color: "#fff",
            fontSize: '12',
        },
        itemGap: 35
    },
    grid: {
        left: '0%',
        top: '40px',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['202312', '202401', '202402', '202403', '202404', '202405', '202406', '202407', '202408', '202409', '202410', '202411'],
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            interval: 1,  // 每两个月显示一个标签
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
            }
        },
        min: 60,  // 纵轴最小值
        max: 180  // 纵轴最大值
    }],
    series: [{
        name: '云原生',
        type: 'line',
        smooth: true,
        data: [103.87, 125.48, 115.56, 121.59, 122.75, 122.04, 115.46, 121.50, 117.08, 113.94, 119.41, 107.42],
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: '数据库',
        type: 'line',
        smooth: true,
        data: [96.02, 107.09, 98.18, 110.60, 106.30, 105.50, 100.08, 107.45, 104.74, 103.41, 104.10, 96.84],
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: '人工智能',
        type: 'line',
        smooth: true,
        data:[116.09, 127.05, 113.56, 131.17, 121.87, 115.60, 109.68, 118.48, 113.29, 102.13, 103.05, 94.27],
        itemStyle: {
            normal: {
                color: '#f1c40f',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }]
        };

        option3 = {
    // backgroundColor: '#00265f',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['Huawei', 'Alibaba', 'openKylin'],
        top: '5%',
        textStyle: {
            color: "#fff",
            fontSize: '12',
        },
        itemGap: 35
    },
    grid: {
        left: '0%',
        top: '40px',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['2022Q3', '2022Q4', '2023Q1', '2023Q2', '2023Q3', '2024Q1', '2024Q2', '2024Q3'],
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            interval: 1,  // 每2个季度显示一个标签
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            //formatter: '{value} %'
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
            }
        },
        min: 0,  // 纵轴最小值
        max: 30  // 纵轴最大值
    }],
    series: [{
        name: 'Huawei',
        type: 'line',
        smooth: true,
        data: [3.64, 3.13, 2.59, 2.76, 2.44, 2.15, 2.02, 1.96, 1.61],
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'Alibaba',
        type: 'line',
        smooth: true,
        data: [4.55, 3.21, 2.80, 2.15, 2.34, 1.59, 1.00, 0.86, 0.50],
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'openKylin',
        type: 'line',
        smooth: true,
        data:[17.62, 19.76, 19.51, 20.89, 20.91, 21.74, 22.32, 24.01, 22.75]
        ,
        itemStyle: {
            normal: {
                color: '#f1c40f',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option2);   //activity option2
        myChart66.setOption(option3); //openrank
        myChart2.setOption(option);
        myChart88.setOption(option); //柱状图
       
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }


function switchChart(chartType) {
    var option;

    if (chartType === 'cloud-native') {
        option = cloudNativeOption;
    } else if (chartType === 'ai') {
        option = aiOption;
    } else if (chartType === 'database') {
        option = databaseOption;
    } else if (chartType === 'average') {
        option = averageOption;
    }

    console.log('当前图表类型:', chartType);
    console.log('当前图表配置:', option);
    // 更新图表
    if (myChart) {
        myChart.clear();  // 清除现有图表内容
        myChart.setOption(option);  // 设置新的图表配置
    }
}
// 页面加载完后初始化
$(document).ready(function() {
    echarts_4();

    // 为按钮绑定事件
    $('#cloudNativeButton').on('click', function() {
        switchChart('cloud-native');
    });
    $('#aiButton').on('click', function() {
        switchChart('ai');
    });
    $('#databaseButton').on('click', function() {
        switchChart('database');
    });
    $('#averageButton').on('click', function() {
        switchChart('average');
    });
});

function echarts_31() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb01'));
	var myChart2 = echarts.init(document.getElementById('fb02')); 
	var myChart3 = echarts.init(document.getElementById('fb03'));
	var myChart4 = echarts.init(document.getElementById('fb04')); 
	var myChart5 = echarts.init(document.getElementById('myd1')); 
	var myChart7 = echarts.init(document.getElementById('sysx')); 

option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
position:function(p){   //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
        }
    },
    legend: {
       orient: 'vertical',
top:'25%',
		right:0,
       itemWidth: 10,
        itemHeight: 10,
        data:['20-29岁','30-39岁','40-49岁','50岁以上'],
                textStyle: {
            color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    series: [
        {
        	name:'年龄分布',
            type:'pie',
			center: ['35%', '50%'],
            radius: ['40%', '50%'],
color: ['#62c98d', '#2f89cf', '#4cb9cf', '#e0c828','#e58c00','#eb295b'],	
            label: {show:false},
			labelLine: {show:false},
            data:[
  
                {value:4, name:'20-29岁'},
                {value:2, name:'30-39岁'},
                {value:2, name:'40-49岁'},
                {value:1, name:'50岁以上'},
            ]
        }
    ]
};
option2 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
position:function(p){   //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
        }
    },
    legend: {
        orient: 'vertical',
		top:'25%',
		right:'8%',
       itemWidth: 10,
        itemHeight: 10,
        data:['博士','硕士','本科','专科'],
                textStyle: {
            color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    series: [
        {
        	name:'学历构成',
            type:'pie',
			center: ['40%', '50%'],
            radius: ['40%', '50%'],
color: ['#62c98d', '#2f89cf', '#4cb9cf', '#e0c828','#e58c00','#eb295b'],	
            label: {show:false},
			labelLine: {show:false},
            data:[
                {value:10, name:'博士'},
                {value:20, name:'硕士'},
                {value:30, name:'本科'},
                {value:40, name:'专科'},
               
            ]
        }
    ]
};
option3 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
position:function(p){   //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
        }
    },
    legend: {
       orient: 'vertical',
top:'center',
		right:0,
       itemWidth: 10,
        itemHeight: 10,
        data:['数据分门别类','数据关系部门','今日数据交易'],
                textStyle: {
            color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    series: [
        {
        	name:'数据',
            type:'pie',
			center: ['35%', '50%'],
            radius: ['40%', '50%'],
color: ['#62c98d', '#2f89cf', '#4cb9cf', '#e0c828','#e58c00','#eb295b'],	
            label: {show:false},
			labelLine: {show:false},
            data:[
  
                {value:4, name:'数据分门别类'},
                {value:2, name:'数据关系部门'},
                {value:2, name:'今日数据交易'},
            ]
        }
    ]
};
option4 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
position:function(p){   //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
        }
    },
    legend: {
        orient: 'vertical',
		top:'center',
		right:'8%',
       itemWidth: 10,
        itemHeight: 10,
        data:['零销类','服务类','销售类','软件类','硬件类','其它类'],
                textStyle: {
            color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    series: [
        {
        	name:'业务分类',
            type:'pie',
			center: ['40%', '50%'],
            radius: ['40%', '50%'],
			color: ['#62c98d', '#2f89cf', '#4cb9cf', '#e0c828','#e58c00','#eb295b'],	
            label: {show:false},
			labelLine: {show:false},
            data:[
                {value:10, name:'零销类'},
                {value:20, name:'服务类'},
                {value:30, name:'销售类'},
                {value:40, name:'软件类'},
                {value:50, name:'硬件类'},
                {value:60, name:'其它类'},
            ]
        }
    ]
};
	option5 = {
    grid: {
        left: '0',
        right: '0',
		top: '10%',
        bottom: '24%',
        //containLabel: true
    },
  legend: {
        data: ['等待', '已办人数', '已办业务'],
		bottom:0,
	   itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: "#fff",
		    fontSize: '10',

        },
 
        itemGap: 5
    },
    tooltip: {
        show: "true",
        trigger: 'item'
    },
    yAxis: {
        type: 'value',
		show: false,
    },
    xAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#363e83',
                }
            },
            axisLabel: {
				show: false,
             //   inside: true,
                textStyle: {
                  color: "rgba(255,255,255,1)",
                    fontWeight: 'normal',
                    fontSize: '12',
                },
                // formatter:function(val){
                //     return val.split("").join("\n")
                // },
            },
            data: ['业务办量统计']
        }

    ],
    series: [
		 {
            name: '等待',
            type: 'bar',
            barWidth: '20',
			 
            itemStyle: {
                normal: {
                    show: true,
                    color:'#20aa92',
                    barBorderRadius: 50,
                    borderWidth: 0,
                }
            },
            zlevel: 2,
            barGap: '100%',
            data: [20],
			 label: {
				  formatter: "{c}人",
            show: true,
            position: 'top',
            textStyle: {
				fontSize:12,
                color: 'rgba(255,255,255,.6)',
            }
        },
        }, 
		{
            name: '已办人数',
            type: 'bar',
            itemStyle: {
                normal: {
                    show: true,
                    color:'#f4664e',
                    barBorderRadius: 50,
                    borderWidth: 0,
                }
            },
            zlevel: 2,
            barWidth: '20',
            data: [40],
			 label: {
				   formatter: "{c}人",
            show: true,
            position: 'top',
            textStyle: {
				fontSize:12,
                color: 'rgba(255,255,255,.6)',
            }
        },
        }, 
			{
            name: '已办业务',
            type: 'bar',
            itemStyle: {
                normal: {
                    show: true,
                    color:'#0c93dc',
                    barBorderRadius: 50,
                    borderWidth: 0,
                }
            },
            zlevel: 2,
            barWidth: '20',
            data: [127],
			 label: {
				  formatter: "{c}份",
            show: true,
            position: 'top',
            textStyle: {
				fontSize:12,
                color: 'rgba(255,255,255,.6)',
            }
        },
        }, 

    ]
};
	
option7 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '0%',
        top: '25px',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['2016', '2018', '2020', '2022', '2024'],
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 0.1,
                type: "solid"
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            interval: 0,
            show: true,
            splitNumber: 5,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: "rgba(255,255,255,.1)",
            }
        }
    }],
    legend: {
        data: ['人工智能', '云原生', '数据库', '大数据', '前端'], // 图例项
        textStyle: {
            color: 'rgba(255,255,255,.6)', // 图例文本颜色
            fontSize: 10,
        },
        orient: 'horizontal', // 水平布局
        top: 'top', // 图例放置在顶部
        left: 'right', // 图例居中
    },
    series: [
        {
            name: '人工智能',
            type: 'line',
            data: [38, 81, 156, 224, 373],
            itemStyle: {
                normal: {
                    color: '#2f89cf', // 自定义颜色
                    opacity: 1,
                    barBorderRadius: 5,
                }
            }
        },
        {
            name: '云原生',
            type: 'line',
            data: [203, 345, 488, 565, 565],
            itemStyle: {
                normal: {
                    color: '#FF5733', // 自定义颜色
                    opacity: 1,
                    barBorderRadius: 5,
                }
            }
        },
        {
            name: '数据库',
            type: 'line',
            data: [237, 317, 388, 472, 524],
            itemStyle: {
                normal: {
                    color: '#33FF57', // 自定义颜色
                    opacity: 1,
                    barBorderRadius: 5,
                }
            }
        },
        {
            name: '大数据',
            type: 'line',
            data: [71, 91, 107, 115, 115],
            itemStyle: {
                normal: {
                    color: '#FFD700', // 自定义颜色
                    opacity: 1,
                    barBorderRadius: 5,
                }
            }
        },
        {
            name: '前端',
            type: 'line',
            data: [59, 86, 103, 110, 110],
            itemStyle: {
                normal: {
                    color: '#8A2BE2', // 自定义颜色
                    opacity: 1,
                    barBorderRadius: 5,
                }
            }
        }
    ]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart2.setOption(option2);
        myChart3.setOption(option3);
        myChart4.setOption(option4);
        myChart5.setOption(option5);
        myChart7.setOption(option7);

        window.addEventListener("resize",function(){
            myChart.resize();
            myChart7.resize();
            myChart2.resize();
            myChart3.resize();
            myChart4.resize();
            myChart5.resize();
 
        });
    }


    function echarts_23() {
        // 初始化 Echarts 实例
        var myChart23 = echarts.init(document.getElementById('dd23'));
        // 配置 Echarts 图表选项
        var option23 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['0-15', '15-30', '30+'],
                bottom: '10%',  // 设置图例在底部
                orient: 'horizontal',  // 设置图例水平排列
                textStyle: {
                    color: '#fff',  // 设置字体颜色
                    fontSize: 14     // 设置字体大小
                }
            },

            grid: {
                top: '15%',  // 微调图表的位置，向上移动
                bottom: '25%'  // 保证图例和图表之间有足够空间
            },
            yAxis: {
                type: 'category',
                data: ['Artificial Intelligence', 'Big Data', 'Cloud Native'], // Y轴的分类
                axisLabel: {
                    show: true // 不显示 Y 轴标签
                },
                axisLine: {
                    show: false // 不显示 Y 轴线条
                },
                splitLine: {
                    show: false // 不显示 Y 轴网格线
                }
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    show: false // 不显示X 轴标签
                },
                axisLine: {
                    show: false // 不显示 X 轴线条
                },
                splitLine: {
                    show: false // 不显示 X 轴网格线
                }
            },
            series: [
                {
                    name: '0-15',
                    type: 'bar',
                    stack: '问题解决',
                    data: [84.04, 74.14, 64.82], // AI 的数据
                    itemStyle: {
                        color: '#2f89cf'  // AI 的颜色
                    }
                },
                {
                    name: '15-30',
                    type: 'bar',
                    stack: '问题解决',
                    data: [9.98, 22.41, 23.92], // Big Data 的数据
                    itemStyle: {
                        color: '#62c98d'  // Big Data 的颜色
                    }
                },
                {
                    name: '30+',
                    type: 'bar',
                    stack: '问题解决',
                    data: [5.99, 3.45, 11.27], // Block Chain 的数据
                    itemStyle: {
                        color: '#FFA500'  // Block Chain 的颜色
                    }
                }
            ]
        };
        
        // 将配置应用到 ECharts 实例
        myChart23.setOption(option23);
        
        // 自动调整大小
        window.addEventListener("resize", function() {
            myChart23.resize();
        });
        
    }
    
    // 在页面加载完成后调用函数生成 Echarts 堆叠柱状图
    //document.addEventListener('DOMContentLoaded', echarts_23);