function fund(method, param) {
  let res = null;
  switch (method) {
    case "GET":
      if (param.match("/organization/person/top5/") !== null) {
        res = {
          data: [
            { person_name: "person_name", value: 35 },
            { person_name: "person_name2", value: 65 }
          ]
        };
      } else if (param.match("/organization/institution/top5/") !== null) {
        res = {
          data: [
            { institution_name: "institution_name", value: 45 },
            { institution_name: "institution_name2", value: 55 }
          ]
        };
      } else if (param.match("/organization/money/total/") !== null) {
        res = {
          order_type: "金额",
          data: [
            {
              rank: 1,
              name_encoded: "haohao",
              name: "Haohao Jin",
              total_money: 50
            },
            {
              rank: 2,
              name_encoded: "guanqun",
              name: "Guanqun Zhang",
              total_money: 30
            }
          ]
        };
      } else if (param.match("/organization/money/ratio/") !== null) {
        res = {
          order_type: "金额",
          data: [
            {
              rank: 1,
              name_encoded: "haohao",
              name: "Haohao Jin",
              money_ratio: 50
            },
            {
              rank: 2,
              name_encoded: "guanqun",
              name: "Guanqun Zhang",
              money_ratio: 30
            }
          ]
        };
      } else {
        res = null;
      }
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = fund;
