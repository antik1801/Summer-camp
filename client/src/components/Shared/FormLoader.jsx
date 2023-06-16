import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";


// const override: CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   }

const FormLoader = () => {
    return (
        <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
};

export default FormLoader;