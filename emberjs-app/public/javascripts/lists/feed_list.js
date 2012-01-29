App.feedList = Ember.ArrayProxy.create({
  content: [],
  
  addFeed: function(feed) {
    var feed = App.Feed.create(feedData);
    this.pushObject(feed);
  }  
});
