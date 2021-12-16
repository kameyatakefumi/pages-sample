const labels = [], values = [];

const xhr = new XMLHttpRequest();
xhr.open("GET", './data.csv', true);
xhr.onload = function() {
  if (xhr.status == 200) {
    const lines = xhr.responseText.split(/\r\n|\n/);
    for (let i = 0; i < lines.length - 1; ++i) {
      const items = lines[i].split(',');
      labels.push(items[0]);
      values.push(items[1]);
    }
    cChart.update();
  }
}
xhr.send(null);

const data = {
  labels: labels,
  datasets: [{
    label: 'Number of comments per minute',
    borderColor: 'rgb(255, 99, 132)',
    data: values,
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    events: ['click'],
    onClick: function (e, el) {
      if (! el || el.length === 0) return;
      document.getElementById('yIframe').src = yUrl + '?start=' + (60 * el[0].index)
    }
  }
};

const cChart = new Chart(
  document.getElementById('cChart'),
  config
);