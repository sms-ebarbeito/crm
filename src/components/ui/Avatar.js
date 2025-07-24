import React from 'react';

const salespersonColors = ['#e53935', '#1e88e5', '#43a047', '#f9a825', '#8e24aa', '#d81b60', '#00acc1'];

const Avatar = ({ salesperson }) => {
    if (!salesperson || !salesperson.nombre) {
        return <div className="avatar bg-gray-400" title="Sin Asignar">?</div>;
    }

    const initials = salesperson.nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    const id = salesperson.id || 0;
    const colorIndex = id % salespersonColors.length;
    const color = salespersonColors[colorIndex];

    return (
        <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-white text-sm"
            style={{ backgroundColor: color }}
            title={salesperson.nombre}
        >
            {initials}
        </div>
    );
};

export default Avatar;