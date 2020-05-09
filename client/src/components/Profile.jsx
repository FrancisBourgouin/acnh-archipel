import React, { useContext } from "react";
import { ArchipelagoContext } from "../hooks/ArchipelagoContext";
import { UserContext } from "../hooks/UserContext";

export default () => {
  const userData = useContext(UserContext)
  const archipelagoData = useContext(ArchipelagoContext)
  let islandInfo = {}
  archipelagoData && archipelagoData.islands && archipelagoData.islands.forEach(island => {
    island.islanders.forEach(({ _id }) => {
      console.log(island, userData)
      if (_id === userData.islanderId) {
        islandInfo = island
      }
    })
  })
  console.log(islandInfo)
  return (
    <section>
      <h1>Profile Component</h1>
      <h2>Hello {userData && userData.name}</h2>
      <h2>From {islandInfo.name}</h2>
      <h2>From {archipelagoData && archipelagoData.name}</h2>
    </section>
  );
};
