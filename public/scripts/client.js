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


// below formats the timestamp from the server into usable hour and minute time; eg 14:24
const generatePostedTime = function(timeStamp){
  let usableDate = new Date(timeStamp);
  let hours = usableDate.getHours();
  let minutes = "0" + usableDate.getMinutes();
  let formattedTime = 'Posted; ' + hours + ':' + minutes.substr(-2);
  return formattedTime;
};

// creates HTML element to dynamically render onto the page
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

// below takes the array of tweet objects and seperates it into its usable key value pairs for rederning the most recent tweet onto the page
const renderTweets = function (arrOfTweetObjs) {
  for (const single of arrOfTweetObjs) {
    
    let newTweet = createTweetElement({
      avatarUrl: single.user.avatars,
      text: single.content.text,
      userName: single.user.name,
      handle: single.user.handle,
      formattedTime: generatePostedTime(single.created_at),      
    });
    //this styling has been added here because the elements are dynamically rendered, they are not yet created hen the styling is applied on layout.css
    newTweet.mouseover(function () {
      newTweet.addClass("shaded");
      newTweet.find(".handle").removeClass("hidden");
    });
    newTweet.mouseleave(function () {
      newTweet.removeClass("shaded");
      newTweet.find(".handle").addClass("hidden");
    })
    // adds the newly created element onto the top of the HTML container that houses the tweet feed
    $("#tweet-container").prepend(newTweet);
  }
};
  
// function that catches the information sent to the server and calls the other functions to dynamically render them 
  const loadTweets = function() {
    $.get("/tweets/", function (data) {
      renderTweets(data);
    });
    
  };

  // takes the input from the form element on the HTML page and validates it according to criteria for posting
  $("form").on("submit", function (event) {
    event.preventDefault();
    let keyStrokesRemaining = 140 -$("#tweet-text").val().length;
    let canSend = true;
    // error conditions & msg's prevent user sending tweets.  
    if (canSend) {
      $(".errorMsg").remove(".errorMsg");
    }
    if (keyStrokesRemaining === 140) {
      $(".dynamic-container").slideDown('slow').prepend("<div class=\"errorMsg\" width=\"100\" height=\"123\">Please enter in some characters<style></div>");
      $(".errorMsg").click(function () {
        $(".errorMsg").remove(".errorMsg");
      });
      canSend = false;
      return
    } else if (keyStrokesRemaining < 0){
      $(".dynamic-container").slideDown('slow').prepend("<div class=\"errorMsg\" width=\"100\" height=\"123\">Please use less than 140 characters<style></div>");
      $(".errorMsg").click(function () {
        $(".errorMsg").remove(".errorMsg");
      });
      canSend = false;
      return
    }
    // below packages the information into a sendable format
    if (canSend) {
      const package = $(this).serialize();
      $.post("/tweets/", package)
      .then(function(){
        $.getJSON(`/tweets/`)
          .then(data => {
            //below takes the most recent tweet from the tweet objects sent to the server
            // adds it to an empty array and then passes that to the renderTweets function to display it
            const latestTweet = data[data.length - 1];
            const arrayOfLatestTweet = [];
            arrayOfLatestTweet.push(latestTweet);
            renderTweets(arrayOfLatestTweet);
          })
      })
    }
  });
              
  loadTweets();
  
});