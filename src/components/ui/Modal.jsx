import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'; // Necesitarás: npm install @heroicons/react

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
            onClick={onClose} // Cierra el modal si se hace clic en el fondo
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-3xl"
                onClick={e => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
            >
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;