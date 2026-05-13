// import { useEffect, useRef, useState } from "react";
// import "./App.css";
// import axios from "axios";

// // Components
// import ImageAnalyzer from "./Component/ImageAnalyzer";
// import AudioTranscriber from "./Component/AudioTranscriber";
// import AppendTextInfo from "./Component/AppendTextInfo";
// import PdfUploadAndAnalyze from "./Component/PdfUploadAndAnalyze";
// import DocxAnalyzer from "./Component/DocxAnalyzer";

// // Constants
// const CONSTANTS = {
//   API: {
//     BASE_URL: "https://grozziie.zjweiting.com:8035/tht",
//     // BASE_URL: "http://localhost:5000/tht",
//     ENDPOINTS: {
//       TEST: "/test",
//       CHAT: "/chatBot/chat/gpt"
//     }
//   },
//   STORAGE: {
//     CHAT_HISTORY: "chatHistory",
//     WELCOME_SHOWN: "welcomeShown"
//   },
//   MESSAGES: {
//     WELCOME: "Hello boss! I am an AI assistant chatbot of THT-Space Electrical Company Ltd. How can I assist you today?",
//     TYPING: "Typing...",
//     PLACEHOLDER: "Type your message here..."
//   },
//   IMAGES: {
//     USER_AVATAR: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
//     AI_AVATAR: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
//   }
// };

// // Custom Hooks
// const useChatHistory = () => {
//   const [chatHistory, setChatHistory] = useState([
//     {
//       role: "assistant",
//       content: "Hello boss! I am an AI assistant chatbot of THT-Space Electrical Company Ltd. How can I assist you today?"
//     }
//   ]);

//   useEffect(() => {
//     const savedHistory = localStorage.getItem(CONSTANTS.STORAGE.CHAT_HISTORY);
//     if (savedHistory) {
//       setChatHistory(JSON.parse(savedHistory));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(CONSTANTS.STORAGE.CHAT_HISTORY, JSON.stringify(chatHistory));
//   }, [chatHistory]);

//   const clearChat = () => {
//     localStorage.removeItem(CONSTANTS.STORAGE.CHAT_HISTORY);
//     setChatHistory([
//       {
//         role: "assistant",
//         content: "Hello boss! I am an AI assistant chatbot of THT-Space Electrical Company Ltd. How can I assist you today?"
//       }
//     ]);
//   };

//   return [chatHistory, setChatHistory, clearChat];
// };

// const useWelcomeMessage = (setChatHistory) => {
//   useEffect(() => {
//     const welcomeShown = localStorage.getItem(CONSTANTS.STORAGE.WELCOME_SHOWN);

//     if (!welcomeShown) {
//       const welcomeMessage = {
//         role: "assistant",
//         content: CONSTANTS.MESSAGES.WELCOME
//       };
//       setChatHistory([welcomeMessage]);
//       localStorage.setItem(CONSTANTS.STORAGE.WELCOME_SHOWN, "true");
//     }
//   }, [setChatHistory]);
// };

// // Components
// const ChatMessage = ({ message }) => {
//   const isUser = message.role === "user";

//   if (isUser) {
//     return (
//       <div className="flex justify-end mb-4">
//         <div className="flex items-end gap-3 max-w-[80%]">
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl rounded-br-none shadow-lg">
//             <p className="text-white">{message.content}</p>
//           </div>
//           <img
//             src={CONSTANTS.IMAGES.USER_AVATAR}
//             alt="User"
//             className="w-8 h-8 rounded-full border-2 border-white shadow-md"
//           />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-start mb-4">
//       <div className="flex items-end gap-3 max-w-[80%]">
//         <img
//           src={CONSTANTS.IMAGES.AI_AVATAR}
//           alt="AI"
//           className="w-8 h-8 rounded-full border-2 border-white shadow-md"
//         />
//         <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-lg border border-gray-100">
//           <div className="content">
//             {message.content.split('\n').map((line, index) => {
//               const urlMatch = line.match(/(http[s]?:\/\/[^\s]+)/i);
//               const isBold = line.match(/^(Step \d+:|Setting the Alarm)/);

//               if (urlMatch) {
//                 const url = urlMatch[0];
//                 const isVideo = url.endsWith('.mp4');

//                 return (
//                   <a
//                     key={index}
//                     href={url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
//                   >
//                     {getLocalizedLinkText(message.lang, isVideo)}
//                   </a>
//                 );
//               }

