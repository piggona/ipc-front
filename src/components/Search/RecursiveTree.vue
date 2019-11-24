<template>
  <div class="ipc-tree" :style="'display: inline; '+'padding-left: '+depth+';'">
    <div :style="indent">
      <div style="padding-right: 30%">
        <button
          type="button"
          id="search-fa"
          :style="stepColor"
          :class="'btn-mini front-btn-tool ' + depth + '-class-btn'"
          :data-target="'#main-class-body-' + title.content"
          :data-parent="'#main-class-' + parent_ele"
          data-toggle="collapse"
          @click="tPlus = !tPlus"
        >
          <v-icon :name="tVal" scale="1" style="color: #FDFEFE;" />
        </button>
        <div
          :class="depth + '-class-title'"
          style="display: inline;padding-left:2%;padding-right:5%;font-weight: bold;"
        >{{title.content+": "}}</div>
        <div :class="depth + '-class-phrase'" :style="phraseColor">{{phrase+" "}}</div>
        <span v-if="depth === 2" :style="hotColor">
          <v-icon name="fire" scale="2" />
        </span>
        <br />
        <div :class="depth + '-class-content'">{{content}}</div>
      </div>

      <!-- <div class="{{depth}}-class-content" style="display: inline">{{hotspot}}</div> -->
      <!-- <i class="fab fa-hotjar torch-logo" :style="color"></i> -->
      <div v-for="top in top3" :key="top.index">
        <router-link
          target="_blank"
          :class="top.depth + '-class-phrase'"
          :to="'/analysis/patent?tech=' + top.index + '&isWord=0&hot=' + color"
          style="color: #21618C;font-weight: bold;"
        >{{top.content}}</router-link>
        <br />
      </div>
      <div
        :class="'list-body'+title.content+ ' panel-collapse collapse'"
        :id="'main-class-body-' + title.content"
      ></div>
    </div>
    <div v-if="showChildren">
      <ipc-tree
        :style="'display: inline; '+'padding-left: '+(depth+1)*100+'px;'"
        v-for="node in next.data"
        :key="next.data.indexOf(node)"
        :depth="depth+1"
        :title="node.title"
        :parent_ele="node.parent_ele"
        :phrase="node.phrase"
        :content="node.content"
        :color="node.hotspot"
        :top3="node.top3"
        :next="node.next"
      ></ipc-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tPlus: true
    };
  },
  props: [
    "depth",
    "title",
    "parent_ele",
    "phrase",
    "content",
    "top3",
    "color",
    "next"
  ],
  name: "ipc-tree",
  computed: {
    showChildren() {
      return !this.tPlus;
    },
    tVal() {
      if (this.tPlus) {
        return "plus";
      } else {
        return "minus";
      }
    },
    phraseColor() {
      if (this.depth === 0) {
        return "display: inline;color: #B03A2E;font-weight: bold;";
      } else if (this.depth === 1) {
        return "display: inline;color: #B9770E;font-weight: bold;";
      } else if (this.depth === 2) {
        return "display: inline;color: #21618C;font-weight: bold;";
      }
      return "";
    },
    stepColor() {
      if (this.depth === 0) {
        return "background: #21618C;width: 200%'";
      } else if (this.depth === 1) {
        return "background: #B03A2E;width: 200%'";
      } else if (this.depth === 2) {
        return "background: #EB984E;width: 200%'";
      }
      return "";
    },
    hotColor() {
      if (this.color === "normal") {
        return "color: #66BB6A;";
      } else if (this.color === "cold") {
        return "color: #42A5F5;";
      } else if (this.color === "hot") {
        return "color: #FF0033;";
      } else {
        return "";
      }
    },
    depthNum() {
      if (this.depth === "main") {
        return 1;
      }
      if (this.depth === "second") {
        return 2;
      }
      if (this.depth === "third") {
        return 3;
      }
      if (this.depth === "fourth") {
        return 4;
      }
      return 0;
    },
    indent() {
      return { transform: `translate(${this.depth * 50}px)` };
    }
  }
};
</script>

<style>
.transparent-btn {
  background: none;
  padding: 0;
  outline: none;
  border-radius: 20%;
  border-color: none;
}
</style>
