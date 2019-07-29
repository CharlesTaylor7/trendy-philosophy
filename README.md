## To Do
- Implement add button for adding a new query
- Implement delete button for deleting a query
- Calculate correlations
- Add color picker for each trendline
- Make smarter requests of PhilPapers.org
- User toggle between exact & fuzzy matching
- Implement user toggles on data sources
- Make word clouds
- Implement screen scraping to get the publisher & citation info from PhilPapers
- Provision a PostgreSQL table
- Introduce autocompletions

### Styling
- Fix flickering of mouse cursor when hovering over query input
- Make font consistent between label & search query
- Make margins on left & right side of screen equal
- Make graph size dynamically match screen width

## Measurements
- 100 records takes about 21.8 kB.
- Takes about 1 second to make a rountrip request for 100 records.
- Browser stops loading data at about 16k records.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


