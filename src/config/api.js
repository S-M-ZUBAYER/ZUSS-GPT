export const API_BASE_URL = (
    process.env.REACT_APP_API_BASE_URL || "https://grozziie.zjweiting.com:8035/tht"
).replace(/\/+$/, "");

export const CHATBOT_BASE_URL = `${API_BASE_URL}/chatBot`;

export const buildChatBotUrl = (...parts) => {
    const cleanParts = parts
        .filter(Boolean)
        .map((part) => String(part).replace(/^\/+|\/+$/g, ""));

    return [CHATBOT_BASE_URL, ...cleanParts].join("/");
};
