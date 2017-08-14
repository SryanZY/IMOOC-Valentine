// 系统中常用的全局变量
var gz = {};
gz.url = 'http://gz.iceshi.org/'; //高诊后台服务地址
var crossDomain = false;//静态页面和后台服务跨域部署
var serverUrl = crossDomain ? gz.url : '';//服务器地址

gz.global = {
    debug: true, //调试信息开关
    title: '大学生英语能力成长诊学系统',
    user_examlist: '我的考试',
    user_self_evaluation: '自评',
    type_self_evaluation: '1',
    type_vspt: '2',
    type_survy: '3',
    type_first: '4',
    type_second: '5',
    type_other: '6'
};

gz.logger = function logger(msg){
    if (gz.global.debug) {
        console.log(msg);
    }
};
//zui的漂浮消息设置
var zuiMessager = {};
zuiMessager.success = {
    type: 'success',
    icon: 'check',
    placement: 'center'
};
zuiMessager.fail = {
    type: 'danger',
    icon: 'times',
    placement: 'center'
};
//技能下拉选择框中的数据
gz.skill = [ {
    key : 'S0',
    name : '词汇量'
}, {
    key : 'S1',
    name : '听力'
}, {
    key : 'S2',
    name : '阅读'
} ];
//用户角色类型
var Role = {};
Role.Student = {key:"1",label:"学生"};
Role.Teacher = {key:"2",label:"教师"};
Role.OrgAdmin = {key:"3",label:"机构管理员"};
Role.Admin = {key:"4",label:"系统管理员"};
//学校使用版本设置
var Version = {};
Version.Autonomy = {key:"VA",label:"自主版"};
Version.Controlled = {key:"VC",label:"可控版"};
//学期范围设置
gz.semester = {};
gz.semester.first = {begin:"09-01",end:"02-28"};
gz.semester.second = {begin:"03-01",end:"08-31"};

//通过技能编码获取技能名称
gz.getSkillLabel = function (skill) {
    if (skill == 'S0') {
        return '词汇量';
    } else if (skill == 'S1') {
        return '听力';
    } else if (skill == 'S2') {
        return '阅读';
    } else if (skill == 'S3') {
        return '语言知识运用';
    } else if (skill == 'S4') {
        return '写作';
    } else if (skill == 'S5') {
        return '口语';
    } else if (skill == 'S6') {
        return '语法';
    }
}
//通过角色编码获取角色名
gz.getRoleLabel = function (role) {
    if (role == Role.Student.key) {
        return Role.Student.label;
    } else if (role == Role.Teacher.key) {
        return Role.Teacher.label;
    } else if (role == Role.OrgAdmin.key) {
        return Role.OrgAdmin.label;
    } else if (role == Role.Admin.key) {
        return Role.Admin.label;
    }
}

/**
 * 生成分页控件 
 * pageNo:当前页 
 * totalRecords：总记录条数 
 * pageSize:每页显示多少条 
 * fun：要调用的函数
 * 一般写填充表格数据的逻辑
 */
gz.defaultPageSize = 10;//每页默认显示条数
function initPage(pageNo, totalRecords, pageSize, fun) {
    var totalPages = Math.ceil(totalRecords/pageSize);//总页数
    // 生成分页控件
    kkpager.generPageHtml({
        pagerid : 'kkpager',
        pno : pageNo,
        total : totalPages,
        totalRecords : totalRecords,
        mode : 'click',
        click : function(n) {
            this.selectPage(n);
            if(!isNaN(n)){
                fun(n, pageSize);
                this.selectPage(n);
                return true;
            }else{
                bootbox.alert("页码不能为空！");
            }
        }
    },true);
}