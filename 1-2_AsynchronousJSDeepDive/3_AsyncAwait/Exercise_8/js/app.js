var MAINAPP = (function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';

    (async function() {
        try {
            // Promises
            let posts = fetch(url + 'posts/'),
                comments = fetch(url + 'comments/'),
                todos = fetch(url + 'todos/');

            let results = await Promise.all([posts, comments, todos]);

            nsp.posts = await results[0].json();
            nsp.comments = await results[1].json();
            nsp.todos = await results[2].json();

            console.log('Data received'); 
        } catch(e) {
            console.error(`Problem retrieving data: ${e}`);
        }
    })();

    return nsp;
})(MAINAPP || {});
