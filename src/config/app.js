(async function() {
    const app = await require('./express')();

    app.listen(3000, () => {
        console.log("yes I'm listening");
    });
})()