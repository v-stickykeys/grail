import React from "react";
import "./style.css";

export const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img className="symbol-basic-black" alt="Symbol basic black" src="/images/logo/logo-black.svg" />
                <div className="text-wrapper">Grail</div>
            </div>
            <a href="#select-name">

            <button className="button">
                <div className="label">Get Started</div>
            </button>
            </a>
        </div>
    );
};
