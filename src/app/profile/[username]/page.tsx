import React from "react";

const Username = ({ params }: { params: { username: string } }) => {
  return <div>Username: {params.username}</div>;
};

export default Username;
