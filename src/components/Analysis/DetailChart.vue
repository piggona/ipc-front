<template>
  <div class="card card-default">
    <!--头信息：改为选择块-->
    <!-- <div class="card-header">
      <ul class="nav nav-pills col-md-9">
        <h3 class="card-title">{{ ChartTitle }}</h3>
      </ul>
    </div>-->
    <!--头信息结束-->
    <div class="card-body">
      <a-row>
        <a-col :span="18">
          <!-- <div class="tab-content"> -->
          <!-- <div class="tab-pane active" id="tab_1"> -->
          <!--搜索项选择器-->
          <!-- <section class="content"> -->
          <!-- <div class="container-fluid"> -->
          <!-- <div class="relationship-graph col-md-12"> -->
          <!-- <div ref="chartDom" :style="ChartStyle"></div> -->
          <!-- <div id="trend-graph" style="width:100%;height:400px;align-content:center;"></div> -->
          <!-- </div> -->
          <!-- </div> -->
          <!-- /.row -->
          <!-- </section> -->
          <!--搜索器选择项结束-->
          <!-- </div> -->
          <!-- </div> -->
          <SimpleChart
            :ChartTitle="ChartTitle"
            :ChartStyle="ChartStyle"
            :option="option"
            :link="link"
          />
        </a-col>
        <a-col :span="6">
          <div class="tab-side">
            <div class="tab-up">
              <div class="tab-title">{{'领军'+opName}}</div>
              <a class="tab-person" :href="link+most.uuid">{{ most.name }}</a>
            </div>
            <hr />
            <div class="tab-down">
              <div class="tab-title">{{'新兴'+opName}}</div>
              <a class="tab-person" :href="link+newer.uuid">{{ newer.name }}</a>
            </div>
          </div>
        </a-col>
      </a-row>

      <!-- /.tab-content -->
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import SimpleChart from "./Graph";
export default {
  props: {
    ChartTitle: {
      type: String
    },
    ChartStyle: {
      type: String
    },
    option: {
      type: Object,
      default: () => {}
    },
    opName: {
      type: String
    },
    link: {
      type: String
    }
  },
  computed: {
    most() {
      console.log("computed most:", this.option);
      // series[rec].data[0][0]最大的那个值
      let most = 0;
      let name = "";
      let uuid = "";
      this.option.series.map(x => {
        if (x.data[0][0] > most) {
          most = x.data[0][0];
          name = x.name;
          uuid = x.uuid;
        }
      });
      console.log("most():", most);
      return { name: name, most: most, uuid: uuid };
    },
    newer() {
      // series[rec].data[0][1]最大的那个值
      let newer = 0.0;
      let name = "";
      let uuid = "";
      this.option.series.map(x => {
        if (x.data[0][1] > newer) {
          newer = x.data[0][1];
          name = x.name;
          uuid = x.uuid;
        }
      });
      console.log("newer():", newer);
      return { name: name, newer: newer, uuid: uuid };
    }
  },
  components: {
    SimpleChart
  }
};
</script>

<style>
.tab-title {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 100%;
  font-weight: bold;
  padding-bottom: 5%;
}
.tab-person {
  font-size: 130%;
  color: #007bff;
  padding-bottom: 5%;
  margin-bottom: 20%;
}
.tab-side {
  padding-top: 30%;
  padding-left: 10%;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
}
</style>
