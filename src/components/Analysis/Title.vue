<template>
  <div class="detail-title" style="width: 70%;padding-top: 5%;">
    <span class="username">
      <a class="patent-name" href="#" style="font-size: 2.3rem;">{{ title }}</a>
      <span id="torch-logo" :style="color ">
        <v-icon name="fire" scale="3" />
      </span>
    </span>
    <br />
    <span class="description" style="margin-left: 2.5rem">
      <div id="tech-keywords" style="font-size: 1.5rem;">{{desc.data}}</div>
    </span>
  </div>
</template>

<script>
export default {
  props: ["title", "color", "desc"]
};
</script>

<style>
.patent-name {
  font-size: 4rem;
  color: #495057;
}
.user-block {
  margin-top: 1rem;
  margin-bottom: 3rem;
}
.detail-title {
  margin-bottom: 1rem;
}
</style>