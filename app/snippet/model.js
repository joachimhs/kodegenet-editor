import Model from 'ember-data/model';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: DS.attr('string'),
  htmlCode: DS.attr('string'),
  cssCode: DS.attr('string'),
  jsCode: DS.attr('string'),
  description: DS.attr('string'),
  username: DS.attr('string')
});
