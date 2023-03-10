# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](src/partitionKeyService/dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. First, I will write unit tests to cover the existing functionality of deterministicPartitionKey. I will use Jest as the testing library.

2. Second, the big refactor;
    - I added linting rules and jest config with babel, to enable use of modules.
    - I added local .env and a config file for the constants.
    - I added early error handling and return statements, to ensure the crypto code is only run when necessary.
    - I added type checks.
    - I created a reusable function for the crypto call. 

### Other considerations
- With more time, I would convert to typescript to leverage better type safety prior to run time.
- I'd add comprehensive error handling.
- You could remove the unnecessary variable assignments at the top and return 0 explicitly, but the variable naming convention may be helpful in readability.
