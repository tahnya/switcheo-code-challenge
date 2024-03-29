List out the computational inefficiencies and anti-patterns found in the code block below.
1. This code block uses
    a. ReactJS with TypeScript.
    b. Functional components.
    c. React Hooks
2. Implement the Datasource class so that it can retrieve the prices required.
3. You should explicitly state the issues and explain how to improve them.
4. You should also provide a refactored version of the code.


Datasource class:
``` ruby
class Datasource {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getPrices() {
    try {
      const response = await fetch(this.url);
      const prices = await response.json();
      return prices;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}
```


Issues:
- Unused children prop: The children prop is destructured from props, but it's not used anywhere in the component
- Unused setPrices function: The `setPrices` function is defined using useState, but it's not used anywhere except in the useEffect hook..
- Inefficient loop in `sortedBalances`: The `sortedBalances` array filters and sorts the balances array, but the `getPriority` function is called multiple times for each balance during sorting, which can be inefficient, especially if balances is large.
- Inefficient mapping in `formattedBalances`: The `formattedBalances` array maps over sortedBalances to add a formatted property to each balance. Since sortedBalances is already sorted and filtered, this mapping is redundant and can be merged with the `sortedBalances` calculation.
- No error handling: The useEffect hook fetches data from an external API but doesn't handle errors. It's important to handle errors gracefully to provide a better user experience.
- Console error: There's a typo in the catch block of the useEffect hook (console.err instead of `console.error`).

Solutions: 
- Remove unused variables (children, prices).
- Refactor the getPriority function to handle multiple blockchains efficiently. (Combine cases for `Zilliqa` and `Neo`)
- Simplify the sorting logic in `sortedBalances`
    - use the .filter and .sort methods on the `balances` array
    - filter by `balancePriority > -99` and `balance.amount <= 0` 
    - sort the filtered balances in descending order of the priority of their blockchains, determined using the `getPriority` 
- Use memoisation to remove unnecessary operations in each render.
    - update `formattedBalances` only when `sortedBalances` changes
    - update `rows` only when `sortedBalances` changes
- Add error handling in the `getPrices` method of the Datasource class as a try-catch block. 
- Correct the typo in the catch block `console.error`.
