var wxCharts = require('../../utils/wxcharts.js');

const app = getApp()
var lineChart = null;
var areaChart = null;
var pieChart = null;
var pieChart2 = null;
var columnChart = null;
var chartData = {
  main: {
    title: '总成交量',
    data: [2, 15, 20, 45, 37, 5],
    categories: ['17岁以下', '18-24岁', '25-29岁', '30-39岁', '40-49岁', '50岁以上']
  },

};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    select: 'xcx'
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function() {
    var date = new Date();
    var y = date.getFullYear();    //获取完整的年份(4位,1970-????)
    var mo = date.getMonth();       //获取当前月份(0-11,0代表1月)
    if(mo<10){
      mo='0'+mo
    }
    var moo = date.getDate();        //获取当前日(1-31)
    var m = date.getMinutes()
    if(m<10){
      m='0'+m
    }
    var that = this
    var s1 = wx.getStorageSync('lists_data')
    var mytime =   date.getHours() + ":"+m;
    
   

    console.log(s1)
    this.setData({
      data: s1,
      mytime: mytime,
      y:mo+'-'+moo
    })


    // for (var i = 0; i < this.data.data.resume_edu_count.length; i++) {
    //   console.log(s1.resume_edu_count[i])
    // }
    console.log(s1)
    chartData = {
      main: {
        title: '总成交量',
        data: s1.resume_edu_count[1],
        categories: s1.resume_edu_count[0]
      }
    }


    wx.hideShareMenu()

    // wx.showToast({
    //   title: '暂未开通，敬请期待',
    //   icon: 'none',
    //   duration: 4000
    // })

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();

    console.log(simulationData)


    var fangwen_data2 = that.data.data.day_resume_for_month[0]
    var fangwen_data3 = that.data.data.day_resume_for_month[1]
    console.log(fangwen_data3)

    console.log(simulationData)
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
          name: '访问量',
          data: simulationData.data,
          format: function(val, name) {
            return val.toFixed(0);
          }
        },

      ],
      xAxis: {
        disableGrid: true,
        fontColor: '#ccc'

      },
      yAxis: {
        title: '',
        format: function(val) {
          return val.toFixed(0);
        },
        min: 0,
        gridColor: '#F8F8FF',

      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });


    // 简历每日折线图
    lineChart = new wxCharts({
      canvasId: 'lineCanvas2',
      type: 'line',
      categories: fangwen_data2,
      animation: true,
      // background: '#f5f5f5',
      series: [{
          name: '近7天简历量',
          data: fangwen_data3,
          format: function(val, name) {
            return val.toFixed(0);
          }
        },

      ],
      xAxis: {
        disableGrid: true,
        fontColor: '#ccc'

      },
      yAxis: {
        title: '',
        format: function(val) {
          return val.toFixed(0);
        },
        min: 0,
        gridColor: '#F8F8FF',

      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });

    areaChart = new wxCharts({
      canvasId: 'areaCanvas',
      type: 'area',
      categories: ['一', '二', '三', '四', '五', '六', '日'],
      animation: true,
      series: [{
        name: '打开次数',
        data: [32, 45, 45, 56, 33, 34, 34],
        format: function(val) {
          return val.toFixed(0) + '次';
        }
      }],
      yAxis: {
        title: '',
        format: function(val) {
          return val.toFixed(0);
        },
        min: 0,
        fontColor: '#696969',
        gridColor: '#F8F8FF',

        titleFontColor: '#f7a35c'
      },
      xAxis: {
        fontColor: '#ccc',
        gridColor: '#ccc'
      },
      extra: {
        legendTextColor: '#000'
      },
      width: windowWidth,
      height: 200
    });

    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '未处理简历',
        data: s1.resume_status_count[0],
      }, {
        name: '不合格简历',
        data: s1.resume_status_count[1],
      }, {
        name: '待复试简历',
        data: s1.resume_status_count[2],
      }, {
        name: '发offer简历',
        data: s1.resume_status_count[3],
      }],
      width: windowWidth,
      height: 250,
      dataLabel: true,
    });

    pieChart2 = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas2',
      type: 'pie',
      series: [{
          name: '男',
          data: that.data.data.resume_male_count.male,
        },
        {
          name: '女',
          data: that.data.data.resume_male_count.female,
        }
      ],
      width: windowWidth,
      height: 250,
      dataLabel: true,
    });

    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '求职者学历',
        data: chartData.main.data,
        format: function(val, name) {
          return val.toFixed(0);
        }
      }],
      yAxis: {
        format: function(val) {
          return val.toFixed(0);
        },
        title: '',
        fontColor: '#696969',
        gridColor: '#F8F8FF',

        titleFontColor: '#f7a35c',

        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });

  },
  liShow() {
    var that = this

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  touchHandler: function(e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  createSimulationData: function() {
    var categories = [];
    var data = [];
    var data2 = []
    for (var i = 0; i < 24; i++) {
      categories.push(i);
      data.push(Math.random() * 100);
      data2.push(Math.random() * 100)
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data,
      data2: data2
    }
  },



  xcx: function() {
    this.onLoad()
    this.setData({
      select: 'xcx'
    })


  },

  resume: function() {
    this.onLoad()
    this.setData({
      select: 'resume'
    })

  },

  touchHandler2: function(e) {
    console.log(areaChart.getCurrentDataIndex(e));
    areaChart.showToolTip(e);
  },

  touchHandler3: function(e) {
    var index = columnChart.getCurrentDataIndex(e);
    if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
      this.setData({
        chartTitle: chartData.sub[index].title,
        isMainChartDisplay: false
      });
      columnChart.updateData({
        categories: chartData.sub[index].categories,
        series: [{
          name: '成交量',
          data: chartData.sub[index].data,
          format: function(val, name) {
            return val.toFixed(2) + '万';
          }
        }]
      });

    }
  },
  back: function() {
    wx.navigateBack({

    })
  },

  // '点击标签时触发'
  van_tabs(e) {
    console.log("点击时触发", e)
    this.setData({
      tabs_index: e.detail.index
    })
  },



  encode: function() {
    var time = new Date().getTime()
    var phone = wx.getStorageSync('phone')
    var rand = parseInt(Math.random() * (25 + 1), 10)
    var rand2 = parseInt(Math.random() * (25 + 1), 10)
    var z = app.globalData.z
    var e = z[rand]
    var r = z[rand2]
    var data = ''
    var decode_ = app.globalData.decode_dict[z[rand]]
    var phone_time = phone + time

    if (decode_ == 'decode_1') {
      for (var i = 0; i < (phone + time).length; i++) {

        data += app.globalData.decode_1[phone_time[i]]
      }

    }
    if (decode_ == 'decode_2') {
      for (var i = 0; i < (phone + time).length; i++) {
        data += app.globalData.decode_2[phone_time[i]]
      }
    }
    if (decode_ == 'decode_3') {
      for (var i = 0; i < (phone + time).length; i++) {

        data += app.globalData.decode_3[phone_time[i]]
      }
    }
    if (decode_ == 'decode_4') {
      for (var i = 0; i < (phone + time).length; i++) {

        data += app.globalData.decode_4[phone_time[i]]
      }
    }
    if (decode_ == 'decode_5') {
      for (var i = 0; i < (phone + time).length; i++) {

        data += app.globalData.decode_5[phone_time[i]]
      }
    }

    var str = data + e + r
    // var base = '../../utils/base64.js';
    // var result = base.encode(str);
    var base64_str = app.base64_encode(str)
    return base64_str



  },


})