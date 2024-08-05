import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatarcomponent from "../../Avatar";

const Chatbar = (props) => {
  const roomset = (item) =>{
    console.log("item :", props.user);
    const roomName = [props.user.username,item.username].sort().join('-');
    console.log("room name :",roomName);
    props.setRoom(roomName);
    props.setSelectedUser(item);
   }

  return (
    <>
      <div className="container flex flex-col overflow-y-scroll  min-h-screen">
        <div className="py-3 flex items-center gap-5 ">
          <div className="col-md-1 p-1 ">
            <Avatarcomponent
              username={props.user.username}
              className="h-12 w-12  rounded-3xl bg-red-300"
            />
          </div>
          <div className="flex justify-center items-center ">{props.user.username}</div>
        </div>
        <h3>Chats</h3>
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
          </span>
          <input
            type="search"
            placeholder="Search"
            className="py-2 pl-10 pr-4 rounded-lg w-full border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>

        <div className="flex gap-4 py-3 border-b-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          <span className="text-blue-600">Archived</span>
        </div>

        <div className="py-3 ">
          {props.profile.map((item) => (
            <div
              className="flex items-center gap-3 bg-white min-h-16 rounded-xl my-1  cursor-pointer"
              key={item.id}
              onClick={()=>{roomset(item)
              
              }}
            >
              <div className="col-md-3 m-1 p-3 ">
                {/* <img src={item.dp} className="h-10 w-10 rounded-3xl" /> */}
                <Avatarcomponent
                  username={item.username}
                  className="h-12 w-12  rounded-3xl bg-red-300"
                />
              </div>
              <div className="col-md-6 text-sm flex flex-col  gap-1 text-start ">
                <div>{item.username}</div>
                {/* <div>{item.email}</div> */}
              </div>
              <div className="flex items-end justify-end col-md-2"></div>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Chatbar;
