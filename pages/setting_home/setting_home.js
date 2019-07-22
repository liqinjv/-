var app = getApp()
var img1 = []
var logo_list = []
var fengyun_list = []
var team_list = []
Page({
  data: {

    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    img1: [],
    logo: [],
    fengyun: [],
    team: [],

    jieshao: '',
    jieshao_num: 0,
    dizhi: '',
    fengyun_name: '',
    fengyun_position: '',
    fengyun_detail: '',


    fengyun_num: 0,
    hangye: true,

    industry_id: '',
    industry_id_value: '',


    guimo_1: 0,
    guimo_2: 20,
    region: ['广东省', '广州市', '海珠区'],

    hangye_key: ['计算机软件', 'IT服务(系统/数据/维护)', '电子技术/半导体/集成电路', '计算机硬件', '通信/电信/网络设备', '通信/电信运营、增值服务', '网络游戏', '基金/证券/期货/投资', '保险', 'IT|通信|电子|互联网', '银行', '金融业', '信托/担保/拍卖/典当', '房地产|建筑业', '房地产/建筑/建材/工程', '商业服务', '家居/室内设计/装饰装潢', '贸易|批发|零售|租赁业', '物业管理/商业中心', '文体教育|工艺美术', '专业服务(财会/法律/人力资源等)', '生产|加工|制造', '广告/会展/公关', '交通|运输|物流|仓储', '中介服务', '服务业', '检验/检测/认证', '文化|传媒|娱乐|体育', '外包服务', '能源|矿产|环保', '快速消费品（食品/饮料/烟酒/日化）', '政府|非盈利机构', '农|林|牧|渔|其他', '贸易/进出口', '零售/批发', '租赁服务', '教育/培训/院校', '礼品/玩具/工艺美术/收藏品/奢侈品', '汽车/摩托车', '大型设备/机电设备/重工业', '加工制造（原料加工/模具）', '仪器仪表及工业自动化', '印刷/包装/造纸', '办公用品及设备', '医药/生物工程', '医疗设备/器械', '航空/航天研究与制造', '交通/运输', '物流/仓储', '医疗/护理/美容/保健/卫生服务', '酒店/餐饮', '旅游/度假', '媒体/出版/影视/文化传播', '娱乐/体育/休闲', '能源/矿产/采掘/冶炼', '石油/石化/化工', '电气/电力/水利', '环保', '政府/公共事业/非盈利机构', '学术/科研', '农/林/牧/渔', '跨领域经营', '移动互联网/人力资源服务', '其他', '互联网/电子商务'],
    hangye_value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67]





  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    img1 = []
    logo_list = []
    fengyun_list = []
    team_list = []
    this.get_home()
    app.globalData.have_data = 0

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
    var industry_id_key = wx.getStorageSync('hangye_key')
    var industry_id_value = wx.getStorageSync('hangye_value')

    this.setData({
      industry_id: industry_id_key,
      industry_id_value: industry_id_value
    })

    console.log(this.data.industry_id_key)
    console.log(this.data.industry_id_value)

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


  // 从系统的相册中获取图片
  get_phone_image() {
    var that = this
    console.log("从系统的相册获取图片")
    if (that.data.img1.length < 5) {
      wx.chooseImage({
        count: 5 - that.data.img1.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {

          const tempFilePaths = res.tempFilePaths

          console.log(tempFilePaths)
          that.setData({
            jiazai: true
          })
          for (var i = 0; i < tempFilePaths.length; i++) {
            
            wx.uploadFile({
              url: 'https://www.hr24.com.cn/recruitmen_tools/upload_image_company_pic', //仅为示例，非真实的接口地址
              filePath: tempFilePaths[i],
              name: 'img',
              formData: {
                'gs_id': wx.getStorageSync('phone'),

                // 'jieshao': this.data.jieshao,
                // 'dizhi': this.data.dizhi,
                // 'fengyun_name': this.data.fengyun_name,
                // 'fengyun_position': this.data.fengyun_position,
                // 'fengyun_detail': this.data.fengyun_detail
              },
              success(res) {
                // console.log(res.data)
                img1.push(JSON.parse(res.data).url)

                that.setData({
                  img1: img1
                })



              },
              complete() {
                console.log(that.data.img1)
               
              }
            })


          }
          that.setData({
            jiazai: false
          })



        }
      })
    } else {
      wx.showToast({
        title: '最多添加5张图片',
        icon: 'none',
        duration: 1200
      })

    }

  },



  remove_img(e) {
    var that = this


    var img = that.data.img1

    img.splice(e.currentTarget.dataset.index, 1);
    img1.splice(e.currentTarget.dataset.index, 1);

    that.setData({
      img1: img
    })

  },



  logo_img(e) {
    var that = this
    console.log("从系统的相册获取图片")

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {

        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          jiazai: true
        })
        wx.uploadFile({
          url: 'https://www.hr24.com.cn/recruitmen_tools/upload_image_company_logo', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'img',
          formData: {
            'gs_id': wx.getStorageSync('phone')
            // 'jieshao': this.data.jieshao,
            // 'dizhi': this.data.dizhi,
            // 'fengyun_name': this.data.fengyun_name,
            // 'fengyun_position': this.data.fengyun_position,
            // 'fengyun_detail': this.data.fengyun_detail
          },
          success(res) {
            console.log(res)
            logo_list.push(JSON.parse(res.data).url)
            console.log(logo_list)

          },
          complete() {
            that.setData({
              logo: logo_list,
              jiazai:false
            })
          }
        })

        // for (var i = 0; i < tempFilePaths.length; i++) {

        // }



      }
    })

  },

  logo_img_remove(e) {

    var that = this
    var logo = that.data.logo

    logo.splice(e.currentTarget.dataset.index, 1);
    logo_list.splice(e.currentTarget.dataset.index, 1);

    that.setData({
      logo: logo
    })

  },


  // 公司介绍
  jieshao_input(e) {

    console.log("公司介绍", e)
    this.setData({
      jieshao: e.detail.value,
      jieshao_num: e.detail.value.length
    })


  },



  // 风云人物
  fengyun_img(e) {

    var that = this
    console.log("从系统的相册获取图片")

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {

        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          jiazai: true
        })

        // for (var i = 0; i < tempFilePaths.length; i++) {

        // }
        wx.uploadFile({
          url: 'https://www.hr24.com.cn/recruitmen_tools/upload_image_manager', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'img',
          formData: {
            'gs_id': wx.getStorageSync('phone')
            // 'jieshao': this.data.jieshao,
            // 'dizhi': this.data.dizhi,
            // 'fengyun_name': this.data.fengyun_name,
            // 'fengyun_position': this.data.fengyun_position,
            // 'fengyun_detail': this.data.fengyun_detail
          },
          success(res) {
            console.log(res)
            console.log(res)
            fengyun_list.push(JSON.parse(res.data).url)
            console.log(fengyun_list)
          },
          complete() {
            that.setData({
              fengyun: fengyun_list,
              jiazai:false
            })
          }
        })



      }
    })
  },


  fengyun_img_remove(e) {
    var that = this
    var fengyun = that.data.fengyun

    fengyun.splice(e.currentTarget.dataset.index, 1);
    fengyun_list.splice(e.currentTarget.dataset.index, 1);

    that.setData({
      fengyun: fengyun
    })
  },


  fengyun_text_input(e) {
    console.log("风云人物的介绍", e)
    this.setData({
      fengyun_detail: e.detail.value,
      fengyun_num: e.detail.value.length
    })

  },

  fenyun_name_input(e) {
    console.log("风云人物名字", e)
    this.setData({
      fengyun_name: e.detail.value
    })
  },

  fenyun_zhiwei_input(e) {
    console.log("风云人物职位", e)
    this.setData({
      fengyun_position: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
    console.log(this.data.region)
  },

  // 获取团队风采图片
  get_team_image(e) {
    var that = this
    console.log("从系统的相册获取图片")
    if (that.data.team.length < 5) {
      wx.chooseImage({
        count: 5 - that.data.team.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {

          const tempFilePaths = res.tempFilePaths
          that.setData({
            jiazai: true
          })

          for (var i = 0; i < tempFilePaths.length; i++) {
            // team_list.push(tempFilePaths[i])
            wx.uploadFile({
              url: 'https://www.hr24.com.cn/recruitmen_tools/upload_image_company_group', //仅为示例，非真实的接口地址
              filePath: tempFilePaths[i],
              name: 'img',
              formData: {
                'gs_id': wx.getStorageSync('phone'),
                // 'jieshao': this.data.jieshao,
                // 'dizhi': this.data.dizhi,
                // 'fengyun_name': this.data.fengyun_name,
                // 'fengyun_position': this.data.fengyun_position,
                // 'fengyun_detail': this.data.fengyun_detail
              },
              success(res) {
                console.log(res)
                console.log(res)
                team_list.push(JSON.parse(res.data).url)     
                console.log(team_list)
              },
              complete() {
                that.setData({
                  team: team_list
                })
              }
            })
          }
          that.setData({
            jiazai: false
          })

          // that.setData({
          //   team: team_list
          // })

        }
      })
    } else {
      wx.showToast({
        title: '最多添加5张图片',
        icon: 'none',
        duration: 1200
      })

    }

  },



  // 删除团队风采图片
  remove_team_img(e) {
    var that = this
    var team = that.data.team

    team.splice(e.currentTarget.dataset.index, 1);
    team_list.splice(e.currentTarget.dataset.index, 1);

    that.setData({
      team: team_list
    })
  },


  // 地址输入
  city_input(e) {
    console.log('公司地址', e)
    this.setData({
      dizhi: e.detail.value
    })


  },

  save() {

    console.log('公司展示图片', this.data.img1)
    console.log('公司logo', this.data.logo)
    console.log('公司风云人物的照片', this.data.fengyun)
    console.log('公司团队风采图片', this.data.team)

    console.log('公司介绍', this.data.jieshao)
    console.log('公司地址', this.data.dizhi)
    console.log('风云人物姓名', this.data.fengyun_name)
    console.log('风云人物职位', this.data.fengyun_position)
    console.log('风云人物详情', this.data.fengyun_detail)

    var that = this

    if (this.data.img1.length >= 2 && this.data.img1.length < 6) {
      if (this.data.logo.length == 1) {
        if (this.data.jieshao.length >= 200 && this.data.jieshao.length <= 300) {
          if (this.data.dizhi.length < 250 && this.data.dizhi.length != 0) {
            if (this.data.fengyun.length == 1) {
              if (this.data.fengyun_name.length < 20 && this.data.fengyun_name.length != 0) {
                if (this.data.fengyun_position.length < 100 && this.data.fengyun_position.length != 0) {
                  if (this.data.fengyun_detail.length >= 20 && this.data.fengyun_detail.length <= 100) {
                    if (this.data.team.length >= 2 && this.data.team.length < 6) {

                      if (that.data.industry_id_value != 0) {

                        console.log("保存信息11")

                        that.save2()

                      } else {
                        wx.showToast({
                          title: '请选择公司所属行业！',
                          icon: 'none',
                          duration: 1200
                        })
                      }



                    } else {
                      wx.showToast({
                        title: '团队风采2-5张！',
                        icon: 'none',
                        duration: 1200
                      })
                    }

                  } else {
                    wx.showToast({
                      title: '风云人物介绍20-100字！',
                      icon: 'none',
                      duration: 1200
                    })
                  }

                } else {
                  wx.showToast({
                    title: '请填写风云人物职位',
                    icon: 'none',
                    duration: 1200
                  })
                }

              } else {
                wx.showToast({
                  title: '请填写风云人物姓名',
                  icon: 'none',
                  duration: 1200
                })
              }

            } else {
              wx.showToast({
                title: '请填写风云人物照片',
                icon: 'none',
                duration: 1200
              })
            }

          } else {
            wx.showToast({
              title: '请填写公司地址!',
              icon: 'none',
              duration: 1200
            })
          }


        } else {
          wx.showToast({
            title: '公司介绍200-300字！',
            icon: 'none',
            duration: 1200
          })
        }



      } else {
        wx.showToast({
          title: '请填写公司logo',
          icon: 'none',
          duration: 1200
        })
      }


    } else {
      wx.showToast({
        title: '公司展示图片至少2张！',
        icon: 'none',
        duration: 1200
      })
    }


  },

  save2() {
    var that = this
    var token = this.encode()


    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/save_company_info',
      data: {

        token: token,
        company_id: wx.getStorageSync('phone'),
        company_name: that.data.company_name,
        company_group: that.data.team,
        scale: that.data.guimo_1 + '-' + that.data.guimo_2,
        manager_name: that.data.fengyun_name,
        manager_tag: that.data.fengyun_position,
        manager_background: that.data.fengyun_detail,
        manager_pic: that.data.fengyun,
        company_introduction: that.data.jieshao,
        company_city: that.data.company_city,
        company_address: that.data.region + ',' + that.data.dizhi,
        company_logo: that.data.logo,
        company_pic: that.data.img1,
        industry_id: that.data.industry_id_value








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
          console.log("保存成功", e)

          wx.navigateBack({

          })

          wx.showToast({
            title: '保存成功',
          })

        } else {
          console.log("请求失败", e)

        }


      }
    })
    // console.log('save2')
    // // 遍历公司展示图
    // for (var i = 0; this.data.img1.length > i; i++) {
    //   console.log('save11111')

    //   wx.uploadFile({
    //     url: 'https://www.hr24.com.cn/recruitmen_tools/upload_image_company_pic', //仅为示例，非真实的接口地址
    //     filePath: this.data.img1[i],
    //     name: 'img',
    //     formData: {
    //       'gs_id': wx.getStorageSync('phone'),

    //       // 'jieshao': this.data.jieshao,
    //       // 'dizhi': this.data.dizhi,
    //       // 'fengyun_name': this.data.fengyun_name,
    //       // 'fengyun_position': this.data.fengyun_position,
    //       // 'fengyun_detail': this.data.fengyun_detail
    //     },
    //     success(res) {
    //       console.log(res)
    //     }
    //   })
    // }


    // // 遍历公司logo
    // for (var i = 0; this.data.logo.length > i; i++) {
    //   console.log('save22222')

    //   wx.uploadFile({
    //     url: 'https://www.hr24.com.cn/recruitmen_tools/upload_image_company_logo', //仅为示例，非真实的接口地址
    //     filePath: this.data.logo[i],
    //     name: 'img',
    //     formData: {
    //       'gs_id': wx.getStorageSync('phone'),
    //       'jieshao': this.data.jieshao,
    //       'dizhi': this.data.dizhi,
    //       'fengyun_name': this.data.fengyun_name,
    //       'fengyun_position': this.data.fengyun_position,
    //       'fengyun_detail': this.data.fengyun_detail
    //     },
    //     success(res) {
    //       console.log(res)
    //     }
    //   })
    // }


    // // 遍历风云人物
    // for (var i = 0; this.data.fengyun.length > i; i++) {
    //   console.log('save23333333')

    //   wx.uploadFile({
    //     url: 'https://www.hr24.com.cn/recruitmen_tools/upload_image_manager', //仅为示例，非真实的接口地址
    //     filePath: this.data.fengyun[i],
    //     name: 'img',
    //     formData: {
    //       'gs_id': wx.getStorageSync('phone'),
    //       'jieshao': this.data.jieshao,
    //       'dizhi': this.data.dizhi,
    //       'fengyun_name': this.data.fengyun_name,
    //       'fengyun_position': this.data.fengyun_position,
    //       'fengyun_detail': this.data.fengyun_detail
    //     },
    //     success(res) {
    //       console.log(res)
    //     }
    //   })
    // }


    // // 遍历团队风采
    // for (var i = 0; this.data.team.length > i; i++) {
    //   console.log('save24444444')

    //   wx.uploadFile({
    //     url: 'https://www.hr24.com.cn/recruitmen_tools/upload_image_company_group', //仅为示例，非真实的接口地址
    //     filePath: this.data.team[i],
    //     name: 'img',
    //     formData: {
    //       'gs_id': wx.getStorageSync('phone'),
    //       'jieshao': this.data.jieshao,
    //       'dizhi': this.data.dizhi,
    //       'fengyun_name': this.data.fengyun_name,
    //       'fengyun_position': this.data.fengyun_position,
    //       'fengyun_detail': this.data.fengyun_detail
    //     },
    //     success(res) {
    //       console.log(res)
    //     }
    //   })
    // }


  },

  nav_hangye() {
    wx.navigateTo({
      url: '/pages/hangye/hangye',
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

  gongsi_input(e) {
    this.setData({
      company_name: e.detail.value
    })
  },


  industry_id() {
    wx.navigateTo({
      url: '/pages/hangye/hangye',
    })
  },


  guimo_1(e) {
    this.setData({
      guimo_1: e.detail.value
    })
  },

  guimo_2(e) {
    this.setData({
      guimo_2: e.detail.value
    })
  },


  get_home() {
    var that = this
    var token = that.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/get_company_info',
      data: {

        token: token,
        company_id: wx.getStorageSync('phone')



      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log("获取公司信息成功", e)

          for (var i = 0; i < e.data.data.company_pic.length; i++) {
            img1.push(e.data.data.company_pic[i])
          }
          for (var i = 0; i < e.data.data.company_group.length; i++) {
            team_list.push(e.data.data.company_group[i])
          }

          that.setData({

            company_name: e.data.data.company_info[0].company_name,
            team: e.data.data.company_group,
            img1: e.data.data.company_pic,
            logo: e.data.data.company_info[0].company_logo,
            fengyun: e.data.data.company_info[0].manager_pic,
            guimo_1: e.data.data.company_info[0].scale_down,
            guimo_2: e.data.data.company_info[0].scale_up,
            jieshao: e.data.data.company_info[0].company_introduction,
            jieshao_num: e.data.data.company_info[0].company_introduction.length,
            region: e.data.data.company_info[0].company_address_list,

            dizhi: e.data.data.company_info[0].company_address_init,
            fengyun_name: e.data.data.company_info[0].manager_name,
            fengyun_position: e.data.data.company_info[0].manager_tag,
            fengyun_detail: e.data.data.company_info[0].manager_background,
            fengyun_num: e.data.data.company_info[0].manager_background.length,



            // scale: that.data.guimo_1 + '-' + that.data.guimo_2,
            // fengyun_name: e.data.data.company_info[0].manager_name,
            // fengyun_position: e.data.data.company_info[0].manager_tag,
            // fengyun_detail: e.data.data.company_info[0].manager_background,
            // fengyun_list: e.data.data.company_info[0].manager_pic,

            // jieshao: that.data.data.company_info[0].company_introduction,
            // company_city: that.data.company_city,
            // company_address: that.data.region + ',' + that.data.dizhi,
            // company_logo: logo_list,
            // company_pic: img1,
            // industry_id: that.data.industry_id_value


          })


        } else {
          console.log("请求失败", e)

        }


      }
    })
  }




})