//               return (
//                 <p
//                   key={index}
//                   className={`${isBold
//                     ? 'font-bold text-gray-800 mb-2'
//                     : 'text-gray-700 mb-2'
//                     } leading-relaxed`}
//                 >
//                   {line}
//                 </p>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // 🌍 Add this helper function below your component
//   function getLocalizedLinkText(lang = 'en', isVideo = false) {
//     const texts = {
//       en: isVideo ? '🎥 Watch Video' : '🔗 Open Link',
//       zh: isVideo ? '🎥 观看视频' : '🔗 打开链接',
//       th: isVideo ? '🎥 ดูวิดีโอ' : '🔗 เปิดลิงก์',
//       vi: isVideo ? '🎥 Xem video' : '🔗 Mở liên kết',
//       ar: isVideo ? '🎥 شاهد الفيديو' : '🔗 افتح الرابط',
//       ja: isVideo ? '🎥 ビデオを見る' : '🔗 リンクを開く',
//       ko: isVideo ? '🎥 동영상 보기' : '🔗 링크 열기',
//       fr: isVideo ? '🎥 Regarder la vidéo' : '🔗 Ouvrir le lien',
//       hi: isVideo ? '🎥 वीडियो देखें' : '🔗 लिंक खोलें',
//       ml: isVideo ? '🎥 വീഡിയോ കാണുക' : '🔗 ലിങ്ക് തുറക്കുക',
//     };
//     console.log(texts[lang], "language ");

//     return texts[lang] || texts.en;
//   }

// };

// const ChatInput = ({ inputRef, loading, onSend }) => {
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Enter" && !event.shiftKey) {
//         event.preventDefault();
//         onSend();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [onSend]);

//   return (
//     <div className="bg-white border-t border-gray-200 py-4 px-6 shadow-lg mt-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex gap-3 items-end">
//           <div className="flex-1">
//             <textarea
//               ref={inputRef}
//               className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
//               placeholder={CONSTANTS.MESSAGES.PLACEHOLDER}
//               disabled={loading}
//               rows="1"
//               style={{ minHeight: '50px', maxHeight: '120px' }}
//             />
//           </div>
//           <button
//             disabled={loading}
//             className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md h-fit"
//             onClick={onSend}
//           >
//             {loading ? (
//               <div className="flex items-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Sending...
//               </div>
//             ) : (
//               'Send'
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Header = () => (
//   <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-6 shadow-xl">
//     <div className="mx-auto text-center">
//       <h1 className="text-4xl font-bold mb-2">ZUSS GPT</h1>
//       <p className="text-lg opacity-90">
//         AI Assistant for THT Space Electrical Company Ltd.
//       </p>
//     </div>
//   </div>
// );

// const FileUploadCard = ({ title, description, icon, children }) => (
//   <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//     <div className="p-6">
//       <div className="flex items-center gap-3 mb-4">
//         <div className="text-2xl">{icon}</div>
//         <div>
//           <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
//           <p className="text-gray-600 text-sm">{description}</p>
//         </div>
//       </div>
//       {children}
//     </div>
//   </div>
// );

// const FileToolsSection = () => (
//   <div className="bg-gray-50 py-12 mb-24">
//     <div className="container mx-auto max-w-6xl px-4">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-3">File Processing Section</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//           Upload and analyze various file types with our AI-powered tools
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
//         <FileUploadCard
//           title="Document Analysis"
//           description="Upload and analyze DOCX files"
//           icon="📄"
//         >
//           <DocxAnalyzer />
//         </FileUploadCard>
//         <FileUploadCard
//           title="Text Analysis"
//           description="Analyze and process text content"
//           icon="📝"
//         >
//           <AppendTextInfo />
//         </FileUploadCard>

//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         <FileUploadCard
//           title="PDF Analysis"
//           description="Upload and analyze PDF documents"
//           icon="📑"
//         >
//           <PdfUploadAndAnalyze />
//         </FileUploadCard>
//         <FileUploadCard
//           title="Image Analysis"
//           description="Upload and analyze images"
//           icon="🖼️"
//         >
//           <ImageAnalyzer />
//         </FileUploadCard>

//         <FileUploadCard
//           title="Audio Transcription"
//           description="Upload and transcribe audio files"
//           icon="🎵"
//         >
//           <AudioTranscriber />
//         </FileUploadCard>
//       </div>
//     </div>
//   </div>
// );

// // Main App Component
// function App() {
//   const inputRef = useRef();
//   const [loading, setLoading] = useState(false);
//   const [chatHistory, setChatHistory, clearChat] = useChatHistory();
//   const chatContainerRef = useRef(null);

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory, loading]);

//   // Test API connection
//   useEffect(() => {
//     const testApiConnection = async () => {
//       try {
//         const response = await fetch(
//           `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.ENDPOINTS.TEST}`
//         );
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const result = await response.json();
//         console.log("API connection successful:", result);
//       } catch (error) {
//         console.error("API connection failed:", error.message);
//       }
//     };

//     testApiConnection();
//   }, []);

