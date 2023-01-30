import React from "react";

const UserProfile = (props: any) => {
  return <h1>{props.username}</h1>;
};
export async function getServerSideProps(context: any) {
  const { params, req, res } = context;
  console.log(`req, res`, req, res);
  return {
    props: {
      username: "Max",
    },
  };
}

export default UserProfile;
