//app.js
const Bmob = require('utils/bmob.js');
Bmob.initialize("43edf782e0c9f04b3118c17b2c3f9ebe", "7f0b49f19a58d885bb248c3c64ac9fa6");

App({
  onLaunch: function() {
    var that = this;
    //调用API从本地缓存中获取数据
    try {
      var value = wx.getStorageSync('user_openid')
      if (value) {} else {
        console.log('执行login1')
        wx.login({
          success: function(res) {
            if (res.code) {
              console.log('执行login2', res);
            }
          }
        });
        wx.login({
          success: function(res) {
            if (res.code) {
              Bmob.User.requestOpenId(res.code, {
                success: function(userData) {
                  wx.getUserInfo({
                    success: function(result) {
                      console.log("loginwx");
                      console.log(result)
                      var userInfo = result.userInfo
                      var nickName = userInfo.nickName
                      var avatarUrl = userInfo.avatarUrl
                      var sex = userInfo.gender
                      Bmob.User.logIn(nickName, userData.openid, {
                        success: function(user) {
                          try {
                            wx.setStorageSync('user_openid', user.get('userData').openid)
                            wx.setStorageSync('user_id', user.id)
                            wx.setStorageSync('my_nick', user.get("nickname"))
                            wx.setStorageSync('my_username', user.get("username"))
                            wx.setStorageSync('my_sex', user.get("sex"))
                            wx.setStorageSync('my_avatar', user.get("userPic"))
                          } catch (e) {}
                          console.log("登录成功");
                        },
                        error: function(user, error) {
                          if (error.code == '101') {
                            var user = new Bmob.User(); //开始注册用户
                            user.set('username', nickName);
                            user.set('password', userData.openid);
                            user.set("nickname", nickName);
                            user.set("userPic", avatarUrl);
                            user.set("userData", userData);
                            user.set('sex', sex);
                            user.signUp(null, {
                              success: function(result) {
                                console.log('注册成功');
                                try { //将返回的3rd_session存储到缓存中
                                  wx.setStorageSync('user_openid', user.get('userData').openid)
                                  wx.setStorageSync('user_id', user.id)
                                  wx.setStorageSync('my_nick', user.get("nickname"))
                                  wx.setStorageSync('my_username', user.get("username"))
                                  wx.setStorageSync('my_sex', user.get("sex"))
                                  wx.setStorageSync('my_avatar', user.get("userPic"))
                                } catch (e) {}
                              },
                              error: function(userData, error) {
                                console.log("openid=" + userData);
                                console.log(error)
                              }
                            });

                          }
                        }
                      });
                    }
                  })
                },
                error: function(error) {
                  console.log("Error: " + error.code + " " + error.message);
                }
              });
            } else {
              console.log('获取用户登录态失败1！' + res.errMsg)
            }
          },
          complete: function(e) {
            console.log('获取用户登录态失败2！')
            console.log(e)
          }
        });
      }
    } catch (e) {
      console.log("登陆失败")
    }
    wx.checkSession({
      success: function() {},
      fail: function() {
        //登录态过期，重新登录
        wx.login()
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          Bmob.User.requestOpenId(res.code, { //获取userData
            success: function(userData) {
              wx.getUserInfo({
                success: function(result) {
                  var userInfo = result.userInfo
                  var nickName = userInfo.nickName
                  var user = new Bmob.User(); //开始注册用户
                  user.set("username", nickName);
                  user.set("userPic", userInfo.avatarUrl);
                  user.set("sex", userInfo.gender);
                  user.set("password", userData.openid);
                  user.set("userData", userData);
                  user.signUp(null, {
                    success: function(res) {
                      console.log(res)
                      console.log("注册成功!");
                    },
                    error: function(userData, error) {
                      console.log(userData)
                      console.log(error)
                    }
                  });
                }
              });
            },
            error: function(error) {
              // Show the error message somewhere
              console.log("Error: " + error.code + " " + error.message);
            }
          });

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null
  }
})