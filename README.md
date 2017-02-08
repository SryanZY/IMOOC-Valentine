# IMOOC-Valentine
## 使用CSS3和JS实现七夕节动画

使用的技术：
* CSS3
* js
* jQuery、jQuery-transition
* H5-audio

##效果图
![效果图一](https://github.com/SryanZY/IMOOC-Valentine/raw/master/WebContent/images/xiaoguotu1.png)

![效果图二](https://github.com/SryanZY/IMOOC-Valentine/raw/master/WebContent/images/xiaoguotu3.png)

![效果图二](https://github.com/SryanZY/IMOOC-Valentine/raw/master/WebContent/images/xiaoguotu2.png)

##实现过程

```
1.页面布局<br>

     横向布局，将代码封装到Swipe.js中
  
2.主体页面一

     利用css3的animation制作太阳和云的动画，采用精灵图（即改变background-position的方式）实现
     
3.主体页面二

     开门灯亮以及关门灯灭需要异步操作，可利用jQuery的Promise实现。鲜花和飞鸟的效果同上节的太阳、云层一样使用精灵图实现
     
4.主体页面三

    运动轨迹以及转身后的logo等效果的实现
    
5.H5标签

    HTML5的audio标签，插入音频文件，可控制循环播放
```

### 补充


慕课网课程地址： http://www.imooc.com/learn/453
