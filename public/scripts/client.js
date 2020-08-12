/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// $( () => {})
$(document).ready(() => {
  
  const $tweetData = [
    {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
  

const createTweetElement = function (someObj) {
  const $tweet = $(`
  <article>
  <div class="top">
  <img src="${someObj.user.avatars}"" alt="a cartoon face">
  <span>${someObj.user.name}</span>
  <span class="username"></span>
  
  </div>
  <p>${someObj.content.text}</p>
  
  <div class="bottom">
  <span class="timestamp">3 days ago</span>
  <span class="fas fa-camera"></span>
  </div>
  </article>
  `);
  return $tweet; 
  };
  
  const renderTweets = function (arrOfTweetObjs) {
    for (const single of arrOfTweetObjs) {
      let newTweet = createTweetElement(single);
      $("#tweet-container").prepend(newTweet);
    }
  };
  
  renderTweets($tweetData);

});