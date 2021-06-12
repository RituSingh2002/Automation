let fs=require("fs");
let f1pending=fs.promises.readFile("f1.txt");
f1pending.then(function(data){
    console.log(data+"");
}).then(function(){
    let f2pending=fs.promises.readFile("f2.txt");
    return f2pending;
}).then(function(data){
    console.log(data+"");
}).then(function(){
    let f3pendingt=fs.promises.readFile("f3.txt");
    return f3pendingt;
}).then(function(data){
    console.log(data+"");
})