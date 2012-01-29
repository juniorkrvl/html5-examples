App.Feed = Ember.ArrayProxy.extend({
  title: null,
  thumbnail: null,
  url: null,
  content: [], /* Array of VideoItems */
  active: false,
  selected: false,

  navUpFrom: function(videoItem) {
    var nextVideoItem = null;
    var i = this.content.indexOf(videoItem);
    if (i > -1) {
      if (i > 0) {
        nextVideoItem = this.content[i - 1];
        if (nextVideoItem) {
          nextVideoItem.select();
        }        
      } else {
        console.log("already at the top");
      }
    } else {
      console.log("feed not found in list")
    }    
  },
  navDownFrom: function(videoItem) {
    var nextVideoItem = null;
    var i = this.content.indexOf(videoItem);
    if (i > -1) {
      if (i < (this.content.length -1)) {
        nextVideoItem = this.content[i + 1];
        if (nextVideoItem) {
          nextVideoItem.select();
        }        
      } else {
        console.log("already at the bottom");
      }
    } else {
      console.log("feed not found in list")
    }
  },
  deselectAll: function() {
    _.each(this.content, function(videoItem) {
      videoItem.deselect();
    });
  },
  load: function() {
    
  },
  
  getItem: function() {
    if (this.lastSelected && this.content.indexOf(this.lastSelected) > -1) {
      return this.lastSelected;
    }
    return this.content[0];
  },
  
  deactivate: function() {
    this.set('active', false);
    this.set('selected', false);
    this.set('history', false);
  },
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
