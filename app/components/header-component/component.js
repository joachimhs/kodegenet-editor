import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    runCode: function () {
      this.sendAction('runCode');
    },

    toggleHamburger: function () {
      console.log('toggleHamburger');
      this.toggleProperty('showingHamburger');
      console.log(this.get('showingHamburger'));
    },

    toggleEditor: function(editor) {
      //In Live-embed, only show one code-type at a time
      if (this.get('liveEmbed') === true) {
        this.set('showHtml', false);
        this.set('showCss', false);
        this.set('showJs', false);
      }
      this.toggleProperty(editor);
    },

    doLogIn: function() {
      this.sendAction('doLogIn')
    },

    doRegister: function() {
      this.sendAction('doRegister')
    },

    doHowto: function() {
      this.sendAction('doHowto')
    },

    doInfo: function() {
      this.sendAction('doInfo')
    },

    doHome: function() {
      this.sendAction('doHome')
    }
  },

  didInsertElement: function () {
    this._super();

    var host = window.location.origin;
    var search = window.location.search;
    search = search.replace("?liveEmbed=true", "");
    search = search.replace("&liveEmbed=true&", "");
    search = search.replace("&liveEmbed=true", "");
    if (search.indexOf("&") === 0) {
      search = "?" + search.substr(1);
    }

    var url = host + "/" + search;
    this.set('newWindowUrl', url);

    console.log('HIDING: 1');
    Ember.run.schedule('afterRender', function () {
      console.log('HIDING: 2');
      Ember.$("#headerHamburger").hide();
    });

  },

  showingHamburgerObserver: function () {
    var showingHamburger = this.get('showingHamburger');
    console.log('showingHamburgerObserver:' + showingHamburger);

    if (showingHamburger === true) {
      Ember.$("#headerHamburger").slideDown('1000');
    } else {
      Ember.$("#headerHamburger").slideUp('1000');
    }
  }.observes('showingHamburger').on('init')

});
