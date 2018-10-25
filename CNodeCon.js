$(function(){
	    var urlArray=window.location.href.split('?');
		var ContentId=urlArray[1];
		var myName;
		var newrow0=$('#container1 .row').eq(0).html();
		var newrow2=$('#container1 .row').eq(2).html();
		var wholeurl;
		var wholename;
		var wholescore;
		var loginJudge='false';
		var personmsg2=$('#personmsg2').html();

		$('.img-responsive').click(function(){
            location.href='CNode.html';
		});
		$('.breadcrumb li a').click(function(){
			location.href='CNode.html';
		});
		function getCon(id){
            $.ajax({
            	type:'get',
            	url:'https://cnodejs.org/api/v1/topic/'+id,
            	success:function(response){
            		    
            			$('#container1 .row').eq(0).css('display','none');
		    			$('#container1 .row').eq(1).empty();
		    			$('#container1 .row').eq(2).css('display','none');

                        var type=document.createElement('div');
                        var top=document.createElement('div');
		    			var share=document.createElement('div');
		    			var ask=document.createElement('div');
		    			var best=document.createElement('div');
                        type.className='type';
                        top.className='top';
		    			share.className='share';
		    			ask.className='ask';
		    			best.className='best';

		    			var passage=document.createElement('div');
		    			var passagea=document.createElement('div');
		    			var passageb=document.createElement('div');
		    			var passagec=document.createElement('div');
		    			var passage1=document.createElement('div');
		    			var passage2=document.createElement('div');
		    			var userdiv1=document.createElement('div');
		    			var userdiv2=document.createElement('div');
		    			var userimg=document.createElement('img');
		    			var img=document.createElement('img');
		    			passage1.className="col-md-9 col-sm-12 col-xs-12 c passage1";
		    			passage2.className="col-md-3 hidden-sm hidden-xs a  passage2";
		    			passage.className="col-md-12 col-sm-12 col-xs-12 c passage";
		    			passagea.className="passagea col-md-1 col-sm-1 col-xs-1 c";
		    			passageb.className="passageb  col-md-11 col-sm-11 col-xs-11 c";
		    			passagec.className="passagec col-md-12 col-sm-12 col-xs-12 c";
		    			userdiv1.className="userdiv1";
		    			userdiv2.className="userdiv2";

		                $('#container1 .row').eq(1).append(passage);
		    			$('#container1 .row').eq(1).append(passage1);
		    			$('#container1 .row').eq(1).append(passage2);


		                $('#container1 .row .passage').append(passagea);
		                $('#container1 .row .passage').append(passageb);
		                $('#container1 .row .passage').append(passagec);

		                $('#container1 .row .passage .passagea').append(type);
		                $('.type').last().append(top);
		    			$('.type').last().append(share);
		    			$('.type').last().append(ask);
		    			$('.type').last().append(best);
		    			$('.top').html('置顶');
		    			$('.share').html('分享');
		    			$('.ask').html('问答');
		    			$('.best').html('精华');
		                $('.type .ask').attr('style','display:none');
		                $('.type .share').attr('style','display:none');
		                $('.type .best').attr('style','display:none');
		                if(response.data.top==true){
		                   $('.type .top').attr('style','display:block;');
		    		    }else 
		    		    if(response.data.tab=="share" && response.data.top != true){
		                   $('.type .share').attr('style','display:block;');
		    		    }else 
		    		    if(response.data.tab=="ask"){
		                   $('.type .ask').attr('style','display:block;');
		    		    }else 
		    		    if(response.data.tab=="best"){
		                   $('.type .best').attr('style','display:block;');
		    		    };

		    		    $('#container1 .passage .passageb').html('<a>'+response.data.title+'&nbsp;&nbsp;&nbsp;<button class="btn  btn-info btn-sm noget">收 藏</button></a>');

		                if(response.data.tab=="share"){
		                	var tabs='分享';
		                }else if(response.data.tab=="ask"){
		                	tabs='问答';
		                }else if(response.data.tab=="best"){
		                	tabs='精华';
		                }
		    		    $('#container1 .row .passage .passagec').html('作者 '+response.data.author.loginname+'&nbsp;&nbsp;'+response.data.visit_count+'次浏览'+'&nbsp;&nbsp;'+'来自'+tabs) 
		    			$('#container1 .row .passage1').html(response.data.content);

		    			$('#container1 .row .passage2').append(userdiv1);
		    			$('#container1 .row .passage2').append(userdiv2);

		    			$('#container1 .row .passage2 .userdiv1').append(img);

		                $('#container1 .row .passage2 .userdiv1 img').attr('src',response.data.author.avatar_url);
		                $('#container1 .row .passage2 .userdiv2').html('作者: '+response.data.author.loginname+'<br>积分:10<br><br>"这家伙很懒，什么都没留下"');
                        
                        $('.noget').click(function(){
                        	$.ajax({
                        		type:'post',
                        		url:'https://cnodejs.org/api/v1/topic_collect/collect',
                        		data:{
                                    accesstoken:$.session.get('access'),
                                    topic_id:ContentId
                        		},
                        		success:function(response){
                        			$('.noget').attr('class','btn  btn-success btn-sm get');
                                    $('.get').html('已收藏');
                        		},
                        		error:function(){
                                    alert('请先登录！');
                                    $('#login').trigger('click');
                        		}
                        	})
                        });
                        $('body').on('click','.get',function(){
                        	$.ajax({
                        		type:'post',
                        		url:'https://cnodejs.org/api/v1/topic_collect/de_collect',
                        		data:{
                                    accesstoken:$.session.get('access'),
                                    topic_id:ContentId
                        		},
                        		success:function(response){
                        			$('.get').attr('class','btn  btn-info btn-sm noget');
                                    $('.noget').html('收藏');
                        		},
                        		error:function(){
                                    alert('!');
                        		}
                        	})
                        });


                        


                        passageid=response.data.id;
		                getCom(passageid);
            	}
            })
		}

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
		                $('.comment2').last().html('<span class="replytime">'+response.data.replies[k].author.loginname+'</span>'+' 发表于 '+'<span class="replytime">'+response.data.replies[k].create_at+'&nbsp;&nbsp;'+k+'楼'+'</span>'+'&nbsp;&nbsp'+'<a class="replybuild">回复此楼</a>'+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+'<span class="glyphicon glyphicon-thumbs-up praise">'+'&nbsp;'+response.data.replies[k].ups.length+'</span>'+response.data.replies[k].content);
		            }

		    
                    if($('.commentNum').eq(1).html()!=undefined){
	                	$('.commentNum').eq(1).nextAll().remove();
	                	$('.commentNum').eq(1).remove();
	                }

                     $('.replybuild').click(function(){
		            	var idnum=$('.replybuild').index(this);	  
		            	$('#contentText').html('@'+response.data.replies[idnum].author.loginname+' ');
			        	$('html,body').animate({scrollTop:$('#contentText').offset().top},1000);
			        
			            $('#comment').click(function(){
			        		var contents=$('#contentText').html().split('<');
				        	$.ajax({
				        		type:'post',
				        		url:'https://cnodejs.org/api/v1/topic/'+passageid+'/replies',
				        		data:{
				        			accesstoken:$.session.get('access'),
				        			content:contents[0],
				        			reply_id:id
				        		},
				        		success:function(response){
				        			alert('评论成功!');
				        			window.location.reload();
				        		},
				        		error:function(){
				        			alert('请先登录！')
				        		}
				        	})         //回复此楼功能
			            });

			            });
		            $('.praise').click(function(){
                    	// var praisenum=$('.praise').length-$('.praise').index(this);
                    	var praisenum=$('.praise').index(this);
                    	var up=response.data.replies[praisenum].ups.length+1;
                    	var down=response.data.replies[praisenum].ups.length;
                    	$.ajax({
                    		type:'post',
                    		url:'https://cnodejs.org/api/v1/reply/'+response.data.replies[praisenum].id+'/ups',
                    		data:{
                    			accesstoken:$.session.get('access')
                    		},
                    		success:function(response){
                    			if(response.action=="up"){
                                    $('.praise').eq(praisenum).html('&nbsp;'+up);
                    			}else if(response.action=="down"){
                                    $('.praise').eq(praisenum).html('&nbsp;'+down);
                    			};
                    			
                    		},
                    		error:function(){
                    			alert('请先登录！');
                    		}
                    	})
                    });

			    	}
			    }) 
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
			}else if($(this).index()==2){
				navchange(2);
			}else if($(this).index()==3){
		        navchange(3);
			}
        });


		$('#login').click(function(){

			$('.container').eq(2).css('display','none');

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
		    			$('.container').eq(2).css('display','block');
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

		                	    
		                	    $('body').on('click','.outbtn',function(){
		                	    	$.session.remove('access');
		                	    	window.location.reload();
		                	    })

		                        $('#setting').click(function(){
		                        	$('#container1 .row').eq(1).empty();
				                	$('#container1 .row').eq(0).css('display','none');
				                	$('#container1 .row').eq(2).css('display','none');
				                	$('.container').eq(2).css('display','none');

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
		        		getCon(ContentId);
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
        	$('.inmesright1').html('收藏的主题');
    
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
        })

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


        if($.session.get('access')==undefined){


        	getCon(ContentId);
        }else{            
            $("#login").trigger("click");
            $('#accesstoken').val($.session.get('access'));
            $(".submit").trigger("click");
        }
        
        $('#reset').click(function(){
            $('#contentText').html('');
        });
        $('#comment').click(function(){
        	PassageConTent();
        });


        function PassageConTent(){
            var contents=$('#contentText').html().split('<');
        	$.ajax({
        		type:'post',
        		url:'https://cnodejs.org/api/v1/topic/'+passageid+'/replies',
        		data:{
        			accesstoken:$.session.get('access'),
        			content:contents[0],
        		},
        		success:function(response){
        			alert('评论成功');
        			window.location.reload();
        		},
        		error:function(){
        			alert('请先登录！');
        			$("#login").trigger("click");
        		}
        	})
        }

        })    
