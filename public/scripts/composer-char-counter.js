$(document).ready(function () {
  let keystrokes;
  // function that uses jQuery to attch an event listener  and add a class to enable CSS styling
  const keypresscounter = function(e){
    keystrokes = 140 - e.target.value.length;
    $("output.counter").val(140 - e.target.value.length);
    
    if (keystrokes < 0) {
      $("output.counter").addClass("overLimit");
    }
    if(keystrokes >= 0) {
      $("output.counter").removeClass("overLimit");
    }
  };
  $("textarea").keyup(keypresscounter);
  
});
