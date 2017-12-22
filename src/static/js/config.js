//正式环境
// var domain_url = "https://yaotv.holdfun.cn/portal/";
//测试环境
var domain_url = "http://test.holdfun.cn/portal/";

var version = "V1.0";
var share_img = "http://cdn.holdfun.cn/resources/images/2016/09/08/90d80b9511324d7bad5a1dc2f17be21f.png";
var share_title = "看江苏卫视，全天大奖摇不停！";
var share_desc = "收看江苏卫视情感剧场，使用微信摇一摇（电视），多重好礼等你来拿！";
var share_url = window.location.href;
var follow_shaketv_appid = 'wxca9de9df38b0951e';
var shaketv_appid  = 'wx801857adaf27891e';
var yao_tv_id = 51101;

//正式
// var serviceNo = "tv_jiangsu_all";
// var stationUuid = "4160bcaf21e9495f9cf17fe9689f5bbb";
// var channelUuid = "c6ca92df04f2498a929806b22cb866ef";
// var mpappid = "wx9097d74006e67df3";


//测试
var serviceNo = "tv_hebeitv_three";
var mpappid = "wxc5d930ea846a40e1";
var stationUuid = "fedc792bb5324726a2e4d43ccaa6694d";
var channelUuid = "70534c7fdbb8462491e225c94eba082b";

var wTitle = 'WEY 让幸福照亮你';
var missTips = '您未成功答对题目，已错过抽奖，请期待下一次大奖~';
var notStartedTips = '答题未开始';
var answeredTips = '您已经答过题了';
var thanks_answer = '很遗憾，未能中奖~~~';
var thanks_tips = ['别灰心，继续加油！','可能是姿势不对哦~','加油~好运马上就来','换个姿势，再来一次！','再来一次，大奖在等你哦！'];
var copyright = '页面由江苏卫视提供<br>新掌趣科技技术支持 & Powered by holdfun.cn';
var rule_temp = '';
var crossdayLimit = 1 * 60 * 60 * 1000;	//跨天摇奖判断阀值，默认为1小时。单位ms

var dev = '?dev=shang';