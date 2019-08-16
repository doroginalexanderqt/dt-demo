# Demo React Godel project

## Installation

### Build docker
The image:
`docker build -t godel-demo .`

### Then JS dependencies

Run the installation:

`docker run -it --rm -v "$PWD":/usr/src/app -w /usr/src/app godel-demo npm install`

Then build the webpack server assets:

`docker run -it --rm -v "$PWD":/usr/src/app -w /usr/src/app godel-demo npm run build`

## Usage

Run server
`docker run -it --rm -v "$PWD":/usr/src/app -p 9112:9111 -w /usr/src/app godel-demo npm run dev`

Open in the browser http://127.0.0.1:9112/

## Useful commands:

`npm run lint`
This command will check all `.js` and `.jsx` files that they match project code style. 

`npm run lint:fix`
Fixes all code style errors in `.js, .jsx` files.

`npm run test`
Runs unit-tests. (all files with `*.spec.js|*.test.js` postfix will be matched)

### `npm run test:dev`
Runs unit-tests in dev mode, so any changes will trigger job to rerun tests.
