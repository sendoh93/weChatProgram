let {
  NEW_URL,
  FIX_URL,
  version,
  appVersion,
} = require("./config/config.js")
let params = {
  version,
};

let deviceId = wx.getStorageSync("deviceId");
if (deviceId === "") {
  deviceId = Math.random();
  wx.setStorageSync("deviceId", deviceId);
  params.deviceId = deviceId;
} else {
  params.deviceId = deviceId;
}
const util = require("./utils/util.js");
App({
  onError(err) {
    console.error(err)
  },
  onPageNotFound(res) {
    wx.showToast({
      title: '团团丢失了你要访问的页面，去首页看看吧',
      icon: 'none'
    })
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }, 3500)
  },
  onShow(options) {
    console.log(options)
    if (options.query) {
      this.globalData.query = options.query
    }
    if (options.referrerInfo) {
      this.globalData.query = Object.assign(this.globalData.query, options.referrerInfo.extraData)
    }
  },
  onLaunch(options) {
    this.globalData.query = options.query || {}
    if (options.referrerInfo) {
      this.globalData.query = Object.assign(this.globalData.query, options.referrerInfo.extraData)
    }
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        let totalTopHeight = 68
        if (res.model.indexOf('iPhone X') !== -1) {
          totalTopHeight = 88
        } else if (res.model.indexOf('iPhone') !== -1) {
          totalTopHeight = 64
        }
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
        this.globalData.screenHeight = res.screenHeight
      },
      fail: () => {
        this.globalData.statusBarHeight = 20
        this.globalData.titleBarHeight = 44
      }
    })

    // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(res => {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    });

    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否马上重启小程序？",
        success: res => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    // isProdEnv && AppOnLaunch()
    // this.authPromise = this.getWXAuth()
  },
  importFont() {
    wx.loadFontFace({
      family: "HYZhengYuan",
      source: 'url("https://dn-qtshe.qbox.me/HYZhengYuan-95W.ttf")',
      success: function (res) {
        console.log(res); //  loaded
      },
      fail: function (res) {
        console.log(res); //  error
      }
    });
  },
  importFontHYCYJ() {
    wx.loadFontFace({
      family: "HYCYJ",
      source: 'url("http://qiniu-css.qtshe.com/HYCYJ.ttf")',
      success: function (res) {
        console.log(res); //  loaded
      },
      fail: function (res) {
        console.log(res); //  error
      }
    });
  },
  /*
    封装ajax原型
    @params config，obj对象，包含所需url, data, header, method, complete数据，与微信小程序文档一致
    @return new Promise对象
  */
  ajax(config) {
    let that = this;
    let {
      url,
      data = {},
      header,
      method,
      success,
      fail,
      complete
    } = config;
    // 处理url前缀
    url = NEW_URL + url;
    // 处理请求头
    header = util.extend(
      true, {
        "content-type": "application/json",
      },
      header
    );
    // 处理请求所需的其他默认参数
    let timestamp = Date.now();
    console.log("token is " + wx.getStorageSync("token") || '')
    console.log(wx.getStorageSync("token"))
    if (wx.getStorageSync("token") != null && wx.getStorageSync("token")!=""){
      params.access_token = wx.getStorageSync("token") || '';
    }
    data = util.extend(true, {}, params, data);
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        header,
        method: method || "POST",
        success(res) {
          if (res.statusCode === 200) {
            if (res.data.rspno != 10000) {
              return;
            }
            success && success.apply(this, arguments);
            resolve(res.data);
          } else {
            fail && fail.apply(this, arguments);
            reject(res);
          }
        },
        fail(err) {
          fail && fail.apply(this, arguments);
          // fundebug.notifyError(new Error('ajax 失败'), {
          //   metaData: {
          //     url,
          //     data
          //   }
          // });
          reject(err);
        },
        complete() {
          complete && complete.apply(this, arguments);
        }
      });
    });
  },
  getWechatCode(callback) {
    wx.login({
      success: (res) => {
        wx.setStorage({
          key: 'miniCode',
          data: res.code,
          complete: () => {
            callback && callback()
          }
        })

      }
    })
  },

  login() {
    wx.navigateTo({
      url: `/pages/login/login`
    });
  },
  /*
  uploadFile 上传文件公共方法
  @params: successCb 回调函数
  */
  uploadFile: function (successCb, index) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B
        if (tempFilesSize <= 3000000) {
          //图片小于或者等于3M时 可以继续
          that.uploadImgFile(that, tempFilePaths, successCb, index);
        } else {
          wx.showToast({
            title: "上传图片不能大于3M哦～",
            icon: "none"
          });
        }
      }
    });
  },
  uploadImgFile: function (page, path, successCb, index) {
    wx.showLoading({
      title: "上传中...",
      mask: true
    });
    wx.uploadFile({
      url: util.NEW_URL + "/uploadCenter/image/app",
      filePath: path[0],
      name: "image",
      header: {
        chartset: "utf-8",
        "content-type": "multipart/form-data"
      },
      formData: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.statusCode !== 200) {
          wx.showModal({
            title: "提示",
            content: "上传失败，请稍后重试",
            showCancel: false
          });
          return;
        } else {
          let data = JSON.parse(res.data);
          try {
            let data = JSON.parse(res.data);
            if (data.success) {
              console.log(index);
              successCb && successCb(data.data, index);
            } else {
              wx.showModal({
                title: "提示",
                content: res.msg || "上传失败，请稍后重试",
                showCancel: false
              });
              return;
            }
          } catch (err) {
            wx.showModal({
              title: "提示",
              content: "上传失败，请稍后重试",
              showCancel: false
            });
            return;
          }
        }
      },
      fail: function (e) {
        wx.showModal({
          title: "提示",
          content: "上传失败，请稍后重试",
          showCancel: false
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  globalData: {
    userInfo: {
      token: wx.getStorageSync("token") || "",
      miniOpenId: ""
    },
    query: {},
    schoolVo: {},
    resumeVo: {}
  },
  switch: false
});