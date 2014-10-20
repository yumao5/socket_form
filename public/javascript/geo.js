$(function(){
  $("#geocomplete").geocomplete({
    map: "",
    details: "form.geo",
    types: ["geocode", "establishment"],
  });

    $("input[name*='formatted_address").change(function(){

            $("input[name*='or_formatted_address']").val($("input[name*='formatted_address']").val());            
            $("input[name*='or_postal_code']").val($("input[name*='postal_code']").val());            
            $("input[name*='or_locality']").val($("input[name*='locality']").val());            
            $("input[name*='or_administrative_area_level_1']").val($("input[name*='administrative_area_level_1']").val());  
            console.log('Input change value');
    });   

  $("#geocompletes").geocomplete({
    map: "",
    details: "form.geo",
    types: ["geocode", "establishment"],
  });

  // $("#find").click(function(){
  //   $("#geocomplete").trigger("geocode");
  // });
});
