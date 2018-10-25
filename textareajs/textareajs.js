$("body").on('keyup','#contentText',function(){
  $( "#exitMenuCheckbox" ).prop('checked', true);
})

$("body").on('change','#bold',function(){
  if($('#bold').prop('checked')){
    $("#contentText").css("font-weight","bold");
  }else{
    $("#contentText").css("font-weight","normal");
  }
});

$("body").on('change','#italic',function(){
    if($('#italic').prop('checked')){
    $("#contentText").css("font-style","italic");
  }else{
    $("#contentText").css("font-style","normal");
  }
});

$("body").on('change','#underline',function(){
    if($('#underline').prop('checked')){
    $("#contentText").css("text-decoration","underline");
  }else{
    $("#contentText").css("text-decoration","none");
  }
});

$("body").on('click','#left',function(){
  $("#contentText").css("text-align","left");
});

$("body").on('click','#center',function(){
  $("#contentText").css("text-align","center");
});

$("body").on('click','#right',function(){
  $("#contentText").css("text-align","right");
});

$("body").on('click','#justify',function(){
  $("#contentText").css("text-align","justify");
});

$(document).on('scroll', function() {
   $( "#exitMenuCheckbox" ).prop('checked', true);
});

$("body").on('mouseup','#publish',function(){
  $("#articleHeaderName").text($("h1").text());
});

$("body").on('mouseup','#save',function(){
  $("#articleHeaderName").text($("h1").text()+" (Draft)");
});

$("body").on('mouseup','#delete',function(){
  $("#articleHeaderName").text("Create New Article");
  $("h1").text("Simple blog editor - A great way of learning");
  $("#contentText").text("Clered");
});