import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import DisplayBar from "./Components/DisplayBar";
import TicketsPage from "./Components/TicketsPage";

const GlobalContext = createContext();

function App() {
  const [grouping, setGrouping] = useState();
  const [ordering, setOrdering] = useState();

  useEffect(() => {
    const savedGrouping = window.localStorage.getItem("group");
    const savedOrdering = window.localStorage.getItem("order");
    console.log(savedGrouping, savedOrdering);

    if (
      savedGrouping === "status" ||
      savedOrdering === "user" ||
      savedOrdering === "priority"
    ) {
      setGrouping(savedGrouping);
    } else {
      setGrouping("status");
    }

    if (savedOrdering === "priority" || savedOrdering === "title") {
      setOrdering(savedOrdering);
    } else {
      setOrdering("priority");
    }
  }, []);
  console.log(grouping);

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{ grouping, setGrouping, ordering, setOrdering }}
      >
        <DisplayBar />
        <TicketsPage />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
export { GlobalContext };
