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


