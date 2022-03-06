function example() {
    console.log('Before')

    const user = getUser(1);
    console.log(user);

    console.log('after')


    function getUser(id) {
        setTimeout(() => {
            console.log('Reading user of database...')
            return { id: id, userName: 'gitUserName' };
        }, 2000)
    }
    // callbacks
    // promise
    // async and await
}

module.exports = example;