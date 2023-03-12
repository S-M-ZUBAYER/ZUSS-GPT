// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import { useRef, useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

const YOU = "you";
const AI = "ai";
function App() {
  const inputRef = useRef();
  const [qna, setQna] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateQNA = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };

  const handleSend = () => {
    const question = inputRef.current.value;
    updateQNA(YOU, question);

    setLoading(true);
    axios
      .post("https://zuss-gpt-server.vercel.app/chat", {
        question,
      })
      .then((response) => {
        updateQNA(AI, response.data.answer);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderContent = (qna) => {
    const value = qna.value;

    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">{v}</p>);
    }

    return <p className="message-text">{value}</p>;
  };
  return (
    <main class="container">
    <div className="text-center mt-12 text-2xl font-semibold">
      ZUSS GPT
      <p className="text-lg text-yellow-500">
        Please ask me any question I will try to answer like ChatGPT:
      </p>
    </div>
      <div class="chats ml-5">
        {qna.map((qna) => {
          if (qna.from === YOU) {
            return (
              <div class="send chat">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                  alt=""
                  class="avtar"
                />
                <p>{renderContent(qna)}</p>
              </div>
            );
          }
          return (
            <div class="recieve chat">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                alt=""
                class="avtar"
              />
              <p>{renderContent(qna)}</p>
            </div>
          );
        })}

        {loading && (
          <div class="recieve chat">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt=""
              class="avtar"
            />
            <p>Typing...</p>
          </div>
        )}
      </div>

      <div className="chat-input ml-0 md:ml-20 border-2">
        <input
          type="text"
          ref={inputRef}
          class="form-control col pl-3"
          placeholder="Type Something"
        />
        <button disabled={loading} className="border-2 px-5 py-1 bg-yellow-200 " onClick={handleSend}>
          Send
        </button>
      </div>
    </main>
  );
}

export default App;
