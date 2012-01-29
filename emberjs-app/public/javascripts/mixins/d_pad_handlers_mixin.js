App.DPadHandlers = Ember.Mixin.create({
	upKey:    Ember.K,
	downKey:  Ember.K,
	leftKey:  Ember.K,
	rightKey: Ember.K,
	enterKey: Ember.K,
	
	keyDown: function(e) {
	  // TODO how should super be handled?
	  // this._super(e);
    
    var code = (e.keyCode ? e.keyCode : e.which);

    switch(code) {
      case 13:
        return this.enterKey && this.enterKey(); 
      case 37:
        return this.leftKey && this.leftKey();
      case 38:
        return this.upKey && this.upKey();
      case 39:
        return this.rightKey && this.rightKey();
      case 40:
        return this.downKey && this.downKey();
    }
  }
});