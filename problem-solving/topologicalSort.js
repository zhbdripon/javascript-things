// https://www.greatfrontend.com/questions/javascript/topological-sort
//https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/

/**
 * @param {Object} graph Node to array of traversable neighboring nodes.
 * @return {Array<string>} A topological traversal of nodes.
 */
export default function topologicalSort(graph) {
    let inDegree = {};
    let allVertex = new Set();
    let queue = new Queue();
  
    for (let u in graph) {
      allVertex.add(u);
      for (let v of graph[u]) {
        allVertex.add(v);
        inDegree[v] = inDegree[v] ? inDegree[v] + 1 : 1;
      }
    }
  
    allVertex.forEach((v) => {
      if (!inDegree[v]) {
        queue.enqueue(v);
      }
    })
  
    let result = [];
  
    while (!queue.isEmpty()) {
      u = queue.front();
      queue.dequeue();
      result.push(u);
  
      for (let v of graph[u]) {
        inDegree[v]--;
  
        if (inDegree[v] === 0) {
          queue.enqueue(v);
        }
      }
    }
  
    return result;
  }
  
  // `Queue` data structure is provided in case you want to use it.
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
  }


  // Queue is not part of solution
  class Queue {
    constructor() {
      this._dummyHead = new Node();
      this._dummyTail = new Node();
      this._dummyHead.prev = this._dummyTail;
      this._dummyTail.next = this._dummyHead;
      this._length = 0;
    }
  
    /**
     * Adds an item to the back of the queue.
     * @param {*} item The item to be pushed onto the queue.
     * @return {number} The new length of the queue.
     */
    enqueue(item) {
      const node = new Node(item);
      const prevLast = this._dummyTail.next;
      prevLast.prev = node;
  
      node.next = prevLast;
      node.prev = this._dummyTail;
      this._dummyTail.next = node;
      this._length++;
      return this._length;
    }
  
    /**
     * Remove an item from the front of the queue.
     * @return {*} The item at the front of the queue if it is not empty, `undefined` otherwise.
     */
    dequeue() {
      if (this.isEmpty()) {
        return undefined;
      }
  
      const node = this._dummyHead.prev;
      const newFirst = node.prev;
      this._dummyHead.prev = newFirst;
      newFirst.next = this._dummyHead;
      // Unlink the node to be dequeued.
      node.prev = null;
      node.next = null;
      this._length--;
      return node.value;
    }
  
    /**
     * Determines if the queue is empty.
     * @return {boolean} `true` if the queue has no items, `false` otherwise.
     */
    isEmpty() {
      return this._length === 0;
    }
  
    /**
     * Returns the item at the front of the queue without removing it from the queue.
     * @return {*} The item at the front of the queue if it is not empty, `undefined` otherwise.
     */
    front() {
      if (this.isEmpty()) {
        return undefined;
      }
  
      return this._dummyHead.prev.value;
    }
  
    /**
     * Returns the item at the back of the queue without removing it from the queue it.
     * @return {*} The item at the back of the queue if it is not empty, `undefined` otherwise.
     */
    back() {
      if (this.isEmpty()) {
        return undefined;
      }
  
      return this._dummyTail.next.value;
    }
  
    /**
     * Returns the number of items in the queue.
     * @return {number} The number of items in the queue.
     */
    length() {
      return this._length;
    }
  }
  