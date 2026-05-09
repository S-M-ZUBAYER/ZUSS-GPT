import React, { useState } from 'react';
import axios from 'axios';

const PdfUploadAndAppend = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, message: '', success: false });

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleAnalyzeAndAppend = async () => {
        if (!pdfFile) {
            setModal({ show: true, message: '⚠️ Please select a PDF file first.', success: false });
            return;
        }

        setLoading(true);
        const baseLocal = "http://localhost:5000/tht/chatBot";
        const baseLive = "https://grozziie.zjweiting.com:8035/tht/chatBot";

        const apiUrl =
            category === "attendance machine"
                ? `${baseLive}/attendanceMachine/analyzePdf`
                : category === "manual attendance machine"
                    ? `${baseLive}/manualAttendanceMachine/analyzePdf`
                : category === "thermal printer"
                    ? `${baseLive}/thermalPrinter/analyzePdf`
                    : category === "dot printer"
                        ? `${baseLive}/dotPrinter/analyzePdf`
                        : category === "face attendance"
                            ? `${baseLive}/faceAttendance/analyzePdf`
                            : category === "power bank"
                                ? `${baseLive}/powerBank/analyzePdf`
                                : `${baseLocal}/analyze-pdf`;

        console.log(apiUrl);

        const formData = new FormData();
        formData.append('pdf', pdfFile);
        formData.append('category', category);

        try {
            const response = await axios.post(
                apiUrl,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setModal({
                show: true,
                message: `✅ ${category.replace('_', ' ')} section updated successfully!`,
                success: true,
            });

            setPdfFile(null);
        } catch (error) {
            console.error('Error:', error);
            setModal({ show: true, message: '❌ Failed to analyze and append PDF.', success: false });
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => setModal({ show: false, message: '', success: false });

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md relative">
            <h2 className="text-2xl font-bold mb-4 text-center">PDF Uploader</h2>

            {/* Category Selection */}
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
                accept=".pdf"
                onChange={handleFileChange}
                className="mb-4 block w-full border border-gray-300 rounded p-2"
            />

            <button
                onClick={handleAnalyzeAndAppend}
                disabled={loading || !pdfFile}
                className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 ${loading || !pdfFile
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                    }`}
            >
                {loading ? 'Processing...' : `Analyze & Append to ${category.replace('_', ' ')}`}
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
                            className={`font-semibold mb-2 ${modal.success ? 'text-green-700' : 'text-red-700'}`}
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

export default PdfUploadAndAppend;
