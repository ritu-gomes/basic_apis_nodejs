const promise1 = new Promise(function (resolve, reject) {
    setTimeout(function() {
        resolve('hello');
    }, 3000);
});

promise1
.then(function (result) {
    console.log(result);
})
.catch(function (err) {
    console.log(err);
});

console.log("oiiiii");