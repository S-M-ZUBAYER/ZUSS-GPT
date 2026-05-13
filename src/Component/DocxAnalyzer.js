import React, { useState } from "react";
import { buildChatBotUrl } from "../config/api";

const CATEGORIES = [
    { label: "Attendance Machine", value: "attendance machine", route: "attendanceMachine" },
    { label: "Manual Attendance Machine", value: "manual attendance machine", route: "manualAttendanceMachine" },
    { label: "Thermal Printer", value: "thermal printer", route: "thermalPrinter" },
    { label: "Dot Printer", value: "dot printer", route: "dotPrinter" },
    { label: "Face Attendance", value: "face attendance", route: "faceAttendance" },
    { label: "Device Face Attendance Machine", value: "device face attendance machine", route: "deviceFaceAttendanceMachine" },
    { label: "Power Bank", value: "power bank", route: "powerBank" },
];

export default function DocxUploader() {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, message: "", success: false });

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (
            selectedFile &&
            selectedFile.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            setFile(selectedFile);
        } else {
            setFile(null);
            setModal({
                show: true,
                message: "Please select a valid DOCX file.",
                success: false,
            });
        }
    };

    const handleFileUpload = async () => {
        if (!file) {
            setModal({
                show: true,
                message: "No file selected. Please upload a DOCX file.",
                success: false,
            });
            return;
        }

        const selectedCategory = CATEGORIES.find((item) => item.value === category);
        if (!selectedCategory) {
            setModal({
                show: true,
                message: "Please select a category.",
                success: false,
            });
            return;
        }

        const formData = new FormData();
        formData.append("docxFile", file);
        formData.append("category", selectedCategory.label);

        setLoading(true);

        const apiUrl = buildChatBotUrl(selectedCategory.route, "extractText");

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData,
            });

            const rawText = await response.text();
            let data;
            try {
                data = JSON.parse(rawText);
            } catch {
                throw new Error("Invalid JSON response:\n" + rawText);
            }

            if (response.ok && data.success) {
                setModal({
                    show: true,
                    message: `Success. ${selectedCategory.label} section updated successfully!`,
                    success: true,
                });

                setFile(null);
                document.querySelector('input[type="file"]').value = "";
            } else {
                throw new Error(data.error || data.message || `Request failed with status ${response.status}.`);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setModal({
                show: true,
                message: `Failed to upload docx: ${error.message}`,
                success: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => setModal({ show: false, message: "", success: false });

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 relative">
            <h2 className="text-2xl font-bold text-center">DOCX Uploader</h2>

            <label>
                <span className="block mb-1 font-medium text-gray-700">Select Category:</span>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </label>

            <label className="block">
                <input
                    type="file"
                    accept=".docx"
                    onChange={handleFileChange}
                    className="mt-2 w-full px-3 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </label>

            <button
                onClick={handleFileUpload}
                disabled={loading || !file}
                className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition duration-200 ${loading || !file
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    }`}
            >
                {loading ? "Uploading..." : "Upload & Extract Text"}
            </button>

            {modal.show && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div
                        className={`relative p-6 rounded-lg shadow-lg w-80 text-center transition-all duration-300 ${modal.success
                            ? "bg-green-100 border border-green-500"
                            : "bg-red-100 border border-red-500"
                            }`}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            x
                        </button>
                        <h3
                            className={`font-semibold mb-2 ${modal.success ? "text-green-700" : "text-red-700"
                                }`}
                        >
                            {modal.success ? "Success" : "Error"}
                        </h3>
                        <p className="text-gray-800">{modal.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
