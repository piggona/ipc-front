import echarts from "echarts";
import request from "../util/request";

var barOption = {
  color: ["#3398DB"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      label: {
        show: true
      }
    }
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  legend: {
    data: ["专利数量"],
    itemGap: 5
  },
  grid: {
    top: "12%",
    left: "8%",
    right: "10%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      // data: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
      data: []
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "专利数量",
      axisLabel: {
        formatter: function(a) {
          a = +a;
          return isFinite(a) ? echarts.format.addCommas(+a) : "";
        }
      }
    }
  ],
  dataZoom: [
    {
      show: true,
      start: 0,
      end: 100
    },
    {
      type: "inside",
      start: 94,
      end: 100
    },
    {
      show: true,
      yAxisIndex: 0,
      filterMode: "empty",
      width: 30,
      height: "80%",
      showDataShadow: false,
      left: "93%"
    }
  ],
  series: [
    {
      name: "专利数量",
      type: "bar",
      // data: ['0', '1', '2', '3', '60', '12']
      data: []
    }
  ]
};

var trendOption = {
  title: {
    text: ""
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: ["SamSung", "LG", "Apple", "IBM", "MS"]
    // data: []
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["2001", "2002", "2003", "2004", "2005", "2006", "2007"]
    // data: []
  },
  yAxis: {
    type: "value",
    name: "专利数量"
  },
  series: [
    {
      name: "SamSung",
      type: "line",
      stack: "总量",
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "LG",
      type: "line",
      stack: "总量",
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: "Apple",
      type: "line",
      stack: "总量",
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: "IBM",
      type: "line",
      stack: "总量",
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: "MS",
      type: "line",
      stack: "总量",
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};

var assigneeScatterOption = {
  // title: {
  //     text: '机构实力对比'
  // },
  legend: {
    // data: []
    data: ["1990", "2015"]
  },
  xAxis: {
    type: "value",
    scale: true,
    name: "专利总数",
    splitLine: {
      lineStyle: {
        type: "dashed"
      }
    }
  },
  yAxis: {
    type: "value",
    name: "近五年专利占比",
    boundaryGap: ["0%", "10%"],
    splitLine: {
      lineStyle: {
        type: "dashed"
      }
    },
    scale: true,
    min: 0,
    max: 1.2
  },
  toolbox: {
    feature: {
      mark: { show: true },
      dataZoom: { show: true },
      dataView: { show: true }
    }
  },
  // series: []
  series: [
    {
      name: "1990",
      data: [],
      type: "scatter",
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      label: {
        emphasis: {
          show: true,
          formatter: function(param) {
            return param.data[3];
          },
          position: "top"
        }
      },
      itemStyle: {
        normal: {
          shadowBlur: 10,
          shadowColor: "rgba(120, 36, 50, 0.5)",
          shadowOffsetY: 5,
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: "rgb(251, 118, 123)"
            },
            {
              offset: 1,
              color: "rgb(204, 46, 72)"
            }
          ])
        }
      }
    },
    {
      name: "2015",
      data: [],
      type: "scatter",
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      label: {
        emphasis: {
          show: true,
          formatter: function(param) {
            return param.data[3];
          },
          position: "top"
        }
      },
      itemStyle: {
        normal: {
          shadowBlur: 10,
          shadowColor: "rgba(25, 100, 150, 0.5)",
          shadowOffsetY: 5,
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: "rgb(129, 227, 238)"
            },
            {
              offset: 1,
              color: "rgb(25, 183, 207)"
            }
          ])
        }
      }
    }
  ]
};

var inventorScatterOption = {
  // title: {
  //     text: '发明人实力对比'
  // },
  legend: {
    // data: [],
    data: ["1990", "2015"]
  },
  xAxis: {
    type: "value",
    name: "专利总数",
    scale: true,
    splitLine: {
      lineStyle: {
        type: "dashed"
      }
    }
  },
  yAxis: {
    type: "value",
    name: "近五年专利占比",
    boundaryGap: ["0%", "10%"],
    splitLine: {
      lineStyle: {
        type: "dashed"
      }
    },
    scale: true,
    min: 0,
    max: 1.2
  },
  // series: [],
  series: [
    {
      name: "1990",
      data: [],
      type: "scatter",
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      label: {
        emphasis: {
          show: true,
          formatter: function(param) {
            return param.data[3];
          },
          position: "top"
        }
      },
      itemStyle: {
        normal: {
          shadowBlur: 10,
          shadowColor: "rgba(120, 36, 50, 0.5)",
          shadowOffsetY: 5,
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: "rgb(251, 118, 123)"
            },
            {
              offset: 1,
              color: "rgb(204, 46, 72)"
            }
          ])
        }
      }
    },
    {
      name: "2015",
      data: [],
      type: "scatter",
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      label: {
        emphasis: {
          show: true,
          formatter: function(param) {
            return param.data[3];
          },
          position: "top"
        }
      },
      itemStyle: {
        normal: {
          shadowBlur: 10,
          shadowColor: "rgba(25, 100, 150, 0.5)",
          shadowOffsetY: 5,
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: "rgb(129, 227, 238)"
            },
            {
              offset: 1,
              color: "rgb(25, 183, 207)"
            }
          ])
        }
      }
    }
  ]
};

