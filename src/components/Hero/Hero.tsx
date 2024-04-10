import React from "react";
import "./style.css";

export const Hero = () => {
    return (
        <div className="content">
            <img className="line" alt="Line" src="line.svg" />
            <p className="slogan">Share your progress with real-time stats</p>
            <p className="description">
                Create a personal page in seconds to track and share your progress on goals like follower count, revenue
                numbers, or email subscribers.
            </p>
            <div className="input">
                <div className="div">
                    <p className="supporting-text">
                        <span className="text-wrapper">grail.so/</span>
                        <span className="span">yourhandle</span>
                    </p>
                    <button className="button">
                        <div className="label">Create your page</div>
                    </button>
                </div>
            </div>
        </div>
    );
};
