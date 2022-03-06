function example(){

    // some async operations
    const p1 = new Promise((resolve, reject)=> {
        setTimeout(() => {
            console.log('calling facebook API...')
            resolve(1);
        }, 2000)
    })
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`calling google API...`)
            resolve(2);
        }, 2000)
    })


    console.log('Before')
    Promise.all([p1, p2])
        .then(result => console.log(result))
    console.log('after');
    

}

module.exports = example;