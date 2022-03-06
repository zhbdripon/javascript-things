global.async1 = require('./asynchronous-javascript/demo1');
global.async2 = require('./asynchronous-javascript/demo2');
global.async3 = require('./asynchronous-javascript/demo3');
global.async4 = require('./asynchronous-javascript/demo4');
global.async5 = require('./asynchronous-javascript/demo5');
global.async6 = require('./asynchronous-javascript/demo6');
global.async7 = require('./asynchronous-javascript/demo7');







const func = global[process.argv[2]];

if (func && typeof (func) === 'function'){
    func()
}else{
    console.err('Function not found');
}





