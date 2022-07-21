"use strict"

let addTodo = async function(todo) {
    try {
        let resp = await fetch(
            'https://jsonplaceholder.typicode.com/todos/',
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(todo)
            }
        );
        let results = await resp.json();
    
        console.log(results);
    } catch(e) {
        console.error(`Unable to create todo ${e}`);
    }
};

let todo = {
    completed: false,
    userId: 1,
    title: "Learn Promises"
};

addTodo(todo);
