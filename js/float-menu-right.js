// JavaScript Document

$(document).ready(function() {	
  $("#r-company").mouseover(function(){
    $(".r-company-box").fadeIn("fast");
  });
  $("#r-company").mouseout(function(){
    $(".r-company-box").fadeOut("fast");
  });
  
  $("#r-tel").mouseover(function(){
    $(".r-tel-box").fadeIn("fast");
  });
  $("#r-tel").mouseout(function(){
    $(".r-tel-box").fadeOut("fast");
  });
  
  $("#r-qq").mouseover(function(){
    $(".r-qq-box").fadeIn("fast");
  });
  $("#r-qq").mouseout(function(){
    $(".r-qq-box").fadeOut("fast");
  });
  
  
  
  $("#r-top").click(function(){
    $("html, body").animate({
		"scroll-top":0
	},"fast");
  });
  
						   
});