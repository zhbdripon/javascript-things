function isStrobogrammatic(num) {
  const mappedDigit = {
    0: "0",
    1: "1",
    6: "9",
    9: "6",
    8: "8",
  };

  for (let i = 0; i < num.length; i++) {
    let cur = num[i];
    if (mappedDigit[cur] === undefined) {
      return false;
    }
    let mirrorChar = num[num.length - i - 1];

    if (mappedDigit[cur] !== mirrorChar) {
      return false;
    }
  }

  return true;
}
