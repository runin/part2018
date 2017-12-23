import '../css/core.css';
import '../css/vote.scss';
import Defa from '../images/defa.png';
import c1 from '../images/c1.png';
import c2 from '../images/c2.png';
import c3 from '../images/c3.png';
;(function($){
    H.vote = {
        guid: '',
        cuntAttrs: null,//投票后降序数组
        inforoudAttrs: null,//选手信息数组
        spellRankData: [],//选手信息降序数组
        init: function(){
            this.event();
            this.getVoteinfo();
        },
        getVoteinfo: function(){
            getResult('api/voteguess/inforoud', {}, 'callbackVoteguessInfoHandler', true);
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
                t._('<li id="vote-'+ item.pid +'" data-collect="true" data-collect-flag="hn-party-vote-back-'+ item.pid +'" data-collect-desc="进入主互动页">')
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
    W.callbackVoteguessInfoHandler = function(data){
        var me = H.vote;
        if(data.code == 0){
            me.guid = data.items[0].guid;
            me.inforoudData = data.items[0].pitems;
            me.spellDom(me.inforoudData);


            // me.spellDom(testData);
            me.voteSupport();
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
                var h= headimgurl ? headimgurl + '/64' : Defa;
                $("#talk .top .ni").text(nickname || "匿名用户");
                $("#talk .ha img").attr('src', h); 
            }else if(index){
                var h= data.hu ? data.hu + '/64' : Defa;
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
                    // showTips('发送频率过快,稍后再试');
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
                        },1e3);
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
                            var h= headimgurl ? headimgurl + '/64' : Defa;
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
        tmpDataTimer: 1e3,
        timer: 5000,
        xbTimer: null,
        maxid: 0,
        pageSize: 50,
        $comments: $('#comments'),
        commentsList: new Array(),
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
            setTimeout(function(){
                $.each(xbTmp, function(i, item){
                    me.commentsList.push(item);
                });
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
                    
                    t._('<li><div class="'+me.clsList[cls]+'"><span class="ni"><img src="'+ (cmt.hu+'/64' || headimgurl + '/64') +'"></span><span class="con">' + filterXSS(cmt.co) + '</span></div></li>');
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

/*
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
                    }
                ]*/