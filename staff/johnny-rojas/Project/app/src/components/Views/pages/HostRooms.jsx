import Header from "../core/Header";
import TopBar from "../library/TopBar";

import UserRooms from "../library/UserRooms";


function HostRooms() {

  return <div>
    <div>
      <Header>
        <TopBar></TopBar>
      </Header>
    </div>
    <UserRooms></UserRooms>
  </div>
}

export default HostRooms