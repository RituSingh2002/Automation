const { error } = require("console");
let fs=require("fs");
let f1pendingPromise=fs.promises.readFile("f1.txt");
let f2pendingPromise=fs.promises.readFile("f2.txt");
let f3pendingPromise=fs.promises.readFile("f3.txt");
f1pendingPromise.then(scb);
f1pendingPromise.catch(fcb);
f2pendingPromise.then(scb);
f2pendingPromise.catch(fcb);
f3pendingPromise.then(scb);
f3pendingPromise.catch(fcb);
function scb(data){
    console.log(data+"");
}
function fcb(error){
console.log(error);
}
