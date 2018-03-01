// import(/* webpackChunkName: "lodash" */'lodash').then(function (_) {
//     console.log(_);
// })
// //
// import(/* webpackChunkName: "vuea" */'vue').then(function (_) {
//
// })

import('vue').then(function () {
    console.log('123');
    require('lodash');
});


var style = require('./home.css');
console.log('123');
console.log('jjjjss');

if(module.hot){
  module.hot.accept();
}
