//index.js
//获取应用实例
const app = getApp()

Page({
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  data: {
    townName: '万达广场',
    category: '品类',
    categoryId: 0,
    addressName: '湖滨银泰',
    adrressArrayList: [{
      id: 0,
      name: '万达广场'
    }, {
      id: 1,
      name: '城西银泰'
    }, {
      id: 2,
      name: '湖滨银泰'
    }, {
      id: 3,
      name: '中大银泰'
    }, {
      id: 4,
      name: '水晶城'
    }, ],
    adrressArray: ['万达广场', '城西银泰', '湖滨银泰', '中大银泰', '水晶城'],
    categoryArray: ['烧烤', '奶茶', '中餐', '西餐', '炸鸡', '港式', '西北菜'],
    goodList: [{
      "name": "小老头烧烤",
      "price": "180元/位",
      "address": "万达广场1F金街道308"
    }, {
      "name": "小老头烧烤",
      "price": "180元/位",
      "address": "万达广场1F金街道308"
    }, {
      "name": "小老头烧烤",
      "price": "180元/位",
      "address": "万达广场1F金街道308"
    }],
    motto: '商家联盟',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    city_name: '',

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  applyEntry: function(){
    wx.navigateTo({
      url: '../applyEntry/applyEntry'
    })
  },
  helloClick: function() {
    wx.showToast({
      title: '点击了我名字',
    })
    wx.showTabBarRedDot({
      index: 1,
    })
  },
  onLoad: function() {
    that = this;
    if (app.globalData.userInfo.token) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // app.ajax({
      //   url: '/merchant-business',
      //   method: "GET",
      //   data: {
      //     fields: "name",
      //   },
      //   success: function (res) {
      //     console.log(res)
      //     that.setData({

      //     })
      //   }
      // })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      describe: "商家联盟"
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  copyCity() {
    wx.navigateTo({
      url: `/pages/cityList/cityList`
    })
  },
  choosAdress(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    switch (id) {
      case 1:
        this.setData({
          addressName: this.data.adrressArray[e.detail.value],
          //e.detail.value 代表item的position。
          addressId: parseInt(e.detail.value)
        })
        break;
      case 2:
        this.setData ({
          category: this.data.categoryArray[e.detail.value],
          categoryId: parseInt(e.detail.value)
        })
        break
    }
  }
})

var that;
var Util = require('../../utils/util.js');