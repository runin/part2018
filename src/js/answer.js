import '../css/core.css';
import '../css/dialog.css';
import '../css/answer.scss';
import ansDot from '../images/dotAns.png';

var tid = null;//期数uuid
(function($){
	H.answer = {
		$answerCountdown: $("#answer-countdown"),
		nowTime: null,
		dec: 0,//服务器时间与本地时间的差值
		repeat_load: true,//用来判断是否重复调用轮次接口， 默认为true, 重复调用一次后改为false;避免死循环；
		type: 2,//倒计时类型，1 距摇奖开始倒数计时 2，距摇奖结束倒计时  3， 摇奖结束
		pal: [],// 抽奖活动list
		repeatCheck: true,
		quid: [],//题目uuid
		checkedParams: [],//用户选择答案uuid
		qriu: [],//正确答案uuid
		init: function(){
			this.current_time();
		},
		backPage: function(type){
			if($("body").attr('data-type') === "answer"){

				if(getData('answerLotteryed_'+tid) || type){
					toUrl('vote.html');
				}

			}

			if($("body").attr('data-type') === "vote"){

				if(getData('answerLotteryed_'+tid)){
					$("#Top").addClass('none');
					$("#qq").addClass('none');
				}
			}

		},
		showLotteryCountDown: function(){
			var me = H.answer;
			if(getData('answered_'+tid)){
				me.lottery();
			}
		},
		allrecord: function(tid){
			getResult("api/question/allrecord",{
				yoi: openid,
				tid: tid
			},'callbackQuestionAllRecordHandler',true);
		
		},
		check: function(type){
			var me = H.answer;
			if(getData('notStarted_'+tid)){
				showTips(notStartedTips);
				return false;
			}

			if(getData('answered_'+tid)){
				showTips(answeredTips);
				return false;
			}

			if(type === 'submit'){
				me.checkedParams = [];
				var $active = $('span.active');
				$.each($active, function(i, item){
					var auid = $active.eq(i).attr('data-auid');
					me.checkedParams.push(auid);
				})
				
				if(me.checkedParams.length === 0){
					showTips('请先答题！');
					return false;
				}else if(me.checkedParams.length < 3){
					showTips('答题未完成！');
					return false;
				}else if(me.checkedParams.length === 3){

					if(me.checkedParams.join(";") === me.qriu.join(";")){
						var jonS = [];
						$.each(me.quid, function(i, item){
							$.each(me.qriu, function(j, jtem){
								if(i === j){
									var tmp = {};
									tmp.suid = me.quid[i];
									tmp.auid = me.qriu[i];
									jonS.push(tmp);
								}
							});
						});

						$.each(jonS, function(i, item){
							getResult("api/question/answer",{
								yoi: openid,
								suid: item.suid,
								auid: item.auid
							},'callbackQuestionAnswerHandler',true);
						});

					}else{
						showTips(errorTips);
						return false;
					}
					
				}
			}

			return true;
		},
		event: function(){
			var me = H.answer;
			$("ul").delegate('span', 'touchend', function(e) {
				e.preventDefault();

				if(me.check()){

					var quid = $(this).parents('li').attr('data-quid');
					$('li[data-quid="'+ quid+'"]').find('span').removeClass('active');
					$(this).addClass('active');
				}
			});
			$("#submit").bind('touchend', function(e) {
				e.preventDefault();

				me.check('submit');
			});
		},
		//查询题目信息
		current_time: function(){
			var me = H.answer;
			shownewLoading();
			$.ajax({
				type : 'GET',
				async : false,
				url : domain_url + 'api/question/round' + dev,
				data: {},
				dataType : "jsonp",
				jsonpCallback : 'callbackQuestionRoundHandler',
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
						me.nowTime = timeTransform(parseInt(data.cud));
						var nowTime = new Date().getTime();
						var serverTime = parseInt(data.cud);
						me.dec = nowTime - serverTime;
						tid = data.tid;
						if($("body").attr('data-type') === "answer"){
							me.event();
							me.spellQuestion(data);
							me.showLotteryCountDown();	
						}
						me.currentPrizeAct(data);
						me.backPage();
					}else{
						if(me.repeat_load){
							me.repeat_load = false;
							setTimeout(function(){
								me.current_time();
							},500);
						}else{
							me.change();
						}
					}
				},
				error : function(xmlHttpRequest, error) {}
			});
		},
		currentPrizeAct:function(data){
			//获取抽奖活动
			var prizeLength = 0,
				nowTimeStr = H.answer.nowTime,
				prizeActList = data.qitems[0],
				me = H.answer;
			me.pal = prizeActList;
				//如果最后一轮结束
            if(comptime(prizeActList.qet,nowTimeStr) >= 0){
            	me.type = 3;
                me.change();
                return;
            }
            //如果第一轮未开始
            if(comptime(prizeActList.qst,nowTimeStr) < 0){
                me.beforeShowCountdown(prizeActList, 0);
                return;
            }
            var beginTimeStr = prizeActList.qst;
            var endTimeStr = prizeActList.qet;
            hidenewLoading();
            //在活动时间段内且可以抽奖
            if(comptime(nowTimeStr,beginTimeStr) <0 && comptime(nowTimeStr,endTimeStr) >=0){
                me.nowCountdown(prizeActList);
                return;
            }
		},
		// 摇奖开启倒计时
		beforeShowCountdown: function(pra) {
			var me = H.answer,
				beginTimeStr = pra.qst;
			me.repeatCheck = true;
			me.type = 1;
			if($("body").attr('data-type') === "answer"){
				saveData('notStarted_'+tid, true);
			}
			me.countdown_domShow(beginTimeStr,"距离答题开始", pra);
		},
		// 摇奖结束倒计时
		nowCountdown: function(pra){
			var me = H.answer,
				endTimeStr = pra.qet;
			me.type = 2;
			delData('notStarted_'+tid);
			me.countdown_domShow(endTimeStr,"距答题结束还有", pra);
			
			if($("body").attr('data-type') === "vote" && !getData('answered_'+tid)){
				if(getData('count')) return;
				$("#qq").removeClass('none');
				saveData('count', 1);
			}
		},
		countdown_domShow: function(time, word, pra){
			var me = H.answer,
				timeLong = timestamp(time);
			timeLong += me.dec;
			me.count_down();
			me.$answerCountdown.find('.detail-countdown').attr('etime',timeLong);
			me.$answerCountdown.find(".countdown-tip").html(word);
			me.$answerCountdown.find('.items-count').removeClass('none');
			me.$answerCountdown.find('.loading').addClass('none');

			me.repeatCheck = true;
		},
		// 倒计时
		count_down : function() {
			var me = H.answer;
			me.$answerCountdown.find('.detail-countdown').each(function() {
				$(this).countDown({
					etpl : '%H%' + '<label class="dian">:</label>' + '%M%' + '<label class="dian">:</label>' + '%S%'+'<label class="dian"></label>', // 还有...结束
					stpl : '%H%' + '<label class="dian">:</label>' + '%M%' + '<label class="dian">:</label>' + '%S%'+'<label class="dian"></label>', // 还有...开始
					sdtpl : '',
					otpl : '',
					otCallback : function() {
						// canJump 用来判断倒计时结束后是否可以自动跳转 默认 为 true;
						// 当前有中奖弹层弹出时 canJump = false; 不能跳转
						// 同时增加重复判断，进入判断后 canJump = false; 不能重复进入
						// repeatCheck 用来进行重复判断默认为true，第一次进入之后变为false
						var me = H.answer,
							$loading = me.$answerCountdown.find('.loading'),
							$items_count = me.$answerCountdown.find('.items-count');
						
						if(me.repeatCheck){
							me.repeatCheck = false;
							$items_count.addClass('none');
							$loading.removeClass('none');
							if(me.type == 1){
								//距摇奖开始倒计时结束后显示距离本轮摇奖结束倒计时
								me.nowCountdown(me.pal);
							}else if(me.type == 2){
								//距摇奖结束倒计时结束后显示距离下轮摇奖开始倒计时
								me.change();
								me.type = 3;
								return;
							}
						}
					},
					sdCallback :function(){
						me.repeatCheck = true;
					}
				});
			});
		},
		change: function(){
			var me = H.answer;
			me.$answerCountdown.find(".countdown-tip").html('答题结束').css('font-size', '24px');
			me.$answerCountdown.find('.items-count').removeClass('none');
			me.$answerCountdown.find('.loading').addClass('none');

			if(!getData('answered_'+tid)){

				if($('body').attr('data-type') === "answer"){
					showTips(missTips);
				}
				
				setTimeout(function(){
					me.backPage(true);
				}, 1500);
			}
			
			
		},
		spellQuestion: function(qitems){
			var me = H.answer, t = simpleTpl();
			me.allrecord(qitems.tid);
			var qitems = qitems.qitems;
          $.each(qitems, function(i,qitems){
          	me.quid.push(qitems.quid);
          	me.qriu.push(qitems.qriu);
			t._('<li data-quid="'+ qitems.quid +'"><h3 data-quid="'+ qitems.quid +'">'+ qitems.qt +'</h3><div class="horizontal">');
			$.each(qitems.aitems, function(i,aitem){
				t._('<span data-auid="'+ aitem.auid +'" data-collect="true" data-collect-flag="js_answer_select" data-collect-desc="题目选项" >'+ aitem.at +'</span>');
			});
			t._('</div></li>');
          });
          $('#question ul').html(t.toString());
		},
		lottery: function(){
			saveData('answered_'+tid, true);
			$.ajax({
				type : 'GET',
				async : false,
				url : domain_url + 'api/lottery/round' + dev,
				data: {at: 2},
				dataType : "jsonp",
				jsonpCallback : 'callbackLotteryRoundHandler',
				timeout: 11000,
				complete: function() {
					hidenewLoading();
				},
				success : function(data) {
					if(data.result == true){
						H.answeredLottery.nowTime = timeTransform(data.sctm);
                        var nowTimeStemp = new Date().getTime();
                        H.answeredLottery.dec = nowTimeStemp - data.sctm;
                        H.answeredLottery.currentPrizeAct(data);
					}
				},
				error : function(xmlHttpRequest, error) {}
			});
		}
	};

	W.callbackQuestionAnswerHandler = function (data){
		var me = H.answer;
		if (data.code == 0) {
			if(data.rs == 1){//答错题
				onsole.log("亲，答错了，知识库要更新咯~", 2000);
			}else if(data.rs == 2){//答对题
				console.log("太机智啦，一下子就答对了~", 2000);
				
				me.lottery();
			}
		}
	};
	W.callbackQuestionAllRecordHandler = function (data){
		var me = H.answer;
		if (data.code == 0 && data.items > 0) {
			console.log('已经答过题了');
			me.lottery();
		}
	};
})(Zepto);

