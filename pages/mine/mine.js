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
      "username": "chenjie",
      "password": "111111"
    };
    app.ajax({
      url: '/login',
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      data: json
    }).then((res) => {
      wx.setStorage({
        key: 'token',
        data: res.rspdata.items[0].access_token,
        success: function(e) {
          that.setData({
            token: true
          })
          console.log(e)
        }
      })
    });

  }
})