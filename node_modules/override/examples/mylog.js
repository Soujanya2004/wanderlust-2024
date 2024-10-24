/**
 * @fileoverview Overrides console.log with a custom logging function.
 */

module.exports = function(next) {
  // use a closure to capture the built-in function
  var log = console.log;
  // replace built-in function with our own
  console.log = function(message) {
    log('MYLOG: ' + message);
  }
  // load the next override module in the chain
  next();
}