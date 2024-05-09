import React from "react";

const NewRibbon = ({ createdAt }) => {
  const isRecent =
    Date.parse(createdAt) >=
    new Date(new Date().setMonth(new Date().getMonth() - 6));

  return (
    <>
      {isRecent && (
        <div className="mpribbon">
          <span>New</span>
        </div>
      )}
    </>
  );
};

export default NewRibbon;
