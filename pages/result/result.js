// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultId:0,
    randomNum:"",
    contentNum:0,
    groupNumber:0,
    size:0,
    memberList:[],
    result: [{
      id: 0,
      title: "来抓阄",
      img1: "../../static/images/more/img01.png"
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
    wx.getStorage({
      key: 'my_activities',
      success: function(res) {
        that.setData({
          resultId:res.data[0].type,
          groupNumber: res.data[0].groupNumber,
          size: res.data[0].size,
          myId: res.data[0].my_id
        })
        if(that.data.resultId==2)
        {
          var temp=parseInt( (that.data.myId - 1) / (that.data.size / that.data.groupNumber)) + 1
          that.setData({
            contentNum :temp
          })
        }
        console.log("r="+that.data.contentNum)
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