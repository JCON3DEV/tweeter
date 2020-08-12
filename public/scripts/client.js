/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $( () => {})
$(document).ready(() => {
  
  // const arrOfTweetObjs = [];
  const $tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const $tweet = $(`
  <article>
  <div class="top">
  <img src="${$tweetData.user.avatars}"" alt="a cartoon face">
  <span>${$tweetData.user.name}</span>
  <span class="username"></span>
  
  </div>
  <p>${$tweetData.content.text}</p>
  
    <div class="bottom">
      <span class="timestamp">3 days ago</span>
      <span class="fas fa-camera"></span>
    </div>
  </article>
  `);

  const createTweetElement = function (someObj) {
    // arrOfTweetObjs.push(someObj);
    // return $tweet;
    return $tweet; 
  };
  
  const renderTweets = function (tweet) {
    
    //   for (const single in arrOfTweetObjs) {
  //     console.log("single", single);
  //     let newTweet = createTweetElement($tweetData);
      $("#tweet-container").prepend(tweet);
  //   }
  };

  let newTweet = createTweetElement($tweetData);
  renderTweets(newTweet);

});