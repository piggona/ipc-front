<template>
  <a-table :columns="columns" :dataSource="fund.data" style="width: 100%">
    <router-link
      slot="name"
      color="blue"
      slot-scope="text, record"
      :to="'/analysis/fund?divName='+record.name_encoded"
      target="_blank"
    >{{text}}</router-link>
    <!-- record表示传入的一行记录,text表示一行记录中对应该列的值（dataIndex对应的值） -->
    <span slot="customTitle">{{ fund.order_type }}</span>
  </a-table>
</template>

<script>
const columns = [
  {
    title: "排名",
    dataIndex: "rank",
    key: "rank"
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    dataIndex: "_money",
    key: "_money",
    slots: { title: "customTitle" }
  }
];
export default {
  props: ["isAmount", "fund"],
  data() {
    return {
      columns
    };
  }
};
</script>

<style>
</style>
