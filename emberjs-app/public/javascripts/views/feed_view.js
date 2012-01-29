App.FeedView = Ember.View.extend(App.DPadHandlers, {
  templateName: "feed-template",
  classNames: ['feed-view'],
  classNameBindings: ['selected', 'history'],
  feedBinding: "content",
  
  // Selected is true when the cursor is on this element
  selected: false,
  
  // History is true when the cursor has drilled down through this element
  history: false,
  
  // Place the cursor on this element
  select: function() {
    var siblingViews = this.getPath('collectionView.childViews');
    siblingViews.filterProperty('selected', true).invoke('deselect');
    
    App.get('videoListCollectionView').showVideoListForFeed(this.feed);
    
    this.set('selected', true);
    App.setSelected(this);
    this.scrollIntoView();
    
    this.get('collectionView').get('childViews').setEach('history', false);
    
    // Make sure the VideoItemView that would be picked if we drill into this 
    // list is visible.
    var videoListView = App.get('videoListCollectionView').videoListViewForFeed(this.feed);
    videoListView.videoItemViewForSelect().scrollIntoView();
  },
  
  deselect: function() {
    this.set('selected', false);
  },
  
  mouseDown: function() {
    this.select();
  },
  
  scrollIntoView: function() {
    App.scrollToShow(this.$().closest('ul'), this.$());
  },
  
  previousFeedView: function() {
    var childViews = this.getPath('collectionView.childViews');
    var idx = childViews.indexOf(this);
    return (idx > 0) ? childViews.objectAt(idx - 1) : null;
  },
  
  nextFeedView: function() {
    var childViews = this.getPath('collectionView.childViews');
    var idx = childViews.indexOf(this);
    return (idx > -1 && 
            idx < childViews.get('length') - 1) ? childViews.objectAt(idx + 1) : null;
  },
  
  selectPreviousFeedView: function() {
    var prevView = this.previousFeedView();
    return prevView ? (prevView.select() || true) : false;
  },
  
  selectNextFeedView: function() {
    var nextView = this.nextFeedView();
    return nextView ? (nextView.select() || true) : false;
  },
  
  /* DPad Handlers */
  
  upKey: function() {
    this.selectPreviousFeedView() || console.log("Already at top");
  },
  
  downKey: function() {
    this.selectNextFeedView() || console.log("Already at bottom");
  },
  
  enterKey: function() {
    this.rightKey();
  },
  
  rightKey: function() {
    this.set('selected', false);
    this.set('history', true);
    App.videoListCollectionView.selectVideoListForFeed(this.feed);
  },
  
  leftKey: function() {
    if (FullScreenPlayer.video.src) {
      App.fullScreenPlayerView.select();
    }
  }
});