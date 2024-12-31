document.addEventListener('DOMContentLoaded', function() {
  var container = document.getElementById('graph');
  if (!container) {
    console.error('Error: Container with ID "graph" not found!');
    return;
  }
  var chart = echarts.init(container);

  // 加载数据
  loadData(month);
});

function getUrlParam(param, defaultValue) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.has(param) ? urlParams.get(param) : defaultValue;
}

var container = document.getElementById('graph');
var chart = echarts.init(container);
var baseUrl = 'https://oss.open-digger.cn/';
var platform = decodeURIComponent(getUrlParam('platform', 'gitee'));
var repoName = decodeURIComponent(getUrlParam('repo', 'openeuler/mugen'));
var month = decodeURIComponent(getUrlParam('month', '202406'));
var typeMap = new Map([['r', 'repo'], ['i', 'issue'], ['p', 'pull'], ['u', 'user']]);

var loadData = m => {
  $.getJSON(
    `${baseUrl}${platform}/${repoName}/community_openrank.json`,
    onGraphDataLoaded);
}

var onGraphDataLoaded = graph => {
  var data = graph.data[month];
  var nodes = data.nodes.map(node => {
    var id = graph.meta.nodes[node[0]][0];
    var type = typeMap.get(id[0]);
    var name = graph.meta.nodes[node[0]][1];
    if (type === 'pull') name = '#' + id.slice(1);
    else if (type === 'issue') name = '#' + (platform == 'gitee' ? parseInt(id.slice(1)).toString(36).toUpperCase() : id.slice(1));
    return {
      id,
      initialValue: node[1],
      value: node[2],
      name,
      symbolSize: Math.log(node[2] + 1) * 10,  // Ensure size is not too small
      category: type,
    }});  
  var links = data.links.map(link => {
    return {
      source: graph.meta.nodes[link[0]][0],
      target: graph.meta.nodes[link[1]][0],
      value: link[2],
    };
  });

  // Ensure nodes of types 'issue' or 'pull' are connected to the repository node
  nodes.forEach(node => {
    if (node.category === 'issue' || node.category === 'pull') {
      links.push({
        source: graph.meta.nodes[0][0],  // Repository node
        target: node.id,
        value: 0.05,
      });
    }
  });

  var categories = Array.from(typeMap.values());
  var option = {
    legend: [
      {
        show:false,
        
      }
    ],
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: 'Collaborative graph',
        type: 'graph',
        layout: 'force',
        nodes,
        links,
        categories: categories.map(c => { return { name: c }; }),
        roam: false,  // 禁止图表缩放和平移
        label: {
          position: 'right',
          show: true,
          color: 'white',  // 修改字体颜色为白色
        },
        force: {
          layoutAnimation: false,
          repulsion: 300,  // 增加排斥力，使节点分布更开阔
          gravity: 0.1,  // 添加重力将节点拉向中心
          edgeLength: [50, 100],  // 调整边长避免节点重叠
          friction: 0.9  // 调整摩擦力使布局更加稳定
        },
      }
    ]
  };
  
  chart.setOption(option);
  chart.on('dblclick', function(params) {
    // 在此处处理双击事件，若需要可以显示一些详细信息
  });
}

loadData(month);
