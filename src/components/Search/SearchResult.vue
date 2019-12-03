<template>
  <a-table :columns="columns" :dataSource="tasks" style="width: 100%">
    <span slot="status" slot-scope="status">
      <a-tag
        v-for="tag in status"
        :color="tag==='failed' ? 'volcano' : (tag==='processing' ? 'orange' : 'green')"
        :key="tag"
      >{{tag}}</a-tag>
    </span>
    <span slot="operands" slot-scope="operands">
      <a-tag
        v-for="tag in operands"
        :color="tag.op==='delete' ? 'volcano' : 'green'"
        :key="tag"
        @click="getClick(tag.uuid,tag.op)"
      >{{tag.op}}</a-tag>
    </span>
  </a-table>
</template>

<script>
const columns = [
  {
    title: "#",
    dataIndex: "rank",
    key: "rank"
  },
  {
    title: "搜索内容",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "分析进度",
    dataIndex: "progress",
    key: "progress"
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "操作",
    dataIndex: "operands",
    key: "operands",
    scopedSlots: { customRender: "operands" }
  }
];

const result_data = [
  {
    rank: "1",
    name: "Elon Mask",
    progress: "32%",
    status: ["processing"],
    operands: [
      { op: "detail", uuid: "ElonMask" },
      { op: "delete", uuid: "ElonMask" }
    ]
  },
  {
    rank: "2",
    name: "Jobs",
    progress: "100%",
    status: ["complete"],
    operands: [{ op: "detail", uuid: "Jobs" }, { op: "delete", uuid: "Jobs" }]
  },
  {
    rank: "3",
    name: "boeing",
    progress: "32%",
    status: ["failed"],
    operands: [
      { op: "detail", uuid: "boeing" },
      { op: "delete", uuid: "boeing" }
    ]
  }
];

export default {
  props: ["tasks"],
  data() {
    return {
      columns
      //   result_data
    };
  },
  methods: {
    getClick(uuid, op) {
      console.log(uuid, op);
      if (op === "delete") {
        this.$store.dispatch("search/deleteTask", uuid);
      }
    }
  }
};
</script>

<style>
</style>
