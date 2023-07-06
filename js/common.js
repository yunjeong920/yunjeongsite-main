function scrollHandler() {
  // if ($(window).scrollTop() >= $(".portfolio").position().top) {
  //   $(".menu-right button").css("color","#222222");
  //   $(".navbar img").attr("src","./img/yunlogo2.png");
  // }else {
  //   $(".menu-right button").css("color","white");
  //   $(".navbar img").attr("src","./img/yunlogo.png");
  // }

  $("section").each(function() {
    if($(window).scrollTop() >= $(this).position().top){
      $(this).find(".page").animate({top: "0", opacity: "1"}, 800)
    }
  });

  if($(window).scrollTop() >= $(".about").position().top){
    $(".skill").each(function() {
      var skill = $(this);
      var percentage = skill.find(".percentage").text();
      skill.find(".inner-bar").animate({width: percentage}, 1200);
    });
  }
}

$(window).on("scroll", scrollHandler);
scrollHandler();
//섹션 스크롤
$(".menu-right button").on("click", function() {
  var id = $(this).attr("id");
  if (id == "profile-btn") {
    $("html, body").animate({scrollTop: $(".profile").position().top}, 700)
  }else if(id == "port-btn") {
    $("html, body").animate({scrollTop: $(".portfolio").position().top}, 700)
  }else if (id == "about-btn") {
    $("html, body").animate({scrollTop: $(".about").position().top}, 700)
  }
});
