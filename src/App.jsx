import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import info from "../info";
import EmojiPicker from "emoji-picker-react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";


function App() {
  const [messages, setMsgs] = useState([
    { message: "first", sentBy: "Alice", likes: 0 },
    { message: "second", sentBy: "Bob", likes: 0 },
    { message: "third", sentBy: "Carol", likes: 0 },
  ]);
  const [display, setDisplay] = useState("none");
  const [user, setUser] = useState("");
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([
    "Alice",
    "Bob",
    "Pam",
    "Carol",
    "Dean",
    "Elin",
  ]);
  let handleSubmit = () => {
    if (msg != "" && user != "") {
      console.log(user);
      let dup = [...messages, { message: msg, sentBy: user, likes: 0 }];
      // dup.push( { message: msg, sentBy: user, likes: 0 });
      setMsgs(dup);
      setMsg("");
      setDisplay("none");
      if (!users.includes(user)) {
        dup = [...users];
        dup.push(user);
        setUsers(dup);
      }
    } else {
      alert("don't send empty message/user");
      setDisplay("none");
    }
  };
  let handleChange = (e) => {
    if (e.target.name == "user") {
      setUser(e.target.value);
    } else if (e.target.name == "message") {
      setMsg(e.target.value);
    }
  };
  let handleMentions = (e) => {
    let dup = msg + e.target.value + " ";
    setMsg(dup);
    setDisplay("none");
  };
  let handleLike = (e) => {
    let dup = [...messages];
    // console.log(dup[e.target.name].likes)
    dup[e.target.name].likes += 1;
    setMsgs(dup);
  };
  let handleEmoji = (emoji,e) => {
    let dup = msg + emoji.emoji;
    setMsg(dup);
  }
  window.addEventListener("keypress", (e) => {
    if (e.key == "@") {
      setDisplay("flex");
    }
  });
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div>
          <EmojiPicker onEmojiClick={handleEmoji} />
        </div>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="App">
      <div className="sidebar">
        <h1>ChatBox</h1>
        <div className="dir">Chat here &#8594;</div>
        <div className="info">{info.content}</div>
      </div>
      <div className="chatbox">
        <div className="view">
          {messages.map((v, i) => (
            <div className="msg-box" key={i}>
              <div className="msg">
                <span>{v.sentBy}: </span>
                {v.message}
              </div>
              <div className="msg-box-input">
                <span>&hearts;{v.likes}</span>
                <input
                  type="button"
                  value="like"
                  name={i}
                  onClick={handleLike}
                />
              </div>
            </div>
          ))}
          <div className="mentions" style={{ display: display }}>
            {users.map((v, i) => (
              <input
                type="button"
                value={v}
                key={i}
                name={v}
                id={v}
                onClick={handleMentions}
              />
            ))}
          </div>
        </div>
        <div className="input-region">
          <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <Button variant="success">emoji</Button>
          </OverlayTrigger>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="Type username"
            onChange={handleChange}
            value={user}
          />
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Type a message"
            onChange={handleChange}
            value={msg}
          />
          <input
            type="button"
            className="send"
            value="Send"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
