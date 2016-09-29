var Benchmark = require('benchmark');
var readline = require('readline');
var tests = require('./test.js');

var suite = new Benchmark.Suite('Test', {

   // called when the suite starts running
   'onStart': function ()
   {
      console.log('-----------------------------------------------');
      console.log('Running Benchmarking Suite, please be patient.');
      console.log('');
   },

   // called between running benchmarks
   'onCycle': function (event)
   {
      console.log(String(event.target));
   },

   // called when aborted
   'onAbort': function ()
   {
      console.log('Abortet!');
   },

   // called when a test errors
   'onError': function (err)
   {
      console.log('An err occured:');
      console.log(err);
   },

   // called when the suite completes running
   'onComplete': function ()
   {
      console.log('');
      console.log('Benchmarking Run finished!');
      console.log('');
      console.log('Fastest function is: ' + this.filter('fastest').map('name'));
      console.log('');
      var stdin = process.openStdin();

      var rl = readline.createInterface(process.stdin, process.stdout);
      rl.setPrompt('Press Enter to rerun.');
      rl.prompt();
      rl.on('line', function (line)
      {
         rl.close();
         startSuite();
      })
   }
});

var functionNames = Object.keys(tests);
functionNames.forEach(function (functionName)
{
   suite.add(functionName, tests[functionName])
})

// run async
var startSuite = function() {
   suite.run({ 'async': true });
}

startSuite();