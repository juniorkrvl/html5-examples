App.VideoListView = Ember.CollectionView.extend(App.DPadHandlers, {
  itemViewClass: "App.VideoItemView",
  tagName: 'ul',
  classNames: ['video-feed'],
  isVisible: false, // The videoListCollectionView will set one VideoListView visible at a time
  
  select: function() {
    this.videoItemViewForSelect().select();
  },
  
  videoItemViewForSelect: function() {
    var lastView = this.rememberedView();
    if (lastView) {
      return lastView;
    } else {
      var childViews = this.get('childViews');
      return childViews[0];
    }
  },
  
  rememberedView: function() {
    return this.get('childViews').filterProperty('lastVisited', true)[0];
  },
  
  siblings: function() {
    return this.getPath('collectionView.childViews').without(this);
  },
  
  setPlayingView: function(viewNowPlaying) {
    this.get('collectionView').setPlayingView(viewNowPlaying);
  }
});