$(function(){
	H.answer.init();
	H.answeredLottery.init();
});

H.answeredLottery = {
	$lotteryDialog: $("#lottery-dialog"),
	$lotteryCountdown: $("#lottery-countdown"),
	nowTime: null,
	times: 0,
	dec: 0,//服务器时间与本地时间的差值
	lotteryTime: getRandomArbitrary(1,3),
	ansTimer: null,
	flag: true,
	init: function(){
		this.dom();
	},
	dom: function(){
		var me = H.answeredLottery;
		var height = $(window).height(), width = $(window).width();
			$('#gay').css({
				'top': (height-642)/2-30
			});
			me.$lotteryCountdown.css({
				'top': (height-642)/2+280
			})
	},
	currentPrizeAct:function(data){
			//获取抽奖活动
			var prizeLength = 0,
				nowTimeStr = H.answer.nowTime,
				prizeActList = data.la[0],
				me = H.answeredLottery;
			me.pal = prizeActList;
				//如果最后一轮结束
            if(comptime(prizeActList.pd + " "+ prizeActList.et,nowTimeStr) >= 0){
                console.log('签到抽奖活动结束');
                return;
            }
            //如果第一轮未开始
            if(comptime(prizeActList.pd + " "+ prizeActList.st,nowTimeStr) < 0){
                me.beforeShowCountdown(prizeActList, 0);
                return;
            }
            var beginTimeStr = prizeActList.pd + " "+ prizeActList.st;
            var endTimeStr = prizeActList.pd + " "+ prizeActList.et;
            hidenewLoading();
            //在活动时间段内且可以抽奖
            if(comptime(nowTimeStr,beginTimeStr) <0 && comptime(nowTimeStr,endTimeStr) >=0){
                me.nowCountdown(prizeActList);
                return;
            }
		},
		// 摇奖开启倒计时
		beforeShowCountdown: function(pra, index) {
			var me = H.answeredLottery,
				beginTimeStr = pra.pd + " "+ pra.st;
			me.repeatCheck = true;
			
			me.countdown_domShow(beginTimeStr,"恭喜您答对了, 等待开奖吧！", pra, index);
		},
		// 摇奖结束倒计时
		nowCountdown: function(pra, index){
			var me = H.answeredLottery,
				endTimeStr = pra.pd + " "+ pra.et;
				if(getData('answered_'+tid)){
					me.drawlottery();
				}else{
					me.backPage(true);
				}
			// me.countdown_domShow(endTimeStr,"距答题结束还有", pra, index);
		},
		countdown_domShow: function(time, word, pra, index){
			var me = H.answeredLottery,
				timeLong = timestamp(time)+8000;
			
				// timeLong = timestamp('2017-12-21 13:40:20');
			timeLong += me.dec;
			if(getData('answered_'+tid)){
				me.countTime(timeLong)
				me.$lotteryCountdown.find(".countdown-tip").html(word);
				me.$lotteryCountdown.find('.items-count').removeClass('none');
				me.$lotteryCountdown.find('.loading').addClass('none');
				me.$lotteryCountdown.removeClass("none");
				me.$lotteryDialog.removeClass('none');
            }
			
			me.repeatCheck = true;
		},
		countTime: function (data) {  
			var me = H.answeredLottery;
			var runingTime = function(){
	            //获取当前时间  
	            var date = new Date();  
	            var now = date.getTime();  
	            //设置截止时间  
	            var end = data;  
	            //时间差  
	            var leftTime = end-now;  
	            //定义变量 d,h,m,s保存倒计时的时间  
	            var d,h,m,s;  
	            if (leftTime>=0) {  
	                d = Math.floor(leftTime/1000/60/60/24);  
	                h = Math.floor(leftTime/1000/60/60%24);  
	                m = Math.floor(leftTime/1000/60%60);  
	                s = Math.floor(leftTime/1000%60);                     
	            }  
	            var dateNum = function(num) {
			        return num < 10 ? '0' + num : num;
			    };
	            //将倒计时赋值到div中  
	            var _d = "<i>"+dateNum(d)+"</i>";  
	            var _h = "<i>"+dateNum(h)+"</i>";  
	            var _m = "<i>"+dateNum(m)+"</i>";  
	            var _s = "<i>"+dateNum(s)+"</i>";  

	            var end = d+h+m+s;

	            if(end === 0){
	            	me.$lotteryDialog.addClass('none');
	            	clearTimeout(me.ansTimer);
	            	if(me.flag){
	            		me.flag = false;
	            		me.drawlottery();
	            	}
	            	
	            }
	            //递归每秒调用countTime方法，显示动态时间效果  
	            
	            $("#detail-countdown").html('<label>'+ _h+ '</label>' + '<span><img src="'+ ansDot +'"></span>' + '<label>'+ _m+ '</label>' + '<span><img src="'+ ansDot +'"></span>' + '<label>'+ _s +'</label>');
			}
			setInterval(function() {
		        runingTime();
		    }, 100);
  
        },
		drawlottery: function() {
            recordUserOperate("js_answer_doAnswerLottery");
            var me = this, sn = new Date().getTime()+'';
            me.lotteryTime = getRandomArbitrary(1,3);
            me.times = 0;
            shownewLoading(null, '抽奖中，请稍后...');
            $.ajax({
                type: 'GET',
                async: false,
                url: domain_url + 'api/lottery/exec/luck4Sign' + dev,
                data: {
                    matk: matk ,
                    sn: sn
                },
                dataType: "jsonp",
                jsonpCallback: 'callbackLotteryLuck4SignHandler',
                timeout: 10000,
                complete: function() {
                	saveData('answerLotteryed_'+tid, true);
                },
                success: function(data) {
                	console.log('luck4SignData', JSON.stringify(data));
                    if(data.flow && data.flow == 1){
                        me.lotteryTime = getRandomArbitrary(3, 6);
                        me.times = 0;
                        sn = new Date().getTime()+'';
                        me.fill(null);
                        return;
                    }
                    if(data.result){
                        if(data.sn == sn){
                            sn = new Date().getTime()+'';
                            me.fill(data);
                        }
                    }else{
                        sn = new Date().getTime()+'';
                        me.fill(null);
                    }
                },
                error: function() {
                    sn = new Date().getTime()+'';
                    me.fill(null);
                }
            });
        },
        fill: function(data) {
            var me = this;
            $(".home-box").removeClass("yao");
            if(data == null || data.result == false){
                setTimeout(function(){
                    showTips(thanks_answer);
                    setTimeout(function(){ 
                    	toUrl('vote.html') 
                    },1500);
                }, 1500);
                return;
            }else{
                $("#audio-b").get(0).play();    //中奖声音
            }
            me.showDialog(data);
        },
        showDialog: function(data){
            var meDialog = H.dialog;
            switch (data.pt){
            	case 0://谢谢参与
            		meDialog.thanks.open(data);
            		break;
                case 1://实物奖品
                    meDialog.shiwuLottery.open(data);
                    break;
                case 4://现金红包
                    meDialog.redbagLottery.open(data);
                    break;
                /*case 2://积分奖品
                    meDialog.jfLottery.open(data);
                    break;
               
                case 5://兑换码
                    meDialog.duiHuanMaLottery.open(data);
                    break;*/
                case 7://卡劵奖品
                    meDialog.wxcardLottery.open(data);
                    break;
                case 9://外链奖品
                    meDialog.linkLottery.open(data);
                    break;
                /*case 18://剧集卡牌
                    meDialog.dramaCardLottery.open(data);
                    break;*/
            }
        }
}