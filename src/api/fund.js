import request from "../util/request";

var richestOrgPie = {
  title: { text: "接受最多基金机构TOP 5", x: "center" },
  tooltip: {
    trigger: "item",
    formatter: "{b}:{c}"
  },
  legend: {
    x: "center",
    y: "bottom",
    data: []
  },
  calculable: true,
  series: [
    {
      type: "pie",
      radius: [20, 110],
      center: ["50%", "50%"],
      roseType: "radius",
      lableLine: {
        normal: { show: false },
        emphasis: { show: true }
      },
      label: {
        normal: {
          textStyle: {
            color: "rgba(0,0,0,0.3)"
          }
        },
        emphasis: { show: true }
      },
      labelLine: {
        normal: {
          color: "#C23531",
          shadowBlur: 200,
          shadowColor: "rgba(0,0,0,0.5)"
        }
      },
      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: function(idx) {
        return Math.random() * 200;
      },
      data: []
    }
  ]
};

var richestPersonPie = {
  title: { text: "接受最多基金人员TOP 5", x: "center" },
  tooltip: {
    trigger: "item",
    formatter: "{b}:{c}"
  },
  legend: {
    x: "center",
    y: "bottom",
    data: []
  },
  calculable: true,
  series: [
    {
      type: "pie",
      radius: [20, 110],
      center: ["50%", "50%"],
      roseType: "radius",
      lableLine: {
        normal: { show: false },
        emphasis: { show: true }
      },
      label: {
        normal: {
          textStyle: {
            color: "rgba(0,0,0,0.3)"
          }
        },
        emphasis: { show: true }
      },
      labelLine: {
        normal: {
          color: "#C23531",
          shadowBlur: 200,
          shadowColor: "rgba(0,0,0,0.5)"
        }
      },
      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: function(idx) {
        return Math.random() * 200;
      },
      data: []
    }
  ]
};

export default {
  getOrg(cb, submit_data) {
    request({
      url:
        "ipd/fund/organization/institution/top5/" +
        encodeURIComponent(submit_data),
      method: "get"
    }).then(response => {
      let res = response.data;
      let len = res["data"].length;
      for (let i = 0; i < len; i++) {
        richestOrgPie.series[0].data.push({
          name: res["data"][i]["institution_name"],
          value: res["data"][i]["value"]
        });
        richestOrgPie.legend.data.push(res["data"][i]["institution_name"]);
      }
      console.log(richestOrgPie);
      cb(richestOrgPie);
    });
  },
  getPerson(cb, submit_data) {
    request({
      url:
        "ipd/fund/organization/person/top5/" + encodeURIComponent(submit_data),
      method: "get"
    }).then(response => {
      let res = response.data;
      console.log(res);
      let len = res["data"].length;
      for (let i = 0; i < len; i++) {
        richestPersonPie.series[0].data.push({
          name: res["data"][i]["person_name"],
          value: res["data"][i]["value"]
        });
        richestPersonPie.legend.data.push(res["data"][i]["person_name"]);
      }
      cb(richestPersonPie);
    });
    setTimeout(() => cb(richestPersonPie), 1000);
  }
};
