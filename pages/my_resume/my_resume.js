const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    modalName: '',
    name:"张三",
    gender:"男",
    age:"3",
    exp:"20年工作经验",
    phone:"13812345678",
    email:"123@163.com",
    theme: "bg-gradual-orange",



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.theme = wx.getStorageSync('theme')
    wx.hideShareMenu()
    
    

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
    var phone = wx.getStorageSync('phone')
    var token = this.encode()
    var that = this
    this.setData({
      theme: app.globalData.theme,
    })

    
    
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/read_resume_info',
      data: {

        jobhunter_id: phone,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        
        if (e.data.message=='ok'){
          console.log(e)
          that.setData({

            resume_data: e.data.data.resume_info,
            resume_data2: e.data.data.resume_info_2,

          })
        }else{
          wx.showModal({
            title: '提示',
            content: '简历数据异常，是否刷新简历',
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
  onShareAppMessage: function () {
    
  },


  tuisong: function (e) {
    wx.redirectTo({


      url: '/pages/index/index'
    })
  },

  // 个人信息
  set_basics:function(){
    wx.navigateTo({
      url: '/pages/basics/basics',
    })
  },

  // 求职意向
  set_job:function(){
    wx.navigateTo({
      url: '/pages/job/job',
    })
  },
  // 求职意向
  work_exp: function () {
    wx.navigateTo({
      url: '/pages/work_exp/work_exp',
    })
  },
  
  edu_exp: function () {
    console.log("教育背景")
    wx.navigateTo({
      url: '/pages/edu_exp/edu_exp',
    })
  },
  self_eval: function () {
    console.log("教育背景")
    wx.navigateTo({
      url: '/pages/self_eval/self_eval',
    })
  },
  back:function(){
    wx.navigateBack({
      
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