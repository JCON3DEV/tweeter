/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $( () => {})
$(document).ready(() => {
  const $tweet = $(`<article class="tweet">HelloWorld<article/>`);
  // const $tweet = $(`
  // <article>
  //   <div class="top">
  //     <img src="https://i.imgur.com/2WZtOD6.png"" alt="a cartoon male face">
  //                 <span>${user.name}</span>
  //     <span class="username">username</span>

  //   </div>
  //   <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione fugit voluptates omnis unde maiores aliquam recusandae eveniet dolorum!</p>
  //   <div class="bottom">
  //     <span class="timestamp">3 days ago</span>
  //     <span class="fas fa-camera"></span>
  //   </div>
  // </article>
  // `);

  const arrOfTweetObjs = [];
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

  const createTweetElement = function (someObj) {
    // arrOfTweetObjs.push(someObj);
    // return $tweet;
    return `<article>
        <div class="top"><span class="username">${someObj.user.name}</span></div>
      </article>`;
  };
  
  const renderTweets = function (tweet) {
    
    //   for (const single in arrOfTweetObjs) {
  //     console.log("single", single);
  //     let newTweet = createTweetElement($tweetData);
      $("#tweet-container").prepend(tweet);
  //   }
  };

  console.log("this is the $tweet", $tweet);
  let newTweet = createTweetElement($tweetData);
  renderTweets(newTweet);

});