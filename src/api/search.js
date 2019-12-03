// import random from "lodash/random";
import request from "../util/request";
import $ from "jquery";

var tree = {
  data: [
    {
      title: {
        content: "",
        uuid: ""
      },
      depth: "",
      phrase: "",
      content: "",
      color: "color: #E74C3C",
      next: [
        {
          title: {
            content: "",
            uuid: ""
          },
          depth: "",
          phrase: "",
          content: "",
          next: [{}]
        }
      ]
    }
  ]
};

export default {
  getTree(cb) {
    request({
      url: "ipd/tree/",
      method: "get"
    }).then(response => {
      let res = response.data;
      res.data.map(x => {
        x.depth = 0;
      });
      // let result = $.extend(true, res, res);
      console.log("api/search.js:", res);
      cb(res);
    });
    // _treeNode.map(x => (x.randHash = random(100)));
    // setTimeout(() => cb(_treeNode), 1000);
  },
  getSearch(cb, errorCb, search_data) {
    request({
      url: "ipd/chart/patent/search/" + search_data,
      method: "get"
    }).then(response => {
      let res = response.data;
      if (res && "data" in res && res["data"] && res["data"].length > 0) {
        let res_len = res["data"].length;
        for (let i = 0; i < res_len; i++) {
          res["data"][i].ipc_id = res["data"][i].ipc.replace(/\s/g, "_");
          let t_len = res["data"][i].des.length;
          for (let j = 0; j < t_len; j++) {
            res["data"][i].des[j].index = encodeURIComponent(
              res["data"][i].des[j].index
            );
          }
        }
        cb(res.data);
      } else {
        errorCb(res);
      }
    });
    // setTimeout(() => {
    //   console.log(search_data);
    //   _searchNode.map(x => {
    //     x.ipc = "ipc description" + String(random(100));
    //   });
    //   Math.random() > 0.5 ? cb(_searchNode) : errorCb();
    // }, 1000);
  },
  getFund(cb, activeAmount) {
    request({
      url: activeAmount
        ? "ipd/fund/organization/money/total/"
        : "ipd/fund/organization/money/ratio/",
      method: "get"
    }).then(response => {
      let res = response.data;
      let res_len = res["data"].length;
      if (activeAmount) {
        for (let i = 0; i < res_len; i++) {
          res["data"][i].rank = i + 1;
          res["data"][i]._money = (num => {
            if (isNaN(num)) num = "0";
            let sign = num == (num = Math.abs(num));
            num = Math.floor(num * 100 + 0.50000000001);
            let cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10) cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
              num =
                num.substring(0, num.length - (4 * i + 3)) +
                "," +
                num.substring(num.length - (4 * i + 3));
            return "$" + ((sign ? "" : "-") + num + "." + cents);
          })(res["data"][i]["total_money"] / 3);
          res["data"][i].name_encoded = encodeURIComponent(res["data"][i].name);
        }
        res.order_type = "金额";
      } else {
        for (let i = 0; i < res_len; i++) {
          res["data"][i].rank = i + 1;
          res["data"][i]._money = String(res["data"][i]["money_ratio"]) + "%";
          res["data"][i].name_encoded = encodeURIComponent(res["data"][i].name);
        }
        res.order_type = "增长率";
      }
      cb(res);
    });
  },
  getSearchTree(cb, errorCb, search_data) {
    request({
      url: "ipd/chart/patent/searchdetail/" + search_data,
      method: "get"
    }).then(response => {
      let res = response.data;
      if (res && "data" in res && res["data"] && res["data"].length > 0) {
        let res_len = res["data"].length;
        for (let i = 0; i < res_len; i++) {
          res["data"][i].ipc_id = res["data"][i].ipc.replace(/\s/g, "_");
          let t_len = res["data"][i].des.length;
          for (let j = 0; j < t_len; j++) {
            res["data"][i].des[j].index = encodeURIComponent(
              res["data"][i].des[j].index
            );
          }
        }
        cb(res.data);
      } else {
        errorCb(res);
      }
    });
    // setTimeout(() => {
    //   console.log(search_data);
    //   _searchNode.map(x => {
    //     x.ipc = "ipc description" + String(random(100));
    //   });
    //   Math.random() > 0.5 ? cb(_searchNode) : errorCb();
    // }, 1000);
  },
  refreshStatus(cb) {
    request({
      url: "ipd/chart/patent/showtask/",
      method: "get"
    }).then(response => {
      let res = response.data;
      cb(res.data);
    });
  }
};
