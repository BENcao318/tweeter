/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    $('#tweets').prepend(createTweetElement(tweet));
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
        ${timeago.format(tweet.created_at)}
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

const loadTweets = function() {
  $.get('/tweets/', function(data) {
    renderTweets(data);
  })
}

const tweetValidation = function(tweet) {
  if(tweet === '' || tweet === null) {
    alert('The tweet text cannot be empty');
    return false;
  } else if (tweet.length > 140) {
    alert('Tweet is over 140 character limit, modify before send');
    return false;
  }
  return true;
}

$(function() {
  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();
    if(tweetValidation($('#tweet-text').val())){
      $.post('/tweets/', $(this).serialize());
      loadTweets();
    }
  })
})

