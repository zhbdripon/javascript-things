// https://coderbyte.com/results/zhbdripon:Bracket%20Combinations:JavaScript
function BracketCombinations(num) {

    let cnt = 0;
  
    const find = (st, en) => {
      // console.log(st,en)`
  
      if (st === num && en === num) {
        cnt++;
        return;
      }
  
      if ((st === num) || (st > en && en < num)) {
        find(st, en + 1);
      }
  
      if (st < num && en < num) {
        find(st+1, en);
      }
  
    }
  
  
    find(0,0);
    // code goes here  
    return cnt; 
  
  }
     
  // keep this function call here 
  console.log(BracketCombinations(readline()));