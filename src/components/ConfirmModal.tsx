type Props = {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({ message, onConfirm, onCancel }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Да
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};
  