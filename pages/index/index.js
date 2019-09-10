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
    addressId:0,
    addressName: '湖滨银泰',
    addressIndex:0,
    categoryIndex:0,
    adrressArrayList: [],
    categoryArrayList:[],
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
      app.ajax({
        url: '/merchant-business',
        method: "GET",
        data: {
          fields: "id,name",
        },
        success: function (res) {
          let adrressArrayList = res.data.rspdata || []
          that.setData({
            adrressArrayList
          })
        },
        fail:function(res){
          console.log(res)
        }
      })
      app.ajax({
        url: '/merchant-category',
        method: "GET",
        data: {
          fields: "id,name",
        },
        success: function (res) {
          let categoryArrayList = res.data.rspdata || []
          that.setData({
            categoryArrayList
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
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
    console.log(parseInt(this.data.adrressArrayList[parseInt(e.detail.value)].id))
    let id = e.currentTarget.dataset.id
    switch (id) {
      case 1:
        this.setData({
          addressName: this.data.adrressArrayList[parseInt(e.detail.value)].name,
          //e.detail.value 代表item的position。
          addressId: parseInt(this.data.adrressArrayList[parseInt(e.detail.value)].id),
          addressIndex: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
        })
        app.ajax({
          url: '/merchant-business/0',
          method: "GET",
          data: {
          },
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          }
        })
        break;
      case 2:
        this.setData ({
          category: this.data.categoryArrayList[e.detail.value].name,
          categoryId: parseInt(this.data.categoryArrayList[parseInt(e.detail.value)].id),
          categoryIndex:e.detail.value,
        })
        app.ajax({
          url: '/merchant-business',
          method: "GET",
          data: {
            fields: "id,name",
          },
          success: function (res) {
            let adrressArrayList = res.data.rspdata || []
            that.setData({
              adrressArrayList
            })
          },
          fail: function (res) {
            console.log(res)
          }
        })
        break
    }
  }
})

var that;
var Util = require('../../utils/util.js');