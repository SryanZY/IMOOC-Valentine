/**
 * 表格数据的排序监听事件
 * 监听对象：table th i[data-sortkey] 
 *       监听对象上存储着排序关键字
 *       监听对象的父级元素table上存储着要执行的查询方法的方法名
 * 
 */
$(document).on('click','table th i[data-sortkey]', function(){
    var table = $(this).parents("table");
    $(table).find('th i.sort-flag').not(this).removeClass('icon-sort-up');
    $(table).find('th i.sort-flag').not(this).removeClass('icon-sort-down');
    if ($(this).hasClass("icon-sort-up")) {
        //设置箭头方向向下
        $(this).addClass('icon-sort-down');
        $(this).removeClass('icon-sort-up');
        $(table).data("sorttype", "DESC");
    }else {
        //设置箭头方向向上
        $(this).addClass('icon-sort-up');
        $(this).removeClass('icon-sort-down');
        $(table).data("sorttype", "ASC");
    }
    $(table).data("sortkey", $(this).data("sortkey"));
    var funcName = $(this).parents("table").data("func");
    //执行查询方法
    if(typeof(eval(funcName)) == "function"){
        eval(funcName+"();");
    }else{
        // 函数不存在
    }
});