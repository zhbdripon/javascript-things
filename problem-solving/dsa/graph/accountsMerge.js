// https://leetcode.com/problems/accounts-merge/description/
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  let graph = new Map();
  let emailName = new Map();
  let emails = new Set();
  let visit = new Set();

  const addEmailInfo = (email, name) => {
    emails.add(email);
    emailName.set(email, name);
  };

  for (let account of accounts) {
    let name = account[0];

    let email1 = account[1];
    addEmailInfo(email1, name);
    const list1 = graph.get(email1) || [];

    for (let j = 2; j < account.length; j++) {
      let email2 = account[j];
      addEmailInfo(email2, name);
      const list2 = graph.get(email2) || [];
      list1.push(email2);
      list2.push(email1);
      graph.set(email1, list1);
      graph.set(email2, list2);
    }
  }

  const dfs = (email, emailList = []) => {
    visit.add(email);
    emailList.push(email);
    for (let _email of graph.get(email) || []) {
      if (!visit.has(_email)) {
        dfs(_email, emailList);
      }
    }
  };

  let res = [];

  for (let email of emails) {
    if (!visit.has(email)) {
      let emailList = [];
      dfs(email, emailList);
      res.push([emailName.get(email), ...emailList.sort()]);
    }
  }

  return res;
};
