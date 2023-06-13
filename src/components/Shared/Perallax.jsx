import React from "react";

const Perallax = ({ img, heading, parahraph}) => {
  return (
    <div
      className="hero min-h-min"
      style={{backgroundImage: "url('/ashneer.jpg')",objectFit: "revert"}}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{heading}</h1>
          <p className="mb-5">
            Paisa barbad sala! Baap ka khao o iha ake hume dedo! Bariya beta paida kiyahain tomhara bap ne !
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Perallax;
