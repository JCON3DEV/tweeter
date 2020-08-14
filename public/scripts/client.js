/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// $( () => {})
$(document).ready(() => {

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


// let formattedTime;
const generatePostedTime = function(timeStamp){
  let usableDate = new Date(timeStamp);
  let hours = usableDate.getHours();
  let minutes = "0" + usableDate.getMinutes();
  let formattedTime = 'Posted; ' + hours + ':' + minutes.substr(-2);
  return formattedTime;
};

const createTweetElement = function (someObj) {
  
  const { avatarUrl, text, userName, handle, formattedTime } = someObj;
  const $tweet = $(`
  <article>
  <div class="top">
  <div>
    <img src="${escape(avatarUrl)}"" alt="a cartoon face">
    <span>${escape(userName)}</span>
  </div>
  <span class="handle hidden">${escape(handle)}</span>
  
  </div>
  <p>${escape(text)}</p>
  
  <div class="bottom">
  <span class="timestamp">${escape(formattedTime)}</span>
  <span class="fas fa-camera"></span>
  </div>
  </article>
  `);
  return $tweet; 
  };
  
  const renderTweets = function (arrOfTweetObjs) {
    for (const single of arrOfTweetObjs) {
      console.log("the valuse of single", single);
      
      let newTweet = createTweetElement({
        avatarUrl: single.user.avatars,
        text: single.content.text,
        userName: single.user.name,
        handle: single.user.handle,
        formattedTime: generatePostedTime(single.created_at),      
      });
      //This is updating the page
      newTweet.mouseover(function () {
        newTweet.addClass("shaded");
        newTweet.find(".handle").removeClass("hidden");
      });
      newTweet.mouseleave(function () {
        newTweet.removeClass("shaded");
        newTweet.find(".handle").addClass("hidden");
      })
      // edited from composer
      $("#tweet-container").prepend(newTweet);
    }
  };
  
  const loadTweets = function() {
    $.get("/tweets/", function (data) {
      // console.log(data);
      // data is all the objects - tweets
      renderTweets(data);
      console.log("############## PAGE LOADED ###");
    });
    
  };

  // moved loadTweets(); from here
  
  $("form").on("submit", function (event) {
    event.preventDefault();
    let keyStrokesRemaining = 140 -$("#tweet-text").val().length;
    // console.log(keyStrokesRemaining);
    let canSend = true;
    // let keyStrokesRemaining = $("textarea").val().length;
    if (keyStrokesRemaining === 140) {
      // alert("Enter in some characters");
      // uncomment above before submission.
      // hide the following element creation prior to submission
      $(".dynamic-container").slideDown('slow').prepend("<div class=\"errorMsg\" width=\"100\" height=\"123\">Please enter in some characters<style></div>");
      $(".errorMsg").click(function () {
        $(".errorMsg").remove(".errorMsg");
      });
      canSend = false;
      return
    } else if (keyStrokesRemaining < 0){
      // alert("140 character limit. Delete some characters");
      // hide the following element creation prior to submission and uncomment above
      $(".dynamic-container").slideDown('slow').prepend("<div class=\"errorMsg\" width=\"100\" height=\"123\">Please use less than 140 characters<style></div>");
      $(".errorMsg").click(function () {
        $(".errorMsg").remove(".errorMsg");
      });
      canSend = false;
      return
    }
    if (canSend) {
      // console.log($(this).serialize());
      const package = $(this).serialize();
      $.post("/tweets/", package)
      .then(function(){
        $.getJSON(`/tweets/`)
          .then(data => {
            //below takes the most recent tweet from the tweet obbjects sent to the server
            // adds it to an empty array and then passes that to the renderTweets function to display it
            const latestTweet = data[data.length - 1];
            const arrayOfLatestTweet = [];
            arrayOfLatestTweet.push(latestTweet);
            console.log("#############winning#########");
            renderTweets(arrayOfLatestTweet);
          })
      })
    }
  });
    // TO DO;
    // Post the tweet to the server X
    // confirm server has the data - X
    // Need to collect the (text / timestamp) from the sertver X
    // conole.log the text of the tweet and the timestamp to the console X
    // Display the text of the tweet X
    
    // Display the timestamp X
    // Display the username placeholder X
    // Display the handle X
              
  loadTweets();
  
});