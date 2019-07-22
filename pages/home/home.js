const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    theme:"bg-gradual-orange",
    
    base64_str:"",
    index_data:"",

    // gs_id:'13835933646',
    Custom: app.globalData.Custom,
    
    covers: [],
    muted:true,
    is_init:true,

    jiazai:true,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // wx.hideTabBar()
    
    wx.hideShareMenu()

    // 数据汇总的数据
    this.get_list_data()

    var that = this
    setTimeout(function () {
      that.setData({
        is_init:true
      })
      wx.showTabBar()
    }, 1000);

    app.globalData.theme = wx.getStorageSync('theme')

   
    
    this.get_index_data()    



  

    // console.log('home-onload',e)
    // if (e.scene == '001') {

    //   console.log("扫码进来")
    //   wx.redirectTo({


    //     url: "/pages/basics/basics",
    //   })

    //   wx.showToast({
    //     title: '北京三门课科技期待您的加入',
    //     icon: 'none',
    //     duration: 1500
    //   })
    // }
    
    
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
      theme: app.globalData.theme,
    })
    this.get_index_data()    


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
  //导航地址
  click_map: function (e) {
    var that = this
    wx.openLocation({
      latitude: Number( that.data.index_data.company_info.Latitude), 
      longitude: Number(that.data.index_data.company_info.Longitude),
      scale: 100,
      name: that.data.index_data.company_info.company_name,
      // address: that.data.index_data.company_info.city__name + that.data.index_data.company_info.company_address
      address:  that.data.index_data.company_info.company_address

    })
  },
  close_detail:function(){
    this.setData({
      modalName: ''
    })

  },
  show_detail:function(){
    this.setData({
      modalName: 'Image'
    })
  },
  nav_position_detail:function(e){

    console.log('点击进入职位详情',e)
    var e_data = e.currentTarget.dataset.data
    var phone = wx.getStorageSync('phone')

    wx.navigateTo({
      url: "/pages/position_details/position_details?jd_id=" + e_data.id + "&gs_id=" + Number(phone)
      })
  },

  look_image:function(e){
    console.log('点击查看大图',e)

  },



  encode:function(){
    var time = new Date().getTime()
    var phone = wx.getStorageSync('phone')
    var rand = parseInt(Math.random() * (25 + 1), 10)
    var rand2 = parseInt(Math.random() * (25 + 1), 10)
    var z = app.globalData.z
    var e = z[rand]
    var r = z[rand2]
    var data = ''
    var decode_ = app.globalData.decode_dict[z[rand]]
    var phone_time = phone+time

      if (decode_ =='decode_1'){
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
  phone_log_in(){
    wx.navigateTo({
      url: '/pages/phone_login/phone_login',
    })

  },

  smk:function(){
    var that = this
    var phone = wx.getStorageSync('phone')
    var is_login = wx.getStorageSync('is_login')
    var is_company = wx.getStorageSync('is_company')
    if(is_login){
      that.setData({
        modalName: '',

        loadModal: false,



      })

      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 700
      })
      if (is_company == 1) {
        that.hr()
      } else {
        that.job_seekers()
      }
    }

    wx.setStorageSync('is_phone_login', '')

  },

  //获取主页信息
  get_index_data:function(){
    console.log("获娶主页信息")
    var that = this
    var token = this.encode()
    var phone = wx.getStorageSync('phone')
 
    
      //登录过，请求主页的信息
      wx.request({

        method: "POST",
        url: 'https://www.hr24.com.cn/company_display/index',
        data: {

          company_id: phone,
          token: token

        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(e) {
          if (e.data.message == 'ok') {
            console.log('主页信息请求成功了', e)
            if (e.data.data.have_data != 1 & app.globalData.have_data == 1){
              wx.navigateTo({
                url: '/pages/setting_home/setting_home',
              })
            }
            

            that.setData({
              index_data: e.data.data,
              
              latitude: Number(e.data.data.company_info.Latitude),
              longitude: Number(e.data.data.company_info.Longitude),
              covers: [{
                latitude: Number(e.data.data.company_info.Latitude),
                longitude: Number(e.data.data.company_info.Longitude),
                iconPath: '/imgs/index/location.png'
              }]

            })
            try{
              var manager_background = that.data.index_data.company_info.manager_background.replace(/\\n/g, "\n")
              var company_introduction = that.data.index_data.company_info.company_introduction.replace(/\\n/g, "\n") 
            }catch(e){
              jiazai: false

            }

            
            that.setData({
              manager_background: manager_background,
              company_introduction: company_introduction,
              jiazai:false
              
            })

            

          }else{
            console.log("请求失败")
           
          }

          // 登录成功并且有手机号,把手机号写入缓存
        }
      })
    
  },
  jingyin:function(){
    console.log("点击静音")
    if(this.data.muted==false){
      this.setData({
        muted: true
      })
    }else{
      this.setData({
        muted: false
      })
    }
    

  },

  di(){
     
      wx.createSelectorQuery().select('#j_page').boundingClientRect(function (rect) {
        // 使页面滚动到底部
        wx.pageScrollTo({
          scrollTop: rect.bottom+ 5000
        })
      }).exec()
    
  },

  // 获取数据汇总的数据
  get_list_data() {
    var that = this
    var token = this.encode()
    var phone = wx.getStorageSync('phone')
    console.log(phone,token)

    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/resume_data_display',
      data: {
        company_id: phone,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('获取数据汇总data成功', e)

          wx.setStorageSync('lists_data', e.data.data)
          // that.liShow()



        } else {
          console.log(e)
        }

      },
      fail() {

      },
      complete() {

      }

    })
  },

   



})
