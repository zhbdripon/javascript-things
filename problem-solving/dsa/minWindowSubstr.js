// https://coderbyte.com/results/zhbdripon:Min%20Window%20Substring:JavaScript

function MinWindowSubstring(strArr) {

    const search = strArr[1];
    const text = strArr[0];
    let res = text;
  
    const myset = new Set();
    const mymap = new Map();
  
    search.split("").forEach(c => {
      if(!myset.has(c)) {
        myset.add(c)
      }
    })
  
    let i = 0, minres = text.length;
    for (let ch of text) {
      
      if (mymap.has(ch)) {
        mymap.set(ch, {cnt: mymap.get(ch).cnt + 1, pos: i});
      }else {
        mymap.set(ch, {cnt: 1, pos: i});
      }
  
      let allAvailable = true;
      let minInx = text.length, maxInx = 0;
  
      for (let ss of myset) {
        if (!mymap.has(ss)) {
          allAvailable = false;
        }else {
          minInx = Math.min(minInx, mymap.get(ss).pos);
          maxInx = Math.max(maxInx, mymap.get(ss).pos)
        }
      }
  
      if (allAvailable && minres >= maxInx - minInx + 1) {
        minres = maxInx - minInx + 1;
        res = text.substr(minInx, maxInx - minInx + 1);
      }
  
      i++;
    }
  
    // code goes here  
    return res; 
  
  }
     
  // keep this function call here 
  console.log(MinWindowSubstring(readline()));