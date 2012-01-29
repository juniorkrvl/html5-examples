App.VideoItemView = Ember.View.extend(App.DPadHandlers, {
  templateName: 'video-item-template',
  tagName: 'li',  
  classNames: ['video-item'],
  classNameBindings: ['selected', 'playing'],
  
  videoBinding: "content", // `this.video` === `this.content`
  feedBinding: "content.feed",
  
  // Selected is true when cursor is on this element
  selected: false,
  
  // For remembering which view was selected most recently in this list
  lastVisited: false,
  
  select: function() {
    var siblingViews = this.getPath('collectionView.childViews');
    siblingViews.filterProperty('selected', true).invoke('deselect');
    
    this.set('selected', true);
    App.setSelected(this);
    this.scrollIntoView();    
  },
  
  deselect: function() {
    this.set('selected', false);
  },
  
  scrollIntoView: function() {
    App.scrollToShow(this.$().closest('ul'), this.$());
  },
  
  click: function() {
    this.set('selected', true);
  },
  
  previousView: function() {
    var childViews = this.getPath('collectionView.childViews');
    var idx = childViews.indexOf(this);
    return (idx > 0) ? childViews.objectAt(idx - 1) : null;
  },
  
  nextView: function() {
    var childViews = this.getPath('collectionView.childViews');
    var idx = childViews.indexOf(this);
    return (idx > -1 && 
            idx < childViews.get('length') - 1) ? childViews.objectAt(idx + 1) : null;
  },
  
  selectPreviousView: function() {
    var prevView = this.previousView();
    return prevView ? (prevView.select() || true) : false;
  },
  
  selectNextView: function() {
    var nextView = this.nextView();
    return nextView ? (nextView.select() || true) : false;
  },
  
  siblings: function() {
    return this.getPath('collectionView.childViews').without(this);
  },
  
  remember: function() {
    this.siblings().setEach('lastVisited', false);
    this.set('lastVisited', true);
  },
  
  playVideo: function() {
    this.get('collectionView').setPlayingView(this); // set all other VideoItemViews to not playing
    App.fullScreenPlayerView.play(this.video);
  },
  
  /* DPad Handlers */
  
  enterKey: function() {
    this.playVideo();
  },
  
  upKey: function() {
    this.selectPreviousView() || console.log("Already reached top");
  },
  
  downKey: function() {
    this.selectNextView() || console.log("Already reached bottom");
  },

  leftKey: function() {
    this.remember();
    this.set('selected', false);
    App.feedCollectionView.select();
  },
  
  rightKey: function() {
    this.remember();
    if (FullScreenPlayer.video.src) {
      // back to current video if one is playing
      App.fullScreenPlayerView.select();
    } else {
      // otherwise play this video
      this.playVideo();
    }
  }  
});
