var _jsx = React.createElement
var rootElement = document.getElementById('root')
var root = ReactDOM.createRoot(rootElement)
var title = /*#__PURE__*/_jsx('h1', {
    children: 'Hola Mundo'
})
var redItem = /*#__PURE__*/_jsx('li', {
    children: 'red'
})
var blueItem = /*#__PURE__*/_jsx('li', {
    children: 'blue'
})
var yellowItem = /*#__PURE__*/_jsx('li', {
    children: 'yellow'
})
var colorList = /*#__PURE__*/_jsx('ul', {
    children: [redItem, blueItem, yellowItem]
})
var helloButton = /*#__PURE__*/_jsx('button', {
    onClick: function onClick() {
        return alert('Funciona React')
    },
    children: 'Funciona React'
})
root.render([title, colorList, helloButton])



// import { jsx as _jsx2 } from "react/jsx-runtime";
// const rootElement = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElement);
// const _jsx = React.createElement;
// const title = /*#__PURE__*/_jsx2("h1", {
//   children: "Hola Mundo"
// });
// const redItem = /*#__PURE__*/_jsx2("li", {
//   children: "red"
// });
// const blueItem = /*#__PURE__*/_jsx2("li", {
//   children: "blue"
// });
// const yellowItem = /*#__PURE__*/_jsx2("li", {
//   children: "yellow"
// });
// const colorList = /*#__PURE__*/_jsx2("ul", {
//   children: [redItem, blueItem, yellowItem]
// });
// const helloButton = /*#__PURE__*/_jsx2("button", {
//   onClick: () => alert('React funciona'),
//   children: "Hello"
// });
// root.render([title, colorList, helloButton]);