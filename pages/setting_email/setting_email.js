const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    position_name_list:[],
    position_index:0,
    remarks:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this

    var token = this.encode()
    var phone = wx.getStorageSync('phone')
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/show_email',
      data: {

        company_id: phone,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log(e, '请求信息成功')
          var list = []
          console.log(e.data.data.company_jd.length)
          for (var i = 0; i<e.data.data.company_jd.length;i++){
            list.push(e.data.data.company_jd[i].jd_title)
          }

          that.setData({
            position_name_list:list,
            company_address: e.data.data.email_info.company_address,
            company_name: e.data.data.email_info.company_name,
            contacts: e.data.data.email_info.company_name,
            contacts_phone: e.data.data.email_info.contacts_phone,
            remarks: e.data.data.email_info.remarks

          })


        } else {
          console.log("请求失败")

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
  PickerChange2(e){
    console.log(e)
    this.setData({
      position_index:e.detail.value
    })

  },

  // 公司名
  company_name(e){
    this.setData({
      company_name: e.detail.value
    })
  },

  // 联系人
  contacts(e){
    this.setData({
      contacts: e.detail.value
    })

  },

  //联系电话
  contacts_phone(e){
    this.setData({
      contacts_phone: e.detail.value
    })
  },

  //公司地址
  company_address(e){
    this.setData({
      company_address: e.detail.value
    })
  },

  // 备注
  remarks(e){
    console.log(e)
    this.setData({
      remarks: e.detail.value
    })
  },

  // 保存
  save(e){
    console.log("保存邮件模板")
    var position = this.data.position_name_list[this.data.position_index]
    var company_name = this.data.company_name
    var contacts = this.data.contacts
    var contacts_phone = this.data.contacts_phone
    var company_address = this.data.company_address
    var remarks = this.data.remarks


    console.log(position)
    console.log(company_name)

    console.log(contacts)

    console.log(contacts_phone)

    console.log(company_address)

    console.log(remarks)

    var that = this

    var token = this.encode()
    var phone = wx.getStorageSync('phone')
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/save_email',
      data: {

        company_id: phone,
        company_name: company_name,
        company_address: company_address,
        contacts: contacts,
        contacts_phone: contacts_phone,
        remarks: remarks,
        jd_title: position,
        


        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
         console.log("保存成功")
        
         wx.navigateBack({
           
         })

        wx.showToast({
          title: '保存模板成功',
        })

        } else {
          console.log("请求失败")

        }


      }
    })



  },
  back(){
    wx.navigateBack({
      
    })
  }


})