// pages/addGroup/addGroup.js
var Bmob = require("../../utils/bmob.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    config: {
      theme: {
        placeholder: '请输入4位随机数字'
      },
      max: '',
      num: ''
    },
    addId: 0,
    add:["抓阄","选择","分组","排序"]
  },
  onLoad: function (options) {
    this.setData({
      addId: options.addId
    })
  },
  formSubmit: function(e) {
    var that = this;
    var input = e.detail.value;
    console.log(input);
    console.log(typeof(input.randomNum))
    var Serve = Bmob.Object.extend("serveNumbers");
    var serve = new Bmob.Query(Serve);
    serve.equalTo("serveNumber", parseInt(input.randomNum));
    // 查询数据
    serve.find({
      success: function(results) {
        var object = results[0];

        var Main = Bmob.Object.extend("main");
        var main = new Main;
        main.set('serveNumber', object.attributes.serveNumber);
        main.set('mianId', object.attributes.lastId.shift());
        console.log(object.attributes.serveNumber)
        main.save(null, {
          success: function(result) {
            console.log("加入成功, objectId:" + result.id);
            console.log(result)
          },
          error: function(result, error) {
            console.log("加入失败: " + error.code + " " + error.message);
          }
        });

        var Serve = Bmob.Object.extend("serveNumbers");
        var serve = new Bmob.Query(Serve);
        serve.get(object.id, {
          success: function(result) {
            result.set('lastId', object.attributes.lastId);
            result.save();
          },
          error: function(result, error) {
            console.log("更新失败: " + error.code + " " + error.message);
          }
        })
      },
      error: function(error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });

    wx.navigateTo({
      url: '../result/result?randomNum=' + input.randomNum
    })


  }
})