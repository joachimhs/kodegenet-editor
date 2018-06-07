import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  location: config.locationType,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  beforeModel(params){
    console.log('APPLICATION ROUTE BEFORE MODEL:');
    console.log(params.queryParams.snippet);
    this.set('snippetId', params.queryParams.snippet);
  },

  model: function() {
    if (this.get('snippetId')) {
      return Ember.RSVP.hash({
        snippet: this.store.find('snippet', this.get('snippetId'))
      });
    }
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.href;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});
