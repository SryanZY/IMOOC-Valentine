var jPLaceholder = {
  // 检测当前环境是否包含placeholder属性
  _check: function () {
    return 'placeholder' in document.createElement('input');
  },
  // 初始化
  init: function () {
    if (!this._check()) {
      this.createPlaceholder();
    }
  },
  // 动态创建placeholder
  createPlaceholder: function () {
    jQuery(':input[placeholder]').each(function (index, item) {
      var that = $(this), txt = that.attr('placeholder');
      // 为目标元素包裹一层div
      that.wrap('<div class="holder-div"></div>').css({position: 'relative', zoom: '1', background: 'none', margin: 'none', padding: 'none'});
      /*定义元素的位置以及外边距
        position()方法获取元素相对于父元素的位置；
        outerHeight()获取第一个匹配元素外部高度，设置为true包括padding
      */
      var pos = that.position(), paddingleft = that.css('padding-left'), paddingtop = that.css('padding-top'); 
      // 为input创建span兄弟元素并追加到div中
      var holder = $('<span></span>').text(txt).css({position: 'absolute', left: pos.left, top: pos.top, paddingLeft: paddingleft, paddingTop: paddingtop, color: '#EEE0E5'}).appendTo(that.parent());
      // 焦点事件
      that.focusin(function (ev) {
        holder.hide();
      }).focusout(function (ev) {
        if (!that.val()) holder.show();
      });
      // 点击事件
      holder.click(function () {
        $(this).hide();
        that.focus();
      });
    });
  }
}

jQuery(function () {
  jPLaceholder.init();
});