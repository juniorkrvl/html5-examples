App.FullScreenPlayerView = Ember.View.extend(App.DPadHandlers, {
  previousView: null,
  
  init: function() {
    this._super();
    App.set('fullScreenPlayerView', this);
  },
  
  didInsertElement: function() {
    FullScreenPlayer.init({
      container: this.$()
    });
  },
  
  play: function(videoItem) {
    console.log('Loading video url ' + videoItem.url);
    FullScreenPlayer.loadSrc(videoItem.url);
    FullScreenPlayer.setVideoTitle(videoItem.title);
    this.select();
  },
  
  select: function() {
    if (App.get('selectedView') != this) {
      this.set('previousView', App.get('selectedView'));
    }
    App.setSelected(this);
    $('body').addClass('full-screen-video');
  },
  
  deselect: function() {
    var previousView = this.get('previousView');
    this.set('previousView', null);
    $('body').removeClass('full-screen-video');
    previousView.select();
  },

  /* DPad Handlers */

  upKey: function() {
    this.deselect();
  },
  
  downKey: function() {
    this.deselect();
  },
  
  enterKey: function() {
    $('.boxee-player-osd').css('visibility', 'visible');
    if (FullScreenPlayer.isPaused()) {
      FullScreenPlayer.play();
    } else {
      FullScreenPlayer.pause();
    }
  },
  
  rightKey: function() {
    if ($('.boxee-player-osd').css('visibility') == 'hidden') {
      $('.boxee-player-osd').css('visibility', 'visible');
      return;
    }
    $('.boxee-player-osd').css('visibility', 'visible');
    FullScreenPlayer.seekForward();
  },
  
  leftKey: function() {
    if ($('.boxee-player-osd').css('visibility') == 'hidden') {
      $('.boxee-player-osd').css('visibility', 'visible');
      return;
    }
    $('.boxee-player-osd').css('visibility', 'visible');
    FullScreenPlayer.seekReverse();    
  }
});
