function example() {
    // getUser(1)
    //     .then(user => getRepository(user))
    //     .then(repos => getCommits(repos[0]))
    //     .then(commits=> console.log(commits))
    //     .catch(error => console.log(error.message));


    // main execution block 
    console.log('Before')
    async function showCommitsOfUser(id) {

        try {
            const user = await getUser(id);
            const repos = await getRepository(user);
            const commits = await getCommits(repos[0]);
            console.log(commits);
        } catch (error) {
            console.log(error.message);
        }
    }

    showCommitsOfUser(1);
    console.log('after');
    

    // some async functions
    function getUser(id) {

        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                console.log('Reading user from database...')
                resolve({ id: id, userName: 'user1' });
            }, 2000)
        })
    }

    function getRepository(user){

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`fetching repo of ${user.userName} from database...`)

                if (Math.random() < 0.5){
                    resolve(['repo1', 'repo2']);
                }else{
                    reject(new Error("couldn't fetch repo"));
                }
                
            }, 2000)
        })
    }

    function getCommits(repo) {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`fetching commits of ${repo} from database...`)
                resolve(['commit 1', 'commit 2', 'commit 3']);
            }, 2000)
        })
    }
}

module.exports = example;