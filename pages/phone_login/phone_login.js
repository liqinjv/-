const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    phone: "",
    password: "",
    no_hr: false,
    modalName: "",
    base64_str: "",
    check_: false,


    VerticalNavTop: 0,
    show_init: 'show',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
    var is_login = wx.getStorageSync('is_login')
    var is_company = wx.getStorageSync('is_company')
    var phone = wx.getStorageSync('phone')

    console.log(is_login)
    console.log(is_company)
    console.log(phone)
    app.globalData.have_data = 1


    //进入到登录页二次判断登录状态
    if (is_login == true &&  phone.length != 0) {
      console.log(is_login)
      console.log(is_company)
      console.log(phone)

      wx.switchTab({
        url: '/pages/home/home',
      })
    } else {}

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

  // 获取输入账号 
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  login: function() {

    var that = this

    // 点击登录，显示加载
    that.setData({
      loadModal: true,


    })

    if (this.data.phone.length != 0 && this.data.password.length != 0) {

      var smk = this.encode()
      wx.login({
        success(res) {
          if (res.code) {
            console.log(res.code, 'code')
            //发起网络请求
            wx.request({

              method: "POST",
              url: 'https://www.hr24.com.cn/login/account_login',
              data: {
                smk: smk,
                code: res.code

              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success(e) {
                console.log('手机登录请求成功了', e)
                // 登录成功并且有手机号,把手机号写入缓存

                if (e.data.data.phone) {
                  // 手机号
                  wx.setStorageSync('phone', e.data.data.phone)
                  //是否登录
                  wx.setStorageSync('is_login', true)
                  //是否是hr
                  wx.setStorageSync('is_company', e.data.data.is_company)
                  //主题色
                  wx.setStorageSync('theme', e.data.data.theme)

                  that.setData({

                    loadModal: false,
                  })


                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 700
                  })


                  wx.switchTab({

                    url: '/pages/home/home',
                  })




                } else {
                  that.setData({
                    loadModal: false,
                    modalName: "DialogModal2"
                  })
                  wx.showToast({
                    title: '帐号或密码有误,请重试',
                    icon: 'none',
                    duration: 1500
                  })
                  wx.vibrateShort()
                }


              },
              fail(e) {
                console.log('网络请求错', e)
                that.setData({
                  loadModal: false

                })
                that.onLoad()
              },complete(e){
                that.setData({
                  loadModal: false

                })
              }
            })

          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })



    } else {
      console.log('帐号或密码不能为空')
      wx.showToast({
        title: '帐号或密码不能为空',
        icon: 'none',
        duration: 1500
      })
      wx.vibrateShort()

      that.setData({
        loadModal: false,
      })

    }
  },

  encode: function() {
    var time = new Date().getTime()
    var phone = this.data.phone
    var password = this.data.password
    var rand = parseInt(Math.random() * (25 + 1), 10)
    var rand2 = parseInt(Math.random() * (25 + 1), 10)
    var z = app.globalData.z
    var e = z[rand]
    var r = z[rand2]
    var data = ''
    var decode_ = app.globalData.decode_dict[z[rand]]
    var phone_time_password = phone + time + password
    console.log(phone, time, password, e, r)

    if (decode_ == 'decode_1') {
      for (var i = 0; i < (phone_time_password).length; i++) {

        data += app.globalData.decode_1[phone_time_password[i]]
      }

    }
    if (decode_ == 'decode_2') {
      for (var i = 0; i < (phone_time_password).length; i++) {
        data += app.globalData.decode_2[phone_time_password[i]]
      }
    }
    if (decode_ == 'decode_3') {
      for (var i = 0; i < (phone_time_password).length; i++) {

        data += app.globalData.decode_3[phone_time_password[i]]
      }
    }
    if (decode_ == 'decode_4') {
      for (var i = 0; i < (phone_time_password).length; i++) {

        data += app.globalData.decode_4[phone_time_password[i]]
      }
    }
    if (decode_ == 'decode_5') {
      for (var i = 0; i < (phone_time_password).length; i++) {

        data += app.globalData.decode_5[phone_time_password[i]]
      }
    }

    var str = data + e + r

    var base64_str = app.base64_encode(str)
    console.log(base64_str)
    return base64_str



  },



  back: function() {
    wx.navigateBack({

    })
  },

  //微信登录函数
  getPhoneNumber: function(e) {
    wx.login({
      success(e){
        console.log(e)
      }
    })
    console.log('微信登录', e)
    if (e.detail.errMsg == 'getPhoneNumber:ok') {

      // that.shouquan()

      console.log("点击了允许")

      var that = this
      // 点击微信一键登录，显示加载
      that.setData({
        loadModal: true,
        modalName: ""

      })



      var timestamp = (new Date()).getTime()
      var encryptedData = e.detail.encryptedData
      var iv = e.detail.iv
      console.log(timestamp)
      console.log(encryptedData)
      console.log(iv)

      wx.login({
        success(res) {
          if (res.code) {

            wx.request({

              method: "POST",
              url: 'https://www.hr24.com.cn/login/wx_login_b',
              data: {
                encryptedData: encryptedData,
                iv: iv,
                login_code: res.code

              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success(e) {
                console.log(e)
                // 登录成功并且有手机号,把手机号写入缓存
                try {
                  if (e.data.message == -2) {
                    wx.showToast({
                      title: '微信登录超时,请重试',
                      icon: 'none',
                      duration: 700
                    })
                    return
                  }




                  if (e.data.message == 'ok' && e.data.data.phone) {
                    console.log('微信登录成功', e.data.data)
                    wx.setStorageSync('phone', e.data.data.phone)
                    wx.setStorageSync('is_login', true)
                    wx.setStorageSync('is_company', e.data.data.is_company)
                    wx.setStorageSync('theme', e.data.data.theme)

                    wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 700
                    })
                    wx.switchTab({

                      url: '/pages/home/home',
                    })
                  } else {
                    if (e.data.message == -3) {
                      // 登录失败，使手机震动并且弹框
                      wx.vibrateShort()
                      wx.showToast({
                        title: '微信登录超时，请重试',
                        icon: 'none',
                        duration: 1000
                      })
                    } else {


                      // 登录失败，使手机震动并且弹框
                      wx.vibrateShort()
                      wx.showToast({
                        title: '用户不存在,登录失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }

                } catch (e) {
                  wx.vibrateShort()
                  wx.showToast({
                    title: '微信登录超时,请重试',
                    icon: 'none',
                    duration: 700
                  })
                }

              },
              fail(e) {
                console.log("请求失败")
                wx.vibrateShort()
                wx.showToast({
                  title: '登录失败,请重试',
                  icon: 'none',
                  duration: 700
                })
              },
              complete() {
                that.setData({
                  loadModal: false
                })
              }

            })
          } else {

          }
        },
        fail(e) {
          console.log("请求失败")
          wx.vibrateShort()
          wx.showToast({
            title: '微信登录失败,请重试',
            icon: 'none',
            duration: 700
          })
        }
      })
    } else {
      console.log("点击了拒绝")
      wx.showToast({
        title: '允许后才可使用',
        icon: 'none',
        duration: 700
      })
    }
    


  },
  check_() {
    if (this.data.check_) {
      this.setData({
        check_: false
      })
    } else {
      this.setData({
        check_: true
      })
    }



  },
  show_tishi() {
    wx.showToast({
      title: '请同意下方使用协议',
      icon: 'none',
      duration: 2000
    })
  },
  sy() {
    wx.navigateTo({
      url: '/pages/use_agreement/use_agreement',
    })
  },
  ys() {
    wx.navigateTo({
      url: '/pages/privacy_agreement/privacy_agreement',
    })
  },

  // 授权登录
  shouquan() {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            user_shouquan: false
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({

            success(res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender // 性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country

              console.log(res)

              console.log('获取成功')
              that.setData({
                nickName: nickName,
                avatarUrl: avatarUrl,
                gender: gender

              })
            }
          })
        } else {
          console.log("没有授权")
          that.setData({
            user_shouquan: true
          })
        }
      }
    })
  },

  bindGetUserInfo(e) {
    var that = this;
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      console.log('用户点击允许')
      // that.shouquan()
      that.login()


    } else {
      console.log('用户点击拒绝')
      wx.showToast({
        title: '允许授权后才可使用',
        icon: 'none',
        duration: 2000
      })


    }

  },





})
