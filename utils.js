// In this file you fill out two functions, buildStats and groupBy.
// We provided docstrings to clarify what types we expect the inputs and outputs to be
// however it should be noted that because javascript is a dynamic typed language
// these type "annotations" are not enforced: they're just for reference.

/**
 * convertStringToNumber: this function converts a numeric string formatted for display to a number
 * @param {String} data - the data to be manipulated
 * @returns {Number} The converted number
 */
function convertStringToNumber(str) {
  return Number(str.split(',').join(''));
}

/**
 * buildStats: this function iterates across an array and computes some statistics
 * specifically, the min, max, sum, count, and mean.
 *
 * hint: the values in the file are stored as strings, so it will be useful to cast those
 * values to numbers. You will want to use the provided convertStringToNumber function.
 *
 * You should need no more than once pass through the data to compute these values.
 *
 * @param {Array of Objects} data - the data to be manipulated
 * @param {String} accessorKey - the key of the data to be evaluated
 * @returns {Object} Object of the form
    {min: NUMBER, max: NUMBER, sum: NUMBER, count: NUMBER, mean: NUMBER}
 */
function buildStats(data, accessorKey) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  let sum = 0;
  let count = 0;

  function getStat(a) {
    const n = convertStringToNumber(a[accessorKey]);
    if (min > n) {
      min = n;
    }
    if (max < n) {
      max = n;
    }
    sum += n;
    count += 1;
  }

  data.forEach(getStat);
  return {min, max, sum, count, mean: sum / count};
}

/**
 * Group by. This function organizes an input array into a collection of arrays in an object structure
 * to wit: with input data [{'taste': 'a'}, {'taste': 'a'}, {'taste': 'b'}], and key 'taste'
 * then the expected output will be
 * {'a': [{'taste': 'a'}, {'taste': 'a'}], 'b': {'taste': 'b'}}
 * @param {Array of Objects} data - the data to be manipulated
 * @param {String} accessorKey - The group by key name
 * @returns {Object} Object with keys equal to values found by the accessorKey and values equal
 to arrays of rows from the input data.
 */
function groupBy(data, accessorKey) {
  const output = {};
  let currKey = '';
  let currArray;

  function compareKey(a, b) {
    const s = a[accessorKey];
    const t = b[accessorKey];
    if (s < t) {
      return -1;
    } else if (s > t) {
      return 1;
    }
    return 0;
  }

  function compareRank(a, b) {
    const s = Number(a['2016 rank']);
    const t = Number(b['2016 rank']);
    if (s < t) {
      return -1;
    }
    return 1;
  }

  data.sort(compareKey);

  function groupElement(element) {
    if (element[accessorKey] !== currKey) {
      if (currKey !== '') {
        currArray.sort(compareRank);
        output[currKey] = currArray;
      }
      currKey = element[accessorKey];
      currArray = [];
    }
    currArray.push(element);
  }

  data.forEach(groupElement);
  output[currKey] = currArray;
  return output;
}

// when writing functions in node we make them available to other files and programs
// by writing a module.exports blob that describes that contents of the file.
// the process is slightly different in browser side javascript, which we will
// see in the coming weeks
module.exports = {
  groupBy,
  buildStats
};
