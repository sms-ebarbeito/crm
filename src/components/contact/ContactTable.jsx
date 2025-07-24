import React from 'react';
import { PencilIcon, TrashIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'; // Ejemplo de cómo usar heroicons
import Avatar from '../ui/Avatar';
import { formatPhoneNumberForWhatsApp } from '../../utils/helpers';

const ContactTable = ({ contacts, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nombre</th>
                        <th scope="col" className="px-6 py-3">Teléfono</th>
                        <th scope="col" className="px-6 py-3">Vendedor</th>
                        <th scope="col" className="px-6 py-3">Estado</th>
                        <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{contact.nombre}</td>
                            <td className="px-6 py-4">{contact.telefono || 'N/A'}</td>
                            <td className="px-6 py-4"><Avatar salesperson={contact.salesperson} /></td>
                            <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${contact.status?.nombre?.toLowerCase() === 'activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {contact.status?.nombre || 'N/A'}
                                    </span>
                            </td>
                            <td className="px-6 py-4 flex items-center gap-2">
                                <button onClick={() => onEdit(contact)} className="p-1" title="Editar">
                                    <PencilIcon className="w-5 h-5 text-gray-400 hover:text-blue-600" />
                                </button>
                                <button onClick={() => onDelete(contact.id)} className="p-1" title="Borrar">
                                    <TrashIcon className="w-5 h-5 text-gray-400 hover:text-red-600" />
                                </button>
                                <a href={`https://wa.me/${formatPhoneNumberForWhatsApp(contact.telefono, contact.pais)}`} target="_blank" rel="noopener noreferrer" className="p-1" title="WhatsApp">
                                    {/* Este es un ícono de WhatsApp SVG simple, puedes usar una librería si prefieres */}
                                    <svg className="w-5 h-5 text-gray-400 hover:text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.58-1.452L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l-.519 1.883 1.916-.506z"></path></svg>
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactTable;