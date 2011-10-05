
var defineBoxeeControlFunctions = function () {
  function setApiMinVersion(version) {
    boxee.apiMinVersion = version || 7.0;
  }
  boxee.exec(setApiMinVersion);

  function showNotification(jsonArgs) {
    var args = JSON.parse(jsonArgs);
    var message = args[0];
    var thumbUrl = args[1] || '.';
    var duration = args[2] || 2;
    
    boxee.showNotification(message, thumbUrl, duration);
  }
  boxee.exec(showNotification);

  function cursorMode() {
    boxee.setMode(boxee.CURSOR_MODE);
  }
  boxee.exec(cursorMode);

  function keyboardMode() {
    boxee.setMode(boxee.KEYBOARD_MODE);
  }
  boxee.exec(keyboardMode);
  
  function getHttp(url) {
    return boxee.getHttp(url);  
  }
  boxee.exec(getHttp);
  
  function openDialogCallback(confirmed) {
    boxee.showNotification("in openDialogCallback " + boxee.browserCallback);
    //browser.execute("window.hi('" + boxee.browserCallback + "(" + confirmed + ")')");
    browser.execute("window." + boxee.browserCallback + "(" + confirmed + ")");
  }
  boxee.exec(openDialogCallback);
  
  function promptDialog(jsonArgs) {
    var args = JSON.parse(jsonArgs); //title, moreText, browserCallback
    var title = args[0];
    var moreText = args[1] || '';
    
    boxee.browserCallback = args[2];
    
    boxee.openDialog("YesNo", title, moreText, 'openDialogCallback');
  }
  boxee.exec(promptDialog);
  
}

if (!window.boxee) {
  window.boxee = {
    fake: true,
    exec: function(string) {
      console.log("boxee.exec : " + string);
    },
    exec2: function(string) {
      console.log("boxee.exec2 : " + string);
      return '';
    }
  }
} else {
  defineBoxeeControlFunctions();
}

window.boxeeAPI = {
  
  notify: function(message, seconds) {
    seconds = seconds ? seconds : 2;
    boxee.exec('boxee.showNotification("' + message +'", ".", ' + seconds + ');');
  },
  showBoxeeOSD: function() {
    boxee.exec("boxee.showBoxeeOSD()");
  },
  getURL: function(url, callback) {
    return $.Deferred(function(dfd) {
      var data = boxee.exec2("getHttp('" + url + "')");
      setTimeout(function() {
        dfd.resolve();
        callback(data);
      }, 0);
    }).promise();
  },
  clearPauseOverlay: function() {
    boxee.exec("playerState.isPaused = false;");
  },
  showPauseOverlay: function() {
    boxee.exec("playerState.isPaused = true;");
  },
  updateTimeBuffer: function(time, duration) {
    boxee.exec("updateTimeBuffer(" + time + ", " + duration + ")");
  },
  keyboardMode: function() {
    boxee.exec("keyboardMode()");
  },
  cursorMode: function() {
    boxee.exec("cursorMode()");
  },
  showNotification: function() {
    var array = Array.prototype.slice.call(arguments);
    var json = JSON.stringify(array);
    boxee.exec('showNotification(' + json + ')');
  },
  promptDialog: function(title, moreText, callback) {
    if (typeof callback === 'function') {
      boxee.promptDialogCallback = function(arg) {
        callback(arg);
      }
      var json = JSON.stringify([title, moreText, 'boxee.promptDialogCallback']);
      boxee.exec("promptDialog('" + json + "')");
    } else if (typeof callback === 'string') {
      var array = Array.prototype.slice.call(arguments);
      var json = JSON.stringify(array);
      boxee.exec("promptDialog('" + json + "')");
    }
  }
};

$(window).unload(function() {
  boxee.clearPauseOverlay()
});