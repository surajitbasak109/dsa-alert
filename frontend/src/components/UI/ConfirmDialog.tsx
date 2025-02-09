import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ConfirmDialogProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title = 'Are you Sure?',
  children,
  open,
  onConfirm = () => {},
  onClose = () => {}
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 w-full h-full z-1000 bg-black/80"
        onClick={onClose}></div>
      <div className="fixed top-[50%] left-[50%] z-1000 translate-x-[-50%] translate-y-[-50%] flex flex-col gap-4 bg-white max-w-lg duration-200 sm:rounded-lg sm:max-w-[425px] rounded-xl p-6 border shadow-lg">
        <h3 className='text-xl font-bold text-gray-700'>{title}</h3>
        <div>{children}</div>
        <div className="flex items-center justify-end w-full gap-x-3">
          <button
            type="button"
            className="px-4 py-2 mt-4 text-black border rounded-full cursor-pointer border-slate-500"
            onClick={handleConfirm}>
            Confirm
          </button>
          <button
            type="button"
            className="px-4 py-2 mt-4 text-white bg-red-800 border rounded-full cursor-pointer"
            onClick={onClose}>
            Close
          </button>
        </div>
        <button
          type="button"
          className="absolute text-gray-600 cursor-pointer top-4 right-4"
          onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path>
          </svg>
        </button>
      </div>
    </>,
    document.body
  );
};

export default ConfirmDialog;
