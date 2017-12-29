import '../css/core.css';
import '../css/vote.scss';
import Defa from '../images/defa.png';
import c1 from '../images/c1.png';
import c2 from '../images/c2.png';
import c3 from '../images/c3.png';

import hq1 from '../images/head/0q.jpg';
import hq2 from '../images/head/1q.jpg';
import hq3 from '../images/head/2q.jpg';
import hq4 from '../images/head/3q.jpg';
import hq5 from '../images/head/4q.jpg';
import hq6 from '../images/head/5q.jpg';
import hq7 from '../images/head/6q.jpg';
import hq8 from '../images/head/7q.jpg';
import hq9 from '../images/head/8q.jpg';
import hq10 from '../images/head/9q.jpg';
import hq11 from '../images/head/10q.jpg';
import hq12 from '../images/head/11q.jpg';
import hq13 from '../images/head/12q.jpg';
import hq14 from '../images/head/13q.jpg';
import hq15 from '../images/head/14q.jpg';
import hq16 from '../images/head/15q.jpg';


var xbTmp = [
                {
                    id: 10001,
                    uid: "e1cf09cea12446378aef690ebbb146f5",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户1",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq1,
                    tid: "",
                    co: "给荔枝跨年打call",
                    at: "2017-12-23 20:24:48",
                    ats: "2分钟前"
                },
                {
                    id: 10002,
                    uid: "ce8e4fd10ca745238fbf768b4a84e0e8",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户2",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq2,
                    tid: "",
                    co: "江苏卫视良心跨年",
                    at: "2017-12-23 20:24:43",
                    ats: "2分钟前"
                },
                {
                    id: 10003,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq3,
                    tid: "",
                    co: "果然还是江苏卫视舞美震撼",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10004,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq4,
                    tid: "",
                    co: "跨年演唱会还是要看江苏卫视",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10005,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq5,
                    tid: "",
                    co: "这舞美真心美炸了",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10006,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq6,
                    tid: "",
                    co: "选择江苏卫视明智之选",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10007,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq7,
                    tid: "",
                    co: "我天我已经不想换台",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10008,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq8,
                    tid: "",
                    co: "江苏卫视跨年收视第一",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10009,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq9,
                    tid: "",
                    co: "荔枝又开挂了",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10010,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq10,
                    tid: "",
                    co: "荔枝跨年秒杀其他所有",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10011,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq11,
                    tid: "",
                    co: "真唱除了荔枝台还有谁",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10012,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq12,
                    tid: "",
                    co: "锁定荔枝果然不后悔",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10013,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq13,
                    tid: "",
                    co: "真唱都能唱这么好",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10014,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq14,
                    tid: "",
                    co: "简直酷炫",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10015,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq15,
                    tid: "",
                    co: "最幸福的一件事就是和爱的人一起看江苏卫视跨年",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                },
                {
                    id: 10016,
                    uid: "e2718986c83a452da495b50de4d236dc",
                    op: "04efa0ecbed77ef38c1be9d16da2ee1e",
                    na: "xxxxx用户3",
                    im: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5zibaUichPjt3Zp9iaOEltzticjlLPXUYA4XEFX5eCtxKkHw",
                    hu: hq16,
                    tid: "",
                    co: "主持天团我好喜欢噢",
                    at: "2017-12-23 20:11:04",
                    ats: "16分钟前"
                }
        ];

