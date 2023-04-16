import { useState } from 'react';
import { useEffect } from 'react';

const Chat = () => {
  const [isWs, setIsWt] = useState(null);
  useEffect(() => {
    const we = new WebSocket('ws://localhost:4040');
    setIsWt(we);
    we.addEventListener('message', handleMessage);
  }, []);
  function handleMessage(e) {
    console.log('newMessage :>> ', e);
  }
  return (
    <div className="flex h-screen">
      <div className=" bg-white w-1/3">contacts</div>

      <div className=" bg-blue-100 flex flex-col p-2 w-2/3">
        <div className="flex-grow">messages</div>
        <div className="flex mx-2 gap-2">
          <input
            type="text"
            className="bg-white flex-grow border p-2 rounded-md"
            placeholder="type your message here"
          />
          <button className=" bg-blue-500 p-2 text-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 flex "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
