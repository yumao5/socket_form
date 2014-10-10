$(function(){
  $("#geocomplete").geocomplete({
    map: "",
    details: "form.geo",
    types: ["geocode", "establishment"],
  });

  $("#geocomplete").keyup(function(){
    //$("#geocomplete").trigger("geocode");
  });

  // $("#find").click(function(){
  //   $("#geocomplete").trigger("geocode");
  // });
});
