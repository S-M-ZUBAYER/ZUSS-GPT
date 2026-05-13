import React, { useState } from 'react';
import { buildChatBotUrl } from "../config/api";

const CATEGORY_ROUTES = {
    "attendance machine": "attendanceMachine",
    "manual attendance machine": "manualAttendanceMachine",
    "thermal printer": "thermalPrinter",
    "dot printer": "dotPrinter",
    "face attendance": "faceAttendance",
    "device face attendance machine": "deviceFaceAttendanceMachine",
    "power bank": "powerBank",
};

const AppendTextInfo = () => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, message: '', success: false });

    const handleAppendText = async (e) => {
        e.preventDefault();

        if (!text.trim()) {
            setModal({
                show: true,
                message: '⚠️ Please enter some text before submitting.',
                success: false,
            });
            return;
        }

        setLoading(true);
        const apiUrl = CATEGORY_ROUTES[category]
            ? buildChatBotUrl(CATEGORY_ROUTES[category], "appendText")
            : buildChatBotUrl("append-text");

        try {
            const response = await fetch(
                apiUrl,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text, category }),
                }
            );

            const data = await response.json();
            console.log(response);

            if (response.ok) {
                setModal({
                    show: true,
                    message: `✅ ${category.toUpperCase()} section updated successfully!`,
                    success: true,
                });
                setText('');
            } else {
                console.log(data.message);
                setModal({
                    show: true,
                    message: `❌ ${'Failed to append text.'}`,
                    success: false,
                });
            }
        } catch (error) {
            setModal({
                show: true,
                message: '❌ Failed to connect to the server.',
                success: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => setModal({ show: false, message: '', success: false });

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md relative">
            <h2 className="text-2xl font-bold text-center">Append Text</h2>

            {/* Category Selection */}
            <label className="block mb-3 font-medium text-gray-700">
                Select Category:
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Category</option>
                    <option value="attendance machine">Attendance Machine</option>
                    <option value="manual attendance machine">Manual Attendance Machine</option>
                    <option value="thermal printer">Thermal Printer</option>
                    <option value="dot printer">Dot Printer</option>
                    <option value="face attendance">Face Attendance</option>
                    <option value="device face attendance machine">Device Face Attendance Machine</option>
                    <option value="power bank">Power Bank</option>
                </select>
            </label>

            {/* Text Input Area */}
            <textarea
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
                placeholder={`Please enter text like:\nQuestion: What is your name?\nAnswer: My name is Jacky.`}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            {/* Submit Button */}
            <button
                onClick={handleAppendText}
                disabled={loading}
                className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition duration-300 ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                    }`}
            >
                {loading ? 'Appending...' : `Append to ${category}`}
            </button>

            {/* ✅ Modal Notification */}
            {modal.show && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div
                        className={`relative p-6 rounded-lg shadow-lg w-80 text-center transition-all duration-300 ${modal.success
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-red-100 border border-red-500'
                            }`}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            ×
                        </button>
                        <h3
                            className={`font-semibold mb-2 ${modal.success ? 'text-green-700' : 'text-red-700'
                                }`}
                        >
                            {modal.success ? 'Success' : 'Error'}
                        </h3>
                        <p className="text-gray-800">{modal.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppendTextInfo;
