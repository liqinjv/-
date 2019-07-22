//获取应用实例
const app = getApp()

Page({
  data: {

    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    age_list:0,
    edu_list:0,
    sex_list:0,

    edu: ['不限', '高中以下', '高中', '中专/技校', '大专', '本科', '硕士', '博士', 'MBA / EMBA'],
   
    edu_index: 0,

    index2: 0,

    array2: ['不限', '无经验', '应届生', '1年以下', '1-2年', '3-5年', '6-10年', '10年以上'],
    objectArray2: [
      {
        id: 0,
        name: '不限'
      },
      {
        id: 1,
        name: '无经验'
      },
      {
        id: 2,
        name: '应届生'
      },
      {
        id: 3,
        name: '1年以下'
      },
      {
        id: 4,
        name: '1-2年'
      },
      {
        id: 5,
        name: '3-5年'
      },
      {
        id: 6,
        name: '6-10年'
      },
      {
        id: 7,
        name: '10年以上'
      }

    ],


    sex: ['不限', '男', '女'],
    
    sex_index: 0,




    age: ['不限', '18-35岁', '36-45岁',  '45岁以上'],
    ageArray: [
      {
        id: 0,
        name: '不限'
      },
      {
        id: 1,
        name: '16-35岁'
      },
      {
        id: 2,
        name: '35-45岁'
      },
      {
        id: 3,
        name: '45岁以上'
      }
      

    ],
    age_index: 0,



    cy: ['不限', '有', '无'],
    cyArray: [
      {
        id: 0,
        name: '不限'
      },
      {
        id: 1,
        name: '有'
      },
      {
        id: 2,
        name: '无'
      }

    ],
    cy_index: 0,

    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['北京市', '北京市', '东城区'],
    customItem: '全部'
  },



 
  //学历
  bindPickerChange_edu: function (e) {
    console.log('picker发送选择改变x，携带值为', e.detail.value)
    this.setData({
      edu_index: e.detail.value,
      edu_list: e.detail.value
    })
  },
  //性别
  bindPickerChange_sex: function (e) {
    console.log('picker发送选择改变s，携带值为', e.detail.value)
    this.setData({
      sex_index: e.detail.value,
      sex_list: e.detail.value
    })
  },


  //年龄
  bindPickerChange_age: function (e) {
    console.log('picker发送选择改变a，携带值为', e.detail.value)
    this.setData({
      age_index: e.detail.value,
      age_list: e.detail.value
    })
  },
  //从业经验
  // bindPickerChange_cy: function (e) {
  //   console.log('picker发送选择改变7，携带值为', e.detail.value)
  //   if (e.detail.value == '0') {
  //     wx.setStorageSync('employed', 0)
  //     this.setData({
  //       cy_index: 0
  //     })
  //   }
    
  //   if(e.detail.value=='1'){
  //     wx.setStorageSync('employed', 1)
  //     this.setData({
  //       cy_index:1
  //     })  
  //   }
  //   if (e.detail.value == '2') {
  //     wx.setStorageSync('employed', 2)
  //     this.setData({
  //       cy_index: 2
  //     })  
  //   }
    

  // },


  //引导2 上一页
  nonext: function () {

   wx:wx.navigateBack({
     
   })

  },

  //引导2 完成
  next: function () {
   
 
    
    //写入缓存成功

    console.log(this.data.age_list)
    console.log(this.data.edu_list)
    console.log(this.data.sex_list)
    try {
      wx.setStorageSync('age', this.data.age_list)
      wx.setStorageSync('edu', this.data.edu_list)
      wx.setStorageSync('sex', Number(this.data.sex_list))
      wx.setStorageSync('employed', 2)
      wx.setStorageSync('is_init_index', 0)
      app.globalData.is_init_index=1

      wx.showToast({
        title: '设置成功',
        icon: 'success',
        duration: 2000
      })
      wx.switchTab({
     
        url: '/pages/index/index',

      })
    } catch (e) {
      wx.showToast({
        title: '添加失败',
        icon: 'none',
        duration: 2000
      })
    }
    
    
   

  },
  back: function () {
    wx.navigateBack({

    })
  },
  onLoad(){
    wx.hideShareMenu()
  }

})