//   const handleSend = async () => {
//     const question = inputRef.current?.value.trim();
//     if (!question) return;

//     // Clear input field
//     inputRef.current.value = "";

//     const newUserMessage = { role: "user", content: question };
//     setLoading(true);

//     try {
//       // Get recent messages for context
//       const storedHistory = JSON.parse(
//         localStorage.getItem(CONSTANTS.STORAGE.CHAT_HISTORY) || "[]"
//       );

//       const messagesToSend = [...storedHistory, newUserMessage];

//       // Update state with user's message
//       setChatHistory(prev => [...prev, newUserMessage]);

//       // Send to backend
//       const response = await axios.post(
//         `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.ENDPOINTS.CHAT}`,
//         { messages: messagesToSend }
//       );

//       const aiMessage = { role: "assistant", content: response.data.answer, lang: response.data.lang };
//       setChatHistory(prev => [...prev, aiMessage]);

//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = {
//         role: "assistant",
//         content: "Sorry, I encountered an error. Please try again."
//       };
//       setChatHistory(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log(chatHistory, "chat history");


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <Header />

//       {/* Main Chat Area */}
//       <div className="container mx-auto max-w-6xl px-4 py-6">
//         <div
//           ref={chatContainerRef}
//           className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6 max-h-[60vh] min-h-[400px] overflow-y-auto"
//         >
//           <div className="chats">
//             {chatHistory.map((message, index) => (
//               <ChatMessage key={index} message={message} />
//             ))}

//             {loading && (
//               <div className="flex justify-start mb-4">
//                 <div className="flex items-end gap-3 max-w-[80%]">
//                   <img
//                     src={CONSTANTS.IMAGES.AI_AVATAR}
//                     alt="AI"
//                     className="w-8 h-8 rounded-full border-2 border-white shadow-md"
//                   />
//                   <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-lg border border-gray-100">
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <div className="flex space-x-1">
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                       </div>
//                       {CONSTANTS.MESSAGES.TYPING}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Input Area - Now properly positioned below chat */}
//         <ChatInput
//           inputRef={inputRef}
//           loading={loading}
//           onSend={handleSend}
//         />
//       </div>

//       {/* File Tools Section */}
//       <FileToolsSection />
//     </div>
//   );
// }

// export default App;





// import { useEffect, useRef, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
// import "./App.css";
// import axios from "axios";

// // Components
// import ImageAnalyzer from "./Component/ImageAnalyzer";
// import AudioTranscriber from "./Component/AudioTranscriber";
// import AppendTextInfo from "./Component/AppendTextInfo";
// import PdfUploadAndAnalyze from "./Component/PdfUploadAndAnalyze";
// import DocxAnalyzer from "./Component/DocxAnalyzer";

// // Constants
// const CONSTANTS = {
//   API: {
//     BASE_URL: "http://localhost:5000/tht",
//     // BASE_URL: "https://grozziie.zjweiting.com:8035/tht",
//     ENDPOINTS: {
//       TEST: "/test",
//       // CHAT: "/chatBot/attendanceMachine/chat/gpt"
//       CHAT: "/chatBot/powerBank/chat/gpt"
//     }
//   },
//   STORAGE: {
//     CHAT_HISTORY: "chatHistory",
//     WELCOME_SHOWN: "welcomeShown"
//   },
//   MESSAGES: {
//     WELCOME: "Hi boss! I’m Grozziie’s AI assistant chatbot. How can I assist you today?",
//     TYPING: "Typing...",
//     PLACEHOLDER: "Type your message here..."
//   },
//   IMAGES: {
//     USER_AVATAR: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
//     AI_AVATAR: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
//   }
// };

// // Custom Hooks
// const useChatHistory = () => {
//   const [chatHistory, setChatHistory] = useState([
//     {
//       role: "assistant",
//       content: "Hi boss! I’m Grozziie’s AI assistant chatbot. How can I assist you today?"
//     }
//   ]);

//   useEffect(() => {
//     const savedHistory = localStorage.getItem(CONSTANTS.STORAGE.CHAT_HISTORY);
//     if (savedHistory) {
//       setChatHistory(JSON.parse(savedHistory));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(CONSTANTS.STORAGE.CHAT_HISTORY, JSON.stringify(chatHistory));
//   }, [chatHistory]);

//   const clearChat = () => {
//     localStorage.removeItem(CONSTANTS.STORAGE.CHAT_HISTORY);
//     setChatHistory([
//       {
//         role: "assistant",
//         content: "Hi boss! I’m Grozziie’s AI assistant chatbot. How can I assist you today?"
//       }
//     ]);
//   };

//   return [chatHistory, setChatHistory, clearChat];
// };

// // Components
// const ChatMessage = ({ message }) => {
//   const isUser = message.role === "user";

