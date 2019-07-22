const app = getApp()
var touchDot = 0; //触摸时的原点 
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = ""; // 记录/清理时间记录 

Page({

  onShow() {
    this.get_resume_list_offline(0)
    this.get_resume_list_up(1)

  },


  /**
   * 页面的初始数据
   * 
   */
  data: {
    startX: 0, //开始坐标
    startY: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    up_or_bottom: 'bottom',

    offline_data: '',
    up_list: "",

    resume_up: '',
    lock: false,


    // 触摸开始时间
    touchStartTime: 0,
    // 触摸结束时间
    touchEndTime: 0,
    // 最后一次单击事件点击发生时间
    lastTapTime: 0,
    // 单击事件点击后要触发的函数
    lastTapTimeoutFunc: null
  },



  back: function() {

    wx.navigateBack({

    })

  },


  up: function() {
    if (this.data.up_or_bottom != "up") {
      this.setData({
        up_or_bottom: 'up'
      })
    }
    console.log(this.data.up_or_bottom)
  },

  bottom: function() {

    if (this.data.up_or_bottom != "bottom") {
      this.setData({
        up_or_bottom: 'bottom'
      })
    }
    console.log(this.data.up_or_bottom)

  },

  details: function(e) {
    console.log(e.currentTarget.dataset.id)
    //检查锁
    if (this.data.lock) {
      return;
    }
    wx.navigateTo({
      url: '/pages/resume_details/resume_details?resume_id=' + e.currentTarget.dataset.id,
    })
  },

  touchstart: function(e) {
    //开始触摸时,获取当前触摸点的x,y

    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
    })

  },


  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标

      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });

    if (angle > -10 && angle < 5 && touchMoveX - this.data.startX > 100) {

      that.up()
    } else {
      that.bottom()
    }

  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },


  /// 按钮触摸开始触发的事件
  touchStart: function (e) {
    console.log('触摸开始',e)
    this.touchStartTime = e.timeStamp
  },

  /// 按钮触摸结束触发的事件
  touchEnd: function (e) {
    console.log('触摸结束', e)
    this.touchEndTime = e.timeStamp
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

  get_resume_list_offline(e) {
    // 获取简历列表数据
    var num = e
    var that = this
    var phone = wx.getStorageSync('phone')
    var token = this.encode()

    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/resume_list_display',
      data: {

        company_id: phone,
        token: token,
        is_online: num

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log(e, '请求简历列表信息成功')
          that.setData({
            offline_data: e.data.data.jd_list
          })



        } else {
          console.log("请求失败", e)
          wx.showModal({
            title: '提示',
            content: '网络异常，请求出错，是否刷新',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.onLoad()
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.navigateBack({

                })
              }
            }
          })
        }


      },
      fail() {

      },
      complete() {
        that.setData({
          jiazai: false
        })
      }
    })
  },

  get_resume_list_up(e) {
 
    // 获取简历列表数据
    var num = e
    var that = this
    var phone = wx.getStorageSync('phone')
    var token = this.encode()

    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/resume_list_display',
      data: {

        company_id: phone,
        token: token,
        is_online: num

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log(e, '请求简历线上列表信息成功')
          that.setData({
            up_list: e.data.data.jd_list
          })



        } else {
          console.log("请求失败", e)
          wx.showModal({
            title: '提示',
            content: '网络异常，请求出错，是否刷新',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.onLoad()
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.navigateBack({

                })
              }
            }
          })
        }


      }
    })
  },
  onLoad() {
    this.setData({
      jiazai: true
    })
    wx.hideShareMenu()
  },

  longTap: function(e) {
    this.setData({
      lock: true
    });
    console.log('长按', e)
    var that = this
    var token = this.encode()
    var phone = wx.getStorageSync('phone')
    var resume_id = e.currentTarget.dataset.resume_id

    console.log("long tap")
    wx.showModal({
      title: '提示',
      content: '确定要删除这份简历吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({

            method: "POST",
            url: 'https://www.hr24.com.cn/recruitmen_tools/del_resume',
            data: {

              company_id : phone,
              resume_id: resume_id,
              token: token,


            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success(e) {
              if (e.data.message == 'ok') {

                console.log(e)
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000
                })
                that.setData({
                  jiazai: true
                })
                that.onShow()
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none',
                  duration: 1000
                })
              }

            },
            fail() {
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 1000
              })
            },
            complete() {
              that.setData({
                lock: false
              });
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
          that.setData({
            lock: false
          });
        }
      }
    })

  },








})