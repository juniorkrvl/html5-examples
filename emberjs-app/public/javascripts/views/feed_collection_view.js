/**
  The leftmost list view.  This is the collection view which contains the FeedViews, which each
  display the name of an RSS feed and the thumbnail.
  
  In contrast, the FeedListCollectionView displays lists of videos in the Feed, not the data representing
  the feed itself.
**/
App.FeedCollectionView = Ember.CollectionView.extend(App.DPadHandlers, {
  contentBinding: "App.feedList",
  itemViewClassBinding: "App.FeedView",
  
  init: function() {
    this._super();
    App.set('feedCollectionView', this);
  },
  
  lastSelectedView: function() {
    return this.get('childViews').filterProperty('history', true)[0];
  },
  
  select: function() {
    var lastView = this.lastSelectedView();
    if (lastView) {
      lastView.select();
      this.get('childViews').setEach('history', false);
    } else {
      var firstFeedView = this.get('childViews')[0];
      if (firstFeedView) {
        firstFeedView.select();
      }      
    }
  }
});