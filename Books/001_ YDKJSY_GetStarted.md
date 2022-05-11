# You don't know JS yet: Get Started

1. [Chapter1: What Is JavaScript?](#chapter-1-what-is-javascript)
    - [Filling the Gaps](#filling-the-gaps)
    - [Web Assembly (WASM)](#web-assembly-wasm)
    - [Strictly Speaking](#strictly-speaking)
    - [Defined](#defined)
2. [Chapter2: SurveyingJS](#chapter-2-surveying-js)
    - [Values](#values)
    - [Arrays And Objects](#arrays-and-objects)
    - [Declaring and Using Variables](#declaring-and-using-variables)
    - [Functions](#functions)
    - [Comparisons](#comparisons)
    - [How We Organize in JS](#how-we-organize-in-js)
3. [Chapter3: Digging to the Roots of JS](#chapter-3-digging-to-the-roots-of-js)
    - [Iteration](#iteration)
    - [Closure](#closure)
    - [`this` Keyword](#this-keyword)
    - [Prototypes](#prototypes)
    - [Asking "Why?"](#asking-"why")
4. [Chapter4: The Bigger Picture](#chapter-4-the-bigger-picture)
    - [Pillar 1: Scope and Closure](#pillar-1-scope-and-closure)
    - [Pillar 2: Prototypes](#pillar-2-prototypes)
    - [Pillar 3: Types and Coercion](#pillar-3-types-and-coercion)

## Chapter 1: What is JavaScript?

- Its main task is to manage the official specification
- There is only one JS, the official standard maintained by TC39 and ECMA.
- the JS defined in the specification and the JS that runs on browser-based JS engines is the same.
- But there are some differences that need to be taken into account. In these cases, TC39 will often backtrack and simply choose to adjust the specification to the reality of the web.
- JavaScript is definitely a multi-paradigm language.
- JavaScript is preserving backwards compatibility.
- Once a change is in JS, it can't be removed because it might break programs, even if we'd really like to remove it!

- Use Babel if you want to translate the code to an older version.

### **Filling the Gaps**

- Missing API method that was only recently added, the most common solution is to provide a definition for that missing API method that stands in and acts as if the older environment had already had it natively defined. This pattern is called a polyfill (aka “shim”).

- Transpilers like Babel typically detect which polyfills your code needs and provide them automatically for you. But occasionally you may need to include/define them explicitly.

**Note:** Recomienda a los developers usar la ultima version de JS para que el codigo sea mas limpio y se pueda transmitir de fomra clara las ideas. 

**What's in an Interpretation?**
“interpreted” languages and “scripting” languages have been looked down on as inferior compared to their compiled counterparts.

The reasons for this acrimony are numerous, including the perception that there is a lack of performance optimization, as well as dislike of certain language characteristics, such as scripting languages generally using dynamic typing instead of the “more mature” statically typed languages.

- **Interpreted languages**, codigo ejecutado linea por linea
- **Compiled languages**, any error would be caught during the parsing phase, before any execution has begun, and none of the program would run


`/* Abstract Syntax Tree (AST) */`

` /* JS es un lenguaje compilado*/`

### **Web Assembly (WASM)**

 - WASM is a representation format more akin to Assembly (hence, its name) that can be processed by a JS engine by skipping the parsing/compilation that the JS engine normally does. The parsing/compilation of a WASM-targeted program happen ahead of time (AOT); what’s distributed is a  binary-packed program ready for the JS engine to execute with very minimal processing.
 - An initial motivation for WASM was clearly the potential performance improvements.
 - WASM is additionally motivated by the desire to bring more parity for non-JS languages to the web platform.
 - WASM offers the potential for such a Go program to be converted to a form the JS engine can understand, without needing a threads feature in the JS language itself.
 - That means JS feature development can be judged (by TC39) without being skewed by interests/demands in other language ecosystems, while still letting those languages have a viable path onto the web.
 - WASM is evolving to become a cross-platform virtual machine (VM) of sorts, where programs can be compiled once and run in a variety of different system environments.
 - WASM isn’t only for the web, and WASM also isn’t JS

 **Note:** WASM lets other languages run in the JS engine

### Strictly Speaking

 - Why strict mode? because it is a guide to the best way to do things so that the JS engine has the best chance of optimizing and efficiently running the code.
 - It’s vastly better to simply turn strict mode on for the entire file/program.
 - When JS made strict mode the default? Due to compatibility, the answer is NO.
 - Virtually all transpiled code ends up in strict mode even if the original source code isn’t written as such.

### Defined

- JS is an implementation of the ECMAScript standard (version ES2019 as of this writing), which is guided by the TC39 committee and hosted by ECMA. It runs in browsers and other JS environments such as Node.js.

- JS is a multi-paradigm language, meaning the syntax and capabilities allow a developer to mix and match (and bend and reshape!) concepts from various major paradigms, such as procedural, object-oriented (OO/classes), and functional (FP).

- JS is a compiled language, meaning the tools (including the JS engine) process and verify a program (reporting any errors!) before it executes.

## Chapter 2: Surveying JS

- In JS, each standalone file is its own separate program.
- Regardless of which code organization pattern (and loading mechanism) is used for a file (standalone or module), you should still think of each file as its own (mini) program, which may then cooperate with other (mini) programs to perform the functions of your overall application.

### Values

The most fundamental unit of information in a program is a value. Values are data. They’re how the program maintains state. Values come in two forms in JS: **primitive** and **object**.

#### **Primitive**

*String literal*

`When use double-quote or single-quote to delimit string literals? The choice of which quote character is entirely stylistic. The important thing, for code readability and maintainability sake, is to pick one and to use it consistently throughout the program.`

Another option to delimit a string literal is to use the backtick ` character. But using the backtick you can send it parameters. This is called **interpolation**.

 `console.log(``My name is ${ firstName }.``);// My name is Kyle.`

##### *Booleans, Numbers (Bigint)* 
In addition to strings, numbers, and booleans, two other primitive values in JS programs are null and undefined.

*null and undefined* for the most part both values serve the purpose of indicating emptiness (or absence) of a value. However, it’s safest and best to use only undefined as the single empty value.

*Symbol* The final primitive value to be aware of is a symbol, which is a special-purpose value that behaves as a hidden unguessable value. Symbols are almost exclusively used as special keys on objects:

`hitchhikersGuide[ Symbol("meaning of life") ]; //42` 

You won’t encounter direct usage of symbols very often in typical JS programs. They’re mostly used in low-level code such as in libraries and frameworks.

#### Arrays And Objects

*Arrays* are a special type of object that’s comprised of an ordered and numerically indexed list of data:

`names = [ "Frank", "Kyle", "Peter", "Susan" ];`
`names.length; // 4`
`names[0]; // Frank`
`names[1]; // Kyle`

JS arrays can hold any value type, either primitive or object (including other arrays)

*Objects* are more general: an unordered, keyed collection of any various values.

```
name = {
    first: "Kyle",
    last: "Simpson",
    age: 39,
    specialties: [ "JS", "Table Tennis" ]
};
```
```
console.log(`My name is ${ name.first }.`);
```

Another syntax option that accesses information in an object by its property/key uses the square-brackets [ ], such as name["first"].

##### **Value Type Determination**

For distinguishing values, the typeof operator tells you its built-in type, if primitive, or "object" otherwise:

```
typeof 42; // "number"
typeof "abc"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" -- bug!
typeof { "a": 1 }; // "object"
typeof [1,2,3]; // "object"
typeof function hello(){}; // "function"
```
*Warning* typeof null unfortunately returns "object" instead of the expected "null". Also, typeof returns the specific "function" for functions, but not the expected "array" for arrays.

### Declaring and Using Variables

The var keyword declares a variable to be used in that part of the program, and optionally allows initial value assignment. 

Another similar keyword is let, the **let** keyword has some differences to var, with the most obvious being that let allows a more limited access to the variable than var. This is called “block scoping” as opposed to regular or function scoping. 

```
/* Let's see this code */

var adult = true;
if (adult) {
    var name = "Kyle";
    let age = 39;
    console.log("Shhh, this is a secret!");
}

console.log(name); // Kyle
console.log(age); // Error!
```

Block-scoping is very useful for limiting how widespread variable declarations are in our programs, which helps pre- vent accidental overlap of their names.

But var is still useful in that it communicates “this variable will be seen by a wider scope”. 

A third declaration form is const. It’s like let but has an additional limitation that it must be given a value at the moment it’s declared, and cannot be re-assigned a different value later.
`const pi = 3.1416;`

It’s ill-advised to use const with object values, because those values can still be changed even though the variable can’t be re-assigned. This leads to potential confusion down the line.

```
const actors = [
"Morgan Freeman", "Jennifer Aniston"
];
actors[2] = "Tom Cruise";   // OK :(
actors = []; // Error!
```

The best semantic use of a const is when you have a simple primitive value that you want to give a useful name to.

**Tip:** If you stick to using const only with primitive values, you avoid any confusion of re-assignment (not allowed) vs. mutation (allowed)! That’s the safest and best way to use const.

There are other syntactic forms that declare identifiers (variables) in various scopes:

```
function hello(name) { 
    console.log(`Hello, ${ name }.`);
}
hello("Kyle");  // Hello, Kyle.
```

The identifier hello is created in the outer scope, and it’s also automatically associated so that it references the function. But the named parameter name is created only inside the function, and thus is only accessible inside that function’s scope. hello and name generally behave as **var-declared**.

Another syntax that declares a variable is a catch clause:

```
try { someError();
}
catch (err) {
    console.log(err);
}
```

The err is a block-scoped variable that exists only inside the catch clause, as if it had been declared with **let**.

### Functions

In JS, we should consider “function” to take the broader meaning of another related term: “procedure.” A procedure is a collection of statements that can be invoked one or more times, may be provided some inputs, and may give back one or more outputs.

```
function awesomeFunction(coolThings) { 
    // ..
    return amazingStuff; 
}
```
This is called a function declaration.

The association between the identifier awesomeFunction and the function value happens during the compile phase of the code, before that code is executed.

In contrast to a function declaration statement, a function expression can be defined and assigned like this:

```
// let awesomeFunction = ..
// const awesomeFunction = ..
var awesomeFunction = function(coolThings) {
    // ..
    return amazingStuff; 
};
```

JS functions can receive parameter input.
Functions also can return values using the return keyword.

You can only return a single value, but if you have more val- ues to return, you can wrap them up into a single object/array.
Since functions are values, they can be assigned as properties on objects:

```
var whatToSay = { 
    greeting() {
        console.log("Hello!");
    },
    question() {
        console.log("What's your name?");
    }, answer() {
        console.log("My name is Kyle.");
    }
};
whatToSay.greeting(); // Hello!
```

### Comparisons

<ins>*Equal...ish*</ins>

The most common comparison in JS programs asks the ques- tion, “Is this X value the same as that Y value?” What exactly does “the same as” really mean to JS, though?

We must be aware of the nuanced differences between an equality comparison and an equivalence comparison.

“strict equality” or **"==="**, checking both the value and the type

```
3 === 3.0;   // true
"yes" === "yes";   // true
null === null;   // true
false === false;   // true

42 === "42";  // false
"hello" === "Hello";  // false
true === 1;  // false
0 === null;  // false
"" === null;  // false
null === undefined;  // false
```

The === operator is designed to lie in two cases of special values: NaN and -0. Consider:

```
NaN === NaN; // false 
0 === -0; // true
```

Note: For NaN comparisons, use the Number.isNaN(..) utility, which does not lie. For -0 comparison, use the Object.is(..) utility, which also does not lie. Object.is(..) can also be used for non-lying NaN checks, if you prefer.

`Humorously, you could think of Object.is(..) as the “quadruple-equals” ====, the really- really-strict comparison!`

When we consider comparisons of object values (non-primitives).
Consider:

```
[1,2,3]===[1,2,3]; // false 
{ a: 42 } === { a: 42 } // false 
(x=>x*2)===(x=>x*2) // false
```

When it comes to objects, a content-aware comparison is generally referred to as “structural equality.”

JS does not define === as structural equality for object values. Instead, === uses identity equality for object values.

In JS, all object values are held by reference, are assigned and passed by reference-copy, and to our current discussion, are compared by reference (identity) equality. Consider:

```
var x = [ 1, 2, 3 ];
// assignment is by reference-copy, so 
// y references the *same* array as x, 
// not another copy of it.
var y = x;
y === x; // true 
y===[1,2,3]; // false 
x===[1,2,3]; // false
```

In this snippet, y === x is true because both variables hold a reference to the same initial array. But the === [1,2,3] comparisons both fail because y and x, respectively, are being compared to new different arrays [1,2,3]. The array structure and contents don’t matter in this comparison, only the **reference identity**.

**Note:** JS does not provide a mechanism for structural equality comparison of object values, only reference identity compar- ison. To do structural equality comparison, you’ll need to implement the checks yourself.

**CAREFUL:** How might you determine if two function references are “structurally equivalent”? Even stringifying to compare their source code text wouldn’t take into account things like closure. JS doesn’t provide structural equality comparison because it’s almost intractable to handle all the corner cases!

<ins>*Coercive Comparisons*</ins>

Coercion means a value of one type being converted to its respective representation in another type (to whatever extent possible). [Coercion](#chapter-4-the-bigger-picture) is a core pillar of the JS language, not some optional feature that can reasonably be avoided.

The == operator, generally referred to as the “loose equality” operator.

`// Related to '==', the creator of the language himself, Brendan Eich, has lamented how it was designed as a big mistake.`

If the value types being compared are different, the == differs from === in that it allows coercion before the comparison. In other words, they both want to compare values of like types, but == allows type conversions first, and once the types have been converted to be the same on both sides, then == does the same thing as ===. Instead of “loose equality,” the == operator should be described as “coercive equality.”

```
42 == "42"; // true 
1 == true; // true
```

In both comparisons, the value types are different, so the == causes the non-number values ("42" and true) to be converted to numbers (42 and 1, respectively) before the comparisons are made.

Just being aware of this nature of ==—that it prefers primitive and numeric comparisons—helps you avoid most of the trou- blesome corner cases, such as staying away from a gotchas like "" == 0 or 0 == false.

**Should we use === instead == to avoid any coercive equality comparison?** 
There’s a pretty good chance that you’ll use relational com- parison operators like <, > (and even <= and >=).

Just like ==, these operators will perform as if they’re “strict” if the types being relationally compared already match, but they’ll allow coercion first (generally, to numbers) if the types differ.

```
var arr = [ "1", "10", "100", "1000" ];
for (let i = 0; i < arr.length && arr[i] < 500; i++) {
    // will run 3 times
}
```

Notes: 
- The i < arr.length comparison is “safe” from coercion because i and arr.length are always numbers.
- The arr[i] < 500 invokes coercion, though, because the arr[i] values are all strings.

These relational operators typically use numeric comparisons, except in the case where both values being compared are already strings; in this case, they use alphabetical (dictionary- like) comparison of the strings:

```
var x = "10"; 
var y = "9";
x < y;      // true, watch out!
```

There’s no way to get these relational operators to avoid coercion, other than to just never use mismatched types in the comparisons. That’s perhaps admirable as a goal, but it’s still pretty likely you’re going to run into a case where the types may differ.

The WISER approach is not to avoid c**oercive comparisons**, but to embrace and learn their ins and outs.

### How We Organize in JS

Two major patterns for organizing code (data and behavior) are used broadly across the JS ecosystem: classes and modules. These patterns are not mutually exclusive; many programs can and do use both. Other programs will stick with just one pattern, or even neither!

<ins>*Classes*</ins>

The terms “object-oriented,” “class-oriented,” and “classes” are all very loaded full of detail and nuance; they’re not universal in definition.

We will use a common and somewhat traditional definition here, the one most likely familiar to those with backgrounds in “object-oriented” languages like C++ and Java.

- A class in a program is a definition of a “type” of custom data structure that includes both data and behaviors that operate on that data.
- Classes define how such a data structure works, but classes are not themselves concrete values.
- To get a concrete value that you can use in the program, a class must be instantiated (with the new keyword) one or more times.

```
class Page { 
    constructor(text) {
        this.text = text; 
    }
    print() { 
        console.log(this.text);
    } 
}

class Notebook { 
    constructor() {
        this.pages = []; 
    }
    addPage(text) {
        var page = new Page(text); 
        this.pages.push(page);
    }
    print() {
        for (let page of this.pages) {
            page.print();
        }
    } 
}

var mathNotes = new Notebook(); 
mathNotes.addPage("Arithmetic: + - * / ..."); 
mathNotes.addPage("Trigonometry: sin cos tan ...");
mathNotes.print();
// ..
```

*Class Inheritance*
A bit less commonly used in JS, is “inheritance”.

```
class Publication { 
    constructor(title,author,pubDate) {
        this.title = title; 
        this.author = author; 
        this.pubDate = pubDate;
    }
    print() {
        console.log(`
            Title: ${ this.title } 
            By: ${ this.author } 
            ${ this.pubDate }
        `); 
    }
}
```

Now let’s consider more specific types of publication, like
Book and BlogPost:

```
class Book extends Publication { 
    constructor(bookDetails) {
        super(
            bookDetails.title, 
            bookDetails.author, 
            bookDetails.publishedOn
        );
        this.publisher = bookDetails.publisher; 
        this.ISBN = bookDetails.ISBN;
    }
    print() { 
        super.print();
        console.log(`
            Publisher: ${ this.publisher }
            ISBN: ${ this.ISBN } `
        );
    }
}
```

```
class BlogPost extends Publication { 
    constructor(title,author,pubDate,URL) {
        super(title,author,pubDate);
        this.URL = URL; 
    }
    print() { 
        super.print();
        console.log(this.URL); 
    }
}
```

They do more specific things according to their respective publication type (aka, “sub-class” or “child class”).

```
var YDKJS = new Book({
    title: "You Don't Know JS", 
    author: "Kyle Simpson", 
    publishedOn: "June 2014", 
    publisher: "O'Reilly", 
    ISBN: "123456-789"
});

var forAgainstLet = new BlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014", "https://davidwalsh.name/for-and-against-let"
);
```
To print use: `YDKJS.print();` and `forAgainstLet.print();`

Each of those overridden child class print() methods call super.print() to invoke the inherited version of the print() method.

The fact that both the inherited and overridden methods can have the same name and co-exist is called polymorphism.

Inheritance is a powerful tool for organizing data/behavior in separate logical units (classes), but allowing the child class to cooperate with the parent by accessing/using its behavior and data.

<ins>*Modules*</ins>

- The module pattern has essentially the same goal as the class pattern, which is to group data and behavior together into logical units.
- Also like classes, modules can “include” or “access” the data and behaviors of other modules, for cooperation sake.

But modules have some important differences from classes. Most notably, the syntax is entirely different.

*Classic Modules*

The key hallmarks of a classic module are an outer function (that runs at least once), which returns an “instance” of the module with one or more functions exposed that can operate on the module instance’s internal (hidden) data.

Because a module of this form is just a function, and calling it produces an “instance” of the module, another description for these functions is “module factories”.

Considering Publication, Book, and BlogPost classes:

```
function Publication(title,author,pubDate) { 
    var publicAPI = {
        print() {
            console.log(`
                Title: ${ title } 
                By: ${ author } 
                ${ pubDate }
            `);
        }
    };
    return publicAPI; 
}

function Book(bookDetails) { 
    var pub = Publication( 
        bookDetails.title,
        bookDetails.author,
        bookDetails.publishedOn
    );
    var publicAPI = { 
        print() {
            pub.print();
            console.log(`
                Publisher: ${ bookDetails.publisher }
                ISBN: ${ bookDetails.ISBN } `
            );
        }
    } 
    return publicAPI;
};

function BlogPost(title,author,pubDate,URL) { 
    var pub = Publication(title,author,pubDate);
    var publicAPI = { 
        print() {
            pub.print();
            console.log(URL);
        }
    return publicAPI; 
    }
};
```
- With class, the “API” of an instance is implicit in the class definition
- All data and methods are public. With the module factory function, you explicitly create and return an object with any publicly exposed methods, and any data or other unreferenced methods remain private inside the factory function.

There are other variations to this factory function form that are quite common across JS, even in 2020; you may run across these forms in different JS programs: 
- AMD (Asynchronous Module Definition)
- UMD (Universal Module Definition)
- And CommonJS (classic Node.js-style modules). 

The variations, however, are minor (yet not quite compatible). Still, all of these forms rely on the same basic principles.

Consider also the usage (aka, “instantiation”) of these module factory functions:

```
var YDKJS = Book({
    title: "You Don't Know JS", 
    author: "Kyle Simpson", 
    publishedOn: "June 2014", 
    publisher: "O'Reilly", 
    ISBN: "123456-789"
});

var forAgainstLet = BlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014", 
    "https://davidwalsh.name/for-and-against-let"
);
```

`YDKJS.print();` or `forAgainstLet.print();`

The only observable difference here is the lack of using new, calling the module factories as normal functions.

*ES Modules*

ES modules (ESM), introduced to the JS language in ES6, are meant to serve much the same spirit and purpose as the existing classic modules just described, especially taking into account important variations and use cases from AMD, UMD, and CommonJS.

The implementation approach does, however, differ signifi- cantly.

- First, ESMs are always file-based; one file, one module.
- Second, Use the export keyword to add a variable or method to its public API definition. If something is defined in a module but not exported, then it stays hidden (just as with classic modules). You don’t interact with a module’s “API” explicitly
- Third, you don’t “instantiate” an ES module, you just import it to use its single instance. ESMs are, in effect, “singletons,” in that there’s only one instance ever created, at first import in your program, and all other imports just receive a reference to that same single instance. If your module needs to support multiple instantiations, you have to provide a classic module-style factory function on your ESM definition for that purpose.

In our running example, we do assume multiple-instantiation, so these following snippets will mix both ESM and classic modules.

```
/* publication.js */

function printDetails(title,author,pubDate) { 
    console.log(`
        Title: ${ title } 
        By: ${ author } 
        ${ pubDate }
    `); 
}

export function create(title,author,pubDate) { 
    var publicAPI = {
        print() {
            printDetails(title,author,pubDate);
        } 
    };
    return publicAPI; 
}
```

To import and use this module:

```
/*blogpost.js*/
import { create as createPub } from "publication.js";
function printDetails(pub,URL) { 
    pub.print();
    console.log(URL);
}

export function create(title,author,pubDate,URL) { 
    var pub = createPub(title,author,pubDate);
    var publicAPI = { 
        print() {
            printDetails(pub,URL);
        }
    };
    return publicAPI; 
}
```
And finally, to use this module:

```
/*Main.js*/
import { create as newBlogPost } from "blogpost.js";

var forAgainstLet = newBlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014", "https://davidwalsh.name/for-and-against-let"
);
forAgainstLet.print();
```

Note: Use "as" to rename a generic function to hace readability

As shown, ES modules can use classic modules internally if they need to support multiple-instantiation.

If your module only needs a single instance, you can skip the extra layers of complexity: export its public methods directly.

## Chapter 3: Digging to the Roots of JS

### Iteration
The iterator pattern suggests a “standardized” approach to consuming data from a source one chunk at a time.

The idea is that it’s more common and helpful to iterate the data source—to progressively handle the collection of data by processing the first part, then the next, and so on, rather than handling the entire set all at once.

The iterator pattern defines a data structure called an “iter- ator” that has a reference to an underlying data source (like the query result rows), which exposes a method like next(). Calling next() returns the next piece of data (i.e., a “record” or “row” from a database query).

You don’t always know how many pieces of data that you will need to iterate through, so the pattern typically indicates completion by some special value or exception once you iterate through the entire set and go past the end.

The importance of the iterator pattern is in adhering to a standard way of processing data iteratively, which creates cleaner and easier to understand code, as opposed to having every data structure/source define its own custom way of handling its data.

ES6 standardized a specific protocol for the iterator pattern directly in the lan- guage. 

The protocol defines a next() method whose return is an object called an iterator result ; the object has value and done properties, where done is a boolean that is false until the iteration over the underlying data source is complete.

<ins>*Consuming Iterators*</ins>

With the ES6 iteration protocol in place, it’s workable to consume a data source one value at a time, checking after each next() call for done to be true to stop the iteration.

But this approach is rather manual, so ES6 also included several mechanisms (syntax and APIs) for standardized consumption of these iterators.

One such mechanism is the for..of loop:

```
// given an iterator of some data source:
var it = /* .. */;

// loop over its results one at a time
for (let val of it) {
    console.log(`Iterator value: ${ val }`);
}
// Iterator value: ..
// Iterator value: ..
// ..
```

Another mechanism that’s often used for consuming iterators is the ... operator. This operator actually has two symmetrical forms: spread and rest (or gather, as I prefer). The spread form is an iterator-consumer.

There are two possibilities to *spread* in JS:

```
// An array spread:
var vals = [ ...it ];

// A function call spread:
doSomethingUseful( ...it );
```

In both cases, the iterator-spread form of ... follows the iterator-consumption protocol (the same as the for..of loop) to retrieve all available values from an iterator and place (aka, spread) them into the receiving context (array, argument list).

<ins>*Iterables*</ins>

The iterator-consumption protocol is technically defined for consuming iterables; an iterable is a value that can be iterated over.

The protocol automatically creates an iterator instance from an iterable, and consumes just that iterator instance to its completion. This means a single iterable could be consumed more than once; each time, a new iterator instance would be created and used.

ES6 defined the basic data structure/collection types in JS as iterables. This includes strings, arrays, maps, sets, and others.

```
// an array is an iterable
var arr = [ 10, 20, 30 ];
for (let val of arr) {
    console.log(`Array value: ${ val }`);
}
```
We can shallow-copy an array using iterator consumption via the ... spread operator, because arrays are iterables.

`var arrCopy = [ ...arr ];`

We can also iterate the characters in a string one at a time:
```
var greeting = "Hello world!"; 
var chars = [ ...greeting ];
chars;
// [ "H", "e", "l", "l", "o", " ",
//   "w", "o", "r", "l", "d", "!" ]
```

Maps have a different default iteration than seen here, in that the iteration is not just over the map’s values but instead its entries. An entry is a tuple (2-element array) including both a key and a value.

```
// given two DOM elements, `btn1` and `btn2`

var buttonNames = new Map(); 
buttonNames.set(btn1,"Button 1"); 
buttonNames.set(btn2,"Button 2");
for (let [btn,btnName] of buttonNames) { 
    // [btn,btnName] syntax (called “array destructuring”) 
    btn.addEventListener("click",function onClick(){
        console.log(`Clicked ${ btnName }`); 
    });
}
```

To be more more specific, we can access to values.
```
for (let btnName of buttonNames.values()) { 
    console.log(btnName);
}
// Button 1
// Button 2
```

Or if we want the index and value in an array iteration, we can make an entries iterator with the entries() method:

```
var arr = [ 10, 20, 30 ];
for (let [idx,val] of arr.entries()) { 
    console.log(`[${ idx }]: ${ val }`);
}
// [0]: 10
// [1]: 20
// [2]: 30
```

> Note: For the most part, all built-in iterables in JS have three iterator forms available: keys-only (`keys()`), values-only (`values()`), and entries (`entries()`).

> You can also ensure your own data structures adhere to the iteration protocol; doing so means you opt into the ability to consume your data with `for..of `loops and the `... `operator.

> “Standardizing” on this protocol means code that is overall more readily recognizable and readable.

The iter- ation-consumption protocol expects an iterable, but the reason we can provide a direct iterator is that an iterator is just an iterable of itself! When creating an iterator instance from an existing iterator, the iterator itself is returned.

### Closure

> Closure is when a function remembers and contin- ues to access variables from outside its scope, even when the function is executed in a different scope.

1. First, closure is part of the nature of a function. Objects don’t get closures, functions do. 
2. Second, to observe a closure, you must execute a function in a different scope than where that function was originally defined.

```
function greeting(msg) { 
    return function who(name) {
        console.log(`${ msg }, ${ name }!`); 
    };
}
var hello = greeting("Hello");
var howdy = greeting("Howdy"); 

hello("Kyle");
// Hello, Kyle!

hello("Sarah");
// Hello, Sarah!

howdy("Grant");
// Howdy, Grant!
```

When the greeting(..) function finishes running, normally we would expect all of its variables to be garbage collected (removed from memory). 

`We’d expect each msg to go away, but they don’t. The reason is closure. Since the inner function instances are still alive (assigned to hello and howdy, respec- tively), their closures are still preserving the msg variables.`

```
function counter(step = 1) { 
    var count = 0;
    return function increaseCount(){ 
        count = count + step; 
        return count;
    }; 
}

var incBy1 = counter(1); 
var incBy3 = counter(3);

incBy1(); //1 
incBy1(); //2

incBy3(); //3 
incBy3(); //6 
incBy3(); //9
```

Closure is over the variables and not just snapshots of the values, these updates are preserved.

> Closure is most common when working with asynchronous code, such as with callbacks

```
function getSomeData(url) { 
    ajax(url,function onResponse(resp){
        console.log(
            `Response (from ${ url }): ${ resp }`
        ); 
    });
}
getSomeData("https://some.url/wherever");
// Response (from https://some.url/wherever): ...
```

The inner function onResponse(..) is closed over url, and thus preserves and remembers it until the Ajax call re- turns and executes onResponse(..). Even though getSome- Data(..) finishes right away, the url parameter variable is kept alive in the closure for as long as needed.

It’s not necessary that the outer scope be a function—it usually is, but not always—just that there be at least one variable in an outer scope accessed from an inner function:

```
for (let [idx,btn] of buttons.entries()) { 
    btn.addEventListener("click",function onClick(){ 
        console.log(`Clicked on button (${ idx })!`);
    }); 
}
```

That inner function closes over idx, preserving it for as long as the click handler is set on the btn. So when each button is clicked, its handler can print its associated index value, because the handler remembers its respective idx variable.

### `this` Keyword
Misconceptions:
- Function’s this refers to the function itself. 
- This points the instance that a method belongs to.

Functions also have another characteristic, this characteristic is best described as an execution context, and it’s exposed to the function via its this keyword.

Scope is static and contains a fixed set of variables available at the moment and location you define a function, but a function’s execution context is dynamic, entirely dependent on *how it is called* (regardless of where it is defined or even called from).

One way to think about the execution context is that it’s a tangible object whose properties are made available to a function while it executes. Compare that to scope, which can also be thought of as an object; except, the scope object is hidden inside the JS engine, it’s always the same for that function, and its properties take the form of identifier variables available inside the function.

```
function classroom(teacher) { 
    return function study() {
        console.log(
            `${ teacher } says to study ${ this.topic }`
        ); 
    };
}
var assignment = classroom("Kyle");
```

The inner study() function does reference this, which makes it a this-aware function. In other words, it’s a function that is dependent on its execution context.

If we call:

```
assignment();
// Kyle says to study undefined  -- Oops :(
```

This program is not in [strict mode](#strictly-speaking), context-aware functions that are called **without any context specified** default the context to the global object (window in the browser). As there is no global variable named topic (and thus no such property on the global object), this.topic resolves to undefined.

But:

```
var homework = { topic: "JS",
    assignment: assignment
};
homework.assignment();
// Kyle says to study JS
```

A copy of the assignment function reference is set as a property on the homework object, and then it’s called as homework.assignment(). That means the this for that function call will be the homework object. Hence, this.topic resolves to "JS".

Lastly:

```
var otherHomework = { 
    topic: "Math"
};
assignment.call(otherHomework);
// Kyle says to study Math
```

A third way to invoke a function is with the call(..) method, which takes an object (otherHomework here) to use for setting the this reference for the function call. The property reference this.topic resolves to "Math".

> The benefit of this-aware functions—and their dynamic context—is the ability to more flexibly re-use a single function with data from different objects.

A function that closes over a scope can never reference a different scope or set of variables. But a function that has dynamic this context awareness can be quite helpful for certain tasks.

### Prototypes

Where this is a characteristic of function execution, a proto- type is a characteristic of an object, and specifically resolution of a property access.

Think about a prototype as a linkage between two objects; the linkage is hidden behind the scenes, though there are ways to expose and observe it. This prototype linkage occurs when an object is created; it’s linked to another object that already exists.

> A series of objects linked together via prototypes is called the “prototype chain.”

Consider: 

```
var homework = { 
    topic: "JS"
};
```

The homework object only has a single property on it: topic. However, its default prototype linkage connects to the `Object.prototype` object, which has common built-in methods on it like `toString()` and `valueOf()`, among others.
We can observe this prototype linkage delegation from `homework` to `Object.prototype`:

`homework.toString();    // [object Object]`

`homework.toString()` works even though `homework` doesn’t have a `toString()` method defined; the delegation invokes `Object.prototype.toString()` instead.

<ins>*Object Linkage*</ins>

To define an object prototype linkage, you can create the object using the Object.create(..) utility:

```
var homework = { 
    topic: "JS"
};
var otherHomework = Object.create(homework); 

otherHomework.topic; // "JS"
```

The first argument to Object.create(..) specifies an ob- ject to link the newly created object to, and then returns the newly created (and linked!) object.

> Delegation through the prototype chain only applies for ac- cesses to lookup the value in a property.

> **TIP:** Object.create(null) creates an object that is not prototype linked anywhere, so it’s purely just a standalone object; in some circumstances, that may be preferable.

```
homework.topic; // "JS"
otherHomework.topic; // "JS"
otherHomework.topic = "Math";
otherHomework.topic; // "Math"
homework.topic; // "JS" -- not "Math"
```

The topic on otherHomework is “shadowing” the property of the same name on the homework object in the chain.

<ins>*`this` Revisited*</ins>

How it powers prototype-delegated function calls? Indeed, one of the main reasons this supports dynamic context based on how the function is called is so that method calls on objects which delegate through the prototype chain still maintain the expected this.

```
var homework = { 
    study() {
        console.log(`Please study ${ this.topic }`); 
    }
};

var jsHomework = Object.create(homework); 
jsHomework.topic = "JS"; 
jsHomework.study();
// Please study JS

var mathHomework = Object.create(homework); 
mathHomework.topic = "Math"; 
mathHomework.study();
// Please study Math
```

`jsHomework.study()` delegates to `homework.study()`, but its this (this.topic) for that execution resolves to jsHomework because of how the function is called, so this.topic is "JS". Similarly for mathHomework.study() delegating to homework.study() but still resolving this to mathHome- work, and thus this.topic as "Math".

JS’s this being dynamic is a critical component of allowing prototype delegation, and indeed class, to work as expected!

### Asking "Why?"

> One of the most important skills you can practice and bolster is curiosity, and the art of asking “Why?” when you encounter something in the language

## Chapter 4: The Bigger Picture

### Pillar 1: Scope and Closure

- The organization of variables into units of scope (functions, blocks) is one of the most foundational characteristics of any language; perhaps no other characteristic has a greater impact on how programs behave.
- Scopes are like buckets, and variables are like marbles you put into those buckets. The scope model of a language is like the rules that help you determine which color marbles go in which matching-color buckets.

JS is lexically scoped
- The first is commonly called hoisting: when all variables declared anywhere in a scope are treated as if they’re declared at the beginning of the scope. 
- The other is that var-declared variables are function scoped, even if they appear inside a block.

- `let/const` declarations have a peculiar error behavior called the “Temporal Dead Zone” (TDZ)

<ins>Closure</ins> is a natural result of lexical scope when the language has functions as first-class values, as JS does. When a function makes reference to variables from an outer scope, and that function is passed around as a value and executed in other scopes, it maintains access to its original scope variables; this is closure.

Across all of programming, but especially in JS, closure drives many of the most important programming patterns, including modules.

### Pillar 2: Prototypes

JS allows you to create objects directly and explicitly, without first defining their structure in a class.

For many years, people implemented the class design pattern on top of prototypes—so-called “prototypal inheritance” nd then with the ad- vent of ES6’s class keyword, the language doubled-down on its inclination toward OO/class-style programming.

> Classes are just one pattern you can build on top of such power.
>But another approach, in a very different direction, is to simply embrace objects as objects, forget classes altogether, and let objects cooperate through the prototype chain. This is called behavior delegation. I think delegation is more power- ful than class inheritance, as a means for organizing behavior and data in our programs.

“classes aren’t the only way to use objects”

### Pillar 3: Types and Coercion

> Arguably, this pillar is more important than the other two, in the sense that no JS program will do anything useful if it doesn’t properly leverage JS’s value types, as well as the conversion (coercion) of values between types.
