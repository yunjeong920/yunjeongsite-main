function scrollHandler() {

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
