// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultId:0,
    randomNum:"",
    contentNum:3,
    memberList:[],
    result: [{
      id: 0,
      title: "来抓阄",
      img: "../../static/images/more/img01.png"
    }, {
      id: 1,
      title: "做选择",
      img: ""
    }, {
      id: 2,
      title: "来分组",
      img1: "../../static/images/more/groupNum.png",
      img2: "../../static/images/more/list.png",
      text1:"您的组号是",
      text2:"您的小组名单"
    }, {
      id: 3,
      title: "排顺序",
      img: "../../static/images/more/rankNum.png"
    }, {
      id: 4,
      title: "分任务",
      img: ""
    }, {
      id: 5,
      title: "来签到",
      img: ""
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
    randomNum : options.randomNum
    })
    wx.getStorage({
      key: 'my_activities',
      success: function(res) {
        that.setData({
          resultId:res.data[0].type
          //contentNum:
        })
      },
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