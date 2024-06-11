global.async1 = require('./demo1');
global.async2 = require('./demo2');
global.async3 = require('./demo3');
global.async4 = require('./demo4');
global.async5 = require('./demo5');
global.async6 = require('./demo6');
global.async7 = require('./demo7');







const func = global[process.argv[2]];

if (func && typeof (func) === 'function'){
    func()
}else{
    console.err('Function not found');
}





