App.Feed = Ember.ArrayProxy.extend({
  title: null,
  thumbnail: null,
  url: null,

  content: [], /* Array of VideoItems */
  
  setVideos: function(videos) {
    var self = this;
    self.set('content', []); // Not sure I understand why this is needed but otherwise both lists have the same content.
    _.each(videos, function(video) {
      var videoItem = App.VideoItem.create(video);
      videoItem.set('feed', self);
      self.pushObject(videoItem);
    });
  }
});
