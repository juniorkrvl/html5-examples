$(function() {
  boxeeAPI.keyboardMode();
  
  $('body').append($("<div/>").text(navigator.userAgent));
  
  function fullScreenFlash() {
    setTimeout(function() {
      boxee.showNotification("auto", '.', 2);
      boxee.autoSelectPlayer();
    }, 1000);
    
    playerState.canSetFullScreen = true;
    playerState.canSeek = true;
    playerState.canSeekTo = true;
    
    boxee.onUpdateState = function() {
      var duration = parseInt(browser.execute('document.embeds[0].getDuration()'), 10);
      if (typeof duration === 'number') {
        playerState.duration = duration;
      }
      var time = parseInt(browser.execute('document.embeds[0].getCurrentTime()'), 10);
      if (typeof time === 'number') {
        playerState.time = time;
      }
    }
    
    boxee.onSeekTo = function(milli) {
      browser.execute('document.embeds[0].seekTo(' + milli/1000 + ', true)');
    }
    
    boxee.onSkip = function() {
      var newTime = playerState.time + 10;
      browser.execute('document.embeds[0].seekTo(' + newTime + ')');
    }
    boxee.onBack = function() {
      var newTime = playerState.time - 10;
      browser.execute('document.embeds[0].seekTo(' + newTime + ')');
    }
    
  }
  
  boxee.exec(fullScreenFlash);
  boxee.exec("fullScreenFlash()");
  
  setTimeout(function() {
    document.embeds[0].playVideo();
  }, 2000);
  
  
  
  $(document).keydown(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    switch(code) {
      case 37:
      case 38:
      case 39:
      case 40:
        boxee.exec("fullScreenFlash()");
        break;
    }
    
  });
  
  window.setTimeout(function() {
    window.title = 'Title 2';
  }, 5000);
  
});