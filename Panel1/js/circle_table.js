var ctx = document.getElementById('myDoughnutChart').getContext('2d');
            
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut', // 环状饼图
    data: {
        labels: ['云原生', '数据库', '人工智能', '大数据', '前端', '操作系统', '区块链', '物联网', '其他'], // 标签
        datasets: [{
            label: '领域仓库数量统计',
            data: [37.61, 26.85, 24.59, 5.02, 2.40, 1.86, 0.87, 0.76, 0.04], // 数据
            backgroundColor: [
                '#4E73DF', // 云原生
                '#1CC88A', // 数据库
                '#4682B4', // 人工智能
                '#36B9CC', // 大数据
                '#b89c9c', // 前端
                '#F8C8B2', // 操作系统
                '#6C757D', // 区块链
                '#8E44AD', // 物联网
                '#BDC3C7'  // 其他
            ], // 每个部分的背景颜色
            hoverBackgroundColor: [
                '#5C6BC0', '#26A69A', '#3d729e', '#2fa8bb', '#897171', '#F6D2B0', '#7A838A', '#9B58A5', '#BDC3C7'
            ], // 鼠标悬停时的颜色
            borderColor: 'rgba(255, 255, 255, 0.7)', // 边框颜色
            borderWidth: 1 // 边框宽度
        }]
    },
    options: {
        responsive: true, // 使图表自适应
        plugins: {
            legend: {
                position: 'bottom', // 图例位置
                labels: {
                            font: {
                                size: 14, // 字体大小
                                family: 'Arial, sans-serif', // 字体样式
                            },
                            color: 'white', // 图例字体颜色设置为白色
                            padding: 10, // 图例与图表的间距
                            boxWidth: 20, // 图例方块的宽度
                            boxHeight: 10, // 图例方块的高度
                        }

            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%'; // 格式化显示百分比
                    }
                }
            }
        },
        cutoutPercentage: 60, // 环状饼图的“切割”程度，值越大，中间的空白越多
    }
});