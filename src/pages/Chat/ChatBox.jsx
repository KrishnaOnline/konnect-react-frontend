import { useEffect, useState } from "react";
import { createMessage, getChatMessages } from "../../services/operations/chatApi";
import { useSelector } from "react-redux";
import "./init";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { MdSend } from "react-icons/md";
import { Link } from "react-router-dom";

function ChatBox({ chat, chatId }) {
    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const fetchChatMsgs = async () => {
            const res = await getChatMessages(chatId, token);
            setMessages(res);
        };
        fetchChatMsgs();
    }, [chatId, token]);

    useEffect(() => {
        const sock = new SockJS(import.meta.env.VITE_BASE_URL + "/ws");
        const stomp = Stomp.over(sock);
        setStompClient(stomp);

        stomp.connect({}, () => {
            stomp.subscribe(`/user/${chatId}/private`, (message) => {
                if (message.body) {
                    const newMessage = JSON.parse(message.body);
                    setMessages(prevMsgs => [...prevMsgs, newMessage]);
                }
            });
        });

        return () => {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
        };
    }, [chatId]);

    const handleSendMessage = async () => {
        const newMessage = { content };
        const res = await createMessage(chatId, { content: newMessage, sendMessageToServer }, token);
        if (res) {
            setContent("");
        }
    };

    const sendMessageToServer = (newMessage) => {
        if (stompClient && newMessage) {
            stompClient.send(`/app/chat/${chatId}`, {}, JSON.stringify(newMessage));
        }
    };

    return (
        <div className="chats-section w-full h-screen overflow-scroll overflow-x-hidden px-10">
            <div className="bottom-[150px] my-1">
                {/* <div className="sticky top-0 shadow-sm bg-app p-3"> */}
                    {
                        chat?.users?.map(u => 
                            u?.id!==user?.id &&
                            <Link to={`/profile/${u?.id}`} className="sticky top-0 shadow-sm bg-app p-3 flex w-full gap-3 items-center" key={u?.id}>
                                <img
                                    className="h-14"
                                    src={u?.image}
                                />
                                <p className="text-lg text-white">{u?.email}</p>
                            </Link>
                        )
                    }
                {/* </div> */}
                <div className="flex flex-col flex-wrap">
                    {messages.map((m, index) => (
                        <div key={`${m?.id}-${index}`} className={`flex my-1 flex-wrap ${m?.user?.id === user.id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`message-box p-2 px-3 rounded-lg ${m?.user?.id === user.id ? 'bg-blue-200 ml-auto' : 'bg-blue-200 mr-auto'}`}>
                                {m?.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex sticky justify-center border-2 rounded border-app h-[50px] bottom-0">
                <input
                    className="bg-white border p-3 w-5/6"
                    placeholder="Type Message Here..."
                    type="text"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onKeyDown={e => {
                        if(e.key==="Enter" && e.target.value) {
                            handleSendMessage()
                        }
                    }}
                />
                <button className="flex gap-2 items-center justify-center text-center w-1/6 text-white text-lg bg-app" 
                    onClick={handleSendMessage}
                >
                    <p className="hidden lg:flex">Send</p>
                    <MdSend className="text-2xl" />
                </button>
            </div>
        </div>
    );
}

export default ChatBox;