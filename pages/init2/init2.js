//获取应用实例
const app = getApp()

Page({
  data: {

    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    array: ['不限', '房地产', '金融', '旅游', '零售/快销', '教育/培训', '运动/健身', '汽车', '互联网'],
    objectArray: [
      {
        id: 0,
        name: '房产经纪人（销售）'
      },
      {
        id: 1,
        name: '内勤/助理（行政类）'
      },
      {
        id: 2,
        name: '店长经理（管理类）'
      }
    ],
    index: 0,

    array2: ['销售类', '行政类', '管理类'],
    index2: 0,

    city_list:['北京', '深圳', '南京', '长沙', '广州', '郑州','成都','南宁','西安'],
    multiArray2: [['北京', '深圳', '南京', '长沙', '广州', '郑州', '成都', '南宁' ,'西安'], ['不限', '东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区', '周边']
    ],
   
    multiIndex2: [0, 0],

    plc_list: [1, 100],

    industry: 0,
    industry_class: 0,

    bj_id: [110100,110101, 110102, 110105, 110106, 110107, 110108, 110109, 110111, 110112, 110113, 110114, 110115, 110116, 110117, 110118, 110119, 900006],
    bj_name:  ["不限", '东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区', '周边'],
    bj_parent_id: 110100,

    nj_id: [320100,320102, 320104, 320105, 320106, 320111, 320113, 320114, 320115, 320116, 320117, 320118, 900007, 900008],
    nj_name:['不限', '玄武区', '秦淮区', '建邺区', '鼓楼区', '浦口区', '栖霞区', '雨花台区', '江宁区', '六合区', '溧水区', '高淳区', '周边', '大厂'],
    nj_parent_id: 320100,

    sz_id: [440300,440303, 440304, 440305, 440306, 440307, 440308, 900000, 900001, 900002, 900003, 900004, 900005],
    sz_name:["不限", '罗湖区', '福田区', '南山区', '宝安区', '龙岗区', '盐田区', '布吉', '周边', '坪山新区', '光明新区', '大鹏新区', '龙华新区'],
    sz_parent_id: 440300,
    
    gz_id: [440100,440103, 440104, 440105, 440106, 440111, 440112, 440113, 440114, 440115, 440117, 440118, 900011, 900012],
    gz_name:['不限', '荔湾区', '越秀区', '海珠区', '天河区', '白云区', '黄埔区', '番禺区', '花都区', '南沙区', '从化区', '增城区', '周边', '萝岗'],
    gz_parent_id: 440100,

    cs_id: [430100,430102, 430103, 430104, 430105, 430111, 430112, 430121, 430124, 430181, 900009, 900010],
    cs_name :['不限', '芙蓉区', '天心区', '岳麓区', '开福区', '雨花区', '望城区', '长沙县', '宁乡县', '浏阳市', '星沙', '其他'],
    cs_parent_id: 430100,


    zz_id: [410100,410102, 410103, 410104, 410105, 410106, 410108, 410122, 410181,  410183, 410184, 410185, 900013, 900014, 900015, 900016],
    zz_name:['不限', '中原区', '二七区', '管城回族区', '金水区', '上街区', '惠济区', '中牟县', '巩义市',  '新密市', '新郑市', '登封市', '周边', '经开区', '高新区', '郑东新区'],
    zz_parent_id: 410100,

    cd_id: [510100,510105, 510104, 510106, 510107, 510108, 510112, 510113, 510114, 510181, 510121, 510115, 510124, 510116, 900017, 510109, 510109, 510132, 510184, 510129, 510131, 510183, 510141, 510182],
    cd_name: ['不限','青羊区', '锦江区', '金牛区', '武侯区', '成华区', '龙泉驿区', '青白江区', '新都区', '都江堰', '金堂县', '温江', '郫都区', '双流', '周边', '高新区', '高新西区', '新津', '崇州', '大邑', '蒲江', '邛崃市', '天府新区', '彭州'],
    cd_parent_id: 510100,

    nn_id: [450100,450103, 450102, 450109, 450107, 450105, 900019, 450108, 450110, 450123, 450124, 450125, 450126, 450127],
    nn_name: ['不限', '青秀区', '兴宁区', '邕宁区', '西乡塘区', '江南区', '其他', '良庆区', '武鸣', '隆安', '马山', '上林', '宾阳', '横县'],
    nn_parent_id: 450100,

    xa_id: [610100, 610102, 610103, 610104, 610111, 610112, 610113, 610114, 610115, 610116, 610122, 610124, 610125, 610126, 610127, 610128, 610129, 610130, 610131, 610132, 610133, 610134],
    xa_name: ['不限', '西安新城区', '西安碑林区', '西安莲湖区', '西安灞桥区', '西安未央区', '西安雁塔区', '西安阎良区', '西安临潼区', '西安长安区', '西安蓝田县', '西安周至县', '西安户县', '西安周边', '西安高新区', '西安曲江新区', '西安鄠邑', '西安浐灞', '西安大兴新区', '西安经开区', '西安西咸新区', '西安高陵'],
    xa_parent_id: 610100,






    shi:0,
    qu:0,
    select_shi: ["不限", '东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区', '周边'],
    select_id: [110100, 110101, 110102, 110105, 110106, 110107, 110108, 110109, 110111, 110112, 110113, 110114, 110115, 110116, 110117, 110118, 110119, 900006],
    select_parent_id: 110100







  },

  // 第一次进入页面要执行的
  onReady: function () {

  },
  onLoad: function () {
    wx.hideShareMenu()
    try {
      wx.setStorageSync('money', '不限')
      wx.setStorageSync('work', 0)
      wx.setStorageSync('employed', 0)
    } catch (e) {
    }

  },
  onShow: function () {
    if (this.data.index == 0 || 1 || 2 || 3 || 4) {
      this.setData({
        array2: ['不限', '销售类', '行政类', '管理类']
      })
    }
  },

  //所在的行业
  bindPickerChange: function (e) {
    if (e.detail.value == 0) {
      console.log('所在的行业码为：', 0)
      console.log(e)
      this.setData({
        industry: String(0)
      })
    }

    if (e.detail.value == 1) {
      console.log('所在的行业码为：', 1)
      console.log(e)
      this.setData({
        industry: String(1)
      })
    }
    if (e.detail.value == 2) {
      console.log('所在的行业码为：', 2)
      console.log(e)
      this.setData({
        industry: String(2)
      })
    }
    if (e.detail.value == 3) {
      console.log('所在的行业码为：', 3)
      console.log(e)
      this.setData({
        industry: String(3)
      })
    }
    if (e.detail.value == 4) {
      console.log('所在的行业码为：', 4)
      console.log(e)
      this.setData({
        industry: String(4)
      })
    }
    if (e.detail.value == 5) {
      console.log('所在的行业码为：', 5)
      console.log(e)
      this.setData({
        industry: String(5)
      })
    }
    if (e.detail.value == 6) {
      console.log('所在的行业码为：', 6)
      console.log(e)
      this.setData({
        industry: String(6)
      })
    }
    if (e.detail.value == 7) {
      console.log('所在的行业码为：', 7)
      console.log(e)
      this.setData({
        industry: String(7)
      })
    }
    if (e.detail.value == 8) {
      console.log('所在的行业码为：', 8)
      console.log(e)
      this.setData({
        industry: String(8)
      })
    }
    if (e.detail.value == 9) {
      console.log('所在的行业码为：', 9)
      console.log(e)
      this.setData({
        industry: String(9)
      })
    }


    this.setData({
      index: e.detail.value
    })

  },

  //行业分类
  bindPickerChange2: function (e) {
    console.log('行业分类')


    console.log('T行业分类码，携带值为', Number(e.detail.value))

    this.setData({
      industry_class: String(Number(e.detail.value)),
      index2: e.detail.value
    })
  },


  next: function () {
    wx.navigateTo({
      url: '/pages/init4/init4',

    })

    try {
      console.log(this.data.shi)
      console.log(this.data.qu)
      // 选择北京
      if(this.data.shi==0){
        
        var city_id =  this.data.bj_id[this.data.qu]

        var city_parent_id = this.data.bj_parent_id
        console.log(city_id,city_parent_id)
        
      }
      // 选择深圳
      if (this.data.shi == 1) {
        var city_id = this.data.sz_id[this.data.qu]
        var city_parent_id = this.data.sz_parent_id
        console.log(city_id, city_parent_id)
        
      }
      //  选择南京
      if (this.data.shi == 2) {
        var city_id = this.data.nj_id[this.data.qu]
        var city_parent_id = this.data.nj_parent_id
        console.log(city_id, city_parent_id)
      }
      // 选择长沙
      if (this.data.shi == 3) {
        var city_id = this.data.cs_id[this.data.qu]
        var city_parent_id = this.data.cs_parent_id
        console.log(city_id, city_parent_id)
        
      }
      // 选择广洲
      if (this.data.shi == 4) {
        var city_id = this.data.gz_id[this.data.qu]
        var city_parent_id = this.data.gz_parent_id
        console.log(city_id, city_parent_id)
        
      }
      //选择郑州
      if (this.data.shi == 5) {
        var city_id = this.data.zz_id[this.data.qu]
        var city_parent_id = this.data.zz_parent_id
        console.log(city_id, city_parent_id)
        
      }

      // 选择成都
      if (this.data.shi == 6) {
        var city_id = this.data.cd_id[this.data.qu]
        var city_parent_id = this.data.cd_parent_id
        console.log(city_id, city_parent_id)

      }

      // 选择南宁
      if (this.data.shi == 7) {
        var city_id = this.data.nn_id[this.data.qu]
        var city_parent_id = this.data.nn_parent_id
        console.log(city_id, city_parent_id)

      }


      // 选择西安
      if (this.data.shi == 8) {
        var city_id = this.data.xa_id[this.data.qu]
        var city_parent_id = this.data.xa_parent_id
        console.log(city_id, city_parent_id)

      }
      // console.log(this.data.industry)
      // console.log(this.data.industry_class)
      console.log('plc_ic',city_id)
      console.log('plc_parent_id',city_parent_id)
      console.log("industry",this.data.industry)
      console.log("indestry_class",this.data.industry_class)


      wx.setStorageSync('plc_id', city_id)
      wx.setStorageSync('plc_parent_id', city_parent_id)
      wx.setStorageSync('industry', this.data.industry)
      wx.setStorageSync('industry_class', this.data.industry_class)
    } catch (e) {
      wx.showToast({
        title: '网络异常',
        icon: 'none',
        duration: 2000
      })
    }


  },

  //地区选择器回调
  bind_place2: function (e) {
    console.log('地区选择回调',e)
    


   
      this.setData({
        shi: e.detail.value[0],
        qu: e.detail.value[1]
      })

    if (e.detail.value[0] == 0) {
      this.setData({
        select_shi:this.data.bj_name,
        // select_id:this.data.bj_id,
        // select_id:this.data.bj_parent_id

      })

    } else if (e.detail.value[0] == 1) {
  
      this.setData({
        select_shi: this.data.sz_name,
        // select_id:this.data.sz_id,
        // select_parent_id:this.data.sz_parent_id

      })

    } else if (e.detail.value[0] == 2) {
  
      this.setData({
        select_shi: this.data.nj_name,
        // select_id:this.data.nj_id,
        // select_parent_id:this.data.nj_parent_id

      })

    } else if (e.detail.value[0] == 3) {
    
      this.setData({
        select_shi: this.data.cs_name,
        // select_id:this.data.cs_id,
        // select_parent_id:this.data.cs_parent_id

      })

    } else if (e.detail.value[0] == 4) {
  
      this.setData({
        select_shi: this.data.gz_name,
        // select_id:this.data.gz_name,
        // select_parent_id:this.data.gz_parent_id

      })

    } else if (e.detail.value[0] == 5) {
    
      this.setData({
        select_shi: this.data.zz_name,
        // select_id: this.data.zz_id,
        // select_parent_id:this.data.zz_parent_id

      })

    } else if(e.detail.value[0]==6){
      this.setData({
        select_shi: this.data.cd_name,
        // select_id: this.data.zz_id,
        // select_parent_id:this.data.zz_parent_id

      })
    } else if (e.detail.value[0] == 7) {
      this.setData({
        select_shi: this.data.nn_name,
        // select_id: this.data.zz_id,
        // select_parent_id:this.data.zz_parent_id

      })
    } else if (e.detail.value[0] == 8) {
      this.setData({
        select_shi: this.data.xa_name,
        // select_id: this.data.zz_id,
        // select_parent_id:this.data.zz_parent_id

      })
    }

  },


  bind_place: function (e) {
    console.log('选择器', e)
    console.log(e.detail.column)
    


    // var data = {
    //   multiArray2: this.data.multiArray2,
    //   multiIndex2: this.data.multiIndex2
    // };
    // data.multiIndex2[e.detail.column] = e.detail.value;
    var multiArray_one = this.data.multiArray2[0]
    var list=[]
    list.push(multiArray_one)


    if(1) {
      if (e.detail.column == 0 && e.detail.value==0){


        
        var lists = ["不限", '东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区', '周边'];
        list.push(lists)
        this.setData({
          multiArray2:list
        })

      }
      if (e.detail.column == 0 && e.detail.value == 1) {

        
        var lists = ["不限", '罗湖区', '福田区', '南山区', '宝安区', '龙岗区', '盐田区', '布吉', '周边', '坪山新区', '光明新区', '大鹏新区', '龙华新区'];
        list.push(lists)
        this.setData({
          multiArray2: list
        })
      }
      if (e.detail.column == 0 && e.detail.value == 2) {
        
        var lists = ['不限', '玄武区', '秦淮区', '建邺区', '鼓楼区', '浦口区', '栖霞区', '雨花台区', '江宁区', '六合区', '溧水区', '高淳区', '周边', '大厂'];
        list.push(lists)
        this.setData({
          multiArray2: list
        })
      }
      if (e.detail.column == 0 && e.detail.value == 3) {
        
        var lists = ['不限', '芙蓉区', '天心区', '岳麓区', '开福区', '雨花区', '望城区', '长沙县', '宁乡县', '浏阳市', '星沙', '其他'];
        list.push(lists)
        this.setData({
          multiArray2: list
        })
      }
      if (e.detail.column == 0 && e.detail.value == 4) {
        
        var lists = ['不限', '荔湾区', '越秀区', '海珠区', '天河区', '白云区', '黄埔区', '番禺区', '花都区', '南沙区', '从化区', '增城区', '周边', '萝岗'];
        list.push(lists)
        this.setData({
          multiArray2: list
        })
      }
      if (e.detail.column == 0 && e.detail.value == 5) {
        
        var lists = ['不限', '中原区', '二七区', '管城回族区', '金水区', '上街区', '惠济区', '中牟县', '巩义市', '新密市', '新郑市', '登封市', '周边', '经开区', '高新区', '郑东新区'];
        list.push(lists)
        this.setData({
          multiArray2: list
        })
      }
      if (e.detail.column == 0 && e.detail.value == 6) {
        
        var lists = ['不限', '青羊区', '锦江区', '金牛区', '武侯区', '成华区', '龙泉驿区', '青白江区', '新都区', '都江堰', '金堂县', '温江', '郫都区', '双流', '周边', '高新区', '高新西区', '新津', '崇州', '大邑', '蒲江', '邛崃市', '天府新区', '彭州'];
        list.push(lists)
        this.setData({
          multiArray2: list
        })
      }
      if (e.detail.column == 0 && e.detail.value == 7) {
        
        var lists = ['不限', '青秀区', '兴宁区', '邕宁区', '西乡塘区', '江南区', '其他', '良庆区', '武鸣', '隆安', '马山', '上林', '宾阳', '横县'];
        list.push(lists)
        this.setData({
          multiArray2: list
        })
      }

      if (e.detail.column == 0 && e.detail.value == 8) {

        var lists = ['不限', '西安新城区', '西安碑林区', '西安莲湖区', '西安灞桥区', '西安未央区', '西安雁塔区', '西安阎良区', '西安临潼区', '西安长安区', '西安蓝田县', '西安周至县', '西安户县', '西安周边', '西安高新区', '西安曲江新区', '西安鄠邑', '西安浐灞', '西安大兴新区', '西安经开区', '西安西咸新区', '西安高陵'];
        list.push(lists)
        this.setData({
          multiArray2: list
        })
      }



        // switch (data.multiIndex2[0]) {
        //   case 0:
            


        //     break;
        //   case 1:
        //     data.multiArray2[1] = ["不限",'罗湖区', '福田区', '南山区', '宝安区', '龙岗区', '盐田区', '布吉', '周边', '坪山新区', '光明新区', '大鹏新区', '龙华新区'];

        //     break;
        //   case 2:
        //     data.multiArray2[1] = ['不限', '玄武区', '秦淮区', '建邺区', '鼓楼区', '浦口区', '栖霞区', '雨花台区', '江宁区', '六合区', '溧水区', '高淳区', '周边', '大厂'];

        //     break;
        //   case 3:
        //     data.multiArray2[1] = ['不限','芙蓉区', '天心区', '岳麓区', '开福区', '雨花区', '望城区', '长沙县', '宁乡县', '浏阳市', '星沙', '其他'];

        //     break;

        //   case 4:
        //     data.multiArray2[1] = ['不限', '荔湾区', '越秀区', '海珠区', '天河区', '白云区', '黄埔区', '番禺区', '花都区', '南沙区', '从化区', '增城区', '周边', '萝岗'];

        //     break;

        //   case 5:
        //     data.multiArray2[1] = ['不限', '中原区', '二七区', '管城回族区', '金水区', '上街区', '惠济区', '中牟县', '巩义市',  '新密市', '新郑市', '登封市', '周边', '经开区', '高新区', '郑东新区'];

        //     break;
        //   case 6:
        //     data.multiArray2[1] = ['不限', '青羊区', '锦江区', '金牛区', '武侯区', '成华区', '龙泉驿区', '青白江区', '新都区', '都江堰', '金堂县', '温江', '郫都区', '双流', '周边', '高新区', '高新西区', '新津', '崇州', '大邑', '蒲江', '邛崃市', '天府新区', '彭州'];

        //     break;
        //   case 7:
        //     data.multiArray2[1] = ['不限', '青秀区', '兴宁区', '邕宁区', '西乡塘区', '江南区', '其他', '良庆区', '武鸣', '隆安', '马山', '上林', '宾阳', '横县'];

        //     break;
        // }



        // data.multiIndex2[1] = 0;
        // data.multiIndex2[2] = 0;
        // break;

    }
    // this.setData(data);

  },
  back(){
    wx.navigateBack({
      
    })
  }

})