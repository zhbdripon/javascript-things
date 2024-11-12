function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func(...args)
        }, wait);
    }
}


function sayHello(arg) {
    console.log(arg)
}

const debouncedFunc = debounce(sayHello, 300)

debouncedFunc("Hello world")