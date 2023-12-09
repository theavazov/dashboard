$(window).on("scroll", () => {
  if ($(window).scrollTop() > 0) {
    $(".header").addClass("fixed");
    $(".logo.header-logo").removeClass("white");
    $(".logo.header-logo").addClass("blue");
  } else {
    $(".header").removeClass("fixed");
    $(".logo.header-logo").removeClass("blue");
    $(".logo.header-logo").addClass("white");
  }
});
