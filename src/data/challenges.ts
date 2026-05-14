export interface Challenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "Array" | "String" | "Linked List" | "Tree" | "DP" | "Graph" | "Recursion" | "JavaScript";
  description: string;
  boilerplate: string;
  solution: string;
  detailedExplanation: string;
  tips: string[];
  solutionRegex: string;
}

export const CHALLENGES: Challenge[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description: `### The Problem\nGiven an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.`,
    boilerplate: "function twoSum(nums, target) {\n  // Your code here\n}",
    solution: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}",
    detailedExplanation: "We use a HashMap to achieve O(n) time. As we traverse, we check if the 'complement' exists in our map.",
    tips: ["HashMap for O(1) lookup.", "Complement = target - current."],
    solutionRegex: "map\\.has\\(comp\\)|map\\.set"
  },
  {
    id: "product-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array",
    description: `### The Problem\nGiven an integer array \`nums\`, return an array such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.`,
    boilerplate: "function productExceptSelf(nums) {\n  // Your code here\n}",
    solution: "function productExceptSelf(nums) {\n  const res = new Array(nums.length).fill(1);\n  let left = 1;\n  for (let i = 0; i < nums.length; i++) {\n    res[i] = left;\n    left *= nums[i];\n  }\n  let right = 1;\n  for (let i = nums.length - 1; i >= 0; i--) {\n    res[i] *= right;\n    right *= nums[i];\n  }\n  return res;\n}",
    detailedExplanation: "We use two passes. First pass builds the prefix products. Second pass multiplies by suffix products.",
    tips: ["Prefix/Suffix products.", "O(n) time, O(1) space."],
    solutionRegex: "res\\[i\\] = left|res\\[i\\] \\*= right"
  },
  {
    id: "three-sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Array",
    description: `### The Problem\nGiven an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.`,
    boilerplate: "function threeSum(nums) {\n  // Your code here\n}",
    solution: "function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum === 0) {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++; r--;\n      } else if (sum < 0) l++;\n      else r--;\n    }\n  }\n  return res;\n}",
    detailedExplanation: "Sort the array, then iterate through and use Two Pointers to find the pair that sums to the negative of the current element.",
    tips: ["Sort first.", "Two pointers.", "Handle duplicates."],
    solutionRegex: "nums\\.sort|while \\(l < r\\)"
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array",
    description: `### The Problem\nMerge all overlapping intervals.`,
    boilerplate: "function merge(intervals) {\n  // Your code here\n}",
    solution: "function merge(intervals) {\n  if (!intervals.length) return [];\n  intervals.sort((a, b) => a[0] - b[0]);\n  const res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = res[res.length - 1];\n    if (intervals[i][0] <= last[1]) {\n      last[1] = Math.max(last[1], intervals[i][1]);\n    } else {\n      res.push(intervals[i]);\n    }\n  }\n  return res;\n}",
    detailedExplanation: "Sort by start time, then merge overlapping ones.",
    tips: ["Sort by start.", "Math.max for end."],
    solutionRegex: "intervals\\.sort|Math\\.max"
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "String",
    description: `### The Problem\nCheck if two strings are anagrams.`,
    boilerplate: "function isAnagram(s, t) {\n  // Your code here\n}",
    solution: "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let c of s) count[c] = (count[c] || 0) + 1;\n  for (let c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}",
    detailedExplanation: "Use a frequency map for O(n) performance.",
    tips: ["Frequency Map."],
    solutionRegex: "count\\[c\\]"
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "String",
    description: `### The Problem\nGroup anagrams together from an array of strings.`,
    boilerplate: "function groupAnagrams(strs) {\n  // Your code here\n}",
    solution: "function groupAnagrams(strs) {\n  const map = {};\n  for (let s of strs) {\n    const key = s.split('').sort().join('');\n    if (!map[key]) map[key] = [];\n    map[key].push(s);\n  }\n  return Object.values(map);\n}",
    detailedExplanation: "Sort each string to create a unique key for anagrams.",
    tips: ["Sorted key."],
    solutionRegex: "sort\\(\\)\\.join"
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    description: `### The Problem\nFind the longest palindromic substring in a string.`,
    boilerplate: "function longestPalindrome(s) {\n  // Your code here\n}",
    solution: "function longestPalindrome(s) {\n  let res = '';\n  for (let i = 0; i < s.length; i++) {\n    const p1 = expand(s, i, i);\n    const p2 = expand(s, i, i + 1);\n    if (p1.length > res.length) res = p1;\n    if (p2.length > res.length) res = p2;\n  }\n  return res;\n  function expand(s, l, r) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }\n    return s.substring(l + 1, r);\n  }\n}",
    detailedExplanation: "Expand around center for each character (odd and even lengths).",
    tips: ["Expand around center.", "Check odd/even."],
    solutionRegex: "expand\\(s, i, i\\)|substring"
  },
  {
    id: "promise-all",
    title: "Implement Promise.all",
    difficulty: "Medium",
    category: "JavaScript",
    description: `### The Problem\nImplement a polyfill for Promise.all.`,
    boilerplate: "function myPromiseAll(promises) {\n  // Your code here\n}",
    solution: "function myPromiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    const res = [];\n    let count = 0;\n    if (promises.length === 0) resolve([]);\n    promises.forEach((p, i) => {\n      Promise.resolve(p).then(val => {\n        res[i] = val;\n        count++;\n        if (count === promises.length) resolve(res);\n      }).catch(reject);\n    });\n  });\n}",
    detailedExplanation: "Track resolution count and preserve order.",
    tips: ["Count resolutions.", "Preserve index."],
    solutionRegex: "res\\[i\\] = val"
  },
  {
    id: "debounce",
    title: "Implement Debounce",
    difficulty: "Medium",
    category: "JavaScript",
    description: `### The Problem\nLimit rate of function execution.`,
    boilerplate: "function debounce(fn, t) {\n  // Your code here\n}",
    solution: "function debounce(fn, t) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), t);\n  }\n}",
    detailedExplanation: "Clear existing timer on every call.",
    tips: ["clearTimeout.", "setTimeout."],
    solutionRegex: "clearTimeout"
  },
  {
    id: "throttle",
    title: "Implement Throttle",
    difficulty: "Medium",
    category: "JavaScript",
    description: `### The Problem\nEnsure function executes at most once per interval.`,
    boilerplate: "function throttle(fn, t) {\n  // Your code here\n}",
    solution: "function throttle(fn, t) {\n  let last = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - last >= t) {\n      fn.apply(this, args);\n      last = now;\n    }\n  }\n}",
    detailedExplanation: "Track last execution time.",
    tips: ["Date.now().", "Comparison."],
    solutionRegex: "now - last >= t"
  },
  {
    id: "deep-clone",
    title: "Implement Deep Clone",
    difficulty: "Medium",
    category: "JavaScript",
    description: `### The Problem\nCreate a deep copy of an object (including nested ones).`,
    boilerplate: "function deepClone(obj) {\n  // Your code here\n}",
    solution: "function deepClone(obj, map = new WeakMap()) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (map.has(obj)) return map.get(obj);\n  const res = Array.isArray(obj) ? [] : {};\n  map.set(obj, res);\n  for (let key in obj) {\n    if (obj.hasOwnProperty(key)) res[key] = deepClone(obj[key], map);\n  }\n  return res;\n}",
    detailedExplanation: "Use recursion and a WeakMap to handle circular references.",
    tips: ["Recursion.", "WeakMap for circular refs."],
    solutionRegex: "WeakMap|Array\\.isArray"
  },
  {
    id: "flatten-array",
    title: "Flatten Array",
    difficulty: "Easy",
    category: "JavaScript",
    description: `### The Problem\nFlatten a nested array.`,
    boilerplate: "function flatten(arr) {\n  // Your code here\n}",
    solution: "function flatten(arr) {\n  return arr.reduce((acc, val) => \n    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), \n  []);\n}",
    detailedExplanation: "Recursive reduction.",
    tips: ["reduce.", "Array.isArray."],
    solutionRegex: "acc\\.concat"
  },
  {
    id: "memoize",
    title: "Implement Memoize",
    difficulty: "Medium",
    category: "JavaScript",
    description: `### The Problem\nCache function results.`,
    boilerplate: "function memoize(fn) {\n  // Your code here\n}",
    solution: "function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const res = fn.apply(this, args);\n    cache.set(key, res);\n    return res;\n  }\n}",
    detailedExplanation: "Map with stringified args as keys.",
    tips: ["Map.", "JSON.stringify."],
    solutionRegex: "cache\\.has"
  },
  {
    id: "curry",
    title: "Implement Currying",
    difficulty: "Medium",
    category: "JavaScript",
    description: `### The Problem\nConvert fn(a,b,c) to fn(a)(b)(c).`,
    boilerplate: "function curry(fn) {\n  // Your code here\n}",
    solution: "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) return fn.apply(this, args);\n    return function(...args2) { return curried.apply(this, args.concat(args2)); }\n  }\n}",
    detailedExplanation: "Arity check and recursive argument collection.",
    tips: ["fn.length.", "Recursion."],
    solutionRegex: "fn\\.length"
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray (Kadane's)",
    difficulty: "Easy",
    category: "Array",
    description: `### The Problem\nFind the contiguous subarray with the largest sum.`,
    boilerplate: "function maxSubArray(nums) {\n  // Your code here\n}",
    solution: "function maxSubArray(nums) {\n  let maxSoFar = nums[0], currentMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(nums[i], currentMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n  }\n  return maxSoFar;\n}",
    detailedExplanation: "Dynamic programming approach (Kadane's). At each step, decide whether to start a new subarray or continue the current one.",
    tips: ["Kadane's Algorithm.", "O(n) time."],
    solutionRegex: "Math\\.max"
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Array",
    description: `### The Problem\nReturn true if any value appears at least twice.`,
    boilerplate: "function containsDuplicate(nums) {\n  // Your code here\n}",
    solution: "function containsDuplicate(nums) {\n  return new Set(nums).size !== nums.length;\n}",
    detailedExplanation: "Set automatically removes duplicates. Compare sizes.",
    tips: ["Set for uniqueness.", "O(n) space."],
    solutionRegex: "new Set"
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "String",
    description: `### The Problem\nCheck if brackets are balanced and correctly nested.`,
    boilerplate: "function isValid(s) {\n  // Your code here\n}",
    solution: "function isValid(s) {\n  const stack = [];\n  const pairs = { ')': '(', '}': '{', ']': '[' };\n  for (let c of s) {\n    if (pairs[c]) {\n      if (stack.pop() !== pairs[c]) return false;\n    } else stack.push(c);\n  }\n  return stack.length === 0;\n}",
    detailedExplanation: "Use a stack to track open brackets.",
    tips: ["Stack (LIFO).", "Hash map for pairs."],
    solutionRegex: "stack\\.pop\\(\\)"
  },
  {
    id: "array-map-polyfill",
    title: "Implement Array.map",
    difficulty: "Easy",
    category: "JavaScript",
    description: `### The Problem\nImplement the map() method for arrays.`,
    boilerplate: "Array.prototype.myMap = function(callback) {\n  // Your code here\n}",
    solution: "Array.prototype.myMap = function(callback) {\n  const res = [];\n  for (let i = 0; i < this.length; i++) {\n    res.push(callback(this[i], i, this));\n  }\n  return res;\n}",
    detailedExplanation: "Iterate and apply callback to each element.",
    tips: ["this context.", "Index and array arguments."],
    solutionRegex: "callback\\(this\\[i\\]"
  },
  {
    id: "bind-polyfill",
    title: "Implement Function.bind",
    difficulty: "Medium",
    category: "JavaScript",
    description: `### The Problem\nImplement a polyfill for Function.prototype.bind.`,
    boilerplate: "Function.prototype.myBind = function(context, ...args) {\n  // Your code here\n}",
    solution: "Function.prototype.myBind = function(context, ...args) {\n  const fn = this;\n  return function(...args2) {\n    return fn.apply(context, args.concat(args2));\n  }\n}",
    detailedExplanation: "Return a new function that uses apply with bound context and merged arguments.",
    tips: ["Closures.", "Apply/Call."],
    solutionRegex: "fn\\.apply"
  },
  {
    id: "rotate-array",
    title: "Rotate Array",
    difficulty: "Medium",
    category: "Array",
    description: `### The Problem\nRotate an array to the right by k steps.`,
    boilerplate: "function rotate(nums, k) {\n  // Your code here\n}",
    solution: "function rotate(nums, k) {\n  k %= nums.length;\n  const reverse = (arr, l, r) => {\n    while (l < r) {\n      [arr[l], arr[r]] = [arr[r], arr[l]];\n      l++; r--;\n    }\n  }\n  reverse(nums, 0, nums.length - 1);\n  reverse(nums, 0, k - 1);\n  reverse(nums, k, nums.length - 1);\n}",
    detailedExplanation: "Triple reverse trick for O(1) space rotation.",
    tips: ["Reverse segments.", "Modulo k."],
    solutionRegex: "reverse\\(nums, 0, k - 1\\)"
  },
  {
    id: "array-reduce-polyfill",
    title: "Implement Array.reduce",
    difficulty: "Medium",
    category: "JavaScript",
    description: `### The Problem\nImplement the reduce() method for arrays.`,
    boilerplate: "Array.prototype.myReduce = function(callback, initialValue) {\n  // Your code here\n}",
    solution: "Array.prototype.myReduce = function(callback, initialValue) {\n  let acc = initialValue !== undefined ? initialValue : this[0];\n  let start = initialValue !== undefined ? 0 : 1;\n  for (let i = start; i < this.length; i++) {\n    acc = callback(acc, this[i], i, this);\n  }\n  return acc;\n}",
    detailedExplanation: "Handle initial value correctly and iterate through the array to accumulate results.",
    tips: ["Initial value check.", "Start index logic."],
    solutionRegex: "callback\\(acc, this\\[i\\]"
  },
  {
    id: "flatten-object",
    title: "Flatten Object",
    difficulty: "Medium",
    category: "JavaScript",
    description: `### The Problem\nConvert a nested object into a single-level object with dot-notation keys.`,
    boilerplate: "function flattenObject(obj) {\n  // Your code here\n}",
    solution: "function flattenObject(obj, prefix = '') {\n  return Object.keys(obj).reduce((acc, key) => {\n    const pre = prefix.length ? prefix + '.' : '';\n    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {\n      Object.assign(acc, flattenObject(obj[key], pre + key));\n    } else {\n      acc[pre + key] = obj[key];\n    }\n    return acc;\n  }, {});\n}",
    detailedExplanation: "Use recursion and dot-notation for keys. Skip nulls and arrays if desired.",
    tips: ["Recursion.", "Object.assign().", "Prefix handling."],
    solutionRegex: "flattenObject\\(obj\\[key\\]"
  },
  {
    id: "first-unique-char",
    title: "First Unique Character",
    difficulty: "Easy",
    category: "String",
    description: `### The Problem\nFind the index of the first non-repeating character in a string.`,
    boilerplate: "function firstUniqChar(s) {\n  // Your code here\n}",
    solution: "function firstUniqChar(s) {\n  const count = {};\n  for (let c of s) count[c] = (count[c] || 0) + 1;\n  for (let i = 0; i < s.length; i++) {\n    if (count[s[i]] === 1) return i;\n  }\n  return -1;\n}",
    detailedExplanation: "Two passes: first to count, second to find the first character with a count of one.",
    tips: ["Frequency Map.", "Two passes."],
    solutionRegex: "count\\[s\\[i\\]\\] === 1"
  },
  {
    id: "reverse-words",
    title: "Reverse Words in a String",
    difficulty: "Medium",
    category: "String",
    description: `### The Problem\nReverse the order of words in a string, removing extra spaces.`,
    boilerplate: "function reverseWords(s) {\n  // Your code here\n}",
    solution: "function reverseWords(s) {\n  return s.trim().split(/\\s+/).reverse().join(' ');\n}",
    detailedExplanation: "Trim, split by regex for multiple spaces, reverse, and join.",
    tips: ["Regex split.", "Trim whitespace."],
    solutionRegex: "split\\(/\\\\s\\+/\\)"
  },
  {
    id: "search-rotated-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Array",
    description: `### The Problem\nSearch for a target in a sorted array that has been rotated.`,
    boilerplate: "function search(nums, target) {\n  // Your code here\n}",
    solution: "function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n      else l = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n      else r = mid - 1;\n    }\n  }\n  return -1;\n}",
    detailedExplanation: "Binary search with a twist. Identify which half is sorted and check if the target lies within it.",
    tips: ["Binary Search.", "Sorted half check."],
    solutionRegex: "while \\(l <= r\\)"
  },
  {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    category: "String",
    description: `### The Problem\nFind the longest common prefix string amongst an array of strings.`,
    boilerplate: "function longestCommonPrefix(strs) {\n  // Your code here\n}",
    solution: "function longestCommonPrefix(strs) {\n  if (!strs.length) return '';\n  let prefix = strs[0];\n  for (let i = 1; i < strs.length; i++) {\n    while (strs[i].indexOf(prefix) !== 0) {\n      prefix = prefix.substring(0, prefix.length - 1);\n      if (!prefix) return '';\n    }\n  }\n  return prefix;\n}",
    detailedExplanation: "Start with the first string as prefix and progressively shorten it until it matches the start of every other string.",
    tips: ["Progressive shortening.", "indexOf check."],
    solutionRegex: "indexOf\\(prefix\\) !== 0"
  },
  {
    id: "array-filter-polyfill",
    title: "Implement Array.filter",
    difficulty: "Easy",
    category: "JavaScript",
    description: `### The Problem\nImplement the filter() method for arrays.`,
    boilerplate: "Array.prototype.myFilter = function(callback) {\n  // Your code here\n}",
    solution: "Array.prototype.myFilter = function(callback) {\n  const res = [];\n  for (let i = 0; i < this.length; i++) {\n    if (callback(this[i], i, this)) res.push(this[i]);\n  }\n  return res;\n}",
    detailedExplanation: "Iterate and push to result only if the callback returns true.",
    tips: ["this context.", "Predicate check."],
    solutionRegex: "if \\(callback"
  },
  {
    id: "max-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "Array",
    description: `### The Problem\nFind the contiguous subarray within an array which has the largest product.`,
    boilerplate: "function maxProduct(nums) {\n  // Your code here\n}",
    solution: "function maxProduct(nums) {\n  let max = nums[0], min = nums[0], res = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    const tmp = max;\n    max = Math.max(nums[i], Math.max(nums[i] * max, nums[i] * min));\n    min = Math.min(nums[i], Math.min(nums[i] * tmp, nums[i] * min));\n    res = Math.max(res, max);\n  }\n  return res;\n}",
    detailedExplanation: "Track both max and min products at each step to handle negative numbers (min becomes max when multiplied by a negative).",
    tips: ["Track min and max.", "Handle negative numbers."],
    solutionRegex: "Math\\.min\\(nums\\[i\\] \\* tmp"
  },
  {
    id: "is-object-polyfill",
    title: "Implement Object.is",
    difficulty: "Easy",
    category: "JavaScript",
    description: `### The Problem\nImplement a polyfill for Object.is.`,
    boilerplate: "function myObjectIs(a, b) {\n  // Your code here\n}",
    solution: "function myObjectIs(a, b) {\n  if (a === b) return a !== 0 || 1 / a === 1 / b;\n  return a !== a && b !== b;\n}",
    detailedExplanation: "Handle the two cases where Object.is differs from ===: +0 vs -0 and NaN vs NaN.",
    tips: ["+0 vs -0.", "NaN check."],
    solutionRegex: "1 / a === 1 / b"
  }
];
