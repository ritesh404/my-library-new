import Modal from "./Modal";

const GenericErrorModal = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <Modal>
      <p>Something went wrong</p>
      <div className="mt-4 flex gap-8">
        <button
          type="button"
          className=" px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
          onClick={onConfirm}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default GenericErrorModal;
