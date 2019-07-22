const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modalName: '',
    theme: "bg-gradual-orange",
    jiazai: true


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.get_user_info()
    this.add_point()

    this.setData({
      theme: app.globalData.theme,
    })
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

  setting: function() {
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  js_encode: function() {
    console.log("跳转js")
    wx.navigateTo({
      url: '/pages/js_encode/js_encode',
    })
  },

  bg_color: function() {
    wx.navigateTo({
      url: '/pages/bg_color/bg_color',
    })
  },
  my_resume: function() {
    wx.navigateTo({
      url: '/pages/my_resume/my_resume',
    })
  },
  clearmodel: function() {
    console.log("点击清理缓存")
    wx.showModal({
      title: '提示',
      content: '是否要退出登录',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.clearStorage()
          wx.redirectTo({


            url: '/pages/phone_login/phone_login',
          })




        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  test: function() {
    wx.navigateTo({
      url: '/pages/test_detail/test_detail',
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
    // console.log(phone,time,e,r)

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

    console.log(data + e + r)
    var str = data + e + r

    var base64_str = app.base64_encode(str)
    console.log(base64_str)
    return base64_str



  },

  get_user_info() {
    var that = this
    var phone = wx.getStorageSync('phone')
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/user_info/index',
      data: {

        user_id: phone,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log(e, '请求user信息成功')
          that.setData({
            user_info: e.data.data.user_info,
            jiazai: false
          })


        } else {
          console.log("请求失败")
          wx.showModal({
            title: '提示',
            content: '网络异常，用户信息请求失败，是否刷新',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.onLoad()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }


      }
    })
  },
  up_erro() {
    wx.showToast({
      title: '上报成功',
      icon: 'success',
      duration: 2000
    })

  },

  // 重置猎场 人才模型
  chongzhi() {
    wx.showModal({
      title: '提示',
      content: '是否更改您的人才模型',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '/pages/init2/init2',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },

  add_point() {
    var that = this
    // 返还用户简历点
    var phone = wx.getStorageSync('phone')
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/hunting_ground/add_point',
      data: {

        user_id: phone,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('返还用户简历 点请求成功了', e)
          var appeal = e.data.data.appeal_count_point
          var fail = e.data.data.fail_count_point
          that.setData({
            appeal_point: appeal,
            fail_point: fail
          })

          // 如果有返还的简历点
          if (appeal != 0 || fail != 0) {

            that.setData({
              show_fandian: true
            })

          } else {
            that.setData({
              show_fandian: false
            })
          }

        } else {

          console.log("返还用户简历点请求失败", e)
        }
      }
    })


  },

  showfd(){
    // 关闭返点框
    this.setData({
      show_fandian:false
    })

    this.onShow()

  },

  open_c(){
    wx.navigateToMiniProgram({
      appId: 'wx9f8f279fdef09398',
      path: 'pages/home/home?id=123',
      extraData: {
        foo: 'bar1212'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log("打开成功")
      }
    })
  },

  // 跳转到填写邮件页面
  setting_email(){
    wx.navigateTo({
      url: '/pages/setting_email/setting_email',
    })
  },

  send_template(e){
    console.log("提交表单",e)

  },

  // 产品使用手册
  shouce(){
    
    wx.previewImage({
      current: 'https://www.hr24.com.cn/static/images/shiyongshuoming.jpg', // 当前显示图片的http链接
      urls: ['https://www.hr24.com.cn/static/images/shiyongshuoming.jpg'] // 需要预览的图片http链接列表
    })
  },


  setting_home() {
    wx.navigateTo({
      url: '/pages/setting_home/setting_home',
    })
  },




})