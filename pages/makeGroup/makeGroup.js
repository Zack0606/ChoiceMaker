// pages/index/makeOrder/makeOrder.js
const app = getApp()
var Bmob = require("../../utils/bmob.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    groupId: '',
    config: {
      name: {
        title: '主题',
        placeholder: '请输入活动主题'
      },
      theme: {
        placeholder: '请输入4位随机数字'
      },
      peopleNum: {
        title: '参与人数',
        stepper: 20,
        min: 1,
        max: 100
      },
      groupNum: {
        title: '组数',
        stepper: 4,
        min: 1,
        max: 20
      },
      remarks: {
        title: '备注',
        placeholder: '如有无特殊要求偏好'
      }
    },
    userInfo: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    var userInfo = app.getUserInfo();
    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo: userInfo
      });
      console.log(userInfo)
    });
    wx.getStorage({
      key: 'selectType',
      success: function(res) {
        that.setData({
          roomType: res.data,
          roomInfo: postRoomType.roomType[res.data],
        })
      }
    });
    wx.getStorage({
      key: 'checkInDate',
      success: function(res) {
        that.setData({
          checkInDate: res.data,
        })
      }
    });
    wx.getStorage({
      key: 'checkOutDate',
      success: function(res) {
        that.setData({
          checkOutDate: res.data,
        })
      }
    });
  },

  // 计数器
  handleZanStepperChange({
    detail: stepper,
    target: {
      dataset: {
        componentId
      }
    }
  }) {
    this.setData({
      [`${componentId}.stepper`]: stepper
    });
  },
  formSubmit: function(e) {
    var randomArray = this.getRandomArray(20)
    var inputs = e.detail.value;
    console.log(inputs);
    var groupNumber = e.detail.value.groupNum;
    var peopleNumber = e.detail.value.peopleNum;
    var serveNumber = e.detail.value.randomNum;
    var groupSize = peopleNumber / groupNumber + 1;
    var theme = e.detail.value.theme;
    var newServe = Bmob.Object.extend('serveNumbers');
    var serve = new newServe;
    serve.set("serveNumber", 1234);
    serve.set("lastId", randomArray);
    serve.set("groupSize", groupSize);
    serve.set("groupNumber", groupNumber);
    serve.save(null, {
      success: function(result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("创建成功, objectId:" + result.id);
        console.log(result)
      },
      error: function(result, error) {
        // 添加失败
        console.log(error);
      }
    });
    console.log("success");
    wx.navigateTo({
      url: '../result/index?serveNumber='+serveNumber+'&type='+type,
    })
  },
  getRandomArray:function(size){
    var array=new Array();
    for (var i=0;i<size;i++){
      array[i]=i;
    }
    return array.reverse()
  }
})