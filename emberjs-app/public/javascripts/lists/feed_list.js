App.feedList = Ember.ArrayProxy.create({
  content: [],
  
  addFeed: function(feed) {
    var feed = App.Feed.create(feedData);
    this.pushObject(feed);
  },
  
  setAllVideosNotPlaying: function() {
    this.content.forEach(function(feed) {
      feed.content.forEach(function(videoItem) {
        videoItem.set('playing', false);
      });
    });
  }  
});
