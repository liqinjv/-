var select_id_list= []

//获取应用实例
const app = getApp()

Page({
  data: {

    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    test0: 0,
    test1: 0,
    test2: 0,
    test3: 0,
    page:0,
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.hideShareMenu()
    var phone = wx.getStorageSync('phone')
    var that = this
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/subject_list',
      data: {

        company_id: phone,
        page:that.data.page,
        token: token,
        

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('人才测评请求成功了', e)
          select_id_list = []
          for (var i = 0; i < e.data.data.length; i++) {
              if(e.data.data[i].is_choice==1){
                
                select_id_list.push(e.data.data[i].subject_id)
              }
          }
          that.setData({
            subject_data : e.data.data,

          })

        } else {
          console.log("请求失败",e)
        }

        // 登录成功并且有手机号,把手机号写入缓存
      }
    })
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
  select:function(e){
   

    var select_id = e.currentTarget.dataset.subject_id
    console.log(select_id)
    select_id_list.splice(0, 0, select_id)
    wx.showLoading({
        title: '正在操作中..',
      })
    this.save_subject()
    // var x =0
    // for (var i = 0; i < select_id_list.length; i++) {
    //   if (select_id_list[i] == select_id) {
    //     x = 1
    //   }
    // }
    // if(x==0){
    //   wx.showLoading({
    //     title: '正在为您添加..',
    //   })
    // }else{
    //   wx.showLoading({
    //     title: '正在为您取消..',
    //   })
    // }
    // 列表中只有一个元素，点击的是那个元素，不可取消
    // if(select_id_list.length==1 && x==1){

    //   wx.showToast({
    //     title: '不可取消，必须选择一个',
    //     icon: 'none',
    //     duration: 1500 
    //   })

    //   console.log(select_id_list)
    //   this.save_subject()

    //   return
    // }

    // 列表中有一个元素，点击的元素列表中没有，添加
    // if (select_id_list.length == 1 && x==0) {

      
    //   select_id_list.push(select_id)

    //   this.save_subject()


    //   return
    // }


    //列表中有两个元素，点击的元素列表中存在，删除元素
    // if (select_id_list.length ==2  && x==1) {

    //     var select_id_index = select_id_list.indexOf(select_id)
    //     select_id_list.splice(select_id_index, 1);

    //   this.save_subject()


    //   return
    // }

    //列表中有两个元素，点击的元素列表中不存在，添加元素
    // if (select_id_list.length == 2 && x == 0) {

    //   select_id_list.push(select_id)
    //   this.save_subject()


    //   return

    // }

    //列表中有3个元素，点击的元素列表中存在，删除元素
    // if (select_id_list.length == 3 && x == 1) {

    //   var select_id_index = select_id_list.indexOf(select_id)
    //   select_id_list.splice(select_id_index, 1);
    //   this.save_subject()

    //   return

    // }

    //列表中有3个元素，点击的元素列表中不存在，不可添加
    // if (select_id_list.length == 3 && x == 0) {
    //   wx.hideLoading()

    //   wx.showToast({
    //     title: '不可添加，最多只可以选择3个',
    //     icon: 'none',
    //     duration: 1500
    //   })    

    //   return
    // }

  },
  // 保存人才测评题
  save_subject:function(){
  
    var phone = wx.getStorageSync('phone')
    var that = this
    var token = this.encode()
    // if(select_id_list.length==1){
    //   var one =select_id_list[0]
    //   var two = 0
    //   var three = 0
    // }
    // if (select_id_list.length == 2) {
    //   var one = select_id_list[0]
    //   var two = select_id_list[1]
    //   var three =0
    // }
    // if (select_id_list.length == 3) {
    //   var one = select_id_list[0]
    //   var two = select_id_list[1]
    //   var three = select_id_list[2]
    // }

    if (select_id_list.length == 1) {
      var one = select_id_list[0]
      var two = 0
      var three = 0
    }
    if (select_id_list.length == 2) {
      var one = select_id_list[0]
      var two = 0
      var three = 0
    }
    if (select_id_list.length == 3) {
      var one = select_id_list[0]
      var two = 0
      var three = 0
    }


    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/update_company_subject',
      data: {

      
        company_id: phone,
        subject_one:one,
        subject_two:two,
        subject_three:three,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('保存测评',e)

        } else {
          console.log("请求失败")
        }

       
      },fail(e){
          console.log("请求失败了")
      },complete(e){
        that.onLoad()
        wx.hideLoading()

      }
    })

  }





  




})