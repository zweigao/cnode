$(function(){
		var count=1;  //控制 全部 上下页的参数
		var othercount=1;  //控制 其他 上下页的参数
		var tab='';   //控制传入getCon函数参数的类型
		var mainCon=$('#main2').html();
		$('#main2').remove();
		var newrow0=$('#container1 .row').eq(0).html();
		var newrow2=$('#container1 .row').eq(2).html();
		var wholeurl;
		var wholename;
		var wholescore;
		var loginJudge='false';
		var personmsg2=$('#personmsg2').html();
		var myName;
		var topic_id;

		$('.img-responsive').click(function(){
             location.reload()
		});
		$('.breadcrumb li a').click(function(){
			 location.reload()
		});

		$('#homepage .next').click(function(){
			if(count==115){
				alert('这是最后一页！')
			}else{
				count+=1;
		    	$("#userCon").empty();
		    	getCon(count,tab);
			}             	     
		});

		$('#homepage .previous').click(function(){
			if(count==1){
				alert('这是第一页！')
			}else{
				count-=1;
				$("#userCon").empty();
				getCon(count,tab);  
			}             	 
		});


		getCon(count,tab);
		function getCon(count,tab){                   
		    $.ajax({
		    	type:'get',
		    	url:'https://cnodejs.org/api/v1/topics',
		    	data:{
		    		page:count,
		    		tab:tab,
		    		limit:'40'
		    	},
		    	success:function(response){
		    		for(var i=0;i<response.data.length;i++){
		    			var Head=document.createElement('div');
		    			var Click=document.createElement('div');
		    			var Title=document.createElement('div');
		    			var headpic=document.createElement('div');
		    			var type=document.createElement('div');
		    			var midcontent=document.createElement('div');
		    			var clicknum=document.createElement('div');
		    			var top=document.createElement('div');
		    			var share=document.createElement('div');
		    			var ask=document.createElement('div');
		    			var best=document.createElement('div');
		    			var img=document.createElement('img');

		                Head.className="col-md-1 col-sm-1 col-xs-2 a Head";
		                Click.className="col-md-2 col-sm-2 hidden-xs a Click";
		                Title.className="col-md-9 col-sm-9 col-xs-10 a Title";
		    			headpic.className='headpic';
		    			type.className='type';
		    			midcontent.className='midcontent';
		    			clicknum.className='clicknum';
		    			top.className='top';
		    			share.className='share';
		    			ask.className='ask';
		    			best.className='best';

		                $('#userCon').last().append(Head);
		                $('#userCon').last().append(Click);
		                $('#userCon').last().append(Title);
		    			$('#userCon .Head').last().append(headpic);
		    			$('#userCon .Click').last().append(type);
		    			$('#userCon .Title').last().append(midcontent);
		    			$('#userCon .Click').last().append(clicknum);
		    			$('.headpic').last().append(img);
		    			$('.type').last().append(top);
		    			$('.type').last().append(share);
		    			$('.type').last().append(ask);
		    			$('.type').last().append(best);
		    			$('.top').html('置顶');
		    			$('.share').html('分享');
		    			$('.ask').html('问答');
		    			$('.best').html('精华');
		                $('.headpic img').last().attr('src',response.data[i].author.avatar_url);
		                $('.clicknum').last().html('<span class="reply_count">'+response.data[i].reply_count+'</span>'+' / '+response.data[i].visit_count);
		                $('.midcontent').last().html('<a>'+response.data[i].title+'</a>');

		                if(response.data[i].top==true){
		                   $('.type .top').last().attr('style','display:block;');
		    		    }else 
		    		    if(response.data[i].tab=="share" && response.data[i].top != true && response.data[i].good!=true){
		                   $('.type .share').last().attr('style','display:block;');
		    		    }else 
		    		    if(response.data[i].tab=="ask" && response.data[i].top != true && response.data[i].good!=true){
		                   $('.type .ask').last().attr('style','display:block;');
		    		    }; 
		    		    if(response.data[i].good==true && response.data[i].top != true){
		                   $('.type .best').last().attr('style','display:block;');
		    		    };       
		    		}

		    		$('.Title .midcontent').click(function(){
		    			var ConNum=$(this).parent().index();
		    			if(ConNum!=2){
		    				ConNum=(ConNum-2)/3;
		    			}else {
		    				ConNum=0;
		    			};
		    			location.href='CNodeCon.html?'+response.data[ConNum].id;
		    		})  
			    }   	
		})
		}  //函数结尾

		function getCom(passageid){
		    $.ajax({
		    	type:"get",
		    	url:"https://cnodejs.org/api/v1/topic/"+passageid,
		    	success:function(response){

		            var commentNum=document.createElement('div');

		            commentNum.className="col-md-9 col-sm-12 col-xs-12 commentNum";

		            $('#container1 .row').eq(1).append(commentNum);

		            $('.commentNum').html(response.data.replies.length+'个回复');

		            for(var k=0;k<response.data.replies.length;k++){

		                var comments=document.createElement('div');
		                var comment1=document.createElement('div');
		                var comment2=document.createElement('div');
		                var commentimg=document.createElement('img');

		                comments.className='col-md-9 col-sm-12 col-xs-12 comments';
		                comment1.className='col-md-1 comment1';
		                comment2.className='col-md-11 comment2';
		                commentimg.className='commentimg';

		                $('#container1 .row').eq(1).last().append(comments);
		                $('.comments').last().append(comment1);
		                $('.comments').last().append(comment2);
		                $('.comment1').last().append(commentimg);
		                $('.commentimg').last().attr('src',response.data.replies[k].author.avatar_url);
		                $('.comment2').last().html('<span class="replytime">'+response.data.replies[k].author.loginname+'</span>'+' 发表于 '+'<span class="replytime">'+response.data.replies[k].create_at+'</span>'+'<br><br>'+response.data.replies[k].content);
		            }
		    	}
		    }) 
		}

        $('body').on('click','.typelist li',function(){
        	var othercount=1;
			$('.pages').empty();
			$("#userCon").empty();
		    
		    var otherpage=document.createElement('ul');
		    var previous=document.createElement('li');
		    var next=document.createElement('li');

		    otherpage.id='otherpage';
		    otherpage.className='pager';
		    previous.className='previous';
		    next.className='next';

		    $('.pages').append(otherpage);
		    $('#otherpage').append(previous);
		    $('#otherpage').append(next);

		    $('#otherpage .previous').html('<a href="#">&laquo;上一页</a>');
		    $('#otherpage .next').html('<a href="#">下一页&raquo;</a>');

		    

			if($(this).index()==1){
				nav2change(1);
				getCon(othercount,'good');
				changeotherpage('good');
			}else if($(this).index()==2){
				nav2change(2);
		        getCon(othercount,'share');
		        changeotherpage('share');
			}else if($(this).index()==3){
				nav2change(3);
		        getCon(othercount,'ask');
		        changeotherpage('ask');
			}else if($(this).index()==4){
				nav2change(4);
		        getCon(othercount,'job');
		        changeotherpage('job');
			}else if($(this).index()==0){
				nav2change(0);
				var tab='';
				recreatepage();
				$("#userCon").empty();
				getCon(count,tab);
			}else if($(this).index()==5){
                nav2change(5);
		        changeotherpage('dev');
		        alert('此版块未开放！');
			} 
        });

		function changeotherpage(type){
		    	$('#otherpage .next').click(function(){
		            $("#userCon").empty();
		            othercount+=1;
		            $('#otherpage .next').attr('class','next');
		            getCon(othercount,type);
		    	});
		    	$('#otherpage .previous').click(function(){
		    		    $("#userCon").empty();
		            	$('#otherpage .previous').attr('class','previous');
		                othercount-=1;
		            	getCon(othercount,type);
		        });
		        }            

		function recreatepage(){
		    $('.pages').empty();

			var homepage=document.createElement('ul');
		    var previous=document.createElement('li');
		    var next=document.createElement('li');

		    homepage.id='homepage';
		    homepage.className='pager';
		    previous.className='previous';
		    next.className='next';

		    $('.pages').append(homepage);
		    $('#homepage').append(previous);
		    $('#homepage').append(next);

		    $('#homepage .previous').html('<a href="#">&laquo;上一页</a>');
		    $('#homepage .next').html('<a href="#">下一页&raquo;</a>');

		    $('#homepage .next').click(function(){
		    	if(count==115){
		    		alert('这是最后一页！')
		    	}else{
		    		count+=1;
		        	$("#userCon").empty();
		        	getCon(count,tab);
		    	}             	
		    });

		    $('#homepage .previous').click(function(){
		    	if(count==1){
		    		alert('这是第一页！')
		    	}else{
		    		count-=1;
		    		$("#userCon").empty();
		    		getCon(count,tab);  
		    	}             	
		    });

		    }                   

		function nav2change(index){
			for(var j=0;j<6;j++){
				$('.typelist li').eq(j).attr('class','?');
			}
			$('.typelist li').eq(index).attr('class','active');                                 
		}

		function navchange(index){ 
			for(var l=0;l<4;l++){
				$('#navbar-collapse ul li').eq(l).attr('class','?');
			}
			$('#navbar-collapse ul li').eq(index).attr('class','active');                                              
		}

        $('body').on('click','#navbar-collapse ul li',function(){
        	if($(this).index()==0){
				location.href='CNode.html';
			}else if($(this).index()==1){
				navchange(1);
				alert("未开放");
			}else if($(this).index()==2){
				navchange(2);
				alert("未开放");
			}else if($(this).index()==3){
		        navchange(3);
			}
			// else if($(this).index()==4){
			// 	navchange(4);
			// }else if($(this).index()==5){    
			// 	navchange(5);
			// }
        });

		$('#login').click(function(){

            if($('#container1 .passage').html()==undefined){
            	$('#container1 .row').eq(1).empty();
				$('#container1 .row').eq(0).css('display','none');
				$('#container1 .row').eq(2).css('display','none');
            }else{
                $('#container1 .passage').remove();
				$('#container1 .passage1').remove();
				$('#container1 .passage2').remove();
				$('#container1 .comments').remove();
				$('#container1 .commentNum').remove();
				for(var c=0;c<3;c++){
					var newrow=document.createElement('div');
                    newrow.className='row';
                    $('#container1').append(newrow);
				};
				$('#container1 .row').eq(0).html(newrow0);
				$('#container1 .row').eq(2).html(newrow2);
				$('#container1 .row').eq(0).css('display','none');
				$('#container1 .row').eq(2).css('display','none');
            }

		    var loginleft1=document.createElement('div');
		    var loginright1=document.createElement('div');
		    var loginleft2=document.createElement('div');
		    var loginright2=document.createElement('div');

		    loginleft1.className='col-md-9 col-sm-12 col-xs-12 col-lg-9 loginleft1';
		    loginright1.className='col-md-3 hidden-sm hidden-xs col-lg-3 loginright1';
		    loginleft2.className='col-md-9 col-sm-12 col-xs-12 col-lg-9 loginleft2 log';
		    loginright2.className='col-md-3 hidden-sm hidden-xs col-lg-3 loginright2 log';

		    $('#container1 .row').eq(1).append(loginleft1);
		    $('#container1 .row').eq(1).append(loginright1)
		    $('#container1 .row').eq(1).append(loginleft2);
		    $('#container1 .row').eq(1).append(loginright2);

		    $('#container1 .loginleft1').html('<ol class="breadcrumb">'+'<li><a href="#">首页</a></li>'+'<li class="active">登录</li>'+'</ol>');
		    $('#container1 .loginright1').html('关于');
		    $('#container1 .loginleft2').html('<form>'+'<div id="form-group">'+'<label>Access Token：</label>'+'<input class="form-control" id="accesstoken" type="password" placeholder="请输入您的Access Token">'+'</div>'+'</form>'+'<br>'+'<button class="btn btn-primary btn-block submit" type="button">登录</button>');
		    $('#container1 .loginright2').html('<br>CNode：Node.js专业中文社区<br><br>'+'在这里你可以：<br><br>'+'<ul><li>向别人提出你遇到的问题</li><br><li>帮助遇到问题的人</li><br><li>分享自己的知识</li><br><li>和其它人一起进步</li></ul>');

		    $('.submit').click(function(){
		    	var useraccesstoken=$('#accesstoken').val();
		    	$.ajax({
		    		type:'POST',
		    		url:"https://cnodejs.org/api/v1/accesstoken",
		    		data:{
		                accesstoken:useraccesstoken
		    		},
		    		datatype:"json",
		    		success:function(response){
		    			myName=response.loginname;
		                $.session.set('access', useraccesstoken);
		        		
		        		createPerson1();
		        		loginJudge='true';

		                $.ajax({
		                	type:'get',
		                	url:'https://cnodejs.org/api/v1/user/'+response.loginname,
		                	success:function(response){
                                var avatar_url=response.data.avatar_url;
                                var loginname=response.data.loginname;
                                var score=response.data.score;
                                wholeurl=avatar_url;
                                wholename=loginname;
                                wholescore=score;

		                		createPerson2(avatar_url,loginname,score);
                                $('body').on('click','.createtopic',function(){
                                	$('#userCon').empty();
				                	$('#container1 .row').eq(0).css('display','none');
				                	$('#container1 .row').eq(2).css('display','none');
                                    


				                	var newtopicHead=document.createElement('div');
				                	var newtopic=document.createElement('div');
				                	var row=document.createElement('div');
				                	var main=document.createElement('div');
				                	var PublicDelate=document.createElement('div');
				                	row.className='row';
				                	main.className='main';
				                	main.id='main';
				                	PublicDelate.className='col-md-12 col-sm-12 col-xs-12 PublicDelate';
				                	newtopicHead.className='col-md-12 col-sm-12 col-xs-12 newtopicHead';
				                	newtopic.className='col-md-12 col-sm-12 col-xs-12 newtopic';
				                	$('#userCon').append(row);
                                    $('#userCon .row').append(newtopicHead);
                                    $('#userCon .row').append(newtopic);
                                    $('#userCon .row').append(PublicDelate);
                                    $('#userCon .row .newtopicHead').html('<ol class="breadcrumb" style="margin:0px -16px 0 -16px">'+'<li><a href="#">主页</a></li>'+'<li class="active">发布</li>'+'</ol>');
                                    $('#userCon .row .newtopic').append(main);
                                    $('#main').html(mainCon);
                                    $('.PublicDelate').html('<ul class="pager">'+'<li class="previous" id="reset"><a href="#">重置</a></li>'+'<li class="next" id="public"><a href="#">发布</a></li>'+'</ul>')
                                    $('#personmsg2').attr('style','border-top:10px solid #e7e7e7');
                                    $('body').on('click','#reset',function(){
                                    	$('.content #contenttitle').html('Enter title here');
                                    	$('#contentText').html('Enter text here');
                                    });
                                    $('body').on('click','#public',function(){
                                    	$.ajax({
                                    		type:'post',
                                    		url:'https://cnodejs.org/api/v1/topics',
                                    		data:{
                                                accesstoken:useraccesstoken,
                                                title:$('.content h1').html().split('<')[0],
                                                content:$('#contentText').html(),
                                                tab:$('#type').val()
                                    		},
                                    		success:function(response){
                                                alert('文章发送成功');
                                                topic_id=response.topic_id;
                                                var ownCon=document.createElement('div');
                                                ownCon.className='col-md-12 col-sm-12 col-xs-12 ownCon';
                                                $('.newtopic').before(ownCon);
                                                $('#public a').html('编辑');
                                                $('#public').attr('id','public2');
                                                $.ajax({
                                                	type:'get',
                                                	url:'https://cnodejs.org/api/v1/topic/'+topic_id,
                                                	success:function(response){
                                                		var ownContitle=document.createElement('div');
                                                		var ownCons=document.createElement('div');
                                                		ownContitle.className='col-md-12 col-sm-12 col-xs-12 ownContitle';
                                                		ownCons.className='col-md-12 col-sm-12 col-xs-12 ownCons';
                                                		$('.ownCon').append(ownContitle);
                                                		$('.ownCon').append(ownCons);
                                                		$('.ownContitle').html(response.data.title);
                                                		$('.ownCons').html(response.data.content);
                                                	}
                                                });
                                                $('#public2').click(function(){
                                                	$.ajax({
                                                	type:'post',
                                                	url:'https://cnodejs.org/api/v1/topics/update',
                                                	data:{
                                                		accesstoken:useraccesstoken,
                                                		title:$('.content h1').html().split('<')[0],
		                                                content:$('#contentText').html(),
		                                                tab:$('#type').val(),
		                                                topic_id:topic_id
                                                	},
                                                	success:function(response){
                                                		location.reload();
                                                	}
                                                });
                                                })
                                    		},
                                    		error:function(){
                                    			alert('文章发送失败！');
                                    		}
                                    	})
                                    });
                                })
		                	    
		                	    $('body').on('click','.outbtn',function(){
		                	    	$.session.remove('access');
		                	    	window.location.reload();
		                	    })

		                        $('#setting').click(function(){
		                        	$('#container1 .row').eq(1).empty();
				                	$('#container1 .row').eq(0).css('display','none');
				                	$('#container1 .row').eq(2).css('display','none');

				                	$('#container1 .row').eq(1).append(loginleft1);
				                    $('#container1 .row').eq(1).append(loginright1);
				                    $('#container1 .row').eq(1).append(loginleft2);
				                    $('#container1 .row').eq(1).append(loginright2);
				                    loginleft2.className='col-md-9 col-sm-12 col-xs-12 col-lg-9 loginleft2change';


		                            $('#container1 .loginleft1').html('<ol class="breadcrumb">'+'<li><a href="#">首页</a></li>'+'<li class="active">设置</li>'+'</ol>');
				                    $('#container1 .loginright1').html('关于');
				                    $('#container1 .loginleft2change').html('<div id="settingHead"><img src='+response.data.avatar_url+'></div>'+'<div id="settingCon">'+'登录名：'+response.data.loginname+'<br><br>'+'GitHubName：'+response.data.githubUsername+'<br><br>'+'积分：'+response.data.score+'<br><br>'+'创建时间：'+response.data.create_at+'</div>');
				                    $('#container1 .loginright2').html('<br>CNode：Node.js专业中文社区<br><br>'+'在这里你可以：<br><br>'+'<ul><li>向别人提出你遇到的问题</li><br><li>帮助遇到问题的人</li><br><li>分享自己的知识</li><br><li>和其它人一起进步</li></ul>');

		                            var recent_topics=document.createElement('div');
		                            var recent_repiles=document.createElement('div');
		                            var intopics=document.createElement('div');
		                            var inrepiles=document.createElement('div');
		                            
		                            recent_topics.className='col-md-12 col-sm-12 col-xs-12 recent_topics';
		                            recent_repiles.className='col-md-12 col-sm-12 col-xs-12 recent_replies';
		                            intopics.className='col-md-12 col-sm-12 col-xs-12 intopics';
		                            inrepiles.className='col-md-12 col-sm-12 col-xs-12 inrepiles';

		                            $('#container1 .loginleft2change').append(recent_topics);
		                            $('#container1 .loginleft2change').append(recent_repiles);
		                            $('#container1 .loginleft2change .recent_topics').append(intopics);
		                            $('#container1 .loginleft2change .recent_replies').append(inrepiles);

		                            $('.intopics').html('最近话题数：'+response.data.recent_topics.length);
		                            $('.inrepiles').html('最近回复数：'+response.data.recent_replies.length);

		                            for(var a=0;a<response.data.recent_topics.length;a++){
		                                var topicsa=document.createElement('div');
		                                topicsa.className='col-md-12 col-sm-12 col-xs-12 topicsa';
		                                $('.intopics').append(topicsa);
		                                $('.topicsa').last().html(a+1+'. '+response.data.recent_topics[a].title);
                                    }
                                    for(var b=0;b<response.data.recent_replies.length;b++){
		                                var repilesa=document.createElement('div');
		                                repilesa.className='col-md-12 col-sm-12 col-xs-12 repilesa';
		                                $('.inrepiles').append(repilesa);
		                                $('.repilesa').last().html(b+1+'. '+'<img src='+response.data.recent_replies[b].author.avatar_url+' style="width:20px;heigth:20px;border-radius:10%">'+'&nbsp;&nbsp;'+response.data.recent_replies[b].title);		                                
		                            }
		                        })
		                	}
		                })

		        		var tab='';
		        		recreatepage();
		        		getCon(count,tab);
		    		},
		    		error:function(){
		    			alert('数据请求失败，请检查您的AccessToken是否有误！');
		    		}
		    	})
		    })
		});

        $('body').on('click','#message',function(){
             
            $('#container1 .row').eq(1).empty();
        	$('#container1 .row').eq(0).css('display','none');
        	$('#container1 .row').eq(2).css('display','none');
        	$('.container').eq(2).css('display','none');

        	var mesleft1=document.createElement('div');
        	var mesright1=document.createElement('div');
        	var mesleft2=document.createElement('div');
        	var mesright2=document.createElement('div');
        	var inmesleft1=document.createElement('div');
        	var inmesright1=document.createElement('div');
        	var inmesleft3=document.createElement('div');
        	var mesleft3=document.createElement('div');
        	var mesleft4=document.createElement('div');

        	mesleft1.className='col-lg-7 col-md-7 col-sm-7 col-xs-7 mesleft1 loginright1';
        	mesright1.className='col-lg-5 col-md-5 col-sm-5 col-xs-5 mesright1 loginright1';
        	mesleft2.className='col-lg-7 col-md-7 col-sm-7 col-xs-7 mesleft2';
        	mesright2.className='col-lg-5 col-md-5 col-sm-5 col-xs-5 mesright2';
        	inmesleft1.className='col-lg-12 col-md-12 col-sm-12 col-xs-12 inmesleft1';
        	inmesright1.className='col-lg-12 col-md-12 col-sm-12 col-xs-12 inmesright1';
        	mesleft3.className='col-lg-7 col-md-7 col-sm-7 col-xs-7 mesleft3 loginright1';
        	mesleft4.className='col-lg-7 col-md-7 col-sm-7 col-xs-7 mesleft4';
        	inmesleft3.className='col-lg-12 col-md-12 col-sm-12 col-xs-12 inmesleft3';



        	$('#container1 .row').eq(1).append(mesleft1);
        	$('#container1 .row').eq(1).append(mesright1);
        	$('#container1 .row').eq(1).append(mesleft2);
        	$('#container1 .row').eq(1).append(mesright2);
        	$('#container1 .row').eq(1).append(mesleft3);
        	$('#container1 .row').eq(1).append(mesleft4);
        	$('#container1 .row .mesleft1').append(inmesleft1);
        	$('#container1 .row .mesright1').append(inmesright1);
        	$('#container1 .row .mesleft3').append(inmesleft3);
        	$('.inmesleft3').html('过往消息');
        	$('.inmesleft1').html('未读消息');
        	$('.inmesright1').html('收藏主题');
    
        	$.ajax({
	        	type:'get',
	        	url:'https://cnodejs.org/api/v1/topic_collect/'+myName,
	        	success:function(response){
	        		for(var e=0;e<response.data.length;e++){
                        var gets=document.createElement('div');
                        gets.className='col-lg-12 col-md-12 col-sm-12 col-xs-12 gets';
                        $('.mesright2').append(gets);
                        $('.gets').last().html("<img src="+response.data[e].author.avatar_url+" style='width:50px;height:50px' >&nbsp;&nbsp;&nbsp;"+response.data[e].title)
	        		};

	        	}
	        });


	        $.ajax({
	        	type:'get',
	        	url:'https://cnodejs.org/api/v1/messages',
	        	data:{
	        		accesstoken:$.session.get('access')
	        	},
	        	success:function(response){
	        		for(var f=0;f<response.data.has_read_messages.length-1;f++){
                        var hasread=document.createElement('div');
                        hasread.className='col-lg-12 col-md-12 col-sm-12 col-xs-12 hasread';
                        $('.mesleft4').append(hasread);
                        $('.hasread').last().html('来自文章 : '+response.data.has_read_messages[f].topic.title+'<br>'+"<img src="+response.data.has_read_messages[f].author.avatar_url+" style='width:25px;height:25px;border-radius:10%;' > : "+response.data.has_read_messages[f].author.loginname+response.data.has_read_messages[f].reply.content);
	        		};
	        		for(var g=0;g<response.data.hasnot_read_messages.length-1;g++){
                        var hasnotread=document.createElement('div');
                        hasnotread.className='col-lg-12 col-md-12 col-sm-12 col-xs-12 hasnotread';
                        $('.mesleft2').append(hasread);
                        $('.hasnotread').last().html("<img src="+response.data.hasnot_read_messages[g].author.avatar_url+" style='width:50px;height:50px' >"+response.data.hasnot_read_messages[g].reply.content);
	        		};
	        	}
	        });
	        $.ajax({
            	type:'post',
            	url:'https://cnodejs.org/api/v1/message/mark_all',
            	data:{
            		accesstoken:$.session.get('access')
            	}
            });
        });

		function createPerson1(){
            var personHead=document.createElement('img');
			var inperson=document.createElement('div');
			var inpersonimg=document.createElement('div');
			var inpersonbtn=document.createElement('div');
			inperson.className='inperson';
			inpersonimg.className='inpersonimg';
			inpersonbtn.className='inpersonbtn';
            $('#container1 .row').eq(0).css('display','block');
            $('#container1 .row').eq(2).css('display','block');
            $('#container1 .row').eq(1).empty();
            $('#container1 .row').eq(1).html('<div class="col-md-9" id="userCon" style="border-right: 10px solid #e7e7e7;border-top: 10px solid #e7e7e7">'+'</div>'+'<div id="personmsg2" class="col-md-3 hidden-sm hidden-xs"></div>');
    		$('#personmsg2').append(inpersonimg);
    		$('#personmsg2 .inpersonimg').append(personHead);
    		$('#personmsg2').append(inperson);
    		$('#personmsg2').append(inpersonbtn);
		} 
        function createPerson2(url,name,score){
            navchange(0);
    		nav2change(0);

            $('#login a').empty();
            $('#login a').html('<span class="glyphicon glyphicon-log-in"></span> 设置');
            $('#login').attr('id','setting');
            $('#register a').empty();
            $('#register a').html('<span class="glyphicon glyphicon-envelope"></span> 消息');
            $('#register').attr('id','message');

    		$('#personmsg2 .inpersonimg img').attr('src',url);
    		$('#personmsg2 .inperson').html(name+'<br>'+'积分:'+score+'<br>'+'这家伙真懒，什么都没留下...');
    	    $('#personmsg2 .inpersonbtn').html('<button class="btn btn-success btn-block createtopic" type="button">发布话题</button>'+'<button class="btn btn-primary btn-block btn-xs outbtn" type="button">退出</button>')
        }
        function logonavclick(){
            if($('#userCon').html()!=undefined){
			    	nav2change(0);
					var tab='';
					$('#container1 .row').eq(0).css('display','block');
					$('#container1 .row').eq(3).css('display','block');
					recreatepage();
					$("#userCon").empty();
					getCon(count,tab);
			    }else{
					var tab='';
					recreatepage();
					createPerson1();
					if(loginJudge=='false'){
						navchange(0);
						$('#personmsg2').html(personmsg2);
					}else{
                        createPerson2(wholeurl,wholename,wholescore);
					}
					getCon(count,tab);
			    }
        }
        function logonavclicks(){
        	if(loginJudge=='true'){
        		return;
        	}else{
        		$('#message a').empty();
	            $('#message a').html('<span class="glyphicon glyphicon-registration-mark"></span>注册');
	            $('#message').attr('id','register');
	            $('#setting a').empty();
	            $('#setting a').html('<span class="glyphicon glyphicon-log-in"></span> 登录');
	            $('#setting').attr('id','login');
        	}
        }
        if($.session.get('access')==undefined){
        	return;
        }else{            
            $("#login").trigger("click");
            $('#accesstoken').val($.session.get('access'));
            $(".submit").trigger("click");
        }




	    	 })        
