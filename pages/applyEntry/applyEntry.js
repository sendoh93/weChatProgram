// pages/applyEntry/applyEntry.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName:'',
    inputUserName:'',
    inputPhone:''

  },
  getName: function (e) {
    this.data.inputName = e.detail.value
  },
  getUserName: function (e) {
    this.data.inputUserName = e.detail.value
  },
  getPhone: function (e) {
    this.data.inputPhone = e.detail.value
  },
  applyEntry(){
    app.ajax({
      url: '/merchant',
      method: "POST",
      data: {
        name: this.data.inputName,
        username: this.data.inputUserName,
        phone: this.data.inputPhone,
      },
      success: function (res) {
        wx.showToast({
          title: '申请入驻成功',
          icon:'none'
        })
        setTimeout(function () {
          //要延时执行的代码
          wx.navigateBack({
          })
        }, 1000) //延迟时间 这里是1秒
        console.log(res)
      },
      fail:function(res){
        wx.showToast({
          title: '申请入驻失败',
          icon: 'none'
        })
      }
    })
    console.log('点击了按钮')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})