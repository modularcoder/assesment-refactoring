# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here


Initially I've analyzed the **deterministicPartitionKey** function to understand what it does.

Then I've covered the **deterministicPartitionKey** function with the test cases including possible edge cases.

After that I've renamed the `dpk.js` do `dpk-legacy.js` and created new `dpk.js` file intended for the refactored function, but created a wrapper function on top of the legacy implementation, ensuring that the new function still works.


```
deterministicPartitionKey(event) {
  return deterministicPartitionKeyLegacy(event)
}
```

Then I've refactored the function with the following improvements

- Extracted hashing part to a separate function, making function **DRY**
- Handled some edge conditions on top to reduce the code nesting (**no spagetti code**)
- Better variable names to make core more **readable and explicit**
- Added code comments to describe the function
- Ensured that **tests still pass**


Extra improvements:

- Added .editorconfig and prettier
