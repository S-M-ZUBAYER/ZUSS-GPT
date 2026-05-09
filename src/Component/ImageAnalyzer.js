import { useState } from "react";
import axios from "axios";

const ImageAnalyzer = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, message: "", success: false });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setModal({ show: false, message: "", success: false });
        }
    };

    const analyzeImage = async () => {
        if (!image) {
            setModal({ show: true, message: "⚠️ Please select an image first.", success: false });
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
                ? `${baseLive}/attendanceMachine/analyzeImage`
                : category === "manual attendance machine"
                    ? `${baseLive}/manualAttendanceMachine/analyzeImage`
                : category === "thermal printer"
                    ? `${baseLive}/thermalPrinter/analyzeImage`
                    : category === "dot printer"
                        ? `${baseLive}/dotPrinter/analyzeImage`
                        : category === "face attendance"
                            ? `${baseLive}/faceAttendance/analyzeImage`
                            : category === "power bank"
                                ? `${baseLive}/powerBank/analyzeImage`
                                : `${baseLocal}/analyze-image`;

        const formData = new FormData();
        formData.append("image", image);
        formData.append("category", category);

        try {
            const response = await axios.post(
                apiUrl,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.data?.success) {
                setModal({
                    show: true,
                    message: `✅ ${response.data.message}`, // file path removed
                    success: true,
                });
                setImage(null);
                setPreview(null);
            } else {
                setModal({
                    show: true,
                    message: "❌ Failed to analyze image.",
                    success: false,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            setModal({ show: true, message: "❌ Error analyzing image.", success: false });
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => setModal({ show: false, message: "", success: false });

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 relative">
            <h2 className="text-2xl font-bold text-center">Image Analyzer</h2>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full p-2 border rounded mb-4"
            >
                <option value="">Select Category</option>
                <option value="attendance machine">Attendance Machine</option>
                <option value="manual attendance machine">Manual Attendance Machine</option>
                <option value="thermal printer">Thermal Printer</option>
                <option value="dot printer">Dot Printer</option>
                <option value="face attendance">Face Attendance</option>
                <option value="power bank">Power Bank</option>
            </select>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-3 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer p-2"
            />

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="mb-3 rounded-lg shadow-md w-full max-h-60 object-cover"
                />
            )}

            <button
                onClick={analyzeImage}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Analyzing..." : "Analyze Image"}
            </button>

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
                        <h3
                            className={`font-semibold mb-2 ${modal.success ? "text-green-700" : "text-red-700"
                                }`}
                        >
                            {modal.success ? "Success" : "Error"}
                        </h3>
                        <p className="text-gray-800 whitespace-pre-wrap">{modal.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageAnalyzer;
