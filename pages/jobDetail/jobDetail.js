var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    TabCur: 0,
    merchantWelfare: [],
    video: [],
    iamges:[],
    name:'',
    phone:'',
    business_hours:'',
    logo:'',
    videoAndJpg:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    let that = this;
    app.ajax({
      url: '/merchant/' + options.id || 1,
      method: 'GET',
      data: {
      },
      success: function (res) {
        console.log(res.data.rspdata.merchant)
        let goodList = res.data.rspdata.merchant || [];
        that.setData({
          goodList
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    app.ajax({
      url: '/merchant/'+options.id||1,
      method:'GET',
      data: {

      },
    }).then((res) => {
      console.log(res.rspdata.video)
      let videoAndJpg=[];
      res.rspdata.video.forEach(function (item, index) {
        var index = item.lastIndexOf(".");
        var suffix = item.substr(index + 1);
        videoAndJpg = videoAndJpg.concat({'ext':suffix,'url':item})
      })
      console.log(videoAndJpg)
      that.setData({
        videoAndJpg,
        video: res.rspdata.video,
        merchantWelfare: res.rspdata.merchantWelfare,
        name: res.rspdata.name,
        phone: res.rspdata.phone,
        introduction: res.rspdata.introduction,
        business_hours:res.rspdata.business_hours,
        logo: res.rspdata.logo,
      });
    })
    // this.setData({
    //   video: [
    // "http://webapp.3brother.cn/uploads/ueditor/upload/video/20190801/156462447158264298.avi"
    //   ],
    //   merchantWelfare: [{
    //     "name": "1111",
    //     "img_url": "http://webapp.3brother.cn//uploads/merchant-welfare/20190731163942_5d4153ce7de10.jpg"
    //   },
    //   {
    //     "name": "11123",
    //     "img_url": "http://webapp.3brother.cn//uploads/merchant-welfare/20190731214128_5d419a88a5eb0.jpeg"
    //   }],
    //   name:'小小',
    //   phone:'18201492327'
    // })
  },
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
      success() {
        console.log('成功拨打电话')
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