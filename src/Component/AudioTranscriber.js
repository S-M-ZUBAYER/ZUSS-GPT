import { useState } from "react";
import axios from "axios";

const AudioTranscriber = () => {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, message: "", success: false });

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setModal({ show: false, message: "", success: false });
    };

    const handleUpload = async () => {
        if (!file) {
            setModal({ show: true, message: "⚠️ Please select an MP3, MP4, WAV, or M4A file.", success: false });
            return;
        }
        if (!category) {
            setModal({ show: true, message: "⚠️ Please select a category.", success: false });
            return;
        }

        setLoading(true);
        const baseLocal = "http://localhost:5000/tht/chatBot";
        const baseLive = "https://grozziie.zjweiting.com:8035/tht/chatBot";

        const apiUrl =
            category === "attendance machine"
                ? `${baseLive}/attendanceMachine/transcribe`
                : category === "manual attendance machine"
                    ? `${baseLive}/manualAttendanceMachine/transcribe`
                : category === "thermal printer"
                    ? `${baseLive}/thermalPrinter/transcribe`
                    : category === "dot printer"
                        ? `${baseLive}/dotPrinter/transcribe`
                        : category === "face attendance"
                            ? `${baseLive}/faceAttendance/transcribe`
                            : category === "power bank"
                                ? `${baseLive}/powerBank/transcribe`
                                : `${baseLocal}/transcribe`;


        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("category", category);

            const response = await axios.post(
                apiUrl,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.data?.success) {
                setModal({ show: true, message: `✅ ${response.data.message}`, success: true });
                setFile(null);
            } else if (response.data?.data?.text) {
                setModal({ show: true, message: `✅ Transcription completed successfully.`, success: true });
            } else {
                setModal({ show: true, message: "❌ Transcription failed. No text received.", success: false });
            }
        } catch (err) {
            console.log(err.response?.data?.message);
            setModal({ show: true, message: `❌ ${"Error processing the file."}`, success: false });
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => setModal({ show: false, message: "", success: false });

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 relative">
            <h2 className="text-2xl font-bold text-center">Audio Transcriber</h2>

            {/* Category Selection */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full p-2 border rounded mb-3"
            >
                <option value="">Select Category</option>
                <option value="attendance machine">Attendance Machine</option>
                <option value="manual attendance machine">Manual Attendance Machine</option>
                <option value="thermal printer">Thermal Printer</option>
                <option value="dot printer">Dot Printer</option>
                <option value="face attendance">Face Attendance</option>
                <option value="power bank">Power Bank</option>
            </select>

            {/* File Input */}
            <input
                type="file"
                accept="audio/mp3,video/mp4,audio/wav,audio/m4a"
                onChange={handleFileChange}
                className="block w-full p-2 border rounded mb-3"
            />

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Processing..." : "Upload & Transcribe"}
            </button>

            {/* Modal */}
            {modal.show && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div
                        className={`relative p-6 rounded-lg shadow-lg w-80 text-center transition-all duration-300 ${modal.success ? "bg-green-100 border border-green-500" : "bg-red-100 border border-red-500"
                            }`}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            ×
                        </button>
                        <h3 className={`font-semibold mb-2 ${modal.success ? "text-green-700" : "text-red-700"}`}>
                            {modal.success ? "Success" : "Error"}
                        </h3>
                        <p className="text-gray-800 whitespace-pre-wrap">{modal.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AudioTranscriber;
