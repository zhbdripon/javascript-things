function throttle(cb, wait) {
  let shouldWait = false;
  let waitingArgs = null;
  let waitingThis = null;

  const timeoutFunc = () => {
    if (waitingArgs) {
      cb.apply(waitingThis, waitingArgs);
      waitingArgs = null;
      waitingThis = null;
      setTimeout(timeoutFunc, wait);
    } else {
      shouldWait = false;
    }
  };

  return function (...args) {
    if (shouldWait) {
      waitingArgs = args;
      waitingThis = this;
      return;
    }

    cb.apply(this, args);
    shouldWait = true;

    setTimeout(timeoutFunc, wait);
  };
}

// simple one but not perfect
// function throttle(fn, limit) {
//     let isThrottled = false;
//     return (...args) => {
//         if (isThrottled) return;

//         isThrottled = true;
//         setTimeout(() => {
//             isThrottled = false;
//         }, limit)


//         fn.apply(this, args);
//     }
// }