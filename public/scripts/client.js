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
      <div class="interact-btn">
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
  $.get('/tweets/')
  .then(function(data) {
    renderTweets(data);
  });
}

/*
Validate tweet length. If tweet length 0 or over 140, slidedown the alert.
*/
const tweetValidation = function(tweet) {
  $('#alert').text('')
  if(tweet === '' || tweet === null) {
    $('#alert').append('<i class="fa-solid fa-triangle-exclamation"></i> The tweet text cannot be empty <i class="fa-solid fa-triangle-exclamation"></i>');
    $('#alert').slideDown();
    return false;
  } else if (tweet.length > 140) {
    $('#alert').append('<i class="fa-solid fa-triangle-exclamation"></i> Tweet is over 140 character limit, modify before send <i class="fa-solid fa-triangle-exclamation"></i>');
    $('#alert').slideDown();
    return false;
  } else {
    $('#alert').hide();
  }
  return true;
}

/*
Use createTextNode to escape the HTML tags from the input 
*/
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const addLastTweet = function() {
  $.get('/tweets/', function(data) {
    $('#tweets').prepend(createTweetElement(data[data.length - 1]));
  })
}

$(function() {
  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();
    if(tweetValidation($('#tweet-text').val())){
      $.post('/tweets/', $(this).serialize())
      .then(function() {
        addLastTweet();
        $('.new-tweet').slideUp('fast', function() {
          $('#tweet-text').val('');
        });
      });
    }
  })

  $('#toggle-form-btn').on('click', function() {
    $('.new-tweet').slideToggle('fast', function() {
      $('#tweet-text').focus();
    });
  })

  $(window).scroll(function() {
    if($(window).scrollTop() >= 200) {
      $('#scroll-top-btn').show();
    } else {
      $('#scroll-top-btn').hide();
    }
  })

  $('#scroll-top-btn').on('click', function() {
    $(window).scrollTop(0);
  })

})

