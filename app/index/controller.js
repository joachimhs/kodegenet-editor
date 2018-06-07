import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  includejQuery: Ember.computed.alias('applicationController.includejQuery'),
  htmlValue: Ember.computed.alias('applicationController.htmlValue'),
  cssValue: Ember.computed.alias('applicationController.cssValue'),
  jsValue: Ember.computed.alias('applicationController.jsValue'),
  showHtml: Ember.computed.alias('applicationController.showHtml'),
  showCss: Ember.computed.alias('applicationController.showCss'),
  showJs: Ember.computed.alias('applicationController.showJs'),
  windowHeight: Ember.computed.alias('applicationController.windowHeight'),

  didInsertElement: function() {
    this._super();
  },

  /** OBSERVERS **/
  modelSnippetObserver: function () {
    this.redrawUi();
  }.observes('showHtml', 'showCss', 'showJs', 'windowHeight').on('init'),

  //** //OBSERVERS **/

  //** COMPUTED PROPERTIES **/

  //** //COMPUTED PROPERTIES **/

  redrawUi: function() {
    var numTabs = this.numTabs();
    console.log('numTabs: ' + numTabs);

    var availableHeight = $(window).height() - (75 + 10*numTabs);

    var height = (availableHeight / numTabs) + "px";
    var outputHeight = (availableHeight * (2/3)) + "px";
    var consoleHeight = (availableHeight / 3) + "px";

    Ember.run.later(function() {
      Ember.$("#htmlEditor").css({height: height});
      Ember.$("#cssEditor").css({height: height});
      Ember.$("#jsEditor").css({height: height});
      Ember.$("#output").css({height: outputHeight});
      Ember.$("#console").css({height: consoleHeight});
      Ember.$(".editor .CodeMirror").css({height: height});
    }, 150);
  },

  numTabs: function() {
    var showHtml = this.get('showHtml');
    var showCss = this.get('showCss');
    var showJs = this.get('showJs');

    var numTabs = 0;
    if (showHtml === true) { numTabs++ }
    if (showCss === true) { numTabs++ }
    if (showJs === true) { numTabs++ }

    return numTabs;
  }
});
