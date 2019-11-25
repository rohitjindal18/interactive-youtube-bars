import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
const colors = [
  "red",
  "green",
  "pink",
  "gray",
  "cyan",
  "yellow",
  "blue",
  "silver",
  "orange",
  "black"
];

function App() {
  let ref = [];

  React.useLayoutEffect(() => {
    let widths = [];
    let sortMap = {};
    const widthInterval = setInterval(() => {
      widths = [];
      Array.from({ length: 10 }, (_, i) =>
        widths.push(Math.floor(Math.random() * 1000) / 100)
      );
      for (let i = 0; i < 10; i++) {
        const t = ref[i].style.transform.match(/translateY\((-?\d+\.?\d*px)\)/);
        ref[i].style.transform = `scaleX(${widths[i]}) translateY(${t[1]})`;
      }
    }, 2000);
    const positionInterval = setInterval(() => {
      const sortedWidths = [...widths];
      sortedWidths.sort((a, b) => (a < b ? 0 : -1));
      sortMap = widths.reduce((obj, item) => {
        return {
          ...obj,
          [item]: sortedWidths.indexOf(item)
        };
      }, {});
      for (let i = 0; i < 10; i++) {
        ref[i].style.transform = `scaleX(${widths[i]}) translateY(${sortMap[
          widths[i]
        ] * 50}px)`;
      }
    }, 2000);
    return () => {
      clearInterval(widthInterval);
      clearInterval(positionInterval);
    };
  }, [ref]);
  function renderBars() {
    const bars = [];
    const widths = [];
    Array.from({ length: 10 }, (_, i) =>
      widths.push(Math.floor(Math.random() * 1000) / 100)
    );
    widths.sort((a, b) => (a < b ? 0 : -1));
    for (let i = 0; i < 10; i++) {
      const style = {
        backgroundColor: colors[i],
        transform: `scaleX(${widths[i]}) translateY(${i * 50}px)`
      };
      bars.push(<div style={style} ref={r => (ref[i] = r)} className="bar" />);
    }
    return bars;
  }
  return <div className="App">{renderBars()}</div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
