Searchable Point Calculation Table in React
===============================

## What is this?
This is a searchable table of customer data that calculates the points earned from purchases in a selectable range of months. It is built with [React](https://reactjs.org/).

You can see the data model in **src/data/customerTransactions.json**, and the app logic and React components in **src/components**.

It takes an array of customers, each with an array of transactions, and calculates the points earned based on the following rules:
A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
This calculation is abstracted so that different point options may be passed in.

## Demo
View this project online at [https://derekds.com/dev/rewards-table-react/](https://derekds.com/dev/rewards-table-react/).

## Lighthouse Score

![Lighthouse score. Performance: 99, Accessibility: 100, Best Practices: 100, SEO: 100](images/lighthouse-scores.png)

[View Lighthouse report](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fderekds.com%2Fdev%2Frewards-table-react%2F)