//   if (isUser) {
//     return (
//       <div className="flex justify-end mb-4">
//         <div className="flex items-end gap-3 max-w-[80%]">
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl rounded-br-none shadow-lg">
//             <p className="text-white">{message.content}</p>
//           </div>
//           <img
//             src={CONSTANTS.IMAGES.USER_AVATAR}
//             alt="User"
//             className="w-8 h-8 rounded-full border-2 border-white shadow-md"
//           />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-start mb-4">
//       <div className="flex items-end gap-3 max-w-[80%]">
//         <img
//           src={CONSTANTS.IMAGES.AI_AVATAR}
//           alt="AI"
//           className="w-8 h-8 rounded-full border-2 border-white shadow-md"
//         />
//         <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-lg border border-gray-100">
//           <div className="content">
//             {message.content.split('\n').map((line, index) => {
//               const urlMatch = line.match(/(http[s]?:\/\/[^\s]+)/i);
//               const isBold = line.match(/^(Step \d+:|Setting the Alarm)/);

//               if (urlMatch) {
//                 const url = urlMatch[0];
//                 const isVideo = url.endsWith('.mp4');

//                 return (
//                   <a
//                     key={index}
//                     href={url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
//                   >
//                     {getLocalizedLinkText(message.lang, isVideo)}
//                   </a>
//                 );
//               }

//               return (
//                 <p
//                   key={index}
//                   className={`${isBold
//                     ? 'font-bold text-gray-800 mb-2'
//                     : 'text-gray-700 mb-2'
//                     } leading-relaxed`}
//                 >
//                   {line}
//                 </p>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   function getLocalizedLinkText(lang = 'en', isVideo = false) {
//     const texts = {
//       en: isVideo ? '🎥 Watch Video' : '🔗 Open Link',
//       zh: isVideo ? '🎥 观看视频' : '🔗 打开链接',
//       th: isVideo ? '🎥 ดูวิดีโอ' : '🔗 เปิดลิงก์',
//       vi: isVideo ? '🎥 Xem video' : '🔗 Mở liên kết',
//       ar: isVideo ? '🎥 شاهد الفيديو' : '🔗 افتح الرابط',
//       ja: isVideo ? '🎥 ビデオを見る' : '🔗 リンクを開く',
//       ko: isVideo ? '🎥 동영상 보기' : '🔗 링크 열기',
//       fr: isVideo ? '🎥 Regarder la vidéo' : '🔗 Ouvrir le lien',
//       hi: isVideo ? '🎥 वीडियो देखें' : '🔗 लिंक खोलें',
//       ml: isVideo ? '🎥 വീഡിയോ കാണുക' : '🔗 ലിങ്ക് തുറക്കുക',
//     };
//     return texts[lang] || texts.en;
//   }
// };

// const ChatInput = ({ inputRef, loading, onSend }) => {
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Enter" && !event.shiftKey) {
//         event.preventDefault();
//         onSend();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [onSend]);

//   return (
//     <div className="bg-white border-t border-gray-200 py-4 px-6 shadow-lg mt-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex gap-3 items-end">
//           <div className="flex-1">
//             <textarea
//               ref={inputRef}
//               className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
//               placeholder={CONSTANTS.MESSAGES.PLACEHOLDER}
//               disabled={loading}
//               rows="1"
//               style={{ minHeight: '50px', maxHeight: '120px' }}
//             />
//           </div>
//           <button
//             disabled={loading}
//             className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md h-fit"
//             onClick={onSend}
//           >
//             {loading ? (
//               <div className="flex items-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Sending...
//               </div>
//             ) : (
//               'Send'
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Header = ({ currentPage }) => (
//   <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-6 shadow-xl max-h-28">
//     <div className="container mx-auto">
//       <div className="flex justify-between items-center">
//         <div className="text-center flex-1">
//           <h1 className="text-4xl font-bold mb-2">Grozziie AI Chatbot</h1>
//           <p className="text-lg opacity-90">
//             AI Assistant for Grozziie.
//           </p>
//         </div>
//         {/* <nav className="flex gap-4">
//           <Link
//             to="/"
//             className={`px-4 py-2 rounded-lg transition-all ${currentPage === 'chat'
//               ? 'bg-white text-blue-600 font-semibold shadow-lg'
//               : 'bg-blue-500 text-white hover:bg-blue-400'
//               }`}
//           >
//             Chat
//           </Link>
//           <Link
//             to="/backend"
//             className={`px-4 py-2 rounded-lg transition-all ${currentPage === 'backend'
//               ? 'bg-white text-blue-600 font-semibold shadow-lg'
//               : 'bg-blue-500 text-white hover:bg-blue-400'
//               }`}
//           >
//             File Tools
//           </Link>
//         </nav> */}
//       </div>
//     </div>
//   </div>
// );

// // Chat Component (Main Page)
// const ChatPage = () => {
//   const inputRef = useRef();
//   const [loading, setLoading] = useState(false);
//   const [chatHistory, setChatHistory] = useChatHistory();
//   const chatContainerRef = useRef(null);

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory, loading]);

