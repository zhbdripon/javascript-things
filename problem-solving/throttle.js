function throttle(cb, wait) {
    let shouldWait = false;
    let waitingArgs = null;
    const timeoutFunc = () => {
        if (waitingArgs) {
            cb(waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, wait)
        }else {
            shouldWait = false;
        }
    }

    return (...args) => {
        if (shouldWait) {
            waitingArgs = args
            return;
        }

        cb(...args);
        shouldWait = true;

        setTimeout(timeoutFunc, wait);
    }
}