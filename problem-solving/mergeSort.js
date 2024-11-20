// https://www.greatfrontend.com/questions/javascript/merge-sort

/**
 * @param {Array<number>} arr The input integer array to be sorted.
 * @return {Array<number>}
 */
export default function recursiveMergeSort(arr) {
    let temp = new Array(arr.length).fill(null);
  
    function mergerSort(st, en) {
      if (st >= en) return;
  
      let mid = Math.floor((en - st) / 2) + st;
  
      mergerSort(st, mid);
      mergerSort(mid + 1, en);
  
      let li = st;
      let ri = mid + 1;
  
      for (let i = st; i <= en; i++) {
        let valueAtLeft = arr[li];
        let valueAtRight = arr[ri];
  
        if (valueAtLeft <= valueAtRight) {
          temp[i] = valueAtLeft;
          li++;
        } else {
          temp[i] = valueAtRight;
          ri++;
        }
  
        while (li > mid && ri <= en) {
          temp[++i] = arr[ri++];
        }
  
        while (li <= mid && ri > en) {
          temp[++i] = arr[li++];
        }
      }
  
      for (let i = st; i <= en; i++) {
        arr[i] = temp[i];
      }
    }
  
    mergerSort(0, arr.length - 1);
  
    return arr;
  }
  