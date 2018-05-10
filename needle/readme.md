# HW3: Clocks part 2

In this homework we will continue our work on clocks that we began in lab2. Here we focus first on a traditional three handed clock (seconds/minutes/hours) and on a novel clock from the 90s called a chromachron (we provide a reference picture in this repo, but google it: it is extremely 90s). Finally we will do a little data analysis and see node.js code for the first time.

In this assignment you will do your work in index.js, utils.js, index.html, and possibly main.css. You do not need to add any additional files to complete the assignment.

## Setup

As always this lab starts with installing and running the dependencies.

```sh
npm install

# then

npm run start

# or if you have yarn installed

yarn

# then

yarn start

```

And away we go.

## The First Clock

A natural follow up to our previous work on making a slow clock will be to make normal clock face, again using d3 to make an svg image that is dynamically manipulated through javascript. This clock face should have a 12 numerical markings showing the hours, a hand that indicates hours, a hand that indicates minutes, and a hand that indicates seconds. These three hands should move in sync such that the minute hand is 60 times slower than the second hand, and the hour hand is 12 times slower than minute hand -> Usual clock stuff. The second hand **does not** need to literally move in seconds, it can move faster than that if you wish. In lab we provided code to make your clocks tick, it is your job to build a comparable implementation of ticking. Does your second hand visit 60 places around the wheel?

The final visual appearance is up to you beyond these initial elements. Be creative. If the class does well at creating interesting clocks we will assemble them into some sort of fun collective display.

## The Second Clock

The final clock we will construct seeks to destroy time in a blaze of glorious color. The chromachron, just like the slow watch, attempts be an "anti-stress" watch (https://www.hodinkee.com/articles/chromachron-a-radically-new-approach-to-time). Whether or not it does so is not our concern, instead we just want to build one. There are several notable elements that make the chromachron different than other clocks we've built: there are not numbers, instead of a single hand there is circle with a wedge cut out. A good starting point for problem will be to observe that the background colors are awfully similar to a pie chart, and that the functions delineated in d3-shape (https://github.com/d3/d3-shape) may be helpful. Think carefully about your approach, are any scales necessary to build it? What type of svg elements will you be using. Which element in the clock will be data bound versus simply appended.

The final visual appearance of the clock should look quite a bit like the chromachron-example.jpeg file. It should tick. It should use d3 and svg.


## A little data analysis

In lecture we've now seen a few different techniques for doing rudimentary data analysis (remember computing the domain for Anscombe?). Here we will reinforce that learning by constructing a pair of small analysis functions: buildStats and groupBy. You can find these functions in utils.js along with a slightly more detailed description of what we expect. Being able to execute elementary data manipulations like this is important skills for making effective visualizations.

Once you've written the functions, we've provided a small test suite that you can use to check the correctness of your functions (you can read it at tests.js). To run them, simply put run the following in the terminal:

```javascript
npm run test
```
This script executes the tests.js file in the node.js enviroment. node.js is the server side version of javascript, that is, the version of javascript that lives outside of the browser. The tests involve manipulating a dataset that describes the populations of the 300 most populous cities in America (from wikipedia).


## Grading (tentative)

- Style (monitored by lint + eyeball) 19%
- First clock 27%
- Second clock 27%
- Data analysis (correctness is monitored by the tests) 27%
