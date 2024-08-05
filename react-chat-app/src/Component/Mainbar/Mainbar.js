import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import io from "socket.io-client";
import Avatarcomponent from "../../Avatar";

const Mainbar = (props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [document, setDocument] = useState(false);
  const [stream, setStream] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);


  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000"); 

    if(props.room){
      socketRef.current.emit('joinroom',props.room)
      props.setMessages([])
    }

    socketRef.current.on("message", (message) => {
     props.setMessages((prevMessages) => [...prevMessages, message]);
      
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const setChat = (selectedUser) =>{
  
if(selectedUser.username == props.user){
  return "right-chat"
}
else{
  return "left-chat"
}

     

  }

  const sendMessage = () => {
    if (message.trim() !== "") {
      socketRef.current.emit("message",props.room, message);
      setMessage("");
    }
  };
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const togglePopup = () => {
    setDocument(!document);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStream(stream);
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };
  const onEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setGalleryFiles(files);
    setMessage((prevMessage) => prevMessage + files);
  };

  const handleDocumentChange = (event) => {
    const files = Array.from(event.target.files);
    setDocumentFiles(files);
    setMessage(files);
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDocumentInputClick = () => {
    if (documentInputRef.current) {
      documentInputRef.current.click();
    }
  };

  return (
    <>
      <div className="container py-3 mx-auto  fixed ">
        <div className="row bg-white flex items-center justify-between border-b-2 rounded-md py-2">
          <div className="col-md-6">
            <div
              className="flex items-center rounded-xl font-semibold"
            >
              <div className="col-md-2 m-1">
                <Avatarcomponent
                  username={props.selectedUser.username}
                  className="h-12 w-12  rounded-3xl"
                />
              </div>
              {props.selectedUser.username}
            </div>
          </div>
          <div className="col-md-6 flex items-center gap-5  cursor-pointer">
            <div>
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
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <div>
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </div>
            <div>
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <div className="">
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
                  d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>

     

        <div className="col-md-8 flex absolute top-30 left-40 cursor-pointer">
          <video ref={videoRef} autoPlay style={{ width: "100%" }}></video>
          {stream ? (
            <div onClick={stopCamera}>
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
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          ) : null}
        </div>

        <div className="border-t p-3 fixed bottom-0 flex flex-row col-md-8 items-center gap-2">
          <div className="col-md-11 flex items-center bg-slate-100 p-1 rounded-md px-1">
            <div className="col-md-1 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer"
                onClick={togglePopup}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>
              {document && (
                <div className="absolute bottom-20 rounded-md montserrat text-sm flex flex-col p-4  bg-white shadow-lg col-md-3 left-4 gap-3">
                  <div
                    className="flex gap-3 cursor-pointer"
                    onClick={openCamera}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                    Camera
                  </div>
                  <div
                    className="flex gap-2 cursor-pointer"
                    onClick={handleFileInputClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-pink-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <input
                      type="file"
                      ref={documentInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    Photos & Videos
                  </div>
                  <div
                    className="flex gap-2 cursor-pointer"
                    onClick={handleDocumentInputClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-rose-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 6.75h6M9 9.75h6M9 12.75h3M10.5 21H18a2.25 2.25 0 0 0 2.25-2.25V5.25A2.25 2.25 0 0 0 18 3H6A2.25 2.25 0 0 0 3.75 5.25v13.5A2.25 2.25 0 0 0 6 21h4.5l-.72-.72a.75.75 0 0 1 0-1.06L11.25 18H12.75l1.47 1.47a.75.75 0 0 1 0 1.06l-.72.72Z"
                      />
                    </svg>
                    Document
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleDocumentChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-9">
              <input
                type="text"
                placeholder="Write a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded p-3 mr-2 bg-slate-100 col-md-12"
              />
            </div>
            <div className="flex justify-center col-md-2 relative">
              <svg
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>

        

              {showEmojiPicker && (
                <div className="absolute bottom-14 right-4 z-[2]">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
              <div className="">
                {galleryFiles.map((file, index) => (
                  <div
                    key={index}
                    className="absolute bottom-20 right-4 gallery  "
                  >
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      <video
                        controls
                        style={{ width: "100px", height: "100px" }}
                      >
                        <source
                          src={URL.createObjectURL(file)}
                          type={file.type}
                        />
                      </video>
                    )}
                  </div>
                ))}
              </div>
              {/* this is document div  */}
              {documentFiles.length > 0 && (
                <div className="absolute bottom-20 right-2 rounded-md shadow-sm shadow-blue-500/50 border bg-white">
                  <ul className="p-4">
                    {documentFiles.map((file, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                          />
                        </svg>
                        <span>{file.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={() => {
              sendMessage();
            }}
          >
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
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>

      </div>

      <div className="flex flex-col gap-2 p-3 fixed bottom-20 float-right right-4 left-chat ">
        {props.messages.map((message, index) => (
          <div key={index} className='flex justify-end items-center left-chat '>
            {console.log("here log message",message)}
            <div className=" bg-red-100 left-chat flex justify-between items-center p-2 rounded-xl gap-3 montserrat">
              <div>{message}</div>
              <div className="">
              <Avatarcomponent
                  username={props.selectedUser.username}
                  className="h-12 w-12  rounded-3xl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </>
  );
};

export default Mainbar;

