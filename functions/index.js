function printEndOfExample() {
    console.log('===================')
}

// function in an object, this -> function itself 
const demoObject = {
    name: 'test name',
    printLog() {
        console.log(this)
    }
}

demoObject.printLog()
printEndOfExample()

// function in general point to window/global object
function demoFunction() {
    this.name = 'some name'
    console.log(this)
}

demoFunction();
printEndOfExample()

// function with new operator create an empty object {} and point 
// this to that empty object 

const demo = new demoFunction()
printEndOfExample()

// binding this
// callback functions are attached to window object
// to access object property we need to pass second arg to foreach loop
const video = {
    title: 'a',
    tags: ['b', 'c', 'd'],
    showTags() {
        this.tags.forEach(function (tag){
            console.log(this.title, tag)
        },this)
    }
}

video.showTags()
printEndOfExample()

// Not all function support this arg.
const videoExample = {
    title: 'a',
    tags: ['b', 'c', 'd'],
    showTags() {
        const self = this
        this.tags.forEach(function (tag){
            console.log(self.title, tag)
        })
    }
}

videoExample.showTags()
printEndOfExample()

// better approach 
function playVideo(a, b) {
    console.log(this, a, b);
}

playVideo.call({name: 'Ripon'}, 1, 2)
playVideo.apply({name: 'Ripon'}, [1, 2])
playVideo.bind({name: 'Ripon'})(1, 2)

const videoExample2 = {
    title: 'a',
    tags: ['b', 'c', 'd'],
    showTags() {
        this.tags.forEach(function (tag){
            console.log(this.title, tag)
        }.bind(this))
    }
}

videoExample2.showTags()
printEndOfExample()

// best approach (arrow function)
const videoExample3 = {
    title: 'a',
    tags: ['b', 'c', 'd'],
    showTags() {
        this.tags.forEach((tag) => {
            console.log(this.title, tag)
        })
    }
}

videoExample3.showTags()
printEndOfExample()


const sum = (...numbers) => numbers.reduce((total, item) => total+=item)
console.log(sum([1, 2, 3, 4, 5]));
printEndOfExample()


const Circle = {
    radius: 0,
    get area() {
        return Math.PI * this.radius * this.radius;
    }
}

Circle.radius = 5;
console.log(Circle.area)

