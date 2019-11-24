function tree(method, param) {
  let res = null;
  switch (method) {
    case "GET":
      if (param === "/") {
        res = [
          {
            title: {
              content: "AAAAAAA",
              uuid: ""
            },
            depth: "main",
            phrase: "HUMAN HECESSITIES",
            content: "",
            color: "color: #E74C3C",
            next: [
              {
                title: {
                  content: "AAAAAAA1",
                  uuid: ""
                },
                depth: "second",
                phrase: "HUMAN HECESSITIES1",
                content: "",
                next: [{}]
              }
            ]
          },
          {
            title: {
              content: "AAAAAAA2",
              uuid: ""
            },
            depth: "main",
            phrase: "HUMAN HECESSITIES2",
            content: "2232",
            color: "color: #E74C3C",
            next: [
              {
                title: {
                  content: "AAAAAAA3",
                  uuid: ""
                },
                depth: "second",
                phrase: "HUMAN HECESSITIES3",
                content: "",
                next: [{}]
              }
            ]
          }
        ];
      } else {
        res = null;
      }
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = tree;
