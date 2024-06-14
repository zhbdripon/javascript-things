// create object in different ways

// 1. Object literals 

const circle = {
    radius: 2,
    draw: function() {
        console.log('drawing a circle of radius ', this.radius)
    }
}

console.log(circle.draw())

// 2. factory function
function createCircle(radius) {

    return {
        radius,
        draw: function() {
            console.log('drawing a circle of radius ', radius)
        }
    }
}

const circleObj = createCircle(3)
console.log(circleObj.draw())

// 3. constructor
function Circle(radius) {
    this.radius = radius
    this.draw = function () {
        console.log('drawing a circle of radius ', this.radius)
    }
}

const anotherCircleObject = new Circle(5)
console.log(anotherCircleObject.draw())

// In javascript function are object

// private properties and methods

function Square(size) {
    this.size = size

    // private prop
    let defaultLocation = {
        x: 0,
        y: 0
    }
    // private method
    let calculateOptimalLocation = function(){
        //...
    }

    this.draw = function () {
        console.log('drawing a circle of square ', this.size)
    }
}