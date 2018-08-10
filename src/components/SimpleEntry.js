import React from "react";
import greenSalad from "../assets/backgrounds/green_salad.png";
import greenLeaves from "../assets/backgrounds/FV-h.png";

const SimpleEntry = props => {
    return (
        <div className="veg">
            <img className="veg-1" src={greenSalad} alt="burger with green salad" />
            <img className="veg-2" src={greenLeaves} alt="" />
            <img className="veg-3" src="" alt="" />
            <img className="veg-4" src="" alt="" />
        </div>
    );
};

export default SimpleEntry;
