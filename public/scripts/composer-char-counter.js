$(document).ready(function () {
  // --- our code goes here ---
  // Using jQuery and an appropriate selector, register an event handler to the textarea element for the form inside of the.new - tweet section.
  $("textarea").click(function(){
    console.log("you clicked on the text box!", this);
  });
  // $("textarea").blur(function () {
  //   console.log("This is what blur does");
  // });
  // $("textarea").keydown(function () {
  //   console.log("This is what keydown does!", this.length);
  // });
  // $("textarea").keyup(function () {
  //   console.log("This is what keyup does");
  // });
  let keystrokes;
  $("textarea").keypress(function (e) {
    // console.log(e.target.value.length); 
    keystrokes = 140 - e.target.value.length;
    $("output.counter").val(140 - e.target.value.length);
    // console.log(keystrokes);
    if (keystrokes < 0) {
      // console.log("style the numbers red")
      // $("output.counter").css('color', 'red');
      $("output.counter").addClass("overLimit");
    }
    
  });
  // Need to update this, curently not working
  // https://web.compass.lighthouselabs.ca/activities/323
  $("body").mouseover(function () {
    $("username").addClass("hidden");
  });

  $("article").mouseover(function () {
    $("article").addClass("shaded");
    $("username").removeClass("hidden");
  });
  $("article").mouseleave(function () {
    $("article").removeClass("shaded");
    $("username").addClass("hidden");
  })
  // add shadow in css file box-shadow: 2px 2px 1px black;
});
