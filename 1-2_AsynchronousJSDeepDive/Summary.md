# Asyncchronous JavaScript Deep Dive

1. [Understanding Asynchronous Coding](#understanding-asynchronous-coding)
2. [The Necessity of Callbacks](#the-necessity-of-callbacks)
3. [Promises](#promises)
4. [Async Await](#async-await)
5. [Making Use of Generators](#making-use-of-generators)

## Understanding Asynchronous Coding

### Synchronous VS Asynchronous

- **Synchronous** code is executed line by line.
- **Asynchronous** means that things can happen independently of the main program flow.

> Callbacks are very important pattern for achieving asynchronous code.

### Advantages and Disadvantages

Synchronous Code:
Advantages

- Easy to write and reason about

Disadvantages

- May create blocking code
- Less performant

Asynchronous Code:

Advantages

- Very performant
- Eliminates code blocking

Disadvantages

- It can be difficult to reason about
- Hader to write

### Understanding the Event Loop

Consider:

``` JavaScript
/*EVENT LOOP - Synchronous*/
while isNotEmpty(eventQueue) {
    // pull out first item from event queue
    // Follorw the execution logic until call stack empty
}
```

Notes:

- **Call stack:** asynchronous code
- **Callback queue:** for a callback queue function to execute there must be no instruction executing on the call stack or a function being executed ahead of the callback queue

## The Necessity of Callbacks

> "I will call back later!"

- A callback is a function passed as an argument to another function
- This technique allows a function to call another function
- A callback function can run after another function has finished

> Where callbacks really shine are in asynchronous functions, where one function has to wait for another function (like waiting for a file to load).

### Asynchronous Coding and Callbacks

When you are using callbaks, avoid to use `()` to invoke the callback function.

``` JavaScript
let determineTotal = function() {
    let total = 0,
        count = 0;

    processStudents(students, function(obj) {
        total = total + obj.score;
        count++;
    });

    console.log("Total Score: " + total + " - Total Count: " + count);
}

setTimeout(determineTotal, 0);
```

Where: `setTimeout(determineTotal, 0);`

### Problems with JavaScript Callbacks

- **Callback** hell, it is related to a bunch of nested callbacks becomes very difficult to work with callbacks.
- **Difficult to reason about**, if you have a lot of callbacks, that's what makes it difficult to reason about.
- **Inversion of control**, you cannot have callbacks is you turn control of your program over to something for example, if you are using asynchronous coding to connect with a server and get data wich you would need to do that control is turned over to something on the server or you may be using an API call that uses asynchronous coding that uses callbacks and you don't have control of that code.

## Promises

- A Promise is an Object with Properties an Methods.
- Represents the Eventual Completion or Failure of an Asynchronous Operation.
- Provides a Resulting Value.

### A Quick Overview of Fetch

[Fecth](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses.

### Promises examples

Example:

``` JavaScript
"use strict";

let wordnikWords = "http://api.wordnik.com/v4/words.json/",
    wordnikWord = "http://api.wordnik.com/v4/word.json/",
    apiKey = "?api_key=[API_KEY]]",
    wordObj;

fetch(wordnikWords + "randomWord" + apiKey)
.then(function(response) {
    wordObj = response;
    return response.json();
})
.then(function(data) {
    console.log(data.word);
    return fetch(wordnikWord + data.word + "/definitions" + apiKey);
})
.then(function(def) {
    return def.json();
})
.then(function(def) {
    console.log(def);
})
.catch(function(err) {
    console.log(err);
});
```

We can retrieve data with Fetch helps, we can access to data using `then` and `catch` to handle errors.

``` JavaScript
"use strict";

// GETTING DATA
/*fetch('https://jsonplaceholder.typicode.com/todos/5')
.then(data => data.json())
.then(obj => console.log(obj));*/

// POSTING DATA
let todo = {
    completed: false,
    userId: 1,
    title: "Learn Promises"
};

fetch('https://sonplaceholder.typicode.com/todos/', {
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(todo)
})
.then(resp => resp.json())
.then(obj => console.log(obj))
.catch(reject => console.log(`Unable to create todo ${reject}`));

console.log('Other code');
```

### IIFEs

Immediately Invoked Function Expression, is a JavaScript function that runs as soon as it is defined. The name IIFE is promoted by Ben Alman.

``` JavaScript
// IIFE
(function () {
  /* ... */
})();
```

``` JavaScript
// Arrow Function IIFE
(() => {
  /* ... */
})();
```

``` JavaScript
// async IIFE
(async () => {
  /* ... */
})();
```

### Creating JS Promises

``` JavaScript
"use strict"

let setTimeoutPromise = function(time) {
    return new Promise(function(res, rej) {
        if (isNaN(time)) {
            rej("A number is required.");
        }
        setTimeout(res, time);
    });
};

setTimeoutPromise(2000) 
// Change value to "word" as parameter to check the error
    .then(function() {
        console.log("Done");
    })
    .catch(function(err) {
        console.error(err);
    });
```

### Finally feature

The finally() method returns a Promise. When the promise is finally either fulfilled or rejected, the specified callback function is executed. This provides a way for code to be run whether the promise was fulfilled successfully, or instead rejected.

### Promise.all

The `Promise.all()` method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.

``` JavaScript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.

### Promise.race

The `Promise.race()` method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

``` JavaScript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"
```

### Promise.allSettled

The `Promise.allSettled()` method returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

It is typically used when you have multiple asynchronous tasks that are not dependent on one another to complete successfully, or you'd always like to know the result of each promise.

In comparison, the Promise returned by `Promise.all()` may be more appropriate if the tasks are dependent on each other / if you'd like to immediately reject upon any of them rejecting.

``` JavaScript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result.status)));

// expected output:
// "fulfilled"
// "rejected"
```

### Promise.any

`Promise.any()` takes an iterable of `Promise` objects.
It returns a single promise that resolves as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise. If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an `AggregateError`, a new subclass of `Error` that groups together individual errors.

## Async Await

### Introduccion to Async Await

Async Await keywords appeared in the JavaScript world after promises, in fact using Async Await requires that you understand and know how to work with promises.

The main purpose of async await is to simplify our promise code.

Promises help simplify all the nesting that happens with `callbacks` and `async/await` are going to simplify Promises.

Basically async functions enable us to write promise based code as if it were synchronous but without blocking the execution thread.

So the code will look like a regular synchronous code but it will include the asynchronous functionality and making the code look synchronous it is much easier to reason about, basically async await extend promises and make them more powerful, now since async await extend promises.

> Does that mean we should just always use `async await` and never use promises? No, it does not. The synchronous portion os `async await` can sometimes have a tradeoff. So there are times yopu will want to use `Promises`. There are times you'll want to use `async await`.

**IMPORTANT:**

#### `async` keyword

Async is used with a function when `async` is used as a part of a function definition it forces the function to return a `Promise`.

- If the function is already retuning a value that value is wrapped in a promise.
- If no value is being returned it still causes the function to return a promise.

``` JavaScript
"use strict"
const plainFunction = async function() {
    console.log('start');
    return 'done';
}

var result = plainFunction();
```

#### `await` keyword

Use await keyword when you want to pause and wait for a promise to resolve.

- It can only be used inside an async function.
- It waits for a Promise.
- It causes the async function to pause.

``` JavaScript
"use strict"

const asyncFunction = async function() {
    let response = await anotherAsyncFunction();
    console.log(response);
}

asyncFunction();
```

#### Mapping a JavaScript Array

If you need to manipulate the values of an array, use map. Don't modify the existing array.

> `map` creates a new array from an array

``` JavaScript
"use strinct"

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let product = function(val) {
    return val * val; // return val ** 2;
};

let square = nums.map(product);
let quad = nums.map(product).map(product);
```

Objects in array

``` JavaScript
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let objs = nums.map(function(val, index, arr) {
    return {
        index: index,
        val: val,
        square: val ** 2,
        cube: val ** 3,
        origArray: arr
    };
});
```

#### Using Async Await

``` JavaScript
"use strict";

const swapiFilms = async function() {
    let url = "https://swapi.co/api/films",
        filmsData = {},
        films = [];
    
    filmsData = await fetch(url).then(data => data.json());

    // Processing data
    films = filmsData.results.map(obj => obj.title);

    console.log(films);
};

swapiFilms();
```

#### Filtering a JS Array

If you need to filter values in an array, you should be using the filter method, not a loop.

> Filter returns an array

``` JavaScript
let scores = [87, 65, 90, 100, 55, 0, 92, 43, 85];

let passScores = scores.filter(function(val) {
    return val > 60;
});

// With arrow functions
let passScores = scores.filter(val => val > 60);
```

#### `try catch` and `for of`

Consider:

``` JavaScript
"use strict"
const moviePlanets = async function(movieNum) {
    let url = 'https://swapi.co/api/films/';

    try {
        if (isNaN(movieNum)) {
            throw "You must pass in number"
        }
        let movieOBJ = await $.getJSON(url + movieNum + '/');
        console.log(movieObj.title);
    
        let promises = movieObj.planets.map(url => $.getJSON(url));
    
        for await (let pl of promises ) {
            console.log(pl.name);
        }
    } catch(e) {
        console.error(e);
    }
};

moviePlanets(3);
```

IIFEs example:

``` JavaScript

"use strict"

(async function() {
    let data = await fetch('https://jsonplaceholder.typicode.com/todos');
    let obj = await data.json();

    console.log(obj);
})(); // Applying IIFEs

/*fetch('https://jsonplaceholder.typicode.com/todos')
.then(data => data.json())
.then(obj => console.log(obj));
*/
console.log('Other code');
```

#### Using Promise.all with async await

``` JavaScript
"use strict";

let firstName = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Steven");
        }, 1000);
    });
};

