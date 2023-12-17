import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, children, onOpen, open }) {
  if (!open) return null;
  return (
    <div>
      <div className="fixed inset-0 w-screen h-screen bg-gray-800 bg-opacity-80"
       onClick={() => onOpen(false)}></div>
      <div className=" w-1/2  min-h-[400px]
       absolute top-1/2 left-1/2 transform -translate-x-1/2
        -translate-y-1/2 bg-slate-800 p-4 rounded-lg
         shadow-2xl  shadow-slate-700 ">
        <div className="flex items-center mb-4 justify-between 
         border-solid border-b border-slate-600">
          <h2 className="text-slate-200 font-bold text-lg">{title}</h2>
          <button onClick={() => onOpen(false)}>
            <XCircleIcon className="w-6 h-24 text-rose-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
