function example(){
    console.log('Before')
    
    getUser(1, (user) => {
        console.log(user);
    });
    
    console.log('after')
    
    
    function getUser(id, callback) {
        setTimeout(() => {
            console.log('Reading user of database...')
            callback({ id: id, userName: 'gitUserName' });
        }, 2000)
    }
}

module.exports = example;