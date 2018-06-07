import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['snippet', 'liveEmbed'],
  snippet: null,
  liveEmbed: false,
  windowHeight: 0,

  showingHamburger: false,
  includejQuery: true,
  includeEaselJs: true,
  htmlValue: "",
  cssValue: "",
  jsValue: "",

  showHtml: true,
  showCss: true,
  showJs: true,

  init: function() {
    this._super();
    var self = this;

    var intervalId = setInterval(function() {
      var newHeight = $(window).height() - 75;
      var oldHeight = self.get('windowHeight');

      if (oldHeight != newHeight) {
        self.set('windowHeight', newHeight);
      }
    }, 250);
    this.set('intervalId', intervalId);
  },
  actions: {
    runCode: function () {
      this.doRunCode();
    },

    doHome: function () {
      this.set('showingHamburger', false);
      this.transitionToRoute('index');
    },

    doLogIn: function () {
      this.set('showingHamburger', false);
      this.transitionToRoute('login');
    },

    doRegister: function () {
      this.set('showingHamburger', false);
      this.transitionToRoute('register');
    },

    doHowto: function () {
      this.set('showingHamburger', false);
      this.transitionToRoute('howto');
    },

    doInfo: function () {
      this.set('showingHamburger', false);
      this.transitionToRoute('info');
    }
  },

  /** OBSERVERS **/
  modelSnippetObserver: function () {
    var self = this;
    var snippet = this.get('model.snippet');
    var liveEmbed = this.get('liveEmbed');

    if (snippet) {
      this.set('htmlValue', snippet.get('htmlCode'));
      this.set('cssValue', snippet.get('cssCode'));
      this.set('jsValue', snippet.get('jsCode'));

      if (liveEmbed) {
        if (this.get('htmlValue')) {
          this.set('showHtml', true);
          this.set('showCss', false);
          this.set('showJs', false);
        } else if (this.get('showCss')) {
          this.set('showHtml', false);
          this.set('showCss', true);
          this.set('showJs', false);
        } else if (this.get('showJs')) {
          this.set('showHtml', false);
          this.set('showCss', false);
          this.set('showJs', true);
        }
      }

      Ember.run.later(function() {
        self.doRunCode();
      }, 1500);
    }
  }.observes('model.snippet.id'),

  liveEmbedObserver: function() {
    var liveEmbed = this.get('liveEmbed');

    if (liveEmbed === true) {
      this.set('showHtml', false);
      this.set('showCss', false);
      this.set('showJs', true);
    }

  }.observes('liveEmbed').on('init'),

  /** //OBSERVERS **/

  //** COMPUTED PROPERTIES **/

  //** //COMPUTED PROPERTIES **/

  doRunCode: function () {
    var htmlCode = this.get('htmlValue');
    var cssCode = this.get('cssValue');
    var jsCode = this.get('jsValue');
    var previewDoc = window.frames[0].document;

    console.log(htmlCode);
    previewDoc.open();
    previewDoc.write("<!DOCTYPE html>");
    previewDoc.write("<html>");
    previewDoc.write("<head>");
    previewDoc.write("<style>");
    previewDoc.write(cssCode);
    previewDoc.write("</style>");


    previewDoc.write('<scr' + 'ipt>\n');
    previewDoc.write('var errorFunction = function(message, url, linenumber) { parent.alert_message("error", "<b>Javascript error:</b> " + message + " on line " + linenumber); };');
    previewDoc.write('\n</scr' + 'ipt>\n');

    previewDoc.write('<scr' + 'ipt>\n');
    previewDoc.write('window.onerror = errorFunction;');
    previewDoc.write('\n</scr' + 'ipt>\n');

    if (this.get('includejQuery') === true) {
      previewDoc.write('<scr' + 'ipt src="https://code.jquery.com/jquery-3.0.0.js" integrity="sha256-jrPLZ+8vDxt2FnE1zvZXCkCcebI/C8Dt5xyaQBjxQIo=" crossorigin="anonymous"></scr' + 'ipt>');
    }

    if (this.get('includeEaselJs') === true) {
      //previewDoc.write('<scr' + 'ipt src="http://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.3/fabric.min.js" crossorigin="anonymous"></scr' + 'ipt>');
      previewDoc.write('<scr' + 'ipt src="/libs/easeljs-0.8.2.min.js" crossorigin="anonymous"></scr' + 'ipt>');
    }

    previewDoc.write("</head>");
    previewDoc.write("<body>");
    previewDoc.write(htmlCode);

    previewDoc.write('<scr' + 'ipt>\n');

    /*if (this.get('includejQuery')) {
     previewDoc.write("$( document ).ready(function() {\n");
     } else {
     previewDoc.write('document.addEventListener("DOMContentLoaded", function(event) {\n ');
     }*/

    previewDoc.write(jsCode);
    //previewDoc.write("\n});\n");
    previewDoc.write('\n</scr' + 'ipt>\n');

    /*previewDoc.write('<scr' + 'ipt>\n');
    previewDoc.write('(function(){\n');
    previewDoc.write('console.log("attempting to divert console.log");\n');
    previewDoc.write('var oldLog = console.log;\n');
    previewDoc.write('console.log = function (message) {\n');
    previewDoc.write('parent.console_message(message);\n');
    previewDoc.write('oldLog.apply(console, arguments);\n');
    previewDoc.write('};\n');
    previewDoc.write('})();\n');
    previewDoc.write('\n');
    previewDoc.write('\n</scr' + 'ipt>\n');*/

    previewDoc.write("</body>");
    previewDoc.write("</html>");
    previewDoc.close();
  }
});
