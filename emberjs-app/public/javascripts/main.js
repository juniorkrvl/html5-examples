var App = Ember.Application.create({
  setSelected: function(view) {
    App.set('selectedView', view);
  },
  
  scrollToShow: function($list, $item) {
    // $list must have a height set and overflow set to hidden (or auto)
    var currentTop = $list.scrollTop();
    var offset = $list.height() * (2/5);
    var prevScrollTop = $list.scrollTop();
    var scrollAmount = $item.position().top - offset + currentTop;
    $list.scrollTop(scrollAmount);
  },
    
  keyDown: function(e) {
    if (App.selectedView && App.selectedView.keyDown) {
      return App.selectedView.keyDown(e);
    }
    
    // In case an error of some kind leaves us with no cursor position.
    if (!App.selectedView) {
      App.feedCollectionView.select();
    }
  },
  
  ready: function() {
    if (window.boxee) {
      boxeeAPI.keyboardMode();
    }

    var h = $(window).height();
    var w = $(window).width();
    if (h == 480 && w == 720) {
      $('html').css('zoom', 720/1920);
    }

    var processFeeds = function(feeds) {
      var promises = [], promise;

      _.each(feeds, function(feed) {
        var feedObj;
        console.log("Loading videos json for " + feed.url);
        promise = $.ajax("/feeds/" + encodeURIComponent(feed.url)).success(function(response) {
          var videos = response.videos;
          feedObj = App.Feed.create(feed);
          feedObj.setVideos(videos);
          App.feedList.pushObject(feedObj);
        });

        promises.push(promise);
      });

      $.when.apply(null, promises).then(function() {
        App.feedCollectionView.select();
      });
    };

    var feeds = [];
    feeds.push({
      title: "HD weekly wildlife highlights",
      thumbnail: "http://www.earth-touch.com/i/podcast/ET_IT5.jpg",
      url: "http://feeds.feedburner.com/earth-touch_podcast_720p"
    }, {
      title: "TEDTalks (hd)",
      thumbnail: "http://video.ted.com/assets/images/itunes/podcast_poster_600x600.jpg",
      url: "http://feeds.feedburner.com/tedtalksHD"
    }, {
      title: "Doctype",
      thumbnail: "http://doctype.tv/images/itunes.png",
      url: "http://feeds.feedburner.com/doctype/episodes"
    }, {
      title: "HD Nation (HD Quicktime)",
      thumbnail: "http://bitcast-a.bitgravity.com/revision3/images/shows/hdnation/hdnation.jpg",
      url: "http://revision3.com/hdnation/feed/Quicktime-High-Definition"
    });

    App.set('title', "Video RSS Feeds");

    processFeeds(feeds);

    $(document).keydown(_.bind(App.keyDown, App));
  }
});