//   const handleSend = async () => {
//     const question = inputRef.current?.value.trim();
//     if (!question) return;

//     // Clear input field
//     inputRef.current.value = "";

//     const newUserMessage = { role: "user", content: question };
//     setLoading(true);

//     try {
//       // Get recent messages for context
//       const storedHistory = JSON.parse(
//         localStorage.getItem(CONSTANTS.STORAGE.CHAT_HISTORY) || "[]"
//       );

//       const messagesToSend = [...storedHistory, newUserMessage];

//       // Update state with user's message
//       setChatHistory(prev => [...prev, newUserMessage]);

//       // Send to backend
//       const response = await axios.post(
//         `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.ENDPOINTS.CHAT}`,
//         { messages: messagesToSend }
//       );

//       const aiMessage = { role: "assistant", content: response.data.answer, lang: response.data.lang };
//       setChatHistory(prev => [...prev, aiMessage]);

//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = {
//         role: "assistant",
//         content: "Sorry, I encountered an error. Please try again."
//       };
//       setChatHistory(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto max-w-6xl px-4 py-6">
//       <div
//         ref={chatContainerRef}
//         className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6 max-h-[70vh] min-h-[500px] overflow-y-auto"
//       >
//         <div className="chats">
//           {chatHistory.map((message, index) => (
//             <ChatMessage key={index} message={message} />
//           ))}

//           {loading && (
//             <div className="flex justify-start mb-4">
//               <div className="flex items-end gap-3 max-w-[80%]">
//                 <img
//                   src={CONSTANTS.IMAGES.AI_AVATAR}
//                   alt="AI"
//                   className="w-8 h-8 rounded-full border-2 border-white shadow-md"
//                 />
//                 <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-lg border border-gray-100">
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                     </div>
//                     {CONSTANTS.MESSAGES.TYPING}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <ChatInput
//         inputRef={inputRef}
//         loading={loading}
//         onSend={handleSend}
//       />
//     </div>
//   );
// };

// // File Upload Card Component
// const FileUploadCard = ({ title, description, icon, children }) => (
//   <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//     <div className="p-6">
//       <div className="flex items-center gap-3 mb-4">
//         <div className="text-2xl">{icon}</div>
//         <div>
//           <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
//           <p className="text-gray-600 text-sm">{description}</p>
//         </div>
//       </div>
//       {children}
//     </div>
//   </div>
// );

// // Backend Page Component (File Upload Section)
// const BackendPage = () => (
//   <div className="bg-gray-50 min-h-screen py-12">
//     <div className="container mx-auto max-w-6xl px-4">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-3">File Processing Section</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//           Upload and analyze various file types with our AI-powered tools
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
//         <FileUploadCard
//           title="Document Analysis"
//           description="Upload and analyze DOCX files"
//           icon="📄"
//         >
//           <DocxAnalyzer />
//         </FileUploadCard>
//         <FileUploadCard
//           title="Text Analysis"
//           description="Analyze and process text content"
//           icon="📝"
//         >
//           <AppendTextInfo />
//         </FileUploadCard>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <FileUploadCard
//           title="PDF Analysis"
//           description="Upload and analyze PDF documents"
//           icon="📑"
//         >
//           <PdfUploadAndAnalyze />
//         </FileUploadCard>
//         <FileUploadCard
//           title="Image Analysis"
//           description="Upload and analyze images"
//           icon="🖼️"
//         >
//           <ImageAnalyzer />
//         </FileUploadCard>
//         <FileUploadCard
//           title="Audio Transcription"
//           description="Upload and transcribe audio files"
//           icon="🎵"
//         >
//           <AudioTranscriber />
//         </FileUploadCard>
//       </div>
//     </div>
//   </div>
// );

// // Navigation Wrapper
// const NavigationWrapper = () => {
//   const location = useLocation();
//   const currentPage = location.pathname === '/' ? 'chat' : 'backend';

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <Header currentPage={currentPage} />

//       <Routes>
//         <Route path="/" element={<ChatPage />} />
//         <Route path="/backend" element={<BackendPage />} />
//       </Routes>
//     </div>
//   );
// };

// // Main App Component
// function App() {
//   // Test API connection
//   useEffect(() => {
//     const testApiConnection = async () => {
//       try {
//         const response = await fetch(
//           `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.ENDPOINTS.TEST}`
//         );
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const result = await response.json();
//         console.log("API connection successful:", result);
//       } catch (error) {
//         console.error("API connection failed:", error.message);
//       }
//     };

