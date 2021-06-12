let fs=require("fs");
let f1pendingPromise=fs.promises.readFile("f1.txt");
f1pendingPromise.then(function(data){
    console.log(data+"");
    let f2pendingPromise=fs.promises.readFile(".f2.txt");
    f2pendingPromise.then(function(data){
        console.log(data+"");
        let f3pendingPromise=fs.promises.readFile("f3.txt");
        f3pendingPromise.then(function(data){
            console.log(data+"");
        })

    })
})
f1pendingPromise.catch(function(error){
    console.log(error);
})
 
 