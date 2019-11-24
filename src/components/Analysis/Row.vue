<template>
  <div class="top-assignees">
    <div class="sub-title">{{option}}</div>
    <hr />
    <div v-for="dat in data" :key="data.indexOf(dat)">
      <div class="cited-patents">
        {{dat.rank}}.
        <a :href="endpoint+dat.uuid" id="cited-title-tech">{{dat.title}}</a>

        <div class="dep-title" id="cited-num">{{dat.patent_num+' '+word}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["option", "data", "endpoint", "word"]
};
</script>

<style>
</style>
