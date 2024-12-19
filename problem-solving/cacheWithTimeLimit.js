// https://leetcode.com/problems/cache-with-time-limit/

var TimeLimitedCache = function () {};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  if (!this._timeData) {
    this._timeData = {};
  }

  this._setKey = function () {
    this._timeData[key] = {
      value: value,
      duration: Date.now() + duration,
    };
  };

  if (this._timeData[key] && this._timeData[key]["duration"] >= Date.now()) {
    this._setKey();
    return true;
  } else {
    this._setKey();
    return false;
  }
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  if (
    this._timeData &&
    this._timeData[key] &&
    this._timeData[key]["duration"] >= Date.now()
  ) {
    return this._timeData[key]["value"];
  }

  return -1;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  if (!this._timeData) {
    return 0;
  }

  let cur = Date.now(),
    count = 0;

  for (let key of Object.keys(this._timeData)) {
    let item = this._timeData[key];

    if (item && item["duration"] >= cur) {
      count++;
    }
  }

  return count;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
