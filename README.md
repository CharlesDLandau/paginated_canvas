# Paginate Canvases in MUI

### Demo:

Typical CRA demo
1. Clone the repo
2. `npm install`
3. `npm start`

This is an implementation of pagination with FabricJS, React-Router and MUI.
It consists of:

### `src/App.js` 
With some dummy data generated as a prop for `View.js`, this is mainly 
responsible for pulling in the boilerplate from create-react-app and for 
rendering `View.js` as a child. The `data` prop is very simple and could be extended without much work:

> //data
> [{item: image source, pageNum: integer}, ...]

### `src/View.js` 
Rendering a `Drawer` with a `GridList` from MUI, where each `Tile` is a 
`react-router` `Link`. Each `Link` gets a corresponding `Route` in the 
viewport.

### `src/Canvas.js`
Responsible for instantiating the fabricJS canvas. Accepts a `mountFabric` 
function for hoisting the fabricJS instance of the current page. In 
`View.js` hoisting is as simple as:
>	mountFabric(fabricInstance){
		this.fabricCanvas = fabricInstance
	}
But a more sophisiticated implementation is certainly doable.

This component also resizes images by default (see the `fitImage`) method.

### `src/GridList.js`
Responsible for styling and rendering the MUI drawer.
