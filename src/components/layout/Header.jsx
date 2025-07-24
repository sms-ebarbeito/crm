import React from 'react';

const Header = () => (
    <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="text-lg font-semibold text-gray-800">Contactos</div>
        <div className="flex items-center">
            <span className="text-sm mr-2">Hernán</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">H</div>
        </div>
    </header>
);

export default Header;