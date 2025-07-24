import React from 'react';
import Avatar from "../ui/Avatar.jsx";

const Header = () => (
    <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="text-lg font-semibold text-gray-800">Contactos</div>
        <div className="flex items-center">
            <span className="text-sm mr-2">Hernán</span>
            <Avatar salesperson={ { nombre: "H M"} } />
        </div>
    </header>
);

export default Header;