//     testApiConnection();
//   }, []);

//   return (
//     <Router>
//       <NavigationWrapper />
//     </Router>
//   );
// }

// export default App;



import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import axios from "axios";
import faceAttendanceLogo from "./Assest/faceAttendanceLogo.png";
import customerLogo from "./Assest/customerLogo.jpg";
import { API_BASE_URL } from "./config/api";

// Components
import ImageAnalyzer from "./Component/ImageAnalyzer";
import AudioTranscriber from "./Component/AudioTranscriber";
import AppendTextInfo from "./Component/AppendTextInfo";
import PdfUploadAndAnalyze from "./Component/PdfUploadAndAnalyze";
import DocxAnalyzer from "./Component/DocxAnalyzer";

// Constants
const CONSTANTS = {
  API: {
    BASE_URL: API_BASE_URL,
    ENDPOINTS: {
      TEST: "/test",
    }
  },
  PRODUCTS: {
    ATTENDANCE_MACHINE: {
      name: "Bluetooth Attendance Machine",
      endpoint: "/chatBot/attendanceMachine/chat/gpt",
      storageKey: "attendanceMachineChatHistory"
    },
    MANUAL_ATTENDANCE_MACHINE: {
      name: "Manual Attendance Machine",
      endpoint: "/chatBot/manualAttendanceMachine/chat/gpt",
      storageKey: "manualAttendanceMachineChatHistory"
    },
    DOT_PRINTER: {
      name: "Dot Printer",
      endpoint: "/chatBot/dotPrinter/chat/gpt",
      storageKey: "dotPrinterChatHistory"
    },
    THERMAL_PRINTER: {
      name: "Thermal Printer",
      endpoint: "/chatBot/thermalPrinter/chat/gpt",
      storageKey: "thermalPrinterChatHistory"
    },
    Face_ATTENDANCE: {
      name: "Face Attendance",
      endpoint: "/chatBot/faceAttendance/chat/gpt",
      storageKey: "faceAttendanceChatHistory"
    },
    DEVICE_FACE_ATTENDANCE_MACHINE: {
      name: "Device Face Attendance Machine",
      endpoint: "/chatBot/deviceFaceAttendanceMachine/chat/gpt",
      storageKey: "deviceFaceAttendanceMachineChatHistory"
    },
    POWER_BANK: {
      name: "Power Bank",
      endpoint: "/chatBot/powerBank/chat/gpt",
      storageKey: "powerBankChatHistory"
    }

  },
  STORAGE: {
    WELCOME_SHOWN: "welcomeShown",
    SELECTED_PRODUCT: "selectedProduct"
  },
  MESSAGES: {
    WELCOME: "Hi boss! I'm Grozziie's AI assistant chatbot. How can I assist you today?",
    TYPING: "Typing...",
    PLACEHOLDER: "Type your message here..."
  },
  IMAGES: {
    USER_AVATAR: customerLogo,
    AI_AVATAR: faceAttendanceLogo
  }
};

// Custom Hooks
const useChatHistory = (selectedProduct) => {
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: `Hi boss! I'm Grozziie's AI assistant chatbot for ${selectedProduct.name}. How can I assist you today?`
    }
  ]);

  useEffect(() => {
    const storageKey = selectedProduct.storageKey;
    const savedHistory = localStorage.getItem(storageKey);
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    } else {
      // Initialize with welcome message for this product
      setChatHistory([
        {
          role: "assistant",
          content: `Hi boss! I'm Grozziie's AI assistant chatbot for ${selectedProduct.name}. How can I assist you today?`
        }
      ]);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const storageKey = selectedProduct.storageKey;
    localStorage.setItem(storageKey, JSON.stringify(chatHistory));
  }, [chatHistory, selectedProduct]);

  const clearChat = () => {
    const storageKey = selectedProduct.storageKey;
    localStorage.removeItem(storageKey);
    setChatHistory([
      {
        role: "assistant",
        content: `Hi boss! I'm Grozziie's AI assistant chatbot for ${selectedProduct.name}. How can I assist you today?`
      }
    ]);
  };

  return [chatHistory, setChatHistory, clearChat];
};

