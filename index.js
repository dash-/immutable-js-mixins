///
// Dependencies
///

var path = require('path');
var clone = require('lodash/clone');
var cloneDeep = require('lodash/cloneDeep');
var assignIn = require('lodash/assignIn');
var assign = require('lodash/assign');
var map = require('lodash/map');
var filter = require('lodash/filter');
var isUndefined = require('lodash/isUndefined');
var isString = require('lodash/isString');
var isFunction = require('lodash/isFunction');
var isObject = require('lodash/isObject');

var imm = require('immutable');


///
// Exports
///

assignIn(imm, {
  mixin: function mixin(classKey, methods) {
    if(isUndefined(methods) && isObject(classKey)) {
      methods = classKey;
      classKey = 'Iterable';
    }

    assignIn(imm[classKey].prototype, methods);
  },

  mixinAll: function mixinAll() {
    return imm.mixin(allMixins());
  },
});

module.exports = imm;


///
// Helpers
///

function processMethods(methods) {
  return filter(methods, isFunction);
}

function allMixins() {
  return {
    transform: require('./transform'),
  };
}

