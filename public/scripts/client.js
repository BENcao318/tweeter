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
      ${escape(tweet.content.text)}
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
  $('#alert').text('');
  if(tweet === '' || tweet === null) {
    $('#alert').append('<i class="fa-solid fa-triangle-exclamation"></i> The tweet text cannot be empty <i class="fa-solid fa-triangle-exclamation"></i>');
    $('#alert').slideDown();
    return false;
  } else if (tweet.length > 140) {
    $('#alert').append('<i class="fa-solid fa-triangle-exclamation"></i> Tweet is over 140 character limit, modify before send <i class="fa-solid fa-triangle-exclamation"></i>');
    $('#alert').slideDown();
    return false;
  }
  return true;
}

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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

