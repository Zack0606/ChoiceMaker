// pages/result/result.js
var Bmob = require("../../utils/bmob.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activityType: 0,
    resultId: 0,
    randomNum: "",
    content: 0,
    groupNumber: 0,
    activityNumber: 0,
    size: 0,
    result: [{
      id: 0,
      title: "来抓阄",
      img1: "../../static/images/more/lotNum.png"
    }, {
      id: 1,
      title: "做选择",
      img: ""
    }, {
      id: 2,
      title: "来分组",
      img1: "../../static/images/more/groupNum.png",
      img2: "../../static/images/more/list.png",
      text1: "您的组号是"
    }, {
      id: 3,
      title: "排顺序",
      img1: "../../static/images/more/rankNum.png"
    }, {
      id: 4,
      title: "分任务",
      img1: "../../static/images/more/speedNum.png",
    }, {
      id: 5,
      title: "来签到",
      img: ""
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(options)
    this.setData({
      activityType: options.activityType,
      activityNumber: options.activityNumber
    })
  },
  getNow: function() {
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    var Main = Bmob.Object.extend('main');
    var user = new Bmob.User();
    user.id = user_id;
    var query = new Bmob.Query(Main);
    query.equalTo('activityNumber', parseInt(this.data.activityNumber));
    query.equalTo('userId',user);
    query.find({
      success: function(result) {
        console.log("result");
        console.log(result);
        var Activity = Bmob.Object.extend('activities');
        var query2 = new Bmob.Query(Activity);
        query2.get(result[0].attributes.activityId.id, {
          success: function(res) {
            console.log("res")
            console.log(res)
            if (res.attributes.activityType == 0) {
              console.log("抓阄结果");
              that.setData({
                content: '空'
              })
              if (res.attributes.lots[result[0].attributes.mainId - 1] != null) {
                that.setData({
                  content: res.attributes.lots[result[0].attributes.mainId - 1]
                })
              }
            } else if (res.attributes.activityType == 2) {
              console.log("分组结果");
              var temp = Math.ceil((result[0].attributes.mainId) / res.attributes.groupSize)
              that.setData({
                content: temp
              })
            } else if (res.attributes.activityType == 3) {
              console.log("排序结果");
              var temp = parseInt((result[0].attributes.mainId - 1) / res.attributes.groupSize) + 1
              that.setData({
                content: temp
              })
            } else if (res.attributes.activityType == 4) {
              console.log("拼手速结果");
              var temp = parseInt((result[0].attributes.mainId - 1) / res.attributes.groupSize) + 1
              that.setData({
                content: temp
              })
            }
          }
        })
      }
    });
  }
})