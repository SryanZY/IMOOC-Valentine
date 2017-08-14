var cookieUserIdKey = 'user-id';
var cookieUserNameKey = 'user-name';
var cookiePasswdKey = 'passwd';
var cookieUserRoleKey = 'user-role';
var cookiePaperIdKey = "paper-id";
var cookieSchoolIdKey = "school-id";
var cookieTokenKey = 'token';

//将表单数据封装为json对象
$.fn.serializeObject = function(){    
   var o = {};    
   var a = this.serializeArray();    
   $.each(a, function() {    
       if (o[this.name]) {    
           if (!o[this.name].push) {    
               o[this.name] = [o[this.name]];    
           }    
           o[this.name].push(this.value || '');    
       } else {    
           o[this.name] = this.value || '';    
       }    
   });    
   return o;    
};

// 获取地址中
$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) 
        return unescape(r[2]);
    return null;
};

/**
 * 设置未来(全局)的AJAX请求默认选项
 * 主要设置了AJAX请求遇到Session过期的情况
 */
$.ajaxSetup({
    complete : function(xhr, status) {
        var status = xhr.getResponseHeader('status');
        if (status == 'fail') {
            window.open(serverUrl + "goLogin.html", "_top");
        }
    }
});

// ajax请求头中发送userId和token
$.beforeSend = function (XMLHttpRequest) {
    XMLHttpRequest.setRequestHeader('userId', $.cookie(cookieUserIdKey));
    XMLHttpRequest.setRequestHeader('token', $.cookie(cookieTokenKey));
};

// token暂定生成规则：按天生成 md5(userId+md5(password)+日期天)
function makeToken() {
    return $.md5($.cookie(cookieUserIdKey) + $.cookie(cookiePasswdKey) + date2String());
}

function date2String() {
    var date = new Date();
    var month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + month + '-' + d;
}

function turnDate(timestamp) {
    if (timestamp) {
        var date = new Date(parseInt(timestamp));
        var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        //var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hour + ':' + minute;// + ':' + second;
    } else {
        return '';
    }
}

//生成uuid
function uuidFast() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = new Array(36), rnd = 0, r;
    for (var i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid[i] = '-';
        } else if (i === 14) {
            uuid[i] = '4';
        } else {
            if (rnd <= 0x02)
                rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    return uuid.join('');
}

//获取学年下拉列表
$.fn.getYearSelectList = function(refreshChosen){
   var selec = $(this);
   selec.empty();
   selec.append("<option value=''></option>");
   //设置年份的选择 
   var myDate= new Date();
   var curYear = myDate.getFullYear();
   var curMonth = myDate.getMonth();
   var startYear = curYear-3;//起始年份 
   var endYear = curYear+3;//结束年份 
   for (var i=startYear;i<=endYear;i++){
       var firstRange = (i-1)+"-"+gz.semester.first.begin+"~"+i+"-"+gz.semester.first.end;
       var secondRange = i+"-"+gz.semester.second.begin+"~"+i+"-"+gz.semester.second.end;
       selec.append("<option value='"+firstRange+"'>"+i+"学年第一学期("+firstRange+")</option>");
       selec.append("<option value='"+secondRange+"'>"+i+"学年第二学期("+secondRange+")</option>");
   }
   var dataRange;
   if(curMonth>=3 && curMonth<=8){
       dataRange = curYear+"-"+gz.semester.second.begin+"~"+curYear+"-"+gz.semester.second.end;
   }else{
       dataRange = (curYear-1)+"-"+gz.semester.first.begin+"~"+curYear+"-"+gz.semester.first.end;
   }
   selec.find("option[value = '"+dataRange+"']").attr("selected","selected");
   if(typeof(refreshChosen) != "undefined" && refreshChosen){
       selec.trigger('chosen:updated');
   }
}