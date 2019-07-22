const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    num: 0,
    str: '',
    radio_id: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      resume_id: options.resume_id
    })
    wx.hideShareMenu()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  back() {
    wx.navigateBack({

    })
  },

  detail(e) {

    console.log("申诉情况", e)
    this.setData({
      num: e.detail.cursor,
      str: e.detail.value
    })


  },

  commit() {
    var token = this.encode()
    var phone = wx.getStorageSync('phone')
    var str = this.data.str
    var radio_id = this.data.radio_id
    var resume_id = this.data.resume_id
    var that = this

    if (str.length < 15) {
      wx.vibrateShort()
      wx.showToast({
        title: '请填写至少15字详情',
        icon: 'none',
        duration: 2000
      })
    } else {


      console.log(str)
      console.log(radio_id)

      //登录过，请求主页的信息
      wx.request({

        method: "POST",
        url: 'https://www.hr24.com.cn/hunting_ground/user_appeal',
        data: {

          user_id: phone,
          resume_id: resume_id,
          appeal_content: str,
          appeal_class: radio_id,
          token: token

        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(e) {
          if (e.data.message == 'ok') {
            console.log('提交简历申诉请求成功了', e)
            wx.navigateBack({

            })
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })






          } else {
            console.log("请求失败", e)
            var status = e.data.data

            wx.navigateBack({

            })
            wx.showToast({
              title: status,
              icon: 'none',
              duration: 2000
            })

          }

          // 登录成功并且有手机号,把手机号写入缓存
        }
      })
    }
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
  select(e) {
    console.log(e)
    this.setData({
      radio_id: e.detail.value
    })

  }
})