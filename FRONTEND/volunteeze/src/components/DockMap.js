import React from "react";
import MessageIcon from "@mui/icons-material/Message";
import ExploreIcon from "@mui/icons-material/Explore";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BeenhereIcon from "@mui/icons-material/Beenhere";

const Dock = () => {
  return (
    <div className="d-flex justify-content-between fixed-bottom p-3 bg-light">
      <div className="d-flex flex-column align-items-center">
        <i className="bi bi-house"></i>
        <BeenhereIcon />
        <span>Mes Assos</span>
      </div>
      <div className="d-flex flex-column align-items-center">
        <i className="bi bi-search"></i>
        <MessageIcon />
        <span>Messages</span>
      </div>
      <div className="d-flex flex-column align-items-center">
        <i className="bi bi-chat"></i>
        <ExploreIcon />
        <span>Accueil</span>
      </div>
      <div className="d-flex flex-column align-items-center">
        <i className="bi bi-person"></i>
        <PlaceIcon />
        <span>Carte</span>
      </div>
      <div className="d-flex flex-column align-items-center">
        <i className="bi bi-search"></i>
        <CalendarMonthIcon />
        <span>Mes Missions</span>
      </div>
    </div>
  );
};

export default Dock;
