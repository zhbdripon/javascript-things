/**
 * https://www.greatfrontend.com/questions/javascript/breadth-first-search
 * @param {Record<string, Array<string>} graph The adjacency list representing the graph.
 * @param {string} source The source node to start traversal from. Has to be a valid node if graph is non-empty.
 * @return {Array<string>} A BFS-traversed order of nodes.
 */
export default function breadthFirstSearch(graph, source) {
    let queue = source.length > 0 ? [source]: []
    let res = []
    let visit = {}
  
    while(queue.length > 0) {
  
        let item = queue[0]    
  
        if (!visit[item]) {
          visit[item] = true;
          res.push(item);
          queue = queue.length > 1 ? queue.slice(1, queue.length) : [];
  
          (graph[item] || []).forEach(child => {
  
            if (!visit[child]) {
              queue.push(child);
            }
          })
        }else {
          queue = queue.length > 1 ? queue.slice(1, queue.length) : [];
        }
    }
  
    return res;
  }
  
  /*  Auxiliary classes */
  
  /**
   * A Queue class with O(1) enqueue and dequeue is provided for you.
   * You can use it directly should you wish to.
   *
   * Example usage:
   * const q = new Queue();
   * q.enqueue('a');
   * q.enqueue('b');
   * q.dequeue(); //'a'
   * q.isEmpty(); // False
   */
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class Queue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    isEmpty() {
      return this.length === 0;
    }
  
    enqueue(item) {
      const newNode = new Node(item);
      if (this.isEmpty()) {
        this.head = newNode;
      } else if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
      this.length++;
    }
  
    dequeue() {
      if (this.isEmpty() || !this.head) {
        return null;
      } else {
        const removedNode = this.head;
        this.head = this.head.next;
        removedNode.next = null;
        this.length--;
        if (this.isEmpty()) {
          this.tail = null;
        }
        return removedNode.value;
      }
    }
  }