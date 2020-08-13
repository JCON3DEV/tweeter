/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// $( () => {})
$(document).ready(() => {


let formattedTime;
const generatePostedTime = function(timeStamp){
  let usableDate = new Date(timeStamp * 1000);
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
  <img src="${avatarUrl}"" alt="a cartoon face">
  <span>${userName}</span>
  <span class="username">${handle}</span>
  
  </div>
  <p>${text}</p>
  
  <div class="bottom">
  <span class="timestamp">${formattedTime}</span>
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
      alert("Enter in some characters");
      canSend = false;
      return
    } else if (keyStrokesRemaining < 0){
      canSend = false;
      alert("140 character limit. Delete some characters");
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