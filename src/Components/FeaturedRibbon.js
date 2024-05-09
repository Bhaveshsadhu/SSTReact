import React from "react";

const FeaturedRibbon = ({ isFeatured }) => {
  const isFeaturedYes = isFeatured && isFeatured.toUpperCase() === "YES";

  return (
    <>
      {isFeaturedYes && (
        <div className="box">
          <div className="ribbon">
            <span>Featured</span>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedRibbon;
