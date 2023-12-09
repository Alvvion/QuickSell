import React, { useContext } from "react";
import "./styles/Cards.css";
import Avatar from "react-avatar";
import { BsFillExclamationSquareFill, BsThreeDots } from "react-icons/bs";
import { FaRegCircle } from "react-icons/fa";
import { PiCircleHalfDuotone } from "react-icons/pi";
import { TbCircleDotted } from "react-icons/tb";
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineSignalCellularAlt,
  MdOutlineSignalCellularAlt2Bar,
  MdOutlineSignalCellularAlt1Bar,
} from "react-icons/md";
import { GlobalContext } from "../App";

function Cards({
  cam,
  name,
  available,
  status,
  title,
  priority,
  tags,
  ...restprops
}) {
  const { grouping } = useContext(GlobalContext);
  const shortenTitle = (str) => {
    let text = str;
    if (text.length > 69) {
      text = text.slice(0, 69);
      text = text.concat("...");
    }
    return text;
  };

  const statusIcons = (status) => {
    switch (status) {
      case "Todo":
        return <FaRegCircle color="#dfe1e4" size={18} />;
      case "In progress":
        return <PiCircleHalfDuotone color="#F1CA4B" size={18} />;
      case "Backlog":
        return <TbCircleDotted color="#8a8a8b" size={18} />;
      case "Done":
        return <MdCheckCircle color="#5E6AD2" size={18} />;
      case "Canceled":
        return <MdCancel color="#94A2B3" size={18} />;
      default:
        return <div></div>;
    }
  };

  const priorityIcons = (priority) => {
    switch (priority) {
      case 0:
        return <BsThreeDots color="#6B6F76" size={17} />;
      case 1:
        return <MdOutlineSignalCellularAlt1Bar color="#6B6F76" size={17} />;
      case 2:
        return <MdOutlineSignalCellularAlt2Bar color="#6B6F76" size={17} />;
      case 3:
        return <MdOutlineSignalCellularAlt color="#6B6F76" size={17} />;
      case 4:
        return <BsFillExclamationSquareFill color="#6B6F76" size={17} />;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="card-box" {...restprops}>
      <div className="card-header">
        {cam}{" "}
        <div className="avatar-container">
          <Avatar name={name} size={25} className="avatar" />
          <div
            className="active-circle"
            style={{ backgroundColor: available ? "#e8b602" : "#dfe1e4" }}
          ></div>
        </div>
      </div>
      <div className="title-section">
        <div style={{ display: grouping === "status" ? "none" : "block" }}>
          {statusIcons(status)}
        </div>
        <p>{shortenTitle(title)}</p>
      </div>
      <div className="footer">
        <div
          className="priority-container"
          style={{ display: grouping === "priority" ? "none" : "block" }}
        >
          {priorityIcons(priority)}
        </div>
        {tags &&
          tags.map((tag, i) => (
            <div className="tag" key={i}>
              <div></div>
              {tag}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Cards;
