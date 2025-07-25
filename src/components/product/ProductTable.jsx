/*============================================================
* ARCHIVO NUEVO: src/components/product/ProductTable.jsx
* Responsabilidad: Mostrar la tabla de productos.
* =================================================================
*/
import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// La API ya nos da el stock_total, por lo que el componente es más simple
const ProductTable = ({ products, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Nombre</th>
                    <th scope="col" className="px-6 py-3">Línea</th>
                    <th scope="col" className="px-6 py-3">SKU</th>
                    <th scope="col" className="px-6 py-3">Stock Total</th>
                    <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center p-4 text-gray-500">No hay productos creados.</td>
                    </tr>
                ) : (
                    products.map(p => (
                        <tr key={p.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{p.nombre}</td>
                            <td className="px-6 py-4">{p.linea_marca || 'N/A'}</td>
                            <td className="px-6 py-4">{p.sku || 'N/A'}</td>
                            <td className="px-6 py-4 font-semibold">{p.stock_total || 0}</td>
                            <td className="px-6 py-4 flex items-center gap-2">
                                <button onClick={() => onEdit(p)} className="p-1" title="Editar">
                                    <PencilIcon className="w-5 h-5 text-gray-400 hover:text-blue-600" />
                                </button>
                                <button onClick={() => onDelete(p.id)} className="p-1" title="Borrar">
                                    <TrashIcon className="w-5 h-5 text-gray-400 hover:text-red-600" />
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
