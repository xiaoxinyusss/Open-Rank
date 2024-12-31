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

var hwOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['src-openeuler/chromium', 'src-openeuler/ffmpeg', 'openeuler/openeuler-jenkins', 'src-openeuler/wireshark', 'mindspore/serving'],  // 添加折线4和折线5
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
        min: 0,  // 纵轴最小值
        max: 50  // 纵轴最大值
    }],
    series: [{
        name: 'src-openeuler/chromium',
        type: 'line',
        smooth: true,
        data: [13.010, 19.81, 14.34, 29.80, 9.32, 9.350, 10.31, 12.41, 13.220, 37.910000, 13.070, 7.69],  
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'src-openeuler/ffmpeg',
        type: 'line',
        smooth: true,
        data: [4.690, 4.02, 11.84, 2.02, 18.89, 5.590, 44.03, 43.70, 23.220, 16.040000, 4.400, 11.13],  
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'openeuler/openeuler-jenkins',
        type: 'line',
        smooth: true,
        data:[13.050, 19.76, 9.16, 11.24, 18.82, 7.410, 5.96, 19.93, 26.330, 9.880000, 6.450, 12.23], 
        itemStyle: {
            normal: {
                color: '#f1c40f',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'src-openeuler/wireshark',  // 新添加的折线
        type: 'line',
        smooth: true,
        data: [2.740, 16.73, 6.32, 14.54, 3.90, 18.010, 4.30, 3.19, 18.970, 9.050000, 26.620, 12.94],
        itemStyle: {
            normal: {
                color: '#9b59b6',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'mindspore/serving',  // 新添加的折线
        type: 'line',
        smooth: true,
        data: [20.110, 29.55, 11.73, 21.89, 2.47, 9.110, 2.68, 4.75, 5.370, 6.260000, 12.720, 9.57],
        itemStyle: {
            normal: {
                color: '#e74c3c',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }]
};


var alOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: [
            'anolis-challenge/summer2022',
            'src-openeuler/buildah',
            'src-openeuler/libtiff',
            'src-openeuler/python-jwcrypto',
            'src-openeuler/git-lfs'
        ],
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
        min: 0,  // 纵轴最小值
        max: 50  // 纵轴最大值
    }],
    series: [{
        name: 'anolis-challenge/summer2022',
        type: 'line',
        smooth: true,
        data:  [9.500, 8.55, 15.10, 42.03, 48.18, 13.230, 12.95, 14.44, 12.520, 9.720000, 11.750, 16.50],  
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'src-openeuler/buildah',
        type: 'line',
        smooth: true,
        data: [13.375, 8.61, 11.30, 11.24, 16.14, 7.625, 4.25, 1.95, 3.380, 6.963333, 3.970, 1.81],  
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'src-openeuler/libtiff',
        type: 'line',
        smooth: true,
        data:[16.490, 5.31, 0.72, 2.77, 3.50, 12.240, 2.90, 14.70, 20.640, 6.070000, 2.758, 1.43], 
        itemStyle: {
            normal: {
                color: '#f1c40f',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'src-openeuler/python-jwcrypto',  // 新添加的折线
        type: 'line',
        smooth: true,
        data: [2.220, 1.78, 7.64, 4.64, 6.67, 4.230, 2.97, 2.67, 2.020, 3.970000, 1.950, 0.72],
        itemStyle: {
            normal: {
                color: '#9b59b6',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'src-openeuler/git-lfs',  // 新添加的折线
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


var qlOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: [
            'openharmony/security_selinux_adapter',
            'anolis-challenge/activity-school',
            'openeuler/mugen',
            'openeuler/docs',
            'opengauss/docs'
        ],
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
        min: 0,  // 纵轴最小值
        max: 2100  // 纵轴最大值
    }],
    series: [{
        name: 'openharmony/security_selinux_adapter',
        type: 'line',
        smooth: true,
        data: [389.490, 326.67, 215.89, 359.77, 334.02, 486.040, 376.85, 513.94, 402.220, 425.550000, 391.090, 313.85],  
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'anolis-challenge/activity-school',
        type: 'line',
        smooth: true,
        data: [15.090, 8.51, 53.13, 994.17, 2078.66, 51.110, 45.57, 5.51, 40.805, 8.060000, 46.540, 48.57], 
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: 'openeuler/mugen',
        type: 'line',
        smooth: true,
        data:[147.500, 150.87, 143.94, 400.44, 260.67, 198.560, 153.21, 228.51, 174.040, 134.150000, 115.330, 88.18],
        itemStyle: {
            normal: {
                color: '#f1c40f',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'openeuler/docs',  // 新添加的折线
        type: 'line',
        smooth: true,
        data:[496.850, 232.76, 113.38, 120.28, 166.04, 163.090, 181.20, 118.44, 95.260, 165.210000, 80.790, 130.83],
        itemStyle: {
            normal: {
                color: '#9b59b6',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    },
    {
        name: 'opengauss/docs',  // 新添加的折线
        type: 'line',
        smooth: true,
        data: [158.670, 129.47, 98.45, 197.00, 90.17, 101.020, 148.41, 178.07, 173.700, 313.480000, 154.000, 151.07],
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
var averageOption ={
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['华为', '阿里巴巴', '开放麒麟'],
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
        min: 0,  // 纵轴最小值
        max: 30  // 纵轴最大值
    }],
    series: [{
        name: '华为',
        type: 'line',
        smooth: true,
        data: [5.85,5.04,4.56,6.40,6.37,5.83,5.73,5.24,5.69,5.79,4.71,4.62],
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: '阿里巴巴',
        type: 'line',
        smooth: true,
        data: [8.61,5.33,5.99,12.05,12.06,7.24,5.10,5.90,7.05,4.73,4.22,3.57],
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: '开放麒麟',
        type: 'line',
        smooth: true,
        data:[24.58,20.36,16.50,25.34,29.31,25.39,24.14,26.76,28.47,28.53,24.71,27.46],
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
        data: ['华为', '阿里巴巴', '开放麒麟'],
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
        min: 0,  // 纵轴最小值
        max: 30  // 纵轴最大值
    }],
    series: [{
        name: '华为',
        type: 'line',
        smooth: true,
        data: [5.85,5.04,4.56,6.40,6.37,5.83,5.73,5.24,5.69,5.79,4.71,4.62],
        itemStyle: {
            normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: '阿里巴巴',
        type: 'line',
        smooth: true,
        data: [8.61,5.33,5.99,12.05,12.06,7.24,5.10,5.90,7.05,4.73,4.22,3.57],
        itemStyle: {
            normal: {
                color: '#62c98d',
                opacity: 1,
                barBorderRadius: 5,
            }
        }
    }, {
        name: '开放麒麟',
        type: 'line',
        smooth: true,
        data:[24.58,20.36,16.50,25.34,29.31,25.39,24.14,26.76,28.47,28.53,24.71,27.46],
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

    if (chartType === 'Huawei') {
        option = hwOption;
    } else if (chartType === 'Alibaba') {
        option = alOption;
    } else if (chartType === 'openKylin') {
        option = qlOption;
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
    $('#hwButton').on('click', function() {
        switchChart('Huawei');
    });
    $('#alButton').on('click', function() {
        switchChart('Alibaba');
    });
    $('#qlButton').on('click', function() {
        switchChart('openKylin');
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
                data: ['0-5', '5-10', '10+'],
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
                data: ['Huawei', 'Alibaba', 'openKylin'], // Y轴的分类
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
                    name: '0-5',
                    type: 'bar',
                    stack: '问题解决',
                    data: [95.42, 99.56,59.25], 
                    itemStyle: {
                        color: '#2f89cf' 
                    }
                },
                {
                    name: '5-10',
                    type: 'bar',
                    stack: '问题解决',
                    data: [1.28, 0.17, 14.95], 
                    itemStyle: {
                        color: '#62c98d'  
                    }
                },
                {
                    name: '10+',
                    type: 'bar',
                    stack: '问题解决',
                    data: [3.3,0.27, 25.79], 
                    itemStyle: {
                        color: '#FFA500'  
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