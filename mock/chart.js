// import random from "lodash/random";

var _searchNode = {
  data: [
    {
      ipc_id: "ipc_id",
      depth: "main",
      ipc: "ipc description",
      des: [
        {
          index: "213243",
          des: "描述"
        },
        {
          index: "21323",
          des: "描述2"
        }
      ]
    },
    {
      ipc_id: "ipc_id",
      depth: "second",
      ipc: "ipc description2",
      des: [
        {
          index: "223112",
          des: "描述3"
        },
        {
          index: "2234",
          des: "描述4"
        }
      ]
    }
  ]
};

function patent(method, param) {
  let res = null;
  switch (method) {
    case "GET":
      if (param.match("/patent/n_citations/") !== null) {
        res = {
          inventors: [
            {
              uuid: "12345",
              name: "haohaoStatic"
            },
            {
              uuid: "12356",
              name: "guanqunStatic"
            },
            {
              uuid: "13678",
              name: "liucahngStatic"
            }
          ],
          assignees: [
            {
              uuid: "453654",
              name: "BUPT-S"
            },
            {
              uuid: "34556",
              name: "Vanlink-S"
            }
          ],
          patents: [
            {
              rank: 1,
              uuid: "34245",
              title: "respect-S",
              n_citation: "213"
            }
          ]
        };
      } else if (param.match("/patent/source/") !== null) {
        res = {
          inventors: [
            {
              uuid: "12345",
              name: "haohao"
            },
            {
              uuid: "12356",
              name: "guanqun"
            },
            {
              uuid: "13678",
              name: "liuchang"
            }
          ],
          assignees: [
            {
              uuid: "453654",
              name: "BUPT"
            },
            {
              uuid: "34556",
              name: "Vanlink"
            }
          ],
          patent: [
            {
              uuid: "23423",
              title: "respect",
              applicationDate: "2019-07-21"
            }
          ]
        };
      } else if (param.match("/patent/keyword/") !== null) {
        res = "Title_PATENT1";
      } else if (param.match("/patent/trend/") !== null) {
        res = {
          data: [
            {
              year: "2000",
              val: "0"
            },
            {
              year: "2001",
              val: "1"
            },
            {
              year: "2002",
              val: "2"
            },
            {
              year: "2003",
              val: "3"
            },
            {
              year: "2004",
              val: "60"
            },
            {
              year: "2005",
              val: "12"
            }
          ]
        };
      } else if (param.match("/patent/top5/") !== null) {
        res = {
          lines: [
            {
              name: "SamSung",
              uuid: "samsung",
              data: [
                {
                  year: 2001,
                  val: 500
                },
                {
                  year: 2002,
                  val: 250
                },
                {
                  year: 2003,
                  val: 300
                },
                {
                  year: 2004,
                  val: 700
                },
                {
                  year: 2005,
                  val: 800
                },
                {
                  year: 2006,
                  val: 1000
                },
                {
                  year: 2007,
                  val: 900
                }
              ]
            },
            {
              name: "LG",
              uuid: "LG",
              data: [
                {
                  year: 2001,
                  val: 300
                },
                {
                  year: 2002,
                  val: 250
                },
                {
                  year: 2003,
                  val: 60
                },
                {
                  year: 2004,
                  val: 800
                },
                {
                  year: 2005,
                  val: 900
                },
                {
                  year: 2006,
                  val: 800
                },
                {
                  year: 2007,
                  val: 1000
                }
              ]
            }
          ],
          length: 2
        };
      } else if (param.match("/patent/institution/") !== null) {
        res = {
          points: [
            {
              name: "LG",
              uuid: "LG-001",
              total_count: 100,
              latest_count: 55
            },
            {
              name: "SamSung",
              uuid: "SamSung",
              total_count: 200,
              latest_count: 70
            },
            {
              name: "SK",
              uuid: "SK",
              total_count: 60,
              latest_count: 55
            },
            {
              name: "HUAWEI",
              uuid: "HUAWEI",
              total_count: 700,
              latest_count: 610
            }
          ]
        };
      } else if (param.match("/patent/inventors/") !== null) {
        res = {
          points: [
            {
              name: "Guanqun",
              uuid: "Guanqun",
              total_count: 100,
              latest_count: 55
            },
            {
              name: "Haohao",
              uuid: "Haohao",
              total_count: 200,
              latest_count: 150
            },
            {
              name: "Liuchang",
              uuid: "LiuChang",
              total_count: 60,
              latest_count: 55
            },
            {
              name: "Liyou",
              uuid: "Liyou",
              total_count: 700,
              latest_count: 610
            }
          ]
        };
      } else if (param.match("/patent/lifecycle/") !== null) {
        res = {
          data: [
            {
              year: 1995,
              patent_count: 20,
              inventor_count: 10
            },
            {
              year: 1996,
              patent_count: 60,
              inventor_count: 15
            },
            {
              year: 1997,
              patent_count: 100,
              inventor_count: 20
            },
            {
              year: 1998,
              patent_count: 200,
              inventor_count: 100
            },
            {
              year: 1999,
              patent_count: 2000,
              inventor_count: 1000
            }
          ]
        };
      } else if (param.match("/patent/search/") !== null) {
        _searchNode.data.map(x => {
          x.ipc = "ipc description";
        });
        res = _searchNode;
        // Math.random() > 0.5 ? (res = _searchNode) : (res = []);
      } else {
        res = null;
      }
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = patent;
