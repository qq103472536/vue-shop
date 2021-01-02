<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
  mounted() {
    // 获取数据
    this.reqList();
  },
  watch: {
    // 深度监听
    list: {
      handler() {
        // 监听数据获取成功
        if (this.list.length > 0) {
          // 在进行画图
          var myChart = echarts.init(document.getElementById("main"));
          var option = {
            title: {
              text: "分类数量",
            },
            tooltip: {},
            legend: {
              data: ["分类数量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "分类数量",
                type: "line",
                data: this.list.map((item) => item.children?item.children.length:0),
              },
            ],
          };
          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
#main {
  width: 600px;
  height: 400px;
  margin: 0 auto;
}
</style>