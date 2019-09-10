// pages/mine/mine.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    console.log('进方法了')
    var that = this;
    try {
      var value = wx.getStorageSync("token");
      if (value) {
        that.setData({
          token: true,
        })
      }
    } catch (e) {
      that.token = false;
      console.log('token没有')
    }
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

  login() {
    var that = this;
    var json = {
      "encryptedData": "chenjie",
      "pid": "",
      "code": "chenjie",
      "iv": "iv"
    };

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          json.code = res.code;
          console.log(res);
          // 必须是在用户已经授权的情况下调用
          wx.authorize({
            scope: "scope.userInfo"
          })
          wx.getUserInfo({
            success: function(res) {
              console.log(res);
              json.iv = res.iv;
              json.encryptedData = res.encryptedData;
              console.log(json.iv);
              console.log(json.encryptedData);
              app.ajax({
                url: '/login',
                header: {
                  'content-type': 'application/json;charset=utf-8'
                },
                data: json
              }).then((res) => {
                console.log(res.rspdata.access_token)
                wx.setStorage({
                  key: 'token',
                  data: res.rspdata.access_token,
                  success: function(e) {
                    that.setData({
                      token: true
                    })
                    console.log(e)
                  }
                })
              });
            },
            fail: function(res) {
              console.log(res);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })


  }
})