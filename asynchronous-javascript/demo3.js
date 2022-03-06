function example(){

    // main execution block 
    console.log('Before')
    getUser(1, (user) => {
        getRepository(user, (repos)=> {
            getCommits(repos[0], (commits)=> {
                console.log(commits)
            })
            
        })
    });
    console.log('after')
    

    // some async functions
    function getUser(id, callback) {
        setTimeout(() => {
            console.log('Reading user from database...')
            callback({ id: id, userName: 'user1' });
        }, 2000)
    }

    function getRepository(user, callback){
        setTimeout(() => {
            console.log(`fetching repo of ${user.userName} from database...`)
            callback(['repo1', 'repo2']);
        }, 2000)
    }

    function getCommits(repo, callback) {
        setTimeout(() => {
            console.log(`fetching commits of ${repo} from database...`)
            callback(['commit 1', 'commit 2', 'commit 3']);
        }, 2000)
    }
}


module.exports = example;