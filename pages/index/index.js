//index.js
//获取应用实例
const app = getApp()

Page({
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  data: {
    townName: '万达广场',
    category: '默认',
    categoryId: 0,
    addressId: 0,
    addressName: '默认',
    addressIndex: 0,
    categoryIndex: 0,
    adrressArrayList: [],
    categoryArrayList: [],
      listAll:[],
      listDayAll:[],
      listDay:[],
    goodList: [],
    motto: '商家联盟',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    city_name: '',
      app_qrcode_url:'',
    //核销榜颜色
    allFontcolor: "#ffffff",
    allBgColor: "#4D9FFA",

    dayFontcolor: "#000000",
    dayBgColor: "#ffffff",


    //支付相关
    timestamp: '',
    paySign: '',
    signType: '',
    package: '',
    nonceStr: '',
    timeStamp: '',
    appId: '',

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  finishLoad: function(event) {
    var index = event.currentTarget.dataset.index
    var img = 'goodList[' + index + '].logo'
    this.setData({
      [img]: '../../images/company_logo.png'
    })
  },
  applyEntry: function() {
    wx.navigateTo({
      url: '../applyEntry/applyEntry'
    })
  },
  openDetail: function(e) {
    var index = parseInt(e.currentTarget.dataset.index)
    console.log(e)
    console.log(that.data.goodList[index])
    wx.navigateTo({
      url: '../jobDetail/jobDetail?id=' + that.data.goodList[index].id
    })
  },
  changeAll() {
    this.setData({
      allFontcolor: "#ffffff",
        allBgColor: "#4D9FFA",
      dayFontcolor: "#000000",
      dayBgColor: "#ffffff",
        listAll:that.data.listDayAll,
    })
  },
  changeDay() {
    this.setData({
        dayFontcolor: "#ffffff",
        dayBgColor: "#4D9FFA",
    allFontcolor: "#000000",
        allBgColor: "#ffffff",
        listAll:that.data.listDay,
    })
      app.ajax({
          url: '/merchant/Top',
          method: "GET",
          data: {
          },
          success: function(res) {
              let listAll = res.data.rspdata.list_day || []
              console.log(listAll)
              that.setData({
                  listAll
              })
          },
          fail: function(res) {
              console.log(res)
          }
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
  buyCard() {
    var that = this
    app.ajax({
      url: '/order/add',
      method: "GET",
      data: {
        pid:wx.getStorageSync('pid') || 0
      },
      success: function(res) {
        console.log(res)
        that.data.appId = res.data.rspdata.appId || ''
        that.data.timeStamp = res.data.rspdata.timeStamp || ''
        that.data.nonceStr = res.data.rspdata.nonceStr || ''
        that.data.package = res.data.rspdata.package || ''
        that.data.signType = res.data.rspdata.signType || ''
        that.data.paySign = res.data.rspdata.paySign || ''
        that.data.timestamp = res.data.rspdata.timestamp || ''
        console.log(that.data.appId)

        wx.requestPayment({
          timeStamp: that.data.timeStamp,
          nonceStr: that.data.nonceStr,
          package: that.data.package,
          signType: 'MD5',
          paySign: that.data.paySign,
          success(res) {
            console.log(res)
          },
          fail(res) {
            console.log(res)
          }
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
    onShow:function(){
        app.ajax({
            url: '/user/home',
            method: "GET",
            data: {},
            success: function(res) {
                let app_qrcode_url=res.data.rspdata.qrcode.app_qrcode_url
                console.log(app_qrcode_url)
                if (app_qrcode_url != ''){
                  wx.setStorage({
                    key: 'app_qrcode_url',
                    data: app_qrcode_url,
                    success: (res) => {
                      console.log(res)
                    },
                    fail:(res)=>{
                      console.log(res)
                    },
                  })
                  wx.setStorageSync('is_merchant', res.data.rspdata.my.is_merchant)
                  wx.setStorageSync('level', res.data.rspdata.my.level)
                  wx.setStorageSync('user_id', res.data.rspdata.home.id)
                  wx.setStorageSync('validityDay', res.data.rspdata.home.validityDay)
                  wx.setStorageSync('merchantUsed', res.data.rspdata.home.merchantUsed)
                  wx.setStorageSync('totalMerchants', res.data.rspdata.home.totalMerchants)
                  wx.setStorageSync('username', res.data.rspdata.home.username)
                  wx.setStorageSync('rmd_qrcode_url', res.data.rspdata.qrcode.rmd_qrcode_url)
                }
            },
            fail: function(res) {
                console.log(res)
            }
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
        success: function(res) {
          let adrressArrayList = res.data.rspdata || []
          that.setData({
            adrressArrayList
          })
        },
        fail: function(res) {
          console.log(res)
        }
      })
      app.ajax({
        url: '/merchant-category',
        method: "GET",
        data: {
          fields: "id,name",
        },
        success: function(res) {
          let categoryArrayList = res.data.rspdata || []
          that.setData({
            categoryArrayList
          })
        },
        fail: function(res) {
          console.log(res)
        }
      })
        app.ajax({
            url: '/merchant/Top',
            method: "GET",
            data: {
            },
            success: function(res) {
                console.log(res.data.rspdata)
                let listAll = res.data.rspdata.list_day_all || []
                that.data.listDayAll = res.data.rspdata.list_day_all || []
                that.data.listDay = res.data.rspdata.list_day || []
                that.setData({
                    listAll:that.data.listDayAll
                })
            },
            fail: function(res) {
                console.log(res)
            }
        })
      app.ajax({
        url: '/merchant-business',
        method: "GET",
        data: {},
        success: function(res) {
          var goodList = [];
          res.data.rspdata.forEach(function(item, index) {
            console.log(item.merchant)
            goodList = goodList.concat(item.merchant)
          })
          console.log(res.data)
          console.log(goodList)
          that.setData({
            goodList
          })
        },
        fail: function(res) {
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
          addressIndex: e.detail.value, //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
        })
        app.ajax({
          url: '/merchant-business/' + this.data.addressId.toString(),
          method: "GET",
          data: {},
          success: function(res) {
            console.log(res.data.rspdata.merchant)
            let goodList = res.data.rspdata.merchant || [];
            that.setData({
              goodList
            })
          },
          fail: function(res) {
            console.log(res)
          }
        })
        break;
      case 2:
        this.setData({
          category: this.data.categoryArrayList[e.detail.value].name,
          categoryId: parseInt(this.data.categoryArrayList[parseInt(e.detail.value)].id),
          categoryIndex: e.detail.value,
        })
        app.ajax({
          url: '/merchant-category/' + this.data.categoryId.toString(),
          method: "GET",
          data: {},
          success: function(res) {
            console.log(res.data.rspdata.merchant)
            let goodList = res.data.rspdata.merchant || [];
            that.setData({
              goodList
            })
          },
          fail: function(res) {
            console.log(res)
          }
        })
        break
    }
  }
})

var that;
var Util = require('../../utils/util.js');