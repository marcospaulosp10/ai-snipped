import type { TextModalProps } from "../interfaces/types";

export default function TextModal({ text, onClose }: TextModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-2">Full Text</h3>
        <p className="text-sm text-gray-800 whitespace-pre-wrap">{text}</p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}