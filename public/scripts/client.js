/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    $('.container').append(createTweetElement(tweet));
  })
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div id="avatar">
        <img src="${tweet.user.avatars}" alt="avatar">          
        <span>${tweet.user.name}</span>
      </div>
      <div id="tweet-handle">
        ${tweet.user.handle}
      </div>
    </header>
    <div class="tweet-content">
      ${tweet.content.text}
    </div>
    <hr class="solid">
    <footer>
      <div class="tweet-time">
        ${convertMillisec(tweet.created_at)}
      </div>
      <div class="btns">
        <button><i class="fa-solid fa-flag"></i></button>
        <button><i class="fa-solid fa-retweet"></i></button>
        <button><i class="fa-solid fa-heart"></i></button>     
      </div>
    </footer>
  </article>
  `);

  return $tweet;
}

const convertMillisec = function(millisec) {
  const now = Date.now();
  const dif = (now - millisec) / 1000;
  if(dif >= 86400) {
    return `${Math.floor(dif / 86400)} days ago`;
  } else if (dif <= 60){
    return `${dif} seconds ago`;
  } else if (dif < 3600) {
    return `${Math.floor(dif / 60)} minutes ago`;
  } else {
    return `${Math.floor(dif / 3600)} hours ago`;
  }
}

$(function() {
  renderTweets(data);

  $('form').on('submit', function(event) {
    event.preventDefault();
    // $.ajax({
    //   type: 'POST',
    //   url: '/tweets/',
    //   data: $(this).serialize()
    // });
    $.post('/tweets/', $(this).serialize())
  })
})