var lifeOption = {
  dataZoom: {
    type: "inside"
  },
  xAxis: {
    type: "value",
    name: "专利数量",
    scale: true
  },
  yAxis: {
    type: "value",
    name: "发明人数量",
    scale: true
  },
  visualMap: {
    show: false,
    dimension: 1
  },
  series: []
};

export default {
  getKeyword(cb, submit_data, isWord) {
    request({
      url: "ipd/chart/patent/keyword/" + submit_data + "/?isWord=" + isWord,
      method: "get"
    }).then(response => {
      cb(response.data);
    });
  },
  getTech(cb, submit_data, isWord) {
    request({
      url: "ipd/chart/patent/source/" + submit_data + "/?isWord=" + isWord,
      method: "get"
    }).then(response => {
      let res = response.data;
      let l = res["patent"].length;
      for (let i = 0; i < l; i++) {
        let tmp = res["patent"][i]["applicationDate"];
        res["patent"][i]["applicationDate"] =
          tmp.slice(0, 4) + "-" + tmp.slice(4, 6) + "-" + tmp.slice(6, 8);
      }
      cb(res);
    });
  },
  getStatic(cb, submit_data, isWord) {
    request({
      url: "ipd/chart/patent/n_citations/" + submit_data + "/?isWord=" + isWord,
      method: "get"
    }).then(response => {
      console.log("TechStatic:", response.data);
      cb(response.data);
    });
  },
  getBarOption(cb, submit_data, isWord) {
    request({
      url: "ipd/chart/patent/trend/" + submit_data + "/?isWord=" + isWord,
      method: "get"
    }).then(response => {
      let res = response.data;
      if (res && "data" in res && res["data"].length > 0) {
        let myres = res["data"];
        let year_min = myres[0]["year"];
        let year_max = myres[myres.length - 1]["year"];
        if (year_max - year_min < 9) {
          year_min = year_max - 9;
        }
        let t_idx = 0;
        for (let i = year_min; i <= year_max; i++) {
          if (myres[t_idx]["year"] != i) {
            barOption.xAxis[0].data.push(i);
            barOption.series[0].data.push(0);
          } else {
            barOption.xAxis[0].data.push(i);
            barOption.series[0].data.push(myres[t_idx]["val"]);
            t_idx = t_idx + 1;
          }
        }
      }
      cb(barOption);
    });
  },
  getTrendOption(cb, submit_data, isWord) {
    request({
      url: "ipd/chart/patent/top5/" + submit_data + "/?isWord=" + isWord,
      method: "get"
    }).then(response => {
      let res = response.data;
      if (res && "lines" in res && res["lines"].length > 0) {
        console.log("TREND");
        // console.log(res);
        let myres = res["lines"];
        let num_lines = myres.length;
        let year_min = 2147483647;
        let year_max = 0;
        for (let i = 0; i < num_lines; i++) {
          if (year_min > myres[i]["data"][0]["year"]) {
            year_min = myres[i]["data"][0]["year"];
          }
          if (
            year_max < myres[i]["data"][myres[i]["data"].length - 1]["year"]
          ) {
            year_max = myres[i]["data"][myres[i]["data"].length - 1]["year"];
          }
        }
        trendOption.xAxis["data"] = new Array();
        for (let i = year_min; i <= year_max; i++) {
          trendOption.xAxis["data"].push(i);
        }
        trendOption.series = new Array();
        for (let i = 0; i < num_lines; i++) {
          trendOption.legend["data"].push(myres[i]["name"]);
          let t = {
            name: myres[i]["name"],
            uuid: myres[i]["uuid"],
            data: new Array(),
            type: "line"
          };
          let t_idx = 0;
          let flag = 0;
          for (let j = year_min; j <= year_max; j++) {
            if (flag === 0 && j === myres[i]["data"][t_idx]["year"]) {
              t["data"].push(myres[i]["data"][t_idx]["val"]);
              t_idx = t_idx + 1;
              if (t_idx >= myres[i]["data"].length) {
                flag = 1;
              }
            } else {
              t["data"].push(0);
            }
          }
          trendOption.series.push(t);
        }
      }
      cb(trendOption);
    });
  },
  getAssigneeScatterOption(cb, submit_data, isWord) {
    request({
      url: "ipd/chart/patent/institution/" + submit_data + "/?isWord=" + isWord,
      method: "get"
    }).then(response => {
      let res = response.data;
      console.log("getAssigneeScatterOption:", res);
      let scatterRes = res["points"];
      let most = { count: 0 };
      let newer = { count: 0 };
      res.points.map(x => {
        if (x.latest_count > newer.count) {
          newer = { name: x.name, uuid: x.uuid, count: x.latest_count };
        }
        if (x.total_count > most.count) {
          most = { name: x.name, uuid: x.uuid, count: x.total_count };
        }
      });
      if (res) {
        assigneeScatterOption.series = new Array();
        let points_cnt = scatterRes.length;
        let max_tot = 0;
        let max_new_rate = 0.0;
        for (let i = 0; i < points_cnt; i++) {
          let t = {
            name: scatterRes[i]["name"],
            uuid: scatterRes[i]["uuid"],
            data: [
              [
                scatterRes[i]["total_count"],
                (scatterRes[i]["latest_count"] * 1.0) /
                  scatterRes[i]["total_count"]
              ]
            ],
            type: "scatter"
          };
          // t.symbolSize = (scatterRes[i]["total_count"] - scatterRes[i]["latest_count"]) / 100.0;
          // if (t.symbolSize < 20) {
          //     t.symbolSize = 20;
          // }
          // if (t.symbolSize > 100) {
          //     t.symbolSize = 100;
          // }
          if (scatterRes[i]["total_count"] > max_tot) {
            max_tot = scatterRes[i]["total_count"];
          }
          if (
            (scatterRes[i]["latest_count"] * 1.0) /
              scatterRes[i]["total_count"] >
            max_new_rate
          ) {
            max_new_rate =
              (scatterRes[i]["latest_count"] * 1.0) /
              scatterRes[i]["total_count"];
          }
          t.label = {
            emphasis: {
              show: true,
              formatter: scatterRes[i]["name"],
              position: "top"
            }
          };
          // assigneeScatterOption.legend.data.push(scatterRes[i]["name"]);
          assigneeScatterOption.series.push(t);
        }
        if (max_new_rate <= 0) {
          max_new_rate = 0.01;
        }
        for (let i = 0; i < points_cnt; i++) {
          assigneeScatterOption.series[i].symbolSize =
            Math.abs(
              (assigneeScatterOption.series[i].data[0][0] * 1.0) / max_tot -
                (assigneeScatterOption.series[i].data[0][1] * 1.0) /
                  max_new_rate
            ) * 200;
          if (assigneeScatterOption.series[i].symbolSize < 20) {
            assigneeScatterOption.series[i].symbolSize = 20;
          }
          if (assigneeScatterOption.series[i].symbolSize > 100) {
            assigneeScatterOption.series[i].symbolSize = 100;
          }
          // console.log("DATA");
          // console.log(assigneeScatterOption.series[i].data);
          // console.log("SIZE");
          // console.log(assigneeScatterOption.series[i].symbolSize);
        }
      }
      console.log(
        "getAssigneeScatterOption:",
        assigneeScatterOption,
        most,
        newer
      );
      cb(assigneeScatterOption, most, newer);
    });
  },
  getInventorScatterOption(cb, submit_data, isWord) {
    request({
      url: "ipd/chart/patent/inventors/" + submit_data + "/?isWord=" + isWord,
      method: "get"
    }).then(response => {
      let res = response.data;
      console.log("getInventorScatterOption:", res);
      let most = { count: 0 };
      let newer = { count: 0 };
      res.points.map(x => {
        if (x.latest_count > newer.count) {
          newer = { name: x.name, uuid: x.uuid, count: x.latest_count };
        }
        if (x.total_count > most.count) {
          most = { name: x.name, uuid: x.uuid, count: x.total_count };
        }
      });

      let scatterRes = res["points"];
      console.log("SCATTER");
      console.log(scatterRes);
      if (res) {
        // 接收页面信息
        inventorScatterOption.series = new Array();
        let points_cnt = scatterRes.length;
        let max_tot = 0;
        let max_new_rate = 0.0;
        for (let i = 0; i < points_cnt; i++) {
          let t = {
            name: scatterRes[i]["name"],
            uuid: scatterRes[i]["uuid"],
            data: [
              [
                scatterRes[i]["total_count"],
                (scatterRes[i]["latest_count"] * 1.0) /
                  scatterRes[i]["total_count"]
              ]
            ],
            type: "scatter"
          };
          t.symbolSize =
            scatterRes[i]["total_count"] - scatterRes[i]["latest_count"];
          // if (t.symbolSize < 20) {
          //     t.symbolSize = 20;
          // }
          // if (t.symbolSize > 100) {
          //     t.symbolSize = 100;
          // }
          if (scatterRes[i]["total_count"] > max_tot) {
            max_tot = scatterRes[i]["total_count"];
          }
          if (
            (scatterRes[i]["latest_count"] * 1.0) /
              scatterRes[i]["total_count"] >
            max_new_rate
          ) {
            max_new_rate =
              (scatterRes[i]["latest_count"] * 1.0) /
              scatterRes[i]["total_count"];
          }
          t.label = {
            emphasis: {
              show: true,
              formatter: scatterRes[i]["name"],
              position: "top"
            }
          };
          // inventorScatterOption.legend.data.push(scatterRes[i]["name"]);
          inventorScatterOption.series.push(t);
        }
        if (max_new_rate <= 0) {
          max_new_rate = 0.01;
        }
        for (let i = 0; i < points_cnt; i++) {
          inventorScatterOption.series[i].symbolSize =
            Math.abs(
              (inventorScatterOption.series[i].data[0][0] * 1.0) / max_tot -
                (inventorScatterOption.series[i].data[0][1] * 1.0) /
                  max_new_rate
            ) * 200;
          if (inventorScatterOption.series[i].symbolSize < 20) {
            inventorScatterOption.series[i].symbolSize = 20;
          }
          if (inventorScatterOption.series[i].symbolSize > 100) {
            inventorScatterOption.series[i].symbolSize = 100;
          }
          // console.log("DATA");
          // console.log(inventorScatterOption.series[i].data);
          // console.log("SIZE");
          // console.log(inventorScatterOption.series[i].symbolSize);
        }
      }
      cb(inventorScatterOption, most, newer);
    });
  },
  getLifeOption(cb, submit_data, isWord) {
    request({
      url: "ipd/chart/patent/lifecycle/" + submit_data + "/?isWord=" + isWord,
      method: "get"
    }).then(response => {
      let res = response.data;
      lifeOption.legend = {
        data: [submit_data]
      };
      let len = res["data"].length;
      let lineSeries = {
        name: submit_data,
        type: "graph",
        coordinateSystem: "cartesian2d",
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: 5,
        legendHoverLink: false,
        lineStyle: { normal: { color: "#333" } },
        itemStyle: { normal: { borderWidth: 1, borderColor: "#333" } },
        label: { normal: { position: "right", textStyle: { color: "#333" } } },
        symbolSize: 10,
        animationDelay: function(idx) {
          return idx * 100;
        }
      };
      lineSeries.data = Array();
      lineSeries.links = Array();
      for (let i = 0; i < len; i++) {
        lineSeries.data.push({
          label: {
            normal: {
              show: false
            },
            emphasis: {
              position: "top",
              show: true
            }
          },
          name: res["data"][i]["year"],
          value: [
            res["data"][i]["patent_count"],
            res["data"][i]["inventor_count"]
          ]
        });
      }
      for (let i = 1; i < len; i++) {
        lineSeries.links.push({ source: i - 1, target: i });
      }
      lifeOption.series.push(lineSeries);
      cb(lifeOption);
    });
  },
  getGroupOption(cb, submit_data, isWord) {
    request({
      url: "ipd/chart/patent/group/" + submit_data + "/?isWord=" + isWord,
      method: "get"
    }).then(response => {
      let res = response.data.data;
      console.log("ipd/chart/patent/group/:",res);
      cb(res)
    })
  }
};
