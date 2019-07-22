const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  
  back:function(){
    wx.navigateBack({
      
    })
  },

  bg_color:function(e){
    console.log("点击背景色",e.currentTarget.dataset.color)
    var name = "更换" + e.currentTarget.dataset.name + "成功"
    var color = e.currentTarget.dataset.color
    


    wx.showToast({
      title: name,
      icon: 'success',
      duration: 2000
    })


    wx.setStorageSync('theme', color)
    app.globalData.theme = color

    var token = this.encode()
    //登录过，请求主页的信息
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/user_info/save_theme',
      data: {
        theme: app.globalData.theme,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        

        console.log("保存主题成功",e)

        // 登录成功并且有手机号,把手机号写入缓存
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