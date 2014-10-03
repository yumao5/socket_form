$(function(){
  $("#geocomplete").geocomplete({
    map: "",
    details: "form.geo",
    types: ["geocode", "establishment"],
  });

  $("#find").click(function(){
    $("#geocomplete").trigger("geocode");
  });
});
