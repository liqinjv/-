const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    time: '10:00',
    date: '2019-06-06',
    picker: [],
    index: 0,
    remarks: "",
    remarkss: "",
    fa_offer: false,
    jiazai: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 将当前的时间填 入确认offer 日期内
    var date = this.getNowFormatDate()
    var time = this.get_time()

    console.log(date)
    console.log(time)

    this.setData({
      date: date,
      time: time
    })




    wx.hideShareMenu()
    console.log("点击简历详情", options)
    var resume_id = options.resume_id
    this.setData({
      resume_id: resume_id
    })

    this.get_resume_detail(resume_id)

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
          for (var i = 0; i < e.data.data.company_jd.length; i++) {
            list.push(e.data.data.company_jd[i].jd_title)
          }

          that.setData({
            picker: list,
            company_address: e.data.data.email_info.company_address,
            company_name: e.data.data.email_info.company_name,
            contacts: e.data.data.email_info.company_name,
            contacts_phone: e.data.data.email_info.contacts_phone,
            remarks: e.data.data.email_info.remarks,
            jiazai: false

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

  back: function() {
    console.log('点击返回')
    wx.navigateBack({

    })
  },
  get_resume_detail(resume_id) {
    var that = this


    var token = this.encode()
    var phone = wx.getStorageSync('phone')

    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/resume_details',
      data: {
        company_id: phone,
        resume_id: resume_id,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('请求简历详情成功', e)

          that.setData({
            resume: e.data.data.resume_details,
            resume_position: e.data.data.jd_position,
            user_phone: e.data.data.resume_details.user_phone,
            select: e.data.data.resume_status,
            remarkss: e.data.data.remarks,

            
            jobhunter_subject: e.data.data.jobhunter_subject

          })


          console.log("简历的状态是", that.data.select, that.data.jobhunter_subject)

        } else {
          console.log("猎场简历详情请求失败")
          console.log(e)
        }

        that.setData({
          jiazai: false
        })
      },
      fail() {
        that.setData({
          jiazai: false
        })
      }
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
    // var base = '../../utils/base64.js';
    // var result = base.encode(str);
    var base64_str = app.base64_encode(str)
    console.log(base64_str)
    return base64_str



  },

  select(e) {
    console.log("点击选择", e)


    // 传来的按钮数字    
    var resume_status = e.currentTarget.dataset.num
    var resume_id = this.data.resume_id
    var token = this.encode()
    var that = this

    // 如果是发offer的话弹出窗口
    if (resume_status == '3') {
      this.setData({
        fa_offer: true
      })
      // wx.showModal({
      //   title: '提示',
      //   content: '是否给该求职者发送offer',
      //   success(res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //       wx.showLoading({
      //         title: '正在修改状态',
      //       })


      //       wx.request({

      //         method: "POST",
      //         url: 'https://www.hr24.com.cn/recruitmen_tools/resume_status_update',
      //         data: {

      //           resume_id: resume_id,
      //           resume_status: resume_status,
      //           token: token

      //         },
      //         header: {
      //           "Content-Type": "application/x-www-form-urlencoded"
      //         },
      //         success(e) {
      //           if (e.data.message == 'ok') {
      //             console.log("请求成功", e)
      //             wx.hideLoading()
      //             wx.showToast({
      //               title: '发送offer成功',
      //               icon: 'success',
      //               duration: 1500
      //             })

      //             that.setData({
      //               select: resume_status
      //             })

      //           } else {
      //             console.log("请求不成功", e)
      //             wx.hideLoading()
      //             wx.showToast({
      //               title: '修改状态失败',
      //               icon: 'none',
      //               duration: 1500
      //             })
      //           }


      //         }
      //       })
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
    } else {

      console.log(resume_id)
      console.log(resume_status)
      wx.showLoading({
        title: '正在修改状态',
      })

      wx.request({

        method: "POST",
        url: 'https://www.hr24.com.cn/recruitmen_tools/resume_status_update',
        data: {
          company_id: wx.getStorageSync('phone'),

          resume_id: resume_id,
          resume_status: resume_status,
          token: token

        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(e) {
          if (e.data.message == 'ok') {
            console.log("请求成功", e)
            wx.hideLoading()
            wx.showToast({
              title: '修改状态成功',
              icon: 'success',
              duration: 1500
            })
            that.setData({
              select: resume_status
            })

          } else {
            console.log("请求不成功", e)
            wx.hideLoading()
            wx.showToast({
              title: '修改状态失败',
              icon: 'none',
              duration: 1500
            })
          }


        }
      })
    }


  },

  call_phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.user_phone // 仅为示例，并非真实的电话号码
    })
  },


  TimeChange(e) {
    console.log(e)
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    console.log(e)
    this.setData({
      date: e.detail.value
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },


  offer_yes(e) {

    // 用户点击确定
    console.log(this.data.time)
    console.log(this.data.date)
    console.log(this.data.picker[this.data.index])


    var company_name = this.data.company_name
    var contacts = this.data.contacts
    var contacts_phone = this.data.contacts_phone
    var company_address = this.data.company_address
    var remarks = this.data.remarks

    var that = this

    var token = this.encode()
    var phone = wx.getStorageSync('phone')

    console.log(that.data.resume.user_name)
    console.log(that.data.resume.email)

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
        jd_title: that.data.picker[that.data.index],
        interview_time: that.data.date + '-' + that.data.time,
        jobhunter_email: that.data.resume.email,
        jobhunter_name: that.data.resume.user_name,
        sex: that.data.resume.sex,
        resume_id: that.data.resume_id,




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
            title: '发送offer成功',
          })

        } else {
          console.log("请求失败")

        }


      }
    })

  },

  offer_no() {
    this.setData({
      fa_offer: false
    })
  },
  // 点击更改备注
  beizhu() {
    this.setData({
      beizhu: true
    })
  },
  // 点击取消
  beizhu2() {
    this.setData({
      beizhu: false
    })
  },

  // 点击确定
  beizhu1() {
    var that = this
    var phone = wx.getStorageSync('phone')
    var token = this.encode()
    console.log(that.data.remarkss)
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/hr_remarks',
      data: {

        company_id: phone,

        resume_id: that.data.resume_id,

        remarks: that.data.remarkss,
        token: token






      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == -5) {
          wx.showToast({
            title: '不可以添加表情',
            icon: 'none',
            duration: 2000
          })
        }
        if (e.data.message == 'ok') {
          console.log("备注保存成功", e)
          that.setData({
            beizhu: false
          })
          that.get_resume_detail(that.data.resume_id)


          wx.showToast({
            title: '备注保存成功',
          })

        } else {
          console.log("请求失败", e)
          wx.showToast({
            title: '备注保存失败',
          })

        }


      },complete(){

      }
    })

  },

  input_beizhu(e) {
    console.log(e)
    this.setData({
      remarkss: e.detail.value
    })
  },


  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  get_time() {
    var myDate = new Date(); //获取系统当前时间


    var mytime = myDate.toLocaleTimeString(); //获取当前时间

    var jz = mytime.substring(0, 2)
    var sj = mytime.substring(2)
    var sj_list = sj.split(":")
    console.log(jz)
    console.log(sj)
    console.log(sj_list)
    if (jz == '上午') {
      var time = sj_list[0] + ":" + sj_list[1]
      return time
    } else {
      var time = String(Number(sj_list[0]) + 12) + ":" + sj_list[1]
      return time
    }

  },

  xiugai() {

    if (this.data.xiugai) {
      this.setData({
        xiugai: false
      })
    } else {
      this.setData({
        xiugai: true
      })
    }
    this.setData({
      new_name: this.data.resume.user_name,
      new_age: this.data.resume.age,
      new_email: this.data.resume.email,
      new_user_phone: this.data.resume.user_phone,
      new_idcard: this.data.resume.idcard
    })


  },
  xiugai23() {

    this.setData({
      xiugai: false
    })
  },

  set_resume_info() {



    var token = this.encode()
    var that = this
    var phone = wx.getStorageSync('phone')


   

    console.log(that.data.new_name, that.data.new_age, that.data.new_email, that.data.new_idcard, that.data.new_user_phone)
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/hr_modify_resume',
      data: {

        company_id: phone,

        resume_id: that.data.resume_id,

        name: that.data.new_name,
        age: that.data.new_age,

        email: that.data.new_email,
        idcard: that.data.new_idcard,
        phone: that.data.new_user_phone,

        token: token,






      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log("备注简历信息成功", e)



          wx.showToast({
            title: '保存信息成功',
          })


        } else {
          console.log("请求失败", e)
          wx.showToast({
            title: '保存信息失败',
          })

        }


      },
      fail() {

      },
      complete() {
        that.setData({
          xiugai: false
        })
        that.get_resume_detail(that.data.resume_id)
      }
    })

  },


  new_name(e) {

    this.setData({
      new_name: e.detail.value
    })
  },

  new_age(e) {

    this.setData({
      new_age: e.detail.value
    })
  },

  new_email(e) {

    this.setData({
      new_email: e.detail.value
    })
  },

  new_user_phone(e) {

    this.setData({
      new_user_phone: e.detail.value
    })
  },

  new_idcard(e) {

    this.setData({
      new_idcard: e.detail.value
    })
  },

  set_resume_save() {
    var that = this


    if (that.data.new_name.length > 1) {
      if (Number(that.data.new_age) >= 18) {
        if (that.data.new_email.indexOf("@") != -1) {
          if (that.data.new_user_phone.length == 11) {
            if (that.data.new_idcard.length == 18) {

              wx.showModal({
                title: '提示',
                content: '是否要修改这份简历',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    that.set_resume_info()

                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })

            } else {

              wx.showToast({
                title: '身份证号不正确',
                icon: 'none',
                duration: 1000
              })
            }
          } else {

            wx.showToast({
              title: '手机号不正确',
              icon: 'none',
              duration: 1000
            })
          }

        } else {
          wx.showToast({
            title: '请填写正确邮箱',
            icon: 'none',
            duration: 1000
          })

        }

      } else {

        wx.showToast({
          title: '年龄至少18岁',
          icon: 'none',
          duration: 1000
        })
      }

    } else {

      wx.showToast({
        title: '姓名至少二位',
        icon: 'none',
        duration: 1000
      })
    }


    

  },
  // 公司名
  company_name(e) {
    this.setData({
      company_name: e.detail.value
    })
  },

  // 联系人
  contacts(e) {
    this.setData({
      contacts: e.detail.value
    })

  },

  //联系电话
  contacts_phone(e) {
    this.setData({
      contacts_phone: e.detail.value
    })
  },

  //公司地址
  company_address(e) {
    this.setData({
      company_address: e.detail.value
    })
  },




})