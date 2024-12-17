document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('graph');
    if (!container) {
      console.error('Error: Container with ID "graph" not found!');
      return;
    }
    var chart = echarts.init(container);
    loadData(month);
  });
  

function getUrlParam(param, defaultValue) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.has(param) ? urlParams.get(param) : defaultValue;
  }
  
var container = document.getElementById('graph');
var chart = echarts.init(container);
var baseUrl = 'https://oss.open-digger.cn/';
var platform = decodeURIComponent(getUrlParam('platform', 'github'));
var repoName = decodeURIComponent(getUrlParam('repo', 'X-lab2017/open-digger'));
var month = decodeURIComponent(getUrlParam('month', '202406'));
var typeMap = new Map([
  ['r', 'repo'], ['i', 'issue'], ['p', 'pull'], ['u', 'user']
]);

var loadData = m => {
  $.getJSON(
    `${baseUrl}${platform}/${repoName}/community_openrank.json`,
    onGraphDataLoaded);    
}

var clearDiv = id => {
  var div = document.getElementById(id);
  if (div && div.hasChildNodes()) {
    var children = div.childNodes;
    for (var child of children) {
      div.removeChild(child);
    }
  }
}

var addRow = (table, texts) => {
  var tr = table.insertRow();
  for (var t of texts) {
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(t.toString().slice(0, 20)));
  }
}

var setLeaderboard = graph => {
  clearDiv('leaderboard_table');
  var table = document.getElementById('leaderboard_table');
  addRow(table, ['Login', 'OpenRank']);
  var users = graph.data[month].nodes.map(node => ({
    id: graph.meta.nodes[node[0]][0],
    initialValue: node[1],
    value: node[2],
    login: graph.meta.nodes[node[0]][1]
  })).filter(n => n.id[0] === 'u').sort((a, b) => b.value - a.value);
  for (var u of users) {
    addRow(table, [u.login, u.value]);
  }
}

var setDetails = (graph, id) => {
  clearDiv('details_table');
  var table = document.getElementById('details_table');
  var index = graph.meta.nodes.findIndex(i => i[0] === id);
  var data = graph.data[month];
  var selfNode = data.nodes.find(i => i[0] === index);
  addRow(table, ['From', 'Ratio', 'Value', 'OpenRank']);
  addRow(table, ['Self', graph.meta.retentionFactor, selfNode[1], (graph.meta.retentionFactor * selfNode[1]).toFixed(3) ]);
  
  var other = data.links.filter(l => l[1] == index).map(l => {
    var sourceIndex = l[0];
    var sourceNode = graph.meta.nodes[sourceIndex];
    var sourceValue = data.nodes.find(i => i[0] === sourceIndex);
    var type = typeMap.get(sourceNode[0][0]);
    var name = sourceNode[1];
    if (type === 'pull') name = '#' + sourceNode[0].slice(1) + ' ' + sourceNode[1];
    else if (type === 'issue') name = '#' + (platform == 'gitee' ? parseInt(sourceNode[0].slice(1)).toString(36).toUpperCase() : sourceNode[0].slice(1)) + ' ' + sourceNode[1];
    return [
      name,
      parseFloat((1 - graph.meta.retentionFactor) * l[2]).toFixed(3),
      sourceValue[2],
      parseFloat(((1 - graph.meta.retentionFactor) * l[2] * sourceValue[2]).toFixed(3))
    ];
  }).sort((a, b) => b[3] - a[3]);
  var repoNode = data.nodes.find(i => i[0] === 0);
  other.push([
    graph.meta.repoName,
    (1 / (data.nodes.length - 1)).toFixed(3),
    repoNode[2],
    ((1 / (data.nodes.length - 1)) * repoNode[2]).toFixed(3),
  ]);
  for (var r of other) {
    addRow(table, r);
  }
}

var onGraphDataLoaded = graph => {
  setLeaderboard(graph);
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
      symbolSize:  Math.log(node[2] + 1) * 10,
      category: type,
    }});
  var links = data.links.map(link => {
    return {
      source: graph.meta.nodes[link[0]][0],
      target: graph.meta.nodes[link[1]][0],
      value: link[2],
    };
  });
  nodes.forEach(node => {
    if (node.category === 'issue' || node.category === 'pull') {
      links.push({
        source: graph.meta.nodes[0][0],
        target: node.id,
        value: 0.05,
      });
    }
  });
  var categories = Array.from(typeMap.values());
  var option = {
    title: {
      text: `Community OpenRank for ${repoName} in ${month}`,
      top: 'bottom',
      left: 'right'
    },
    legend: [
      {
        data: categories,
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
        roam: true,
        label: {
          position: 'right',
          show: true,
        },
        force: {
          layoutAnimation: false,
          repulsion: 300
        },
      }
    ]
  };
  chart.setOption(option);
  chart.on('dblclick', function(params) {
    setDetails(graph, params.data.id);
  });
}

loadData(month);
