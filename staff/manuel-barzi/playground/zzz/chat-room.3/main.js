// import { jsx as _jsx } from "react/jsx-runtime";
var _jsx = React.createElement
var rootElement = document.getElementById('root');
var root = ReactDOM.createRoot(rootElement);
var title = /*#__PURE__*/_jsx("h1", {
    children: "hola mundo"
});
var redItem = /*#__PURE__*/_jsx("li", {
    children: "red"
});
var yellowItem = /*#__PURE__*/_jsx("li", {
    children: "yellow"
});
var blueItem = /*#__PURE__*/_jsx("li", {
    children: "blue"
});
var colorList = /*#__PURE__*/_jsx("ul", {
    children: [redItem, yellowItem, blueItem]
});
var helloButton = /*#__PURE__*/_jsx("button", {
    onClick: function onClick() {
        return alert('hola mundo');
    },
    children: "Hello"
});
root.render([title, colorList, helloButton]);