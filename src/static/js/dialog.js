(function($) {
    H.dialog = {
        ci:null,
        ts:null,
        si:null,
        send: false,
        mobile: "",
        content: null,
        $container: $('body'),
        init: function() {
            var me = this, width = $(window).width(), height = $(window).height();
            $('body').css({
                'width': width
            });
        },
        open: function(data) {
            var me = this;
            if($("body").attr('data-type') == 'lottery'){
                 H.lottery.isCanShake = false;
                 H.lottery.canJump = false;
            }
            if (this.$dialog) {
                this.$dialog.removeClass('none');
            } else {
                this.$dialog = $(this.tpl());
                H.dialog.$container.append(this.$dialog);
            }
            H.dialog.relocate();
            this.$dialog.animate({'opacity':'1'}, 500);
            this.$dialog.find('.dialog').addClass('bounceInDown');
            setTimeout(function(){
                me.$dialog.find('.dialog').removeClass('bounceInDown');
            }, 1000);
            hidenewLoading();
        },
        relocate : function(){
            var height = $(window).height(), width = $(window).width();
            $('.modal, .dialog').each(function() {
                $(this).css({
                    'width': width,
                    'height': "100%",
                    'left': 0,
                    'top': 0
                });
            });
        },
        btn_animate: function(str){
            str.addClass('flipInY');
            setTimeout(function(){
                str.removeClass('flipInY');
            },150);
        },
        checkPage: function(){
            if($("body").attr('data-type') == 'answer') {
                toUrl("vote.html");
            }
        },
        rule: {
            $dialog: null,
            open: function () {
                H.dialog.open.call(this);
                this.event();
                this.pre_dom();
            },
            pre_dom: function(){
                var width = $(window).width(),
                    height = $(window).height();
                if(W.screen.width === 320){
                    $(".dialog").css({
                        'width': "280px",
                        'height': "431px",
                        'left': Math.round((width-280)/2)+'px',
                        'top': Math.round((height-431)/2)+'px'
                    });
                }else{
                    $(".dialog").css({
                        'width': "310px",
                        'height': "477px",
                        'left': Math.round((width-310)/2)+'px',
                        'top': Math.round((height-477)/2)+'px'
                    });
                }
            },
            close: function () {
                var me = this;
                this.$dialog.find('.dialog').removeClass('bounceInDown').addClass('bounceOutDown');
                this.$dialog.animate({'opacity':'0'}, 1000);
                setTimeout(function(){
                    hidenewLoading();
                    $("#btn-rule").removeClass('requesting');
                    me.$dialog && me.$dialog.remove();
                    me.$dialog = null;
                }, 1000);
            },
            event: function () {
                var me = this;
                this.$dialog.find('.btn-dialog-close').click(function (e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    me.close();
                });
            },
            tpl: function () {
                var t = simpleTpl();
                if (rule_temp == '') {
                    getResult('api/common/rule', {}, 'commonApiRuleHandler');
                } else {
                    hidenewLoading();
                }
                t._('<section class="modal modal-rule" id="rule-dialog">')
                    ._('<div class="dialog rule-dialog">')
                        ._('<a href="#" class="btn-dialog-close" id="btn-dialog-close" data-collect="true" data-collect-flag="dialog-rule-btn-close" data-collect-desc="弹层(活动规则)-关闭按钮"></a>')
                        ._('<div class="dialog-content">')
                            ._('<h2>活动规则</h2>')
                            ._('<div class="rule-content" id="rule-content">' + rule_temp + '</div>')
                        ._('</div>')
                    ._('</div>')
                    ._('</section>');
                return t.toString();
            }
        },
        redbagLottery: {
            $dialog: null,
            rp:null,
            open: function(data) {
                var me =this, $dialog = this.$dialog, winW = $(window).width(), winH = $(window).height();
                H.lottery.isCanShake = false;
                H.lottery.canJump = false;
                H.dialog.open.call(this);
                if (!$dialog) {
                   this.event();
                }
                me.update(data);
                me.pre_dom();
            },
            pre_dom: function(){
                var width = $(window).width(),
                    height = $(window).height();
                if(W.screen.width === 320){
                    $(".dialog").css({
                        'width': "250px",
                        'height': "375px",
                        'left': Math.round((width-250)/2)+'px',
                        'top': Math.round((height-375)/2)+'px'
                    });
                }else{
                    $(".dialog").css({
                        'width': "320px",
                        'height': "475px",
                        'left': Math.round((width-320)/2)+'px',
                        'top': Math.round((height-475)/2)+'px'
                    });
                }
            },
            close: function() {
                var me = this;
                this.$dialog.find('.dialog').removeClass('bounceInDown').addClass('bounceOutDown');
                this.$dialog.animate({'opacity':'0'}, 1000);
                setTimeout(function(){
                    H.lottery.isCanShake = true;
                    H.lottery.canJump = true;
                    me.$dialog && me.$dialog.remove();
                    me.$dialog = null;
                }, 1000);
                H.dialog.checkPage();
            },
            event: function() {
                var me = this;
                this.$dialog.find('.btn-dialog-close').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    me.close();
                });
                $("#btn-redbagLottery-use").click(function(e){
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    if(!$(this).hasClass("flag")) {
                        shownewLoading(null, '领取中...');
                        $(this).addClass("flag");
                        setTimeout(function(){
                            location.href = H.dialog.redbagLottery.rp;
                        },500);
                    }
                });
            },
            update: function(data) {
                var me = this, height = $(window).height();
                if(data.result){
                    me.rp = data.rp;
                    $(".redbag-dialog").find(".award-img").attr("src", data.pi).attr("onerror", "$(this).addClass(\'none\')");
                    /*$("#redbag-dialog").find(".award-keyTips").html(data.pn || '');*/
                }
            },
            tpl: function() {
                var t = simpleTpl();
                t._('<section class="modal modal-redbag" id="redbag-dialog">')
                    ._('<section class="dialog redbag-dialog" data-collect="true" data-collect-flag="">')
                    ._('<a href="javascript:void(0);" class="btn-dialog-close" id="btn-dialog-close" data-collect="true" data-collect-flag="js_dialog_redClose"></a>')
                    ._('<fieldset class="dialog-content">')
                    /*._('<legend class="tlt"><img src="images/win-prize.png" /></legend>')
                    ._('<p class="award-luckTips"><img src="./images/icon-luckytips.png"></p>')
                     ._('<p class="award-keyTips"></p>')*/
                     ._('<div class="bbg"><img class="award-img" src=""></div>')
                    ._('<section class="btn-lottery-box">')
                    ._('<a href="javascript:void(0);" class="btn-lottery btn-redbag-get" id="btn-redbagLottery-use" data-collect="true" data-collect-flag="js_dialog_redUse" data-collect-desc="弹层(红包)-领取红包按钮"></a>')
                    ._('</section>')
                    ._('</fieldset>')
                    ._('</section>')
                    ._('</section>');
                return t.toString();
            }
        },
        jfLottery: {
            $dialog: null,
            open: function(data) {
                var me =this, $dialog = this.$dialog, winW = $(window).width(), winH = $(window).height();
                H.lottery.isCanShake = false;
                H.lottery.canJump = false;
                H.dialog.open.call(this);
                if (!$dialog) {
                   this.event();
                }
                me.update(data);
                me.pre_dom();
            },
            pre_dom: function(){
                var width = $(window).width(),
                    height = $(window).height();
                if(W.screen.width === 320){
                    $(".dialog").css({
                        'width': "250px",
                        'height': "375px",
                        'left': Math.round((width-250)/2)+'px',
                        'top': Math.round((height-375)/2)+'px'
                    });
                }else{
                    $(".dialog").css({
                        'width': "320px",
                        'height': "475px",
                        'left': Math.round((width-320)/2)+'px',
                        'top': Math.round((height-475)/2)+'px'
                    });
                }
            },
            close: function() {
                var me = this;
                this.$dialog.find('.dialog').removeClass('bounceInDown').addClass('bounceOutDown');
                this.$dialog.animate({'opacity':'0'}, 1000);
                setTimeout(function(){
                    H.lottery.isCanShake = true;
                    H.lottery.canJump = true;
                    me.$dialog && me.$dialog.remove();
                    me.$dialog = null;
                }, 1000);
            },
            event: function() {
                var me = this;
                this.$dialog.find('.btn-dialog-close').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    me.close();
                });
                $("#btn-redbagLottery-use").click(function(e){
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    if(!$(this).hasClass("flag")) {
                        $(this).addClass("flag");

                        var outMe = H.dialog;
                        getResult('api/lottery/award', {
                            oi: openid,
                            nn: nickname ? encodeURIComponent($.fn.cookie(mpappid + '_nickname')) : "",
                            hi: headimgurl ? headimgurl : "",
                            rn: outMe.name ? encodeURIComponent(outMe.name) : "",
                            ph: outMe.mobile ? outMe.mobile : "",
                            ad: outMe.address ? encodeURIComponent(outMe.address) : ""
                        }, 'callbackLotteryAwardHandler');
                        // me.close();
                        showTips('领取成功');
                    }
                });
            },
            update: function(data) {
                var me = this, height = $(window).height();
                if(data.result){
                    $(".redbag-dialog").find(".award-img").attr("src", data.pi).attr("onerror", "$(this).addClass(\'none\')");
                    $(".redbag-dialog").find("h1").html("<span>"+ data.tt +"</span>积分");
                    /*$("#redbag-dialog").find(".award-keyTips").html(data.pn || '');*/
                }
            },
            tpl: function() {
                var t = simpleTpl();
                t._('<section class="modal modal-redbag" id="jf-dialog">')
                    ._('<section class="dialog redbag-dialog" data-collect="true" data-collect-flag="dialog-redbag-btn-redbagLottery-use" data-collect-desc="弹层(积分)-立即领取按钮">')
                    ._('<a href="javascript:void(0);" class="btn-dialog-close" id="btn-dialog-close" data-collect="true" data-collect-flag="dialog-redbag-btn-close" data-collect-desc="弹层(积分)-关闭按钮"></a>')
                    ._('<fieldset class="dialog-content">')
                    ._('<legend class="tlt"><img src="images/win-prize.png" /></legend>')
                    /*._('<p class="award-luckTips"><img src="./images/icon-luckytips.png"></p>')
                     ._('<p class="award-keyTips"></p>')*/
                    ._('<img class="award-img" src="">')
                    ._('<section class="btn-lottery-box">')
                    ._('<a href="javascript:void(0);" class="btn-lottery btn-redbag-get" id="btn-redbagLottery-use" data-collect="true" data-collect-flag="dialog-redbag-btn-redbagLottery-use" data-collect-desc="弹层(红包)-领取红包按钮"></a>')
                    ._('</section>')
                    ._('</fieldset>')
                    ._('</section>')
                    ._('</section>')
                    ._('</section>');
                return t.toString();
            }
        },
        shiwuLottery: {
            $dialog: null,
            isFocus: false,
            name: '',
            mobile: '',
            address: '',
            open: function(data) {
                var me =this,$dialog = this.$dialog;
                H.dialog.open.call(this);
                if (!$dialog) {
                   this.event(data);
                }
                me.update(data);
                me.checkFocus();
            },
            checkFocus: function(){
                var me = this;
                $("input").each(function() {
                    $(this).focus(function(){
                        me.isFocus = true;
                    });
                });
            },
            close: function() {
                var me = this;
                this.$dialog.find('.dialog').removeClass('bounceInDown').addClass('bounceOutDown');
                this.$dialog.animate({'opacity':'0'}, 1000);
                setTimeout(function(){
                    if($("body").attr('data-type') == 'lottery'){
                        H.lottery.isCanShake = true;
                        H.lottery.canJump = true;
                    }
                    me.$dialog && me.$dialog.remove();
                    me.$dialog = null;
                }, 1000);
                 H.dialog.checkPage();
            },
            event: function(data) {
                var me = this;
                this.$dialog.find('.btn-dialog-close').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    me.close();
                    if(me.isFocus && !is_android() && ($("body").attr('data-type') == 'lottery')){
                        toUrl("lottery.html");
                    }
                });
                this.$dialog.find('#btn-shiwuLottery-award').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    if(me.check(data)) {
                        if(!$(this).hasClass("flag")){
                            $(this).addClass("flag");
                            H.dialog.mobile = me.mobile ? me.mobile : "";
                            if(data.aa) {
                                //aa----领取地址
                                //pd----奖品描述
                                H.dialog.content = data.aa + $.trim($('#name').val()) + data.pd; 
                            }
                            getResult('api/lottery/award', {
                                oi: openid,
                                nn: nickname ? encodeURIComponent($.fn.cookie(mpappid + '_nickname')) : "",
                                hi: headimgurl ? headimgurl : "",
                                rn: me.name ? encodeURIComponent(me.name) : "",
                                ph: me.mobile ? me.mobile : "",
                                ad: me.address ? encodeURIComponent(me.address) : ""
                            }, 'callbackLotteryAwardHandler');
                            me.close();
                            showTips('领取成功');
                            if(me.isFocus && !is_android() && ($("body").attr('data-type') == 'lottery')){
                                toUrl("lottery.html");
                            }
                        }
                    }
                });
            },
            update: function(data) {
                var me = this;
                if(data.result){
                    $("#shiwu-dialog").find(".award-img").attr("src", data.pi).attr("onerror", "$(this).addClass(\'none\')");
                    $("#shiwu-dialog").find(".name").val(data.rn ? data.rn : '');
                    $("#shiwu-dialog").find(".phone").val(data.ph ? data.ph : '');
                     $("#shiwu-dialog").find(".address").val(data.ad ? data.ad : '');
                    if(data.cu){
                        $("#shiwu-dialog").find(".address").removeClass("none");
                    } else{
                        $("#shiwu-dialog").find(".address").addClass("none");
                    }
                    if(data.ru){
                        $("#shiwu-dialog").find(".card").removeClass("none");
                    } else{
                        $("#shiwu-dialog").find(".card").addClass("none");
                    }

                    if(data.al) H.dialog.send = true; //联系人和电话 
                }
            },
            check: function(data) {
                var me = this, name = $.trim($('#name').val()), mobile = $.trim($('#phone').val()), card = $.trim($('#card').val()), address = $.trim($('#address').val());
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                if (name.length > 20 || name.length == 0) {
                    showTips('请填写您的姓名！');
                    return false;
                } else if (!/^\d{11}$/.test(mobile)) {
                    showTips('请填写正确手机号！');
                    return false;
                }

                if(data.ru){
                   if (reg.test(card) === false) {
                        showTips('请填写正确您的身份证号码！');
                        return false;
                    } 
                } 

                if(data.cu){
                   if (address.length < 8 || address.length > 80 || address.length == 0) {
                        showTips('请填写您的详细地址！');
                        return false;
                    } 
                } 

                me.name = name;
                me.mobile = mobile;
                me.address = address;
                return true;
            },
            tpl: function() {
                var t = simpleTpl();
                t._('<section class="modal modal-shiwu" id="shiwu-dialog">')
                    ._('<section class="dialog shiwu-dialog">')
                    ._('<a href="javascript:void(0);" class="btn-dialog-close" id="btn-dialog-close" data-collect="true" data-collect-flag="js_dialog_shiwuClose" data-collect-desc="弹层(实物)-关闭按钮"></a>')
                    ._('<fieldset class="dialog-content">')
                    /*._('<legend class="tlt"><img src="images/win-prize.png" /></legend>')*/
                    ._('<div class="bbg"><img class="award-img" src=""></div>')
                    ._('<section class="footer">')
                    ._('<section class="input-box">')
                    ._('<p><input class="name" type="text" id="name" placeholder="姓名"></p>')
                    ._('<p><input class="phone" type="tel" id="phone" placeholder="电话"></p>')
                    ._('<p><input class="card none" type="text" id="card" placeholder="身份证号码"></p>')
                    ._('<p><input class="address none" type="text" id="address" placeholder="地址"></p>')
                    ._('</section>')
                    ._('</section>')
                    ._('<section class="btn-lottery-box">')
                    ._('<a href="javascript:void(0);" class="btn-lottery btn-wxcard-lottery-award" id="btn-shiwuLottery-award" data-collect="true" data-collect-flag="js_dialog_shiwuUse" data-collect-desc="弹层(实物)-领取按钮"></a>')
                    ._('</section>')
                    ._('</fieldset>')
                    ._('</section>')
                    ._('</section>');
                return t.toString();
            }
        },
        linkLottery: {
            $dialog: null,
            ru: '',
            open: function(data) {
                var me =this,$dialog = this.$dialog;
                H.dialog.open.call(this);
                if (!$dialog) {
                    this.event();
                }
                me.update(data);
            },
            close: function() {
                var me = this;
                this.$dialog.find('.dialog').removeClass('bounceInDown').addClass('bounceOutDown');
                this.$dialog.animate({'opacity':'0'}, 1000);
                setTimeout(function(){
                    if($("body").attr('data-type') == 'lottery'){
                        H.lottery.isCanShake = true;
                        H.lottery.canJump = true;
                    }
                    me.$dialog && me.$dialog.remove();
                    me.$dialog = null;
                }, 1000);
                 H.dialog.checkPage();
            },
            event: function() {
                var me = this;
                this.$dialog.find('.btn-dialog-close').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    me.close();
                });
                this.$dialog.find('#btn-linkLottery-use').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    if (me.ru.length == 0) {
                        me.close();
                        hidenewLoading();
                    } else {
                        shownewLoading();
                        var outMe = H.dialog;
                        getResult('api/lottery/award', {
                            oi: openid,
                            nn: nickname ? encodeURIComponent($.fn.cookie(mpappid + '_nickname')) : "",
                            hi: headimgurl ? headimgurl : ""
                        }, 'callbackLotteryAwardHandler');
                        setTimeout(function(){
                            location.href = me.ru;
                        },500);
                    }
                });
            },
            update: function(data) {
                var me = this, height = $(window).height();
                if(data.result){
                    me.ru = data.ru;
                    if (data.ru.length == 0) {
                        $('#btn-linkLottery-use').addClass('none');
                    } else {
                        $('#btn-linkLottery-use').removeClass('none');
                    }
                    $("#link-dialog").find(".award-img").attr("src", data.pi).attr("onerror", "$(this).addClass(\'none\')");
                    /* $("#link-dialog").find(".award-keyTips").html(data.pn || '');*/
                }
            },
            tpl: function() {
                var t = simpleTpl();
                t._('<section class="modal modal-link" id="link-dialog">')
                    ._('<section class="dialog link-dialog">')
                    ._('<a href="javascript:void(0);" class="btn-dialog-close" id="btn-dialog-close" data-collect="true" data-collect-flag="js_dialog_wailianClose" data-collect-desc="弹层(外链)-关闭按钮"></a>')
                    ._('<fieldset class="dialog-content">')
                    /*._('<legend class="tlt"><img src="images/win-prize.png" /></legend>')
                    ._('<p class="award-luckTips"><img src="./images/icon-luckytips.png"></p>')
                     ._('<p class="award-keyTips"></p>')*/
                    ._('<div class="bbg"><img class="award-img" src=""></div>')
                    ._('<section class="btn-lottery-box">')
                    ._('<a href="javascript:void(0);" class="btn-lottery btn-link-use" id="btn-linkLottery-use" data-collect="true" data-collect-flag="js_dialog_wailianUse" data-collect-desc="弹层(外链)-立即领取按钮"></a>')
                    ._('</section>')
                    ._('</fieldset>')
                    ._('</section>')
                    ._('</section>');
                return t.toString();
            }
        },
        dramaCardLottery: {
            $dialog: null,
            open: function(data) {
                var me =this,$dialog = this.$dialog;
                H.dialog.open.call(this);
                if (!$dialog) {
                    this.event();
                }
                me.update(data);
            },
            close: function() {
                var me = this;
                this.$dialog.find('.dialog').removeClass('bounceInDown').addClass('bounceOutDown');
                this.$dialog.animate({'opacity':'0'}, 1000);
                setTimeout(function(){
                    if($("body").attr('data-type') == 'lottery'){
                        H.lottery.isCanShake = true;
                        H.lottery.canJump = true;
                    }
                    me.$dialog && me.$dialog.remove();
                    me.$dialog = null;
                }, 1000);
            },
            event: function() {
                var me = this;
                this.$dialog.find('.btn-dialog-close').click(function(e) {
                  e.preventDefault();
                  H.dialog.btn_animate($(this));
                  me.close();
                });
                this.$dialog.find('#btn-linkLottery-use').click(function(e) {
                  e.preventDefault();
                  H.dialog.btn_animate($(this));
                  shownewLoading();
                  var outMe = H.dialog;
                  getResult('api/lottery/award', {
                      oi: openid,
                      nn: nickname ? encodeURIComponent($.fn.cookie(mpappid + '_nickname')) : "",
                      hi: headimgurl ? headimgurl : ""
                  }, 'callbackLotteryAwardHandler');
                  me.close();
                  hidenewLoading();
                  showTips('领取成功');
                });
            },
            update: function(data) {
                var me = this, height = $(window).height();
                if(data.result){
                  $("#dramaCard-dialog").find(".award-img").attr("src", data.pi).attr("onerror", "$(this).addClass(\'none\')");
                  $("#dramaCard-dialog").find(".award-keyTips").text('恭喜您获得'+ data.pn.split('-')[1] + '号卡牌');
                }
            },
            tpl: function() {
                var t = simpleTpl();
                t._('<section class="modal modal-link" id="dramaCard-dialog">')
                    ._('<section class="dialog link-dialog">')
                    ._('<a href="javascript:void(0);" class="btn-dialog-close" id="btn-dialog-close" data-collect="true" data-collect-flag="dialog-link-btn-close" data-collect-desc="弹层(剧集卡牌)-关闭按钮"></a>')
                    ._('<fieldset class="dialog-content">')
                    /*._('<legend class="tlt"><img src="images/win-prize.png" /></legend>')
                    ._('<p class="award-luckTips"><img src="./images/icon-luckytips.png"></p>')*/
                     ._('<p class="award-keyTips"></p>')
                    ._('<div class="bbg"><img class="award-img" src=""></div>')
                    ._('<section class="btn-lottery-box">')
                    ._('<a href="javascript:void(0);" class="btn-lottery btn-link-use" id="btn-linkLottery-use" data-collect="true" data-collect-flag="dialog-link-btn-linkLottery-use" data-collect-desc="弹层(剧集卡牌)-立即领取按钮"></a>')
                    ._('</section>')
                    ._('</fieldset>')
                    ._('</section>')
                    ._('</section>');
                return t.toString();
            }
        },
        duiHuanMaLottery: {
            $dialog: null,
            open: function(data) {
                H.lottery.isCanShake = false;
                H.lottery.canJump = false;
                var me =this,$dialog = this.$dialog;
                H.dialog.open.call(this);
                if (!$dialog) {
                    this.event();
                }
                me.update(data);
                me.pre_dom();
            },
            pre_dom: function(){
                var width = $(window).width(),
                    height = $(window).height();
                if(W.screen.width === 320){
                    $(".dialog").css({
                        'width': "250px",
                        'height': "375px",
                        'left': Math.round((width-250)/2)+'px',
                        'top': Math.round((height-375)/2)+'px'
                    });
                }else{
                    $(".dialog").css({
                        'width': "320px",
                        'height': "475px",
                        'left': Math.round((width-320)/2)+'px',
                        'top': Math.round((height-475)/2)+'px'
                    });
                }
            },
            close: function() {
                var me = this;
                this.$dialog.find('.dialog').removeClass('bounceInDown').addClass('bounceOutDown');
                this.$dialog.animate({'opacity':'0'}, 1000);
                setTimeout(function(){
                    H.lottery.isCanShake = true;
                    H.lottery.canJump = true;
                    me.$dialog && me.$dialog.remove();
                    me.$dialog = null;
                }, 1000);
            },
            event: function() {
                var me = this;
                this.$dialog.find('.btn-dialog-close').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    me.close();
                });
                this.$dialog.find('#btn-djmLottery-use').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    var outMe = H.dialog;
                    getResult('api/lottery/award', {
                        oi: openid,
                        nn: nickname ? encodeURIComponent($.fn.cookie(mpappid + '_nickname')) : "",
                        hi: headimgurl ? headimgurl : "",
                        rn: outMe.name ? encodeURIComponent(outMe.name) : "",
                        ph: outMe.mobile ? outMe.mobile : "",
                        ad: outMe.address ? encodeURIComponent(outMe.address) : ""
                    }, 'callbackLotteryAwardHandler');
                    me.close();
                    showTips('领取成功');
                });
                this.$dialog.find('#btn-djmkLottery-close').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    me.close();
                });
            },
            update: function(data) {
                var me = this, height = $(window).height();
                if(data.result){
                    $("#dhm-dialog").find(".award-img").attr("src", data.pi).attr("onerror", "$(this).addClass(\'none\')");
                    $("#dhm-dialog").find(".award-keyTips").html(data.pn || '');
                    if(data.al){
                        $("#dhm-dialog").find(".tel").html("<img class='tel-img' src='images/tel.png' />"+data.al);
                    }
                    if(data.cc){
                        $("#dhm-dialog").find(".cc").html("<label>兑奖码：</label><span>"+ data.cc +"</span>").removeClass("none");
                    }

                }
            },
            tpl: function() {
                var t = simpleTpl();
                t._('<section class="modal modal-link" id="dhm-dialog">')
                    ._('<section class="dialog dhm-dialog">')
                    ._('<a href="javascript:void(0);" class="btn-dialog-close" id="btn-dialog-close" data-collect="true" data-collect-flag="dialog-dhm-btn-close" data-collect-desc="弹层(兑换码)-关闭按钮"></a>')
                    ._('<fieldset class="dialog-content">')
                    ._('<legend class="tlt"><img src="images/win-prize.png" /></legend>')
                    /*._('<p class="award-luckTips"><img src="./images/icon-luckytips.png"></p>')
                     ._('<p class="award-keyTips"></p>')*/
                    ._('<img class="award-img" src="">')
                    ._('<div class="cc none"></div>')
                    ._('<section class="btn-lottery-box">')
                    ._('<a href="javascript:void(0);" class="btn-lottery btn-redbag-get" id="btn-djmLottery-use" data-collect="true" data-collect-flag="dialog-redbag-btn-redbagLottery-use" data-collect-desc="弹层(兑换码)-领取兑换码按钮"></a>')
                    ._('</section>')
                    ._('</fieldset>')
                    ._('</section>')
                    ._('</section>');
                return t.toString();
            }
        },
        wxcardLottery: {
            $dialog: null,
            ci:null,
            ts:null,
            si:null,
            pt:null,
            sto:null,
            open: function(data) {
                var me =this, $dialog = this.$dialog;
                H.dialog.open.call(this);
                if (!$dialog) {
                    this.event();
                }
                me.update(data);
                me.readyFunc();
            },
            close: function() {
                var me = this;
                this.$dialog.find('.dialog').removeClass('bounceInDown').addClass('bounceOutDown');
                this.$dialog.animate({'opacity':'0'}, 1000);
                setTimeout(function(){
                    me.$dialog && me.$dialog.remove();
                    me.$dialog = null;
                }, 1000);
                 H.dialog.checkPage();
            },
            event: function() {
                var me = this;
                this.$dialog.find('.btn-dialog-close').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                     if($("body").attr('data-type') == 'lottery'){
                        H.lottery.isCanShake = true;
                        H.lottery.canJump = true;
                     }
                    
                    me.close();
                });
                this.$dialog.find('.btn-close').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    if($("body").attr('data-type') == 'lottery'){
                        H.lottery.isCanShake = true;
                        H.lottery.canJump = true;
                    }
                    
                    me.close();
                });
            },
            readyFunc: function(){
                var me = this;
                $('#btn-wxcardLottery-award').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    if($("body").attr('data-type') == 'lottery'){
                        H.lottery.isCanShake = false;
                    }
                    
                    if(!$(this).hasClass("flag")){
                        $(this).addClass("flag");
                        shownewLoading();
                        me.close();
                        me.sto = setTimeout(function(){
                            if($("body").attr('data-type') == 'lottery'){
                                H.lottery.isCanShake = true;
                            }
                            
                            hidenewLoading();
                        },15000);
                        setTimeout(function(){
                            me.wx_card();
                        },1000);
                    }
                });
            },
            wx_card:function(){
                var me = this;
                wx.addCard({
                    cardList: [{
                        cardId: me.ci,
                        cardExt: "{\"timestamp\":\""+ me.ts +"\",\"signature\":\""+ me.si +"\"}"
                    }],
                    success: function (res) {
                        if($("body").attr('data-type') == 'lottery'){
                            H.lottery.wxCheck = true;
                            H.lottery.canJump = true;
                            H.lottery.isCanShake = true;
                        }
                        
                        var outMe = H.dialog;
                        getResult('api/lottery/award', {
                            nn: nickname ? encodeURIComponent($.fn.cookie(mpappid + '_nickname')) : "",
                            hi: headimgurl ? headimgurl : "",
                            oi: openid
                        }, 'callbackLotteryAwardHandler');
                    },
                    fail: function(res){
                        if($("body").attr('data-type') == 'lottery'){
                            H.lottery.isCanShake = true;
                            H.lottery.canJump = true;
                        }
                        
                        hidenewLoading();
                        recordUserOperate(openid, res.errMsg, "card-fail");
                    },
                    complete:function(){
                        me.sto && clearTimeout(me.sto);
                         if($("body").attr('data-type') == 'lottery'){
                             H.lottery.isCanShake = true;
                             H.lottery.canJump = true;
                         }
                       
                        hidenewLoading();
                    },
                    cancel:function(){
                        if($("body").attr('data-type') == 'lottery'){
                            H.lottery.isCanShake = true;
                            H.lottery.canJump = true;
                        }
                        
                        hidenewLoading();
                    }
                });
            },
            update: function(data) {
                var me = this, height = $(window).height();
                if(data.result && data.pt == 7){
                    me.pt = data.pt;
                    $("#wxcard-dialog").find(".award-img").attr("src",data.pi).attr("onerror","$(this).addClass(\'none\')");
                    /*$("#wxcard-dialog").find('.award-keyTips').html(data.pn || '');*/
                    me.ci = data.ci;
                    me.ts = data.ts;
                    me.si = data.si;
                }
            },
            tpl: function() {
                var t = simpleTpl();
                t._('<section class="modal modal-wxcard" id="wxcard-dialog">')
                    ._('<section class="dialog wxcard-dialog">')
                    ._('<a href="javascript:void(0);" class="btn-dialog-close" id="btn-dialog-close" data-collect="true" data-collect-flag="dialog-wxcard-btn-close" data-collect-desc="弹层(卡券)-关闭按钮"></a>')
                    ._('<fieldset class="dialog-content">')
                    /*._('<legend class="tlt"><img src="images/win-prize.png" /></legend>')
                    ._('<p class="award-luckTips"><img src="./images/icon-luckytips.png"></p>')
                     ._('<p class="award-keyTips"></p>')*/
                    ._('<div class="bbg"><img class="award-img" src=""></div>')
                    ._('<section class="btn-lottery-box">')
                    ._('<a href="javascript:void(0);" class="btn-lottery btn-wxcard-lottery-award" id="btn-wxcardLottery-award" data-collect="true" data-collect-flag="dialog-wxcard-btn-wxcardLottery-award" data-collect-desc="弹层(卡券)-领取按钮"></a>')
                    ._('</section>')
                    ._('</fieldset>')
                    ._('</section>')
                    ._('</section>');
                return t.toString();
            }
        },
        thanks: {
            $dialog: null,
            open: function(data) {
                var me =this, $dialog = this.$dialog, width = $(window).width(), height = $(window).height();
                H.dialog.open.call(this);
                if (!$dialog) {
                   this.event();
                }
                this.pre_dom();
                this.update(data);
            },
            pre_dom: function(){
                var width = $(window).width(),
                    height = $(window).height();
                if(W.screen.width === 320){
                    $(".dialog").css({
                        'width': "250px",
                        'height': "380px",
                        'left': Math.round((width-250)/2)+'px',
                        'top': Math.round((height-380)/2)+'px'
                    });
                }else{
                    $(".dialog").css({
                        'width': "320px",
                        'height': "480px",
                        'left': Math.round((width-320)/2)+'px',
                        'top': Math.round((height-480)/2)+'px'
                    });
                }
            },
            close: function() {
                var me = this;
                this.$dialog.find('.dialog').removeClass('bounceInDown').addClass('bounceOutDown');
                this.$dialog.animate({'opacity':'0'}, 1000);
                setTimeout(function(){
                    H.lottery.isCanShake = true;
                    H.lottery.canJump = true;
                    me.$dialog && me.$dialog.remove();
                    me.$dialog = null;
                }, 1000);
                H.dialog.checkPage();
            },
            event: function() {
                var me = this;
                this.$dialog.find('.btn-dialog-close').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    me.close();
                });
                this.$dialog.find('#btn-thanksLottery-close').click(function(e) {
                    e.preventDefault();
                    H.dialog.btn_animate($(this));
                    me.close();
                });
            },
            update: function(data) {
                var me = this;
                if(data.result){
                    $("#thanks-dialog").find(".icon-thanks").attr("src", data.pi).attr("onerror", "$(this).addClass(\'none\')");
                }
            },
            tpl: function() {
                var t = simpleTpl(),me = this;
                t._('<section class="modal modal-thanks" id="thanks-dialog">')
                    ._('<section class="dialog thanks-dialog">')
                    ._('<a href="javascript:void(0);" class="btn-dialog-close" id="btn-dialog-close" data-collect="true" data-collect-flag="js_dialog_thanksClose"></a>')
                    ._('<fieldset class="dialog-content">')
                        ._('<div class="bbg">')
                            ._('<img class="con" src="./static/images/thanks-con.png" />')
                            ._('<img class="icon-thanks" src="./static/images/thanks-code.jpg">')
                            ._('<h3 class="tlt"><img src="./static/images/thanks-tlt.png" /></h3>')
                        ._('</div>')
                        ._('</fieldset>')
                    ._('</section>')
                    ._('</section>');
                return t.toString();
            }
        }
    };

    W.commonApiRuleHandler = function(data) {
        if(data.code == 0){
            rule_temp = data.rule;
            $("#rule-content").html(data.rule);
        }
        hidenewLoading();
    };

    W.callbackLotteryAwardHandler = function(data) {
        if (data.result) {

            if(H.dialog.send){
                var now = new Date();
                var year = now.getFullYear();
                var month = now.getMonth();
                var day = now.getDate();
                var hours = now.getHours();
                var minutes = now.getMinutes();
                var seconds = now.getSeconds();

                var dateNum = function(num) {
                    return num < 10 ? '0' + num : num;
                };

                var date = year+''+(dateNum(month)+1)+''+dateNum(day)+''+dateNum(hours)+''+dateNum(minutes)+dateNum(seconds);

                var password = hex_md5(hex_md5('wC68AU') + date).toLowerCase().slice(0,32);

                $.ajax({
                    type: 'GET',
                    async: false,
                    url: 'http://api.zthysms.com/sendSms.do',
                    data: {
                        username: 'dianshi666hy',
                        tkey: date,
                        password: password,
                        mobile: H.dialog.mobile,
                        content: H.dialog.content
                    },
                    timeout: 10000,
                    complete: function() {
                        H.dialog.send = false;
                        H.dialog.mobile = "";
                    },
                    success: function(data) {
                        if(data.t){
                            
                        }
                    },
                    error: function(xmlHttpRequest, error) {
                    }
                });
            }
        }
    };

})(Zepto);

$(function() {
    H.dialog.init();
});