<template>
  <div class="main-content">
    <el-page-header class="title" @back="goBack" v-bind:content="experName + '访问记录'">
    </el-page-header>
    <div :style="{ height: '666px', width: '100%' }" id="ChinaMap"></div>
  </div>
</template>
<script>
//   import '../../node_modules/echarts/map/js/world.js' //世界地图
import "../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据

export default {
  data() {
    return {
      visitMapData: [], //地域访问次数
      experName: "", //实验名字
    };
  },
  methods: {
    chinaVistMap() {
      let myChart = this.$echarts.init(document.getElementById("ChinaMap")); //这里是为了获得容器所在位置

      myChart.setOption({
        // 进行相关配置
        backgroundColor: "#02AFDB",
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ["High", "Low"],
          realtime: true,
          calculable: true,
          color: [
            "red",
            "orangered",
            "yellow",
            "green",
            "lightskyblue",
            "white",
          ],
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)",
              },
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo", // 对应上方配置
          },
          {
            name: "访问次数", // 浮动框的标题
            type: "map",
            geoIndex: 0,
            data: this.visitMapData, //访问省份统计
          },
        ],
      });
    },
    //返回上一级
    goBack() {
      history.go(-1);
    },
  },
  mounted() {
    // console.log(this.$route.query.id);
    this.experName = this.$route.query.experName;
    const vistData = this.$route.query.mapData;
    for (let key in vistData) {
      if (key == "statistics_aomen") {
        this.visitMapData.push({ name: "澳门", value: vistData[key] });
      } else if (key == "statistics_anhui") {
        this.visitMapData.push({ name: "安徽", value: vistData[key] });
      } else if (key == "statistics_beijing") {
        this.visitMapData.push({ name: "北京", value: vistData[key] });
      } else if (key == "statistics_chongqing") {
        this.visitMapData.push({ name: "重庆", value: vistData[key] });
      } else if (key == "statistics_fujian") {
        this.visitMapData.push({ name: "福建", value: vistData[key] });
      } else if (key == "statistics_gansu") {
        this.visitMapData.push({ name: "甘肃", value: vistData[key] });
      } else if (key == "statistics_guangdong") {
        this.visitMapData.push({ name: "广东", value: vistData[key] });
      } else if (key == "statistics_guangxi") {
        this.visitMapData.push({ name: "广西", value: vistData[key] });
      } else if (key == "statistics_guizhou") {
        this.visitMapData.push({ name: "贵州", value: vistData[key] });
      } else if (key == "statistics_hainan") {
        this.visitMapData.push({ name: "海南", value: vistData[key] });
      } else if (key == "statistics_hebei") {
        this.visitMapData.push({ name: "河北", value: vistData[key] });
      } else if (key == "statistics_heilongjiang") {
        this.visitMapData.push({ name: "黑龙江", value: vistData[key] });
      } else if (key == "statistics_henan") {
        this.visitMapData.push({ name: "河南", value: vistData[key] });
      } else if (key == "statistics_hubei") {
        this.visitMapData.push({ name: "湖北", value: vistData[key] });
      } else if (key == "statistics_hunan") {
        this.visitMapData.push({ name: "湖南", value: vistData[key] });
      } else if (key == "statistics_jiangsu") {
        this.visitMapData.push({ name: "江苏", value: vistData[key] });
      } else if (key == "statistics_jiangxi") {
        this.visitMapData.push({ name: "江西", value: vistData[key] });
      } else if (key == "statistics_jilin") {
        this.visitMapData.push({ name: "吉林", value: vistData[key] });
      } else if (key == "statistics_liaoning") {
        this.visitMapData.push({ name: "辽宁", value: vistData[key] });
      } else if (key == "statistics_neimenggu") {
        this.visitMapData.push({ name: "内蒙古", value: vistData[key] });
      } else if (key == "statistics_ningxia") {
        this.visitMapData.push({ name: "宁夏", value: vistData[key] });
      } else if (key == "statistics_qinghai") {
        this.visitMapData.push({ name: "青海", value: vistData[key] });
      } else if (key == "statistics_shanxi2") {
        this.visitMapData.push({ name: "山西", value: vistData[key] });
      } else if (key == "statistics_shanxi3") {
        this.visitMapData.push({ name: "陕西", value: vistData[key] });
      } else if (key == "statistics_shandong") {
        this.visitMapData.push({ name: "山东", value: vistData[key] });
      } else if (key == "statistics_shanghai") {
        this.visitMapData.push({ name: "上海", value: vistData[key] });
      } else if (key == "statistics_sichuan") {
        this.visitMapData.push({ name: "四川", value: vistData[key] });
      } else if (key == "statistics_taiwan") {
        this.visitMapData.push({ name: "台湾", value: vistData[key] });
      } else if (key == "statistics_tianjin") {
        this.visitMapData.push({ name: "天津", value: vistData[key] });
      } else if (key == "statistics_xianggang") {
        this.visitMapData.push({ name: "香港", value: vistData[key] });
      } else if (key == "statistics_xinjiang") {
        this.visitMapData.push({ name: "新疆", value: vistData[key] });
      } else if (key == "statistics_xizang") {
        this.visitMapData.push({ name: "西藏", value: vistData[key] });
      } else if (key == "statistics_yunnan") {
        this.visitMapData.push({ name: "云南", value: vistData[key] });
      } else if (key == "statistics_zhejiang") {
        this.visitMapData.push({ name: "浙江", value: vistData[key] });
      } else if (key == "") {
        this.visitMapData.push({ name: "", value: vistData[key] });
      }
    }

    console.log(this.visitMapData);

    this.chinaVistMap();
  },
};
</script>
<style  scoped>
.title {
  border: 1px solid #409eff;
  border-radius: 4px;
  margin: 10px 0;
  padding: 10px;
}

.title:hover {
  transform: box-shadow 5s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>