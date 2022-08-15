# Concurrent Rendering Adventures in React 18

> ## Notes

* Use `npm install` or `npm ci`, the last one is slightly faster

## `<Suspense />`

* Allows React to "suspend" rendering a component subtree
  * Used when a (grand) child component is not ready to be rendered.
    * ECMAScript bundle containine the component is not loaded yet
    * The data needed for a component to render is not available yet
* The **"fallback"** component will be rendered instead
  * Replaces the complete children component tree
* Rendering is suspended when a promise is thrown
  * And resumed when the promise resolves

### SWR and Suspense

* SWR is used in the application to load data
  * A convenient hook to fetch data
* SWR makes it easy to start using suspense
  * Add suspense: true to the `<SWRConfig>`

## `<Suspense />` and Errors

* If a suspense resource **fails** lo load an **error is thrown**
  * When requesting it during the render
* Catch the error using an **ErrorBoundary**
  * Just like othe runtime errors in React lifecycle functions
* Error boundaries **can be nested**
  * Just like suspense boundaries

## Nesting `<Suspense />`

* Multiple suspense components **can be nested**
* React will use **the closest parent** `<Suspense />` component
  * Very useful to control what part of the UI is replaced by a fallback
* There is a behavior change in React 18 with null fallback

## Parallel `<Suspense />`

* Multiple suspense boundaries can **suspend in parallel**
  * React will suspend them all and show multiple fallback components
* If you want to **render a component while others are still loading**
* **Multiple suspending components** in a **single `<Suspense>`** is also fine
  * Will resume when all resource promises are resolved

## Switching to React 18

* Daily publish  to NPM using the **@next** and the **@alpha** tags

`npm install react@next react-dom@next --force`

## New Hooks

### useDeferredValue

* Returns a deferred version of the valuethat may lag behind

### useTransition

* Avoid undesilable states when waiting for content

### useMutableSource

* Enables React components to safely and efficiently read from a mutable external source in Concurrent Mode
* Avoids tearing

### useOpaqueIdentifier

* Can be used to generate unique ID's in an SSR-safe way ...`//prefixed with ustable_`

## Using `<SuspenseList />`

* `<SuspenseList />` will let you control how multiple `<Suspense />` components **render their fallback**
  * The order in wich child components show when ready
  * If multiple child fallback components displayed

> `<SuspenseList />` can be nested

## Concurrent Mode

> Why we need it and what it actually solves for us

React 18 - Concurrent mode

* In concurrent mode, it uses `chunks`, so the setState() occurs, React starts rendering some components, but then briefly pauses and then it renders a few more components...and then it pauses again and then is rendered more components, pauses, etc. until everithing is done and the DOM is updated. Now if a user clicks at that same point in time or some other event occurs. Then the there's actually time for that event to be handled before everything is finished. So a lot sooner.
* In the middle of the whole rendering cycle that event handler is executed before React was actually finished with all the rendering and updated the DOM, that might lelad to some potencial problems. Suppose that click event changed some state, well in that case, React might decide to start rendering again. Because if it doesn't strange things could happen.

* With React 17, all the events would always be executed after all the rendering was done.
* All the standard React, things like `setState()`, `useReducer()`, all are aware of this possibility, they will care of it, and if that event handler update states React will basically discard everything which was done and restart the whole render cycle. But if you got a different state management system, well, maybe it does or not, and that's where one of the new hooks actually comes in and it will that custom state management libraries prevent tearing like this.

## Using `startTransition()`

You can use that to defer lower priority work until some later time, making the application more responsive. So you get to choose what is low and what is high priority.

By default, everything is high priority.

How to turn into a low priority.

* Import `startTransition()` from React
* Instead of directly setting that value from the `useState()` using the `setMaxPrime()`, I can defer that using `startTransition()`. And that will make that UI a lot more responsive.

Consider:

`import { startTransition } from 'React';`

and

`onChange={(value) => startTransition(() => setMaxPrime(value))}`

## Using `useTransition()` hook

So just like `startTransition()`, it is used to defer low priority work, but unlike `startTransition()`, this will also tell you about pending updates which haven't been done yet. So it gives you a bit more information.

* The `useTransition()` is a hook, it can be used to control how React renders when components suspend.
  * Prevent the fallback component being rendered inmediately
* The **new components will be rendered** when:
  * Their resources are ready
  * The timeout is expired
* The "old" UI can use the **isPending** state when rendering

### Why do we have both of these API? `startTransition()` and `useTransition()`?

They seem to be doing pretty much the same thing

#### `startTransition()`

* Can be used anywhere
* No aditional render

#### `useTransition()`

* Needs to be used in a functional component
* One aditional render with `isPending` variable

## `<Suspense />` and Transitions

How suspense and transitions can work together really nicely.

* Suspense can **cooperate** with a `startTransition()`
  * The new UI is not visible until the transaction completes

`const [isPending, startTransaction] = useTransition();`

## Using `useDeferredValued()`

* The `useDeferredValue()` hook can be used create a deferred version of the value that may "lag behind"
  * Can prevent extra re-renders of expensive components
* <https://17.reactjs.org/docs/concurrent-mode-reference.html/#usedeferredvalue>

## Conclusion

* Using `<Suspense />`
  * Suspend when lazily loading components and/or **fetching data**
  * Handle error with an `<ErrorBoundary />`
  * **Nest and/or parallelize** as needed

* Concurrent mode
  * Coming soon to React application near you
  * Can make large applications **more responsive**
  * Render a React 18 application using `createRoot()`
  * Use `<SuspenseList />` to orchestrate `<Suspense />` components
  * **Defer work** with `startTransition()` and/or `useTransition()`
