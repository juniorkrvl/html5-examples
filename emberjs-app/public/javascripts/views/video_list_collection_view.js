// Each childView is a list of videos in the feed.
App.VideoListCollectionView = Ember.CollectionView.extend(App.DPadHandlers, {
  itemViewClassBinding: "App.VideoListView",
  
  contentBinding: "App.feedList",
  
  init: function() {
    this._super();
    App.set('videoListCollectionView', this);
  },
  
  videoListViewForFeed: function(feed) {
    var childViews = this.get('childViews');
    var videoListViews = childViews.filterProperty('content', feed);
    if (videoListViews && videoListViews[0]) {
      return videoListViews[0];
    }
  },
  
  showVideoListForFeed: function(feed) {
    var videoListView = this.videoListViewForFeed(feed);
    if (videoListView) {
      this.showChildView(videoListView);
    }
  },
  
  showChildView: function(childView) {
    this.get('childViews').without(childView).setEach('isVisible', false);
    childView.set('isVisible', true);
  },
  
  selectVideoListForFeed: function(feed) {
    var videoListView = this.videoListViewForFeed(feed);
    if (videoListView) {
      this.showChildView(videoListView);
      videoListView.select();
    }
  },
    
  setPlayingView: function(viewNowPlaying) {
    this.get('childViews').forEach(function(videoListView) {
      videoListView.get('childViews').without(viewNowPlaying).setEach('playing', false);
    });
    viewNowPlaying.set('playing', true);
  }
  
});