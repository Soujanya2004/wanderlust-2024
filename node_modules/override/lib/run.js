module.exports = function(overrides) {
  if (!overrides) {
    var env = process.env.OVERRIDE_ENV;
    if (process.argv[1] == '-e') {
      env = process.argv.splice(1, 2)[1];
    }
    if (env) {
      overrides = [];
      env.split(',').forEach(function(override) {
        var f = require(override);
        if(typeof f == 'function') {
          overrides.push(f);
        }
      });
    } else {
      throw new Error(
          'Missing Override environment, specify it via the -e command line switch or OVERRIDE_ENV environment variable')
    }
  }

  var main = require('path').resolve(process.cwd(), process.argv[1]);

  overrides.push(function() {
    require(main);
  });

  (function next() {
    return (overrides.shift())(next);
  })();
}
