import React, { useState, useContext, useEffect } from "react";
import "./styles/DisplayBar.css";
import { BiSlider } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { GlobalContext } from "../App";

function DisplayBar() {
  const { grouping, setGrouping, ordering, setOrdering } =
    useContext(GlobalContext);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (grouping !== null && grouping !== undefined)
      window.localStorage.setItem("group", grouping);
  }, [grouping]);

  useEffect(() => {
    if (ordering !== null && ordering !== undefined)
      window.localStorage.setItem("order", ordering);
  }, [ordering]);

  return (
    <div className="display-bar">
      <button
        type="button"
        className="display-button"
        onClick={() => setModal((prev) => !prev)}
      >
        <BiSlider color="#6B6F76" /> Display <IoIosArrowDown color="#6B6F76" />
      </button>
      {modal && (
        <>
          <div className="modal-box">
            <div>
              Grouping
              <select
                autoFocus={false}
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div>
              Ordering
              <select
                autoFocus={false}
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
          <div className="overlay" onClick={() => setModal(false)}></div>
        </>
      )}
    </div>
  );
}

export default DisplayBar;