const useProductSelection = () => {
  const [selectedProduct, setSelectedProduct] = useState(CONSTANTS.PRODUCTS.ATTENDANCE_MACHINE);

  useEffect(() => {
    const savedProduct = localStorage.getItem(CONSTANTS.STORAGE.SELECTED_PRODUCT);
    if (savedProduct) {
      const product = Object.values(CONSTANTS.PRODUCTS).find(p => p.name === savedProduct);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, []);

  const selectProduct = (product) => {
    setSelectedProduct(product);
    localStorage.setItem(CONSTANTS.STORAGE.SELECTED_PRODUCT, product.name);
  };

  return [selectedProduct, selectProduct];
};


const useBackendCheck = () => {
  const location = useLocation();

  useEffect(() => {
    const checkBackendInUrl = () => {
      const currentPath = location.pathname;
      const hasBackend = currentPath.includes('backend');

      console.log('URL changed:', currentPath);
      console.log('Contains "backend":', hasBackend);

      // You can perform any action based on the result
      if (hasBackend) {
        console.log('Backend page detected');
        // Add your backend-specific logic here
      } else {
        console.log('Chat page detected');
        // Add your chat page logic here
      }
    };

    // Check immediately when component mounts or URL changes
    checkBackendInUrl();

  }, [location.pathname]); // Dependency on URL pathname

  return location.pathname.includes('backend');
};

console.log(useBackendCheck, "backend");


// Components
const ProductSelector = ({ selectedProduct, onProductSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const products = Object.values(CONSTANTS.PRODUCTS);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-all flex items-center gap-2"
      >
        <span>{selectedProduct.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
          {products.map((product) => (
            <button
              key={product.name}
              onClick={() => {
                onProductSelect(product);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-all ${selectedProduct.name === product.name
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'text-gray-700'
                } first:rounded-t-lg last:rounded-b-lg`}
            >
              {product.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-end gap-3 max-w-[80%]">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl rounded-br-none shadow-lg">
            <p className="text-white">{message.content}</p>
          </div>
          <img
            src={CONSTANTS.IMAGES.USER_AVATAR}
            alt="User"
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end gap-3 max-w-[80%]">
        <img
          src={CONSTANTS.IMAGES.AI_AVATAR}
          alt="AI"
          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
        />
        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-lg border border-gray-100">
          <div className="content">
            {message.content.split('\n').map((line, index) => {
              const urlParts = line.split(/(https?:\/\/[^\s]+)/gi);
              const hasUrl = urlParts.some((part) => /^https?:\/\//i.test(part));
              const isBold = line.match(/^(Step \d+:|Setting the Alarm)/);

              if (hasUrl) {
                return (
                  <p
                    key={index}
                    className={`${isBold
                      ? 'font-bold text-gray-800 mb-2'
                      : 'text-gray-700 mb-2'
                      } leading-relaxed`}
                  >
                    {urlParts.map((part, partIndex) => {
                      if (!/^https?:\/\//i.test(part)) {
                        return part;
                      }

                      const url = part;
                      const isVideo = url.toLowerCase().endsWith('.mp4');

                      return (
                        <a
                          key={`${index}-${partIndex}`}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mx-1 mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                        >
                          {getLocalizedLinkText(message.lang, isVideo)}
                        </a>
                      );
                    })}
                  </p>
                );
              }

              return (
                <p
                  key={index}
                  className={`${isBold
                    ? 'font-bold text-gray-800 mb-2'
                    : 'text-gray-700 mb-2'
                    } leading-relaxed`}
                >
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  function getLocalizedLinkText(lang = 'en', isVideo = false) {
    const texts = {
      en: isVideo ? '🎥 Watch Video' : '🔗 Open Link',
      zh: isVideo ? '🎥 观看视频' : '🔗 打开链接',
      th: isVideo ? '🎥 ดูวิดีโอ' : '🔗 เปิดลิงก์',
      vi: isVideo ? '🎥 Xem video' : '🔗 Mở liên kết',
      ar: isVideo ? '🎥 شاهد الفيديو' : '🔗 افتح الرابط',
      ja: isVideo ? '🎥 ビデオを見る' : '🔗 リンクを開く',
      ko: isVideo ? '🎥 동영상 보기' : '🔗 링크 열기',
      fr: isVideo ? '🎥 Regarder la vidéo' : '🔗 Ouvrir le lien',
      hi: isVideo ? '🎥 वीडियो देखें' : '🔗 लिंक खोलें',
      ml: isVideo ? '🎥 വീഡിയോ കാണുക' : '🔗 ലിങ്ക് തുറക്കുക',
    };
    return texts[lang] || texts.en;
  }
};

const ChatInput = ({ inputRef, loading, onSend }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        onSend();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSend]);

  return (
    <div className="bg-white border-t border-gray-200 py-4 px-6 shadow-lg mt-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              placeholder={CONSTANTS.MESSAGES.PLACEHOLDER}
              disabled={loading}
              rows="1"
              style={{ minHeight: '50px', maxHeight: '120px' }}
            />
          </div>
          <button
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md h-fit"
            onClick={onSend}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = ({ currentPage, selectedProduct, onProductSelect }) => (
  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-6 shadow-xl max-h-28">
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold mb-2">Grozziie AI Chatbot</h1>
          <p className="text-lg opacity-90">
            AI Assistant for Grozziie
          </p>
        </div>
        <div className="flex items-center gap-4">
          {!useBackendCheck() && (
            <ProductSelector
              selectedProduct={selectedProduct}
              onProductSelect={onProductSelect}
            />
          )}
          {/* <nav className="flex gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all ${currentPage === 'chat'
                ? 'bg-white text-blue-600 font-semibold shadow-lg'
                : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
            >
              Chat
            </Link>
            <Link
              to="/backend"
              className={`px-4 py-2 rounded-lg transition-all ${currentPage === 'backend'
                ? 'bg-white text-blue-600 font-semibold shadow-lg'
                : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
            >
              File Tools
            </Link>
          </nav> */}
        </div>
      </div>
    </div>
  </div>
);

// Chat Component (Main Page)
const ChatPage = ({ selectedProduct }) => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory, clearChat] = useChatHistory(selectedProduct);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  const handleSend = async () => {
    const question = inputRef.current?.value.trim();
    if (!question) return;

    // Clear input field
    inputRef.current.value = "";

    const newUserMessage = { role: "user", content: question };
    setLoading(true);

    try {
      // Get recent messages for context
      const storedHistory = JSON.parse(
        localStorage.getItem(selectedProduct.storageKey) || "[]"
      );

      const messagesToSend = [...storedHistory, newUserMessage];

      // Update state with user's message
      setChatHistory(prev => [...prev, newUserMessage]);

      // Send to backend with selected product endpoint
      const response = await axios.post(
        `${CONSTANTS.API.BASE_URL}${selectedProduct.endpoint}`,
        { messages: messagesToSend }
      );

      const aiMessage = { role: "assistant", content: response.data.answer, lang: response.data.lang };
      setChatHistory(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-700 font-semibold">
          Currently chatting about: <span className="text-blue-800">{selectedProduct.name}</span>
        </p>
      </div>

      <div
        ref={chatContainerRef}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6 max-h-[70vh] min-h-[500px] overflow-y-auto"
      >
        <div className="chats">
          {chatHistory.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {loading && (
            <div className="flex justify-start mb-4">
              <div className="flex items-end gap-3 max-w-[80%]">
                <img
                  src={CONSTANTS.IMAGES.AI_AVATAR}
                  alt="AI"
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                />
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    {CONSTANTS.MESSAGES.TYPING}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ChatInput
        inputRef={inputRef}
        loading={loading}
        onSend={handleSend}
      />
    </div>
  );
};

// File Upload Card Component
const FileUploadCard = ({ title, description, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="p-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      {children}
    </div>
  </div>
);

// Backend Page Component (File Upload Section)
const BackendPage = () => (
  <div className="bg-gray-50 min-h-screen py-12">
    <div className="container mx-auto max-w-6xl px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">File Processing Section</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Upload and analyze various file types with our AI-powered tools
        </p>
      </div>
      <div>
         <FileUploadCard
          title="Document Analysis"
          description="Upload and analyze DOCX files"
          icon="📄"
        >
          <DocxAnalyzer />
        </FileUploadCard>
      </div>

      <div className="">
    
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FileUploadCard
          title="PDF Analysis"
          description="Upload and analyze PDF documents"
          icon="📑"
        >
          <PdfUploadAndAnalyze />
        </FileUploadCard>
        <FileUploadCard
          title="Image Analysis"
          description="Upload and analyze images"
          icon="🖼️"
        >
          <ImageAnalyzer />
        </FileUploadCard>
        <FileUploadCard
          title="Audio Transcription"
          description="Upload and transcribe audio files"
          icon="🎵"
        >
          <AudioTranscriber />
        </FileUploadCard>
      </div> */}
    </div>
  </div>
);

// Navigation Wrapper
const NavigationWrapper = () => {
  const location = useLocation();
  const currentPage = location.pathname === '/' ? 'chat' : 'backend';
  const [selectedProduct, selectProduct] = useProductSelection();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header
        currentPage={currentPage}
        selectedProduct={selectedProduct}
        onProductSelect={selectProduct}
      />

      <Routes>
        <Route path="/" element={<ChatPage selectedProduct={selectedProduct} />} />
        <Route path="/backend" element={<BackendPage />} />
      </Routes>
    </div>
  );
};

// Main App Component
function App() {
  // Test API connection
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        const response = await fetch(
          `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.ENDPOINTS.TEST}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log("API connection successful:", result);
      } catch (error) {
        console.error("API connection failed:", error.message);
      }
    };

    testApiConnection();
  }, []);

  return (
    <Router>
      <NavigationWrapper />
    </Router>
  );
}

export default App;
