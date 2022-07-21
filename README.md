# The NHTSA Product Information Catalog Vehicle Listing API Explorer
for [Jimmy](https://fromjimmy.com)

## Initialisation

- Install [Node JS engine & npm package manager](https://nodejs.org/en/) or use [docker image](https://hub.docker.com/_/node/)
- run `npm install` in terminal inside project directory root
- use scripts described in next section

## Scripts 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
### `npm test:coverage`

Launches the test runner in the interactive watch mode with coverage reports.
### `npm test:e2e`

Launches playwright tests. **Build the project before run e2e tests!**
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
## Environment Variables
You can set these variables in `.env` file:
```dotenv
# API Base url (end with "/" is mandatory)
REACT_APP_API_BASE=https://vpic.nhtsa.dot.gov/api/vehicles/
# Count of api request retries while failing
REACT_APP_API_RETRIES=5
# Retries delay in ms for failed requests 
REACT_APP_API_RETRIES_DELAY=1000
# API realization name taht will should be used (see appContainer.ts)
REACT_APP_API_NAME=NHTSAVehicleAPI
```
## Implementation notes (regarding the Assignment)  

### Details button

> here's an additional column with a button which leads to the detail page.

Assignment states that it should be button, but link will be more accessible for that case - it leads to page, not
used as data action   
If button is required do that:  
In `DynamicTable.tsx`:
```tsx
/*Import useNavigate hook instead of link at the top of file */
-import { Link, useNavigate } from 'react-router-dom';
+import { useNavigate } from 'react-router-dom';
/*Add React Router hook for navigate method to the beginnig of IndexPage component...*/
const navigate = useNavigate()
/* ...Relpace <Link> with button  */
-<Link to={`/mfr/${Mfr_ID}`} className='table__button'>More</Link>
+<button type="button" onClick={() => navigate(`/mfr/${Mfr_ID}`)} classNames='table__cell table__cell--button'>More</button>
```
Adjust styles for button in `DynamicTable.css`:

```css
.table__button {
    border: 0;
    width: 6ch;
    background-color: transparent;
}
```

> The list of manufacturers is an infinity loading table with these columns: ID, common name and country

Assignment states that table should display "common name" which I believe is `Mfr_CommonName`, but it empties for
some manufacturers, so I decide to display `Mfr_Name` for that cases.

To replace this behavior, do that:  
In `DynamicTable.tsx`:
```tsx
-<td className='table__cell table__cell--name'>{Mfr_CommonName ?? Mfr_Name}</td>
+<td className='table__cell table__cell--name'>{Mfr_CommonName}</td>
```
## Dependencies pick

### React router

It may be overkilled for that project because we have only two hard-coded routes.
But that library is wide-used, well-tested and flexible enough, so it can be a perfect platform for future app growth.

### Virtuoso (aka react-virtuoso)

It is a demo project and coding production-ready solution for on scroll table virtualization
will cost a lot of time and money for us (used lib have at least 4k source lines of code). To spend it mindful I decided to use well-tested maintainable library with focus on performance.

Here how I picked Virtuoso:

Community wide used library [react-virtualized](https://github.com/bvaughn/react-virtualized) is too large for our small
project - 2mb+ unpacked,
have a lot of style restrictions and Table component from that library is not responsible enough for resizing,
also in discussions I found out that it will be hard to combine that solution
with React UI frameworks due to code restrictions.
Fast searching performance measurements for that framework done with zero results, code coverage 
for main branch is over 94% which good enough.
On the other side is Virtuoso is fast-growing library with focus on performance (double-checked it in source code). 
It is agnostic to UI framework, can be used with most well-known UI kits.
Size of that library is 650kb unpacked (reported by npm registry), even with [tree-shaking issue](https://github.com/petyosi/react-virtuoso/issues/558)
it is much less code comparing to react-virtualized
Have over 80% code coverage (regarding jest) calculations and essential end-to-end tests.
## What can be improved

### Hire a UI/UX designer 🤠  

It is a joke partially, but really virtualized table with on scroll handler can be inaccessible for some users 
(for example, for those who use screen readers it is pretty hard to catch on always replacing rows).
- This table will be uncomfortable for too very narrow viewports. Instead, for very narrow (one column) viewports,
we can present the data using a different structure, with headings and definition lists, like I used in details page.
- This table is uncomfortable for someone who seeking for some specific manufacturer. In-browser search can't be
- used due to table virtualization, search field can be added here.

### Code Design
- Use app data storage to reduce second fetch of manufacturer info and move all fetching operations to non-ui part of app
- Inverse `document.title` control, that's not DOM UI component part so should be extracted to separate module. 
- Extract IOC mechanism as external library and reuse it when it needed. It already designed for loose coupling and be universal, adapters for other frameworks like svelte/vue can be done fast.
- Possible use BFF Pattern to fetch information from API in backend and pass only client needed data. For example,
- API documentation states that it should provide data per 100 items...
> Results are provided in pages of 100 items

but in real life it sends 92-100 items and that makes impossible to seek only needed data by index in virtual table,
and impossible to scroll user to previous position in the table when it returns from details page.
- Possible use server rendering for performance and search engine optimization and BF Cache

### Performance & tooling

- Add service worker to cache api requests
- Use only needed part of `normalize.css`
- [Optimize font loading](https://web.dev/optimize-webfont-loading/) including request caching,
font substitution for only used chars, using proper serving method (avoid Google CDN to avoid user data leak and maybe improve loading speed);
- Adapt building process for target browsers (unknown?) to minimize data transfer between server and
browser and improve performance
- Replace Create React App with webpack/rollup/rome/other building engine. CRA is good for MVPs and fast development,
but in the perspective growing projects needs to use some side tools like react tool [why did you render](https://github.com/welldone-software/why-did-you-render) or linting adjustments, or other improvements.
CRA is not so comfortable for detailed configuration of tool chain or replacements in configuration
- Setup performance measurement monitoring system to track performance on real user devices;
- Setup dependency monitoring to keep code secure and generally up-to-date;

All of that improvements can cost about 3-4 full work days – my estimation.
Whole project from scratch was done in 10 work hours.