const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    data: '',
    jiazai: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.hideShareMenu()
    console.log(options,'这个是进入分享页面的数据')
    that.setData({
      data: JSON.parse(options.position_data),
      latitude: options.latitude,

      longitude: options.longitude,
      company__company_name: options.company__company_name,
      company__company_address: options.company__company_address,
      company_id: options.company_id


    })
    console.log(JSON.parse(options.position_data))

    // var that = this
    // console.log(options)
    // var jd_id = options.jd_id
    // var gs_id = options.gs_id

    // that.setData({
    //   jd_id: jd_id,
    //   gs_id: gs_id
    // })

    // var phone = wx.getStorageSync('phone')
    // var token = this.encode()
    // console.log(token)
    // wx.request({

    //   method: "POST",
    //   url: 'https://www.hr24.com.cn/recruitmen_tools/jd_info_display',
    //   data: {
    //     company_id: gs_id,
    //     jobhunter_id: phone,

    //     jd_id: jd_id,

    //     token: token

    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success(e) {
    //     console.log(e)
    //     if (e.data.message == 'ok') {
    //       console.log("职位详情请求成功")

    //       that.setData({
    //         toudi: e.data.data.is_post,
    //         data: e.data.data.jd_info,
    //         jiazai: false,



    //         latitude: e.data.data.jd_info.company__Latitude,
    //         longitude: e.data.data.jd_info.company__Longitude,
    //         company__company_name: e.data.data.jd_info.company__company_name,
    //         company__company_address: e.data.data.jd_info.company__company_address,




    //       })

    //       var position_content = e.data.data.jd_info.position_content.replace(/\\n/g, "\n")

    //       that.setData({
    //         position_content: position_content,
    //       })
    //     } else {
    //       console.log("职位详情请求出错了")
    //       that.setData({
    //         jiazai: false
    //       })
    //       wx.showModal({
    //         title: '提示',
    //         content: '加载失败，是否刷新',
    //         success(res) {
    //           if (res.confirm) {
    //             console.log('用户点击确定')
    //             that.onLoad()
    //           } else if (res.cancel) {
    //             console.log('用户点击取消')

    //           }
    //         }
    //       })

    //     }

    //   }
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      jiazai: false,
    })
    

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log("点击页面内的转发按钮")
      // 来自页面内转发按钮
    }
    return {
      title: "这个小程序真好22222",
      path: 'pages/home/home'
    }
  },
  //导航地址
  click_map: function (e) {
    wx.openLocation({
      latitude: Number(this.data.latitude),
      longitude: Number(this.data.longitude),
      scale: 18,
      name: this.data.company__company_name,
      address: this.data.company__company_address
    })
  },
  back: function () {
    var phone = wx.getStorageSync('phone')
    if (phone.length>1){
      wx.switchTab({
        url: "/pages/home/home",

      })
    }else{
      wx.redirectTo({
        url: '/pages/phone_login/phone_login',
      })
    }
    
  },
  favor: function () {
    console.log("点击收藏")
    if (this.data.favor != 'favor') {
      this.setData({
        favor: 'favor'
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 700
      })
    } else {
      this.setData({
        favor: ''
      })

      wx.showToast({
        title: '取消收藏',
        icon: 'none',
        duration: 600
      })
    }

  },
  toudi_resume() {
    var phone = this.data.company_id
    var jd_id = this.data.data.id
    console.log('^^^^^^^^^^^^^^^^^',phone,jd_id)


    wx.navigateToMiniProgram({
      appId: 'wx9f8f279fdef09398',
      path: 'pages/phone_login/phone_login',
      extraData: {
        referer_jd_id: jd_id,
        referer_gs_id: phone
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log("打开成功")
      }
    })


  },

  encode: function () {
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
    // var base = '../../utils/base64.js';
    // var result = base.encode(str);
    var base64_str = app.base64_encode(str)
    console.log(base64_str)
    return base64_str



  },

  fenxiang() {
    wx.showToast({
      title: '分享职位',
    })

    console.log("点击分享职位")
    wx.updateShareMenu({
      withShareTicket: true,
      success() { }
    })
  },
  go_jingying(){
    var phone = wx.getStorageSync('phone')
    var jd_id = this.data.data.id
    console.log('^^^^^^^^^^^^^^^^^', phone, jd_id)


    wx.navigateToMiniProgram({
      appId: 'wx9f8f279fdef09398',
      path: 'pages/phone_login/phone_login',
      extraData: {
        referer_jd_id: jd_id,
        referer_gs_id: phone

      },
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log("打开成功")
      }
    })
  }

})