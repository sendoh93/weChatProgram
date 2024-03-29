// pages/buyShare/bugSahre.js
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      qrcode:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let qrcode = wx.getStorageSync('rmd_qrcode_url');
    console.log(this.data.qrcode)
    this.setData({
      qrcode
    })
  },
  shareCard(){
    console.log("onSavePicClick");
    let downloadUrl = this.data.qrcode;
  // let downloadUrl="https://webapp.3brother.cn/uploads/qrcode/d11e759b87a2538abc36dc9bf8387120.png";
    console.log("downloadUrl=" + downloadUrl);

    if (!wx.saveImageToPhotosAlbum) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
      return;
    }

    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope  
    wx.getSetting({
      success(res) {
        console.log("getSetting: success");
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log("1-没有授权《保存图片》权限");

          // 接口调用询问  
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log("2-授权《保存图片》权限成功");
              // 下载文件  
              wx.downloadFile({
                url: downloadUrl,
                success: function (res) {
                  console.log("下载文件：success");
                  console.log(res);

                  // 保存图片到系统相册  
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(res) {
                      console.log("保存图片：success");
                      wx.showToast({
                        title: '保存成功',
                      });
                    },
                    fail(res) {
                      console.log("保存图片：fail");
                      console.log(res);
                    }
                  })
                },
                fail: function (res) {
                  console.log("下载文件：fail");
                  console.log(res);
                }
              })
            },
            fail() {
              // 用户拒绝了授权  
              console.log("2-授权《保存图片》权限失败");
              // 打开设置页面  
              wx.openSetting({
                success: function (data) {
                  console.log("openSetting: success");
                },
                fail: function (data) {
                  console.log("openSetting: fail");
                }
              });
            }
          })
        } else {
          console.log("1-已经授权《保存图片》权限");
          // 下载文件  
          console.log(downloadUrl)
          
          wx.downloadFile({
            url: downloadUrl,
            success: function (res) {
              console.log("下载文件：success");
              console.log(res);

              // 保存图片到系统相册  
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(res) {
                  console.log("保存图片：success");
                  wx.showToast({
                    title: '保存成功',
                  });
                },
                fail(res) {
                  console.log("保存图片：fail");
                  console.log(res);
                }
              })
            },
            fail: function (res) {
              console.log("下载文件：fail");
              console.log(res);
            }
          })
        }
      },
      fail(res) {
        console.log("getSetting: success");
        console.log(res);
      }

    })
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