;(function($){
    H.vote = {
        guid: '',
        cuntAttrs: null,//投票后降序数组
        inforoudAttrs: null,//选手信息数组
        spellRankData: [],//选手信息降序数组
        init: function(){
            this.event();
            this.getVoteinfo();
            /*delData('answered_3d98cd0a9fef434fb1610574b68449ab');
            delData('answerLotteryed_3d98cd0a9fef434fb1610574b68449ab');*/
        },
        getVoteinfo: function(){
            var me = H.vote;
            shownewLoading();
            $.ajax({
                type : 'GET',
                async : false,
                url : domain_url + 'api/voteguess/inforoud' + dev,
                data: {},
                dataType : "jsonp",
                jsonpCallback : 'callbackVoteguessInfoHandler',
                timeout: 11000,
                complete: function() {
                    hidenewLoading();
                },
                success : function(data) {
                    if(data.flow && data.flow == 1){
                        toUrl('safe.html')
                        return;
                    }
                    if(data.code == 0){
                        me.guid = data.items[0].guid;
                        me.inforoudData = data.items[0].pitems;
                        me.spellDom(me.inforoudData);


                        // me.spellDom(testData);
                        me.voteSupport();
                    }
                },
                error : function(xmlHttpRequest, error) {}
            });
        },
        voteSupport: function() {
            var me =  H.vote;
            getResult('api/voteguess/groupplayertickets', { groupUuid: me.guid }, 'callbackVoteguessGroupplayerticketsHandler');
        },
        btn_animate: function(str,calback){
            str.addClass('flipInY');
            setTimeout(function(){
                str.removeClass('flipInY');
            },150);
        },
        event: function(){
            var me = H.vote;
            var talkFlag = true;
             $("#cm").bind('touchend', function (e) {
                e.preventDefault();
                $("#talk").removeClass('none');
                $(this).addClass('none');
                $("#back").removeClass('none');
                H.talk.resetMack();
                if(talkFlag){
                    talkFlag = false;
                    H.talk.init();
                }
                
            });

            $("#back").bind('touchend', function (e) {
                e.preventDefault();
                $("#talk").addClass('none');
                $(this).addClass('none');
                $("#cm").removeClass('none');
            });

            $('#answerbtn').bind('touchend', function(e){
                e.preventDefault();
                me.btn_animate($(this));
                toUrl("answer.html");
            });

            $('#rightTop').bind('touchend', function(e){
                e.preventDefault();
                me.btn_animate($(this));
                $('#qq').removeClass('none');
            });
            $('#voteWrap ul').delegate('li', 'click', function(e) {
                e.preventDefault();
                var $this = $(this);
                me.btn_animate($(this));
                if ($this.find('.add').hasClass('added')) {
                    showTips("投票频率过快,稍稍等下");
                    return;
                }
                $.ajax({
                    type: 'GET',
                    async: false,
                    url: domain_url + 'api/voteguess/guessplayer' + dev,
                    data: {
                        yoi: openid,
                        guid: me.guid,
                        pluids: $this.attr("id").slice(5)
                    },
                    dataType: "jsonp",
                    jsonpCallback: 'callbackVoteguessGuessHandler',
                    complete: function() {
                    },
                    success: function(data) {
                        if(data.code == 0){
                            var $num = $this.find('span');
                            $num.text($num.text()*1+1);
                            $this.find('.add').addClass('added').addClass('zan');
                            setTimeout(function(){
                                $this.find('.add').removeClass('added').removeClass('zan');
                            },1000)
                        }else{
                            console.log(data.message);
                        }
                    },
                    error: function(xmlHttpRequest, error) {}
                });
            });
        },
        swap: function(i, j,itema){
            var temp = itema[i];
            itema[i] = itema[j];
            itema[j] = temp;
        },
        bubbleSort: function(itema){
            var me = H.vote;
            for (var i = itema.length - 1; i > 0; --i){
                for (var j = 0; j < i; ++j){
                    if (itema[j].cunt < itema[j + 1].cunt) {
                        me.swap(j, j + 1,itema);
                    }
                }
            }
        },
        spellDom: function(data){
            var me = H.vote, t = simpleTpl();
            var tmpData = {
                        pid: "fcc219d0b9464abdb07b465250759132",
                        na: "周杰伦名称29",
                        ni: "明星二昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/34fbd924f0d44009b2f402885bba82d8.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    }
            data.push(tmpData);

            $.each(data, function(i, item){
                t._('<li id="vote-'+ item.pid +'" data-collect="true" data-collect-flag="js_vote_starVote">')
                    ._('<label class="xs"><img src="'+ item.im +'" /></label>')
                    ._('<section>')
                        ._('<div>'+ item.na +'</div>')
                        ._('<div>')
                            ._('<span id="num-'+ item.pid +'">0</span><i>票</i>')
                            ._('<div class="add"></div><label>打Call</label>')
                        ._('</div>')
                    ._('</section>')
                ._('</li>');
            });
            $("#voteWrap ul").append(t.toString());
            $(".main").removeClass("none").addClass("ss");
            setTimeout(function(e){
                $(".main").removeClass("ss");
            },1000);
        }
    };
    W.callbackVoteguessGroupplayerticketsHandler = function(data) {
        var me = H.vote;
        if (data.code == 0 && data.items) {
            me.cuntAttrs = data.items;
            me.bubbleSort(me.cuntAttrs);
            $.each(me.cuntAttrs, function(i,item){
                $('#num-'+item.puid).text(item.cunt);
                $.each(me.inforoudData, function(j,jtem){
                    if(item.puid == jtem.pid){
                        me.spellRankData.push(jtem);
                    }
                });
            });

            var tmp = '';
            $.each(H.vote.spellRankData, function(i,item){
                if(i === 0){
                    tmp = 'first';
                }else if(i === 1){
                    tmp = 'second';
                }else if(i === 2){
                    tmp = 'three';
                }else{
                    return
                }
                $('#vote-'+item.pid).addClass(tmp);
                
            });
        }
    };
})(Zepto);
$(function(){
    H.vote.init();
});


(function($) {
    H.talk = {
        $inputCmt: $('#input-comment'),
        REQUEST_CLS: 'requesting',
        init: function() {
            this.event();
            H.comment.init();
            this.dom();
        },
        dom: function(){
            var height = $(window).height();
            $("#talk .con").css({
                'top': (height - 313)/2
            });
        },
        spellTopDom: function(index, data){
            console.log('data', data.id);
            var me = H.talk;
            $("#talk .top").html('');
            var t = simpleTpl();
                  t._('<label class="ha"><img src="'+ Defa +'" /></label>')
                  ._('<div class="center vertical">')
                      ._('<div class="ni">一路向北</div>')
                      ._('<p class="ss">')
                        ._('<label>送了</label>')
                        ._('<span class="xB1 none">[应援队驾到]</span>')
                        ._('<span class="xB2 none">[WEY VV7]</span>')
                        ._('<span class="xB3 none">[星空]</span>')
                      ._('</p>')
                    ._('</div>')
                ._('<div class="imgT">')
                  ._('<img class="xB1 none" src="'+ c1 +'">')
                  ._('<img class="xB2 none" src="'+ c2 +'">')
                  ._('<img class="xB3 none" src="'+ c3 +'">')
                ._('</div>')
            $("#talk .top").html(t.toString());

            if(!data){
                var h= headimgurl ? headimgurl : Defa;
                $("#talk .top .ni").text(nickname || "匿名用户");
                $("#talk .ha img").attr('src', h); 
            }else if(index){
                var h= data.hu ? data.hu : Defa;
                $("#talk .top .ni").text(data.na || "匿名用户");
                $("#talk .ha img").attr('src', h);
            }
           $('#talk .top').removeClass('none');
           $("#talk #mack").removeClass('none');
           $('#talk').find('.'+index).removeClass('none');

           $("#talk .con img").on("webkitAnimationEnd", function () {
                me.resetMack();
           });
        },
        resetMack: function(){
            $("#talk .con img").addClass("none");
            $("#talk #mack").addClass('none');
        },
        event: function(){
            var me = H.talk;
            $("#talk .items").bind('touchend', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var $this = $(this);
                
                if ($this.hasClass(me.REQUEST_CLS)) {
                    showTips('每人一分钟只能发一次道具哦~');
                    return;
                }
                $this.addClass(me.REQUEST_CLS);
                var comment = $this.attr('data-type');
                $.ajax({
                    type : 'GET',
                    async : false,
                    url : domain_url + 'api/comments/save'+dev,
                    data: {
                        co: encodeURIComponent(comment),
                        op: openid,
                        nickname: nickname ? encodeURIComponent(nickname) : "",
                        headimgurl: headimgurl ? headimgurl : ""
                    },
                    dataType : "jsonp",
                    jsonpCallback : 'callbackCommentsSave',
                    complete: function() {
                        hidenewLoading();
                        setTimeout(function(){
                            $this.removeClass(me.REQUEST_CLS);
                        },60e3);
                    },
                    success : function(data) {
                        if(data.code == 0) {
                            var meComment = H.comment;
                            clearInterval(meComment.xbTimer);
                            me.resetMack();
                            me.spellTopDom(comment, false);
                            meComment.xbTimer = setInterval(function () {
                                meComment.roomXb();
                            },1500);
                            
                            return;
                        }
                        showTips("发送失败");
                    }
                });
            });

            $("#submit").bind('touchend', function(e) {
                e.stopPropagation();
                e.preventDefault();
                if ($(this).hasClass(me.REQUEST_CLS)) {
                    return;
                }
                var comment = $.trim(me.$inputCmt.val()) || '',
                    len = comment.length;

                if (comment.indexOf('xB') === 0) {
                    return;
                }
                if (len < 1) {
                    showTips('请先说点什么吧');
                    me.$inputCmt.removeClass('error').addClass('error');
                    return;
                } else if (len > 30) {
                    showTips('字数不能超过30哦');
                    me.$inputCmt.removeClass('error').addClass('error');
                    return;
                }
                $(this).addClass(me.REQUEST_CLS);
                shownewLoading(null,'发送中...');

                var meComment = H.comment;
                $.ajax({
                    type : 'GET',
                    async : false,
                    url : domain_url + 'api/comments/save'+dev,
                    data: {
                        co: encodeURIComponent(comment),
                        op: openid,
                        nickname: nickname ? encodeURIComponent(nickname) : "",
                        headimgurl: headimgurl ? headimgurl : ""
                    },
                    dataType : "jsonp",
                    jsonpCallback : 'callbackCommentsSave',
                    complete: function() {
                        hidenewLoading();
                    },
                    success : function(data) {
                        $("#submit").removeClass(me.REQUEST_CLS);
                        if(data.code == 0) {
                            showTips('发送成功');
                            var cls = getRandomArbitrary(0,5);
                            var h= headimgurl ? headimgurl : Defa;
                            var t = new simpleTpl();
                            t._('<li><div class="'+meComment.clsList[cls]+'"><span class="ni"><img src="'+ h +'"></span><span class="con">' + filterXSS(comment) + '</span></div></li>');
                            $("#comments_content").append(t.toString());
                            var n = $("#comments_content").find("li").length;
                            if(n >= 6){
                                $("#comments_content").find("li").first().remove();
                            }
                            me.$inputCmt.removeClass('error').val('');
                            meComment.selfCommentsList.push(data.uid);
                            return;
                        }
                        showTips("发送失败");
                    }
                });
            });
        },
        outlink: function (self) {
            shownewLoading();
            setTimeout(function () {
                window.location.href = $(self).attr("data-link");
            },500);
        },
        btn_animate: function(str,calback){
            str.addClass('flipInY');
            setTimeout(function(){
                str.removeClass('flipInY');
            },150);
        }
    };

    
    H.comment = {
        tmpDataTimer: 300e3,
        timer: 5000,
        xbTimer: null,
        maxid: 0,
        pageSize: 50,
        $comments: $('#comments'),
        commentsList: xbTmp,
        xbList: new Array(),
        ZDcommentsList: new Array(),
        selfCommentsList: new Array(),
        clsList: ["pink","red","blue","green","brown"],
        init: function() {
            var me = this;
            me.getComments();
            setInterval(function(){
                me.getComments();
            },10000);
            setTimeout(function () {
                me.showComments();
            },1000);
            setTimeout(function () {
                me.getZDComments();
            },8000);
        },
        tmpData: function(){
            var me = this;
            setInterval(function(){
                var randIndex = getRandomArbitrary(0,16);

                /*$.each(xbTmp, function(i, item){
                    me.commentsList.push(item);
                });*/
                me.commentsList.push(xbTmp[randIndex]);
            }, me.tmpDataTimer)
        },
        checkXb: function(data){
            var me = this;
            if(data.co.indexOf('xB') === 0){
                me.xbList.push(data);
            }else{
                me.commentsList.push(data);
            }
            me.tmpData();
        },
        getComments: function () {
            var me = this;
            $.ajax({
                type : 'GET',
                async : false,
                url : domain_url + 'api/comments/room' + dev,
                data: {
                    ps: 50,
                    maxid: me.maxid
                },
                dataType : "jsonp",
                jsonpCallback : 'callbackCommentsRoom',
                timeout: 15000,
                complete: function() {
                },
                success : function(data) {
                    if(data.code == 0){
                        var items = data.items;
                        if(items && items.length > 0){
                            me.maxid = data.maxid;
                            for(var i = items.length-1; i >= 0; i--){
                                if($.inArray(items[i].uid, me.selfCommentsList) < 0){
                                    me.checkXb(items[i]);
                                }
                            }
                        }
                    }
                },
                error : function(xmlHttpRequest, error) {
                }
            });
        },
        getZDComments: function () {//置顶分页获取评论信息
            var me = this;
            $.ajax({
                type : 'GET',
                async : false,
                url : domain_url + 'api/comments/list' + dev,
                data: {
                    page: 1,
                    ps: 50,
                    zd: 1
                },
                dataType : "jsonp",
                jsonpCallback : 'callbackCommentsList',
                timeout: 15000,
                complete: function() {
                },
                success : function(data) {
                    if(data.code == 0){
                        var items = data.items;
                        if(items && items.length > 0){
                            for(var i = 0; i < items.length; i++){
                                me.ZDcommentsList.push(items[i]);
                            }
                            setInterval(function(){
                                if(me.commentsList.length > 0){
                                    var i = getRandomArbitrary(0,items.length);
                                    me.checkXb(me.ZDcommentsList[i]);
                                }
                            },8000);
                        }
                    }
                },
                error : function(xmlHttpRequest, error) {
                }
            });
        },
        roomXb: function(){
            var me = this;
            if(me.xbList.length > 0){
                
                var cmt = me.xbList.shift();

                if(cmt.co.indexOf('xB') === 0){   
                    H.talk.spellTopDom(cmt.co,cmt);
                }
            }
        },
        showComments: function () {
            var me = this;


            me.xbTimer = setInterval(function () {
                me.roomXb();
            },1500);

            setInterval(function () {
                if(me.commentsList.length > 0){

                    var t = new simpleTpl();
                    var cls = getRandomArbitrary(0,5);
                    var cmt = me.commentsList.shift();
                    
                    t._('<li><div class="'+me.clsList[cls]+'"><span class="ni"><img src="'+ (cmt.hu || headimgurl) +'"></span><span class="con">' + filterXSS(cmt.co) + '</span></div></li>');
                    $("#comments_content").append(t.toString());
                    var n = $("#comments_content").find("li").length;
                    if(n >= 6){
                        $("#comments_content").find("li").first().remove();
                    }
                }
            },500);
        }
    };

})(Zepto);




