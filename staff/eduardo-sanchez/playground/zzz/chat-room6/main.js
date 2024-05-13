// import { jsx as _jsx } from "react/jsx-runtime";

const _jsx = React.createElement


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
const title = /*#__PURE__*/_jsx("h1", {
    children: "Hello pals"
});
const redItem = /*#__PURE__*/_jsx("li", {
    children: "red"
});
const yellowItem = /*#__PURE__*/_jsx("li", {
    children: "yellow"
});
const blueItem = /*#__PURE__*/_jsx("li", {
    children: "blue"
});
const colorList = /*#__PURE__*/_jsx("ul", {
    children: [redItem, yellowItem, blueItem]
});
const helloButton = /*#__PURE__*/_jsx("button", {
    onClick: () => alert('How are you?'),
    children: "Aloha"
});
root.render([title, colorList, helloButton]);