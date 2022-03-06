function example(){

    // main execution block 
    console.log('Before')
    getUser(1, getRepositoryCallBack);
    console.log('after');
    

    // some functions
    function getRepositoryCallBack(user){
        getRepository(user, getCommitsCallBack);
    }

    function getCommitsCallBack(repos){
        getCommits(repos[0], displayCommitsCallback);

    }

    function displayCommitsCallback(commits) {
        console.log(commits);
    };

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