var testData = [
                    {
                        pid: "18df08470faf4c7fba11f29dfb87ea18",
                        na: "周杰伦名称1",
                        ni: "男神也有一颗小公举的心",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016728/dc04caf7c119436b8bb6353ed389b465.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "71d6b2d0a6764c24a30eb67f5d72f95f",
                        na: "周杰伦名称2",
                        ni: "选手二昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016728/dc04caf7c119436b8bb6353ed389b465.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "3e4a499696dc4e91add5a8c19d329f78",
                        na: "周杰伦名称3",
                        ni: "开-昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/ba820d6c091a4f0b8a48202bdb328631.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "6cdb5ef43fbc4afcbd29b4cbf78f5919",
                        na: "周杰伦名称4",
                        ni: "关",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/6ea807e014a945bd8e75ea1a0ce1547b.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "4df15f9d12704bd9bd9b0f51d07e51e8",
                        na: "周杰伦名称5",
                        ni: "男神李晨实例菜品一（昵称）",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016620/25e62f8ac1b64a5faad0b6c2de911663.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "3a6e7950e43b4d1989736bff2b4a612d",
                        na: "周杰伦名称6",
                        ni: "明星一昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/2a7671388a9741eeb3910d4593dacb44.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "fcc219d0b9464abdb07b465250759132",
                        na: "周杰伦名称7",
                        ni: "明星二昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/34fbd924f0d44009b2f402885bba82d8.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "18df08470faf4c7fba11f29dfb87ea18",
                        na: "周杰伦名称8",
                        ni: "男神也有一颗小公举的心",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016728/dc04caf7c119436b8bb6353ed389b465.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "71d6b2d0a6764c24a30eb67f5d72f95f",
                        na: "周杰伦名称9",
                        ni: "选手二昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/548f0ab9fe724bf0b82b41566e61d30e.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "3e4a499696dc4e91add5a8c19d329f78",
                        na: "周杰伦名称10",
                        ni: "开-昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/ba820d6c091a4f0b8a48202bdb328631.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "6cdb5ef43fbc4afcbd29b4cbf78f5919",
                        na: "周杰伦名称11",
                        ni: "关",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/6ea807e014a945bd8e75ea1a0ce1547b.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "4df15f9d12704bd9bd9b0f51d07e51e8",
                        na: "周杰伦名称12",
                        ni: "男神李晨实例菜品一（昵称）",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016620/25e62f8ac1b64a5faad0b6c2de911663.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "3a6e7950e43b4d1989736bff2b4a612d",
                        na: "周杰伦名称13",
                        ni: "明星一昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/2a7671388a9741eeb3910d4593dacb44.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "fcc219d0b9464abdb07b465250759132",
                        na: "周杰伦名称14",
                        ni: "明星二昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/34fbd924f0d44009b2f402885bba82d8.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "18df08470faf4c7fba11f29dfb87ea18",
                        na: "周杰伦名称15",
                        ni: "男神也有一颗小公举的心",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016728/dc04caf7c119436b8bb6353ed389b465.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "71d6b2d0a6764c24a30eb67f5d72f95f",
                        na: "周杰伦名称16",
                        ni: "选手二昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/548f0ab9fe724bf0b82b41566e61d30e.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "3e4a499696dc4e91add5a8c19d329f78",
                        na: "周杰伦名称17",
                        ni: "开-昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/ba820d6c091a4f0b8a48202bdb328631.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "6cdb5ef43fbc4afcbd29b4cbf78f5919",
                        na: "周杰伦名称18",
                        ni: "关",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/6ea807e014a945bd8e75ea1a0ce1547b.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "4df15f9d12704bd9bd9b0f51d07e51e8",
                        na: "周杰伦名称19",
                        ni: "男神李晨实例菜品一（昵称）",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016620/25e62f8ac1b64a5faad0b6c2de911663.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "3a6e7950e43b4d1989736bff2b4a612d",
                        na: "周杰伦名称20",
                        ni: "明星一昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/2a7671388a9741eeb3910d4593dacb44.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "fcc219d0b9464abdb07b465250759132",
                        na: "周杰伦名称21",
                        ni: "明星二昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/34fbd924f0d44009b2f402885bba82d8.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "18df08470faf4c7fba11f29dfb87ea18",
                        na: "周杰伦名称22",
                        ni: "男神也有一颗小公举的心",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016728/dc04caf7c119436b8bb6353ed389b465.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "71d6b2d0a6764c24a30eb67f5d72f95f",
                        na: "周杰伦名称23",
                        ni: "选手二昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/548f0ab9fe724bf0b82b41566e61d30e.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "3e4a499696dc4e91add5a8c19d329f78",
                        na: "周杰伦名称24",
                        ni: "开-昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/ba820d6c091a4f0b8a48202bdb328631.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "6cdb5ef43fbc4afcbd29b4cbf78f5919",
                        na: "周杰伦名称25",
                        ni: "关",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/6ea807e014a945bd8e75ea1a0ce1547b.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "4df15f9d12704bd9bd9b0f51d07e51e8",
                        na: "周杰伦名称26",
                        ni: "男神李晨实例菜品一（昵称）",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016620/25e62f8ac1b64a5faad0b6c2de911663.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "3a6e7950e43b4d1989736bff2b4a612d",
                        na: "周杰伦名称27",
                        ni: "明星一昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/2a7671388a9741eeb3910d4593dacb44.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "fcc219d0b9464abdb07b465250759132",
                        na: "周杰伦名称28",
                        ni: "明星二昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/34fbd924f0d44009b2f402885bba82d8.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    },
                    {
                        pid: "fcc219d0b9464abdb07b465250759132",
                        na: "周杰伦名称29",
                        ni: "明星二昵称",
                        im: "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/zhima/images/2016623/34fbd924f0d44009b2f402885bba82d8.png",
                        im2: "",
                        im3: "",
                        in: "",
                        re: 0
                    }
                ];