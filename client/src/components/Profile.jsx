import React, { useContext } from "react";
import { ArchipelagoContext } from "../hooks/ArchipelagoContext";
import { UserContext } from "../hooks/UserContext";

export default () => {
  const userData = useContext(UserContext)
  const archipelagoData = useContext(ArchipelagoContext)
  let islandInfo = archipelagoData?.islands?.find(island => island._id === userData.islandId)

  console.log(islandInfo)
  return (
    <section>
      <h1>Profile Component</h1>
      <h2>Hello {userData?.name}</h2>
      <h2>From {islandInfo?.name}</h2>
      <h2>From {archipelagoData?.name}</h2>
    </section>
  );
};
