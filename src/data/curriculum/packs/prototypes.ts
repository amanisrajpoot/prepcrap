import { TopicPack } from "@/types/curriculum";

export const prototypesPack: TopicPack = {
  topic: {
    id: "prototypes",
    moduleId: "js-foundations",
    trackId: "javascript",
    title: "Prototypes & OOP",
    order: 3,
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 45, 
      interviewFrequency: 7, 
      importance: 8,
      topGotchas: [
        "Arrow functions do not have a prototype property and cannot be used as constructors.",
        "Modifying Object.prototype directly affects all objects, including for...in loops.",
        "The difference between __proto__ (the actual prototype of the object) and .prototype (the object used to build __proto__ when using 'new')."
      ]
    },
    objectives: ["Understand prototypal inheritance", "Differentiate between __proto__ and prototype", "Implement inheritance without classes"]
  },
  activities: [
    // --- 1. LEARNING (10%) ---
    {
      id: "proto-learn-match",
      topicId: "prototypes",
      objectiveId: "Differentiate between __proto__ and prototype",
      category: "learn",
      type: "progressive-match",
      difficulty: "foundation",
      payload: {
        prompt: "Match the prototype concepts",
        terms: [
          { id: "t1", text: ".__proto__ (or [[Prototype]])", definitionId: "d1" },
          { id: "t2", text: ".prototype", definitionId: "d2" },
          { id: "t3", text: "Prototype Chain", definitionId: "d3" }
        ],
        definitions: [
          { id: "d1", text: "The actual hidden reference pointing to the object's parent prototype." },
          { id: "d2", text: "A property only on Functions, used as the blueprint when called with 'new'." },
          { id: "d3", text: "The series of linked objects JS searches through when accessing a property." }
        ]
      }
    },

    // --- 2. PREDICT OUTPUT (40%) ---
    {
      id: "proto-predict-arrow",
      topicId: "prototypes",
      objectiveId: "Understand prototypal inheritance",
      category: "practice",
      type: "code-prediction",
      difficulty: "intermediate",
      payload: {
        question: "What happens when you try to instantiate an arrow function?",
        code: "const Animal = (name) => {\n  this.name = name;\n};\n\nconst dog = new Animal('Dog');",
        options: [
          { id: "1", text: "dog.name is 'Dog'", isCorrect: false, explanation: "Arrow functions have special restrictions." },
          { id: "2", text: "Throws TypeError: Animal is not a constructor", isCorrect: true, explanation: "Correct! Arrow functions do not have a `.prototype` property and they cannot bind a new `this` context. Therefore, they cannot be invoked with the `new` keyword." },
          { id: "3", text: "Returns undefined", isCorrect: false, explanation: "It crashes before returning." },
          { id: "4", text: "Throws ReferenceError", isCorrect: false, explanation: "The variable exists, but it's not a constructor." }
        ]
      }
    },
    {
      id: "proto-predict-chain",
      topicId: "prototypes",
      objectiveId: "Differentiate between __proto__ and prototype",
      category: "practice",
      type: "code-prediction",
      difficulty: "advanced",
      payload: {
        question: "What does this code log to the console?",
        code: "function Person() {}\nconst bob = new Person();\n\nconsole.log(bob.__proto__ === Person.prototype);\nconsole.log(Person.__proto__ === Function.prototype);",
        options: [
          { id: "1", text: "true, false", isCorrect: false, explanation: "What is `Person`? It's a function." },
          { id: "2", text: "true, true", isCorrect: true, explanation: "Correct! When using `new`, the object's `__proto__` is mapped to the constructor's `.prototype`. Also, because `Person` is a function, its own internal `__proto__` inherits from `Function.prototype`." },
          { id: "3", text: "false, true", isCorrect: false, explanation: "The first statement is the definition of how `new` works." },
          { id: "4", text: "false, false", isCorrect: false, explanation: "Both evaluate to true." }
        ]
      }
    },
    {
      id: "proto-predict-global",
      topicId: "prototypes",
      objectiveId: "Understand prototypal inheritance",
      category: "practice",
      type: "code-prediction",
      difficulty: "advanced",
      payload: {
        question: "What is the risk of this pattern?",
        code: "Object.prototype.sayHello = function() {\n  return 'Hello';\n};\n\nconst obj = { a: 1 };\nfor (let key in obj) {\n  console.log(key);\n}",
        options: [
          { id: "1", text: "It logs 'a', then 'sayHello'", isCorrect: true, explanation: "Correct! Modifying `Object.prototype` pollutes the prototype chain for EVERY object in JS. The `for...in` loop iterates over enumerable properties in the prototype chain as well, so 'sayHello' will unexpectedly show up in loops." },
          { id: "2", text: "It only logs 'a'", isCorrect: false, explanation: "Properties added to prototypes are enumerable by default." },
          { id: "3", text: "Throws a TypeError", isCorrect: false, explanation: "Modifying prototypes is legally allowed in JS." },
          { id: "4", text: "Nothing is logged", isCorrect: false, explanation: "The loop executes." }
        ]
      }
    },

    // --- 3. DEBUGGING (25%) ---
    {
      id: "proto-debug-method",
      topicId: "prototypes",
      objectiveId: "Implement inheritance without classes",
      category: "practice",
      type: "debug",
      difficulty: "intermediate",
      payload: {
        scenario: "Creating 10,000 instances of Car crashes the browser due to high memory consumption.",
        code: "function Car(make) {\n  this.make = make;\n  this.drive = function() {\n    console.log('Vroom');\n  };\n}",
        bugLine: 3,
        explanation: "By defining `this.drive` inside the constructor, a brand new function object is created in memory for every single Car instance. Fix it by moving the method to the prototype: `Car.prototype.drive = function() { ... }`, so all instances share a single function reference."
      }
    },
    {
      id: "proto-debug-create",
      topicId: "prototypes",
      objectiveId: "Understand prototypal inheritance",
      category: "practice",
      type: "debug",
      difficulty: "advanced",
      payload: {
        scenario: "The developer wants to create a pure dictionary object with no inherited properties at all (so it doesn't accidentally inherit methods like .toString).",
        code: "const dict = {};\n\ndict['key'] = 'value';",
        bugLine: 1,
        explanation: "Using the `{}` literal creates an object that inherits from `Object.prototype`. If you type `dict.toString`, it resolves to a function. To create a completely empty object with no prototype chain, use `Object.create(null)`."
      }
    },

    // --- 4. EXPLAIN (15%) ---
    {
      id: "proto-interview-delegation",
      topicId: "prototypes",
      objectiveId: "Understand prototypal inheritance",
      category: "evaluate",
      type: "interview",
      difficulty: "advanced",
      payload: {
        question: "Explain the concept of 'Behavior Delegation' in JavaScript as opposed to classical inheritance.",
        modelAnswer: "In classical inheritance, classes are blueprints that are copied into objects during instantiation. \n\nJavaScript doesn't copy behavior. Instead, it uses Behavior Delegation. Objects are linked to other objects via the prototype chain (`__proto__`). When you call a method on an object, if it doesn't exist locally, JS delegates the lookup up the chain to the linked prototype object.\n\nIt's a system of linked objects sharing behavior rather than copying blueprints.",
        interviewContext: "This is a profound conceptual distinction. Showing you understand delegation proves you deeply grasp JavaScript's core object model."
      }
    },

    // --- 5. IMPLEMENTATION (10%) ---
    {
      id: "proto-implement-create",
      topicId: "prototypes",
      objectiveId: "Implement inheritance without classes",
      category: "practice",
      type: "code-completion",
      difficulty: "advanced",
      payload: {
        prompt: "Complete the code to link the `Dog` prototype to the `Animal` prototype without executing the Animal constructor.",
        template: "function Animal() {}\nAnimal.prototype.eat = function() {};\n\nfunction Dog() {}\n\nDog.prototype = Object.{{blank1}}({{blank2}});\nDog.prototype.constructor = Dog;",
        answers: [{"blank1": "create", "blank2": "Animal.prototype"}],
        explanation: "`Object.create()` creates a new object and sets its `__proto__` to the object passed in. By doing `Object.create(Animal.prototype)`, we successfully inherit the methods without calling `new Animal()`, which might have unwanted side effects."
      }
    }
  ]
};