let lastName = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Hancock");
        }, 3000);
    });
};

let middleName = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("W.");
        }, 4000);
    });
};

(async function() {
    let names = await Promise.all([firstName(), lastName(), middleName()]);
    console.log(names[0] + " " + names[1] + " " = names[2]);
})();
```

#### Careful Coding with async await

- Async Await is new does not mean you should rewrite everything in async await you need
- You need to make decicions based upon what you know.
- The big advantage about async await is that it is easier to reason about.
- Async await takes asynchronous code and makes it synchronous which is easier to reason about (it is not necessarily more performance).
- In fact it is possible to write async functions that are not performing at all (you need to write these carefully).
- *Remember* the await keyboard causes the engine to wait, so *waiting* is not performance.
- Make sure your waiting is not blocking code that could be running asynchronously.
- A good rule of thumb is to keep ypur async functions small do smaller tasks.
- Do not create a huge async function or you may end up blocking some code, you do not intend to block.

> Async Await is simple a pattern allows us to manage and work with asynchronous code, it does not make the code asynchronous.
>
>As we know in async function return a promise so we can use `.then(...)` method.

#### Using async on Object Methods

``` JavaScript
"use strict";

var userObj = {
    firstName: 'Steven',
    lastName: 'Hancock',
    async printFullName() {
        let punct = await asyncFunction(1000);
        console.log(`${this.firstName} ${this.lastname} ${punct}`);
    }
};

