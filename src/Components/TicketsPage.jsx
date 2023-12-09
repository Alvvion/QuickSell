import React, { useState, useEffect, useContext, useRef } from "react";
import "./styles/TicketsPage.css";
import Cards from "./Cards";
import { IoMdAdd } from "react-icons/io";
import { BsFillExclamationSquareFill, BsThreeDots } from "react-icons/bs";
import { PiCircleHalfDuotone } from "react-icons/pi";
import { TbCircleDotted } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineSignalCellularAlt,
  MdOutlineSignalCellularAlt2Bar,
  MdOutlineSignalCellularAlt1Bar,
} from "react-icons/md";
import axios from "axios";
import { GlobalContext } from "../App";
import Avatar from "react-avatar";

function TicketsPage() {
  const { grouping, ordering } = useContext(GlobalContext);
  const [cardData, setCardData] = useState(null);
  const [userData, setUserData] = useState(null);
  const countRef = useRef(0);
  const avatarContainer = (name, available, i) => (
    <div className="avatar-container" style={{ marginRight: "10px" }} key={i}>
      <Avatar name={name} size={25} className="avatar" />
      <div
        className="active-circle"
        style={{ backgroundColor: available ? "#e8b602" : "#dfe1e4" }}
      ></div>
    </div>
  );

  const userAvatar = userData?.map((user, i) => [
    user.name,
    avatarContainer(user.name, user.available, i),
  ]);

  const headings = {
    status: [
      [
        "Backlog",
        <TbCircleDotted color="#8a8a8b" size={18} className="header-icon" />,
      ],
      [
        "Todo",
        <FaRegCircle color="#dfe1e4" size={18} className="header-icon" />,
      ],
      [
        "In Progress",
        <PiCircleHalfDuotone
          color="#F1CA4B"
          size={18}
          className="header-icon"
        />,
      ],
      [
        "Done",
        <MdCheckCircle color="#5E6AD2" size={18} className="header-icon" />,
      ],
      [
        "Canceled",
        <MdCancel color="#94A2B3" size={18} className="header-icon" />,
      ],
    ],
    user: userAvatar,
    priority: [
      [
        "No Priority",
        <BsThreeDots color="#6B6F76" size={17} className="header-icon" />,
      ],
      [
        "Low",
        <MdOutlineSignalCellularAlt1Bar
          color="#6B6F76"
          size={17}
          className="header-icon"
        />,
      ],
      [
        "Medium",
        <MdOutlineSignalCellularAlt2Bar
          color="#6B6F76"
          size={17}
          className="header-icon"
        />,
      ],
      [
        "High",
        <MdOutlineSignalCellularAlt
          color="#6B6F76"
          size={17}
          className="header-icon"
        />,
      ],
      [
        "Urgent",
        <BsFillExclamationSquareFill
          color="#6B6F76"
          size={17}
          className="header-icon"
        />,
      ],
    ],
  };
  const arrangeCardData = (data) => {
    const updatedData = data.tickets.map((ticket) => {
      const user = data.users.find((user) => user.id === ticket.userId);
      return {
        ...ticket,
        userName: user.name,
        userAvailable: user.available,
      };
    });
    return updatedData;
  };

  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setCardData(arrangeCardData(response.data));
        setUserData(response.data.users);
      });
  }, []);

  return (
    <main className="tickets-page">
      {headings[grouping]?.map((title, i) => (
        <section className="section" key={i}>
          <div className="header">
            <div className="header-title">
              {title[1]}
              {title[0]}
              <span className="header-title-span">
                {countRef.current[title[0]] ? countRef.current[title[0]] : 0}
              </span>
            </div>
            <div className="header-icons">
              <IoMdAdd color="#8a8a8a" size={18} />
              <BsThreeDots color="#8a8a8a" size={18} />
            </div>
          </div>
          {cardData &&
            cardData
              .filter((data) => {
                const priorityList = [
                  "No Priority",
                  "Low",
                  "Medium",
                  "High",
                  "Urgent",
                ];
                switch (grouping) {
                  case "status":
                    return (
                      data[grouping].toLowerCase() === title[0].toLowerCase()
                    );
                  case "user":
                    return (
                      data.userName.toLowerCase() === title[0].toLowerCase()
                    );
                  case "priority":
                    return title[0] === priorityList[data.priority];
                  default:
                    return false;
                }
              })
              .sort((a, b) => {
                if (ordering === "priority") {
                  const priorityOrder = [4, 3, 2, 1, 0];

                  const priorityA = priorityOrder.indexOf(a.priority);
                  const priorityB = priorityOrder.indexOf(b.priority);
                  return priorityA - priorityB;
                } else {
                  return a.title - b.title;
                }
              })
              ?.map((data, index, arr) => {
                countRef.current = {
                  ...countRef.current,
                  [title[0]]: arr.length,
                };
                return (
                  <Cards
                    key={index}
                    cam={data.id}
                    title={data.title}
                    name={data.userName}
                    available={data.userAvailable}
                    status={data.status}
                    priority={data.priority}
                    tags={data.tag}
                  />
                );
              })}
        </section>
      ))}
    </main>
  );
}

export default TicketsPage;
