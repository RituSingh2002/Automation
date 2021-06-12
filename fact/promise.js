let fs=require("fs");
let pendingpromise=fs.promises.readFile("f1.txt");
//when pendingpromise successfully work
//sucees callback
pendingpromise.then(function(data){
console.log(data+"");
})
//when pendingpromise will get error
//failed callback
pendingpromise.catch(function(error){
    console.log(error);
})
console.log("ye promise hii")