userObj.printFullName();

// Steven Hancock!
```

``` JavaScript
class Greetings {
    constructor(greet) {
        this.greet = greet;
    }
    async greeting(name) {
        let punct = await asyncFunction(2000);
        console.log(`${this.greet} ${name}${punct}`);
    }
};

var mornGreet = new Greetings("Good Morning");
mornGreet.greeting('Steven');

//Good Morning Steven!
```

## Making Use of Generators

- Basically a generator is a way to writee code that you can pause and then continue at a later time.
- A generator is a function that we can use to cause the code to yield and the code won't continue until we tell it to at some later time.
- When you yield or pause the code it doesn't  hold up code that may be elsewhere, it simply pauses at the yield line in the generator function as you will see in this section.
- Perhaps a more technical way to describe it is you start a generator function and then you can exit that function before it runs all the code.
- Later you can reenter that function at the point where you exited it is even possible that you do not want to continue the function at all and so it may not ever finish.

### Understanding and Using Generators

- You must define a function as a generator function and this requires the use of the asterisk character.
- The second part requires the yield keyword you place yield statements inside the generator

Example:

``` JavaScript
// Just a function
"use strict";

function genTest() {
    let x = 0;
    console.log('start');
    x++;
    console.log(x);
    x++;
    console.log(x);
    x++;
    console.log('end');
    return x;
}

let gen = genTest();
```

Converting the previous function to a generator function:

``` JavaScript
// Adding '*' to convert into a  generator function
"use strict";

function *genTest() {
    let x = 0;
    console.log('start');
    yield x++;
    console.log(x);
    x++;
    yield;
    console.log(x);
    x++;
    console.log('end');
    return x;
}

let gen = genTest();
```

Using `yield` keyword, you need to use `<name_variable>.next()` on console, where `<name_valiable>` has the function assigned.

> Can you declare an arrow function as a generator and as of right now you cannot do that.

### Fibonacci example

``` JavaScript
"use strict";

const fibonacci = function *(len, nums = [0, 1]) {
    let num1 = nums[0],
        num2 = nums[1],
        next,
        cnt = 2;
    while (cnt < len) {
        next = num1 + num2;
        num1 = num2;
        num2 = next;
        nums.push(next);
        cnt++;
        yield nums;
    }
    return nums;
}

var fib = fibonacci(20);
```

### Using a Generator to Create an "Iterator"

``` JavaScript
"use strict";

let arr = ['a', 'b', 'c', 'd', 'e'];
//let it = arr[Symbol.iterator]();

const arrIt = function *(arr) {
    for (let i = 0; i , arr.length; i++) {
        yield arr[i];
    }
};

let it = arrIt(arr);
console.log("Remaining code.");
```

On console: `it.next()`

### Two-way communication with generators

``` JavaScript
"use strict";

function *yieldConsole() {
    let val = yield;
    console.log(val);
};

let it = yieldConsole();
let prompt = it.next().value;
console.log(prompt);
```

On Console:

``` Shell
Enter a value
> it.next(500);
500
>> {value: undefined, done: true}
```
