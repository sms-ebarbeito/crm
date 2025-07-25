/*
* =================================================================
* ARCHIVO NUEVO: src/components/product/ProductModal.jsx (REVISADO Y CORREGIDO)
* Responsabilidad: Formulario de creación/edición de productos con lógica de lotes y precios escalonados.
* =================================================================
*/
import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { api } from '../../services/api';

// Añadimos la pestaña Documentación
const TABS = ['Información', 'Lotes y Stock', 'Precios y Promociones', 'Documentación'];

const emptyProduct = {
    nombre: '', sku: '', linea_marca: '', categoria: '', origen: '',
    presentacion: '', composicion: '', precio_base: '', permite_combinacion: false,
    precios_escalonados: [],
};

const ProductModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState(emptyProduct);
    const [lotes, setLotes] = useState([]);
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [isSaving, setIsSaving] = useState(false);

    const [newLote, setNewLote] = useState({ numero_lote: '', fecha_vencimiento: '', stock_disponible: '' });
    // Estado para el formulario de nuevo tramo de precio
    const [newPriceTier, setNewPriceTier] = useState({ cantidad_minima: '', precio: '' });

    useEffect(() => {
        if (product?.id) {
            const fetchDetails = async () => {
                try {
                    const details = await api.getProductDetails(product.id);
                    setFormData({
                        ...emptyProduct,
                        ...details,
                        precios_escalonados: details.precios_escalonados || [],
                    });
                    setLotes(details.lotes || []);
                } catch (error) {
                    console.error("Error fetching product details", error);
                    alert("No se pudieron cargar los detalles del producto.");
                    onClose();
                }
            };
            fetchDetails();
        } else {
            setFormData(emptyProduct);
            setLotes([]);
        }
    }, [product, onClose]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleAddLote = () => {
        if (!newLote.numero_lote || !newLote.stock_disponible) {
            alert("El número de lote y la cantidad son obligatorios.");
            return;
        }
        setLotes(prev => [...prev, { ...newLote, id: `temp-${Date.now()}` }]);
        setNewLote({ numero_lote: '', fecha_vencimiento: '', stock_disponible: '' });
    };

    const handleAddPriceTier = () => {
        if (!newPriceTier.cantidad_minima || !newPriceTier.precio) {
            alert("La cantidad mínima y el precio son obligatorios.");
            return;
        }
        setFormData(prev => ({
            ...prev,
            precios_escalonados: [...prev.precios_escalonados, { ...newPriceTier, id: `temp-${Date.now()}` }]
        }));
        setNewPriceTier({ cantidad_minima: '', precio: '' });
    };

    const handleRemovePriceTier = (tierId) => {
        setFormData(prev => ({
            ...prev,
            precios_escalonados: prev.precios_escalonados.filter(tier => tier.id !== tierId)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre) {
            alert('El nombre del producto es obligatorio.');
            return;
        }
        setIsSaving(true);
        try {
            const { lotes: _, ...productDataToSave } = formData;
            // Limpiamos los IDs temporales de los precios escalonados
            productDataToSave.precios_escalonados = productDataToSave.precios_escalonados.map(({ id, ...rest }) => rest);

            let savedProduct;

            if (product?.id) {
                savedProduct = await api.updateProduct(product.id, productDataToSave);
            } else {
                savedProduct = await api.createProduct(productDataToSave);
            }

            const newLotesToAdd = lotes.filter(l => String(l.id).startsWith('temp-'));
            for (const lote of newLotesToAdd) {
                await api.addLot({
                    producto_id: savedProduct.id,
                    numero_lote: lote.numero_lote,
                    fecha_vencimiento: lote.fecha_vencimiento || null,
                    cantidad_inicial: parseInt(lote.stock_disponible),
                    stock_disponible: parseInt(lote.stock_disponible),
                });
            }

            onSave();
        } catch (error) {
            console.error("Failed to save product", error);
            alert("Error al guardar el producto.");
        } finally {
            setIsSaving(false);
        }
    };

    const modalTitle = product ? 'Editar Producto' : 'Crear Nuevo Producto';

    return (
        <Modal isOpen={true} onClose={onClose} title={modalTitle}>
            <form onSubmit={handleSubmit}>
                <div className="p-6 modal-body">
                    <div className="border-b border-gray-200 mb-6"><nav className="-mb-px flex space-x-8">
                        {TABS.map(tab => (
                            <button key={tab} type="button" onClick={() => setActiveTab(tab)}
                                    className={`${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                                {tab}
                            </button>
                        ))}
                    </nav></div>

                    <div className="space-y-6">
                        {activeTab === 'Información' && (
                            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label htmlFor="product-name" className="block mb-1 text-sm font-medium">Nombre del Producto</label><input type="text" id="product-name" name="nombre" value={formData.nombre} onChange={handleChange} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" required /></div>
                                <div><label htmlFor="product-sku" className="block mb-1 text-sm font-medium">SKU / Código</label><input type="text" id="product-sku" name="sku" value={formData.sku} onChange={handleChange} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" /></div>
                                <div><label htmlFor="product-line" className="block mb-1 text-sm font-medium">Línea / Marca</label><input type="text" id="product-line" name="linea_marca" value={formData.linea_marca} onChange={handleChange} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" /></div>
                                <div><label htmlFor="product-category" className="block mb-1 text-sm font-medium">Categoría</label><input type="text" id="product-category" name="categoria" value={formData.categoria} onChange={handleChange} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" /></div>
                                <div><label htmlFor="product-origin" className="block mb-1 text-sm font-medium">Origen</label><input type="text" id="product-origin" name="origen" value={formData.origen} onChange={handleChange} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" /></div>
                                <div><label htmlFor="product-presentation" className="block mb-1 text-sm font-medium">Presentación</label><input type="text" id="product-presentation" name="presentacion" value={formData.presentacion} onChange={handleChange} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" /></div>
                                <div className="md:col-span-2"><label htmlFor="product-composition" className="block mb-1 text-sm font-medium">Composición</label><textarea id="product-composition" name="composicion" rows="2" value={formData.composicion} onChange={handleChange} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"></textarea></div>
                            </fieldset>
                        )}
                        {activeTab === 'Lotes y Stock' && (
                            <div className="space-y-6">
                                <fieldset className="border p-4 rounded-lg"><legend className="text-sm font-medium text-gray-700 px-2">Añadir Nuevo Lote</legend>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 items-end">
                                        <div><label htmlFor="lote-number" className="block mb-1 text-sm font-medium">N° de Lote</label><input type="text" id="lote-number" value={newLote.numero_lote} onChange={e => setNewLote({...newLote, numero_lote: e.target.value})} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" /></div>
                                        <div><label htmlFor="lote-expiry" className="block mb-1 text-sm font-medium">Vencimiento</label><input type="date" id="lote-expiry" value={newLote.fecha_vencimiento} onChange={e => setNewLote({...newLote, fecha_vencimiento: e.target.value})} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" /></div>
                                        <div><label htmlFor="lote-quantity" className="block mb-1 text-sm font-medium">Cantidad</label><input type="number" id="lote-quantity" value={newLote.stock_disponible} onChange={e => setNewLote({...newLote, stock_disponible: e.target.value})} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" min="0" /></div>
                                    </div>
                                    <div className="text-right mt-3"><button type="button" onClick={handleAddLote} className="bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 text-sm">Añadir Lote</button></div>
                                </fieldset>
                                <fieldset className="border p-4 rounded-lg"><legend className="text-sm font-medium text-gray-700 px-2">Stock Actual por Lote</legend>
                                    {lotes.length === 0 ? <p className="text-sm text-gray-500 pt-2">(No hay lotes para este producto)</p> : (
                                        <ul className="pt-2 space-y-2 max-h-48 overflow-y-auto">
                                            {lotes.map(lote => (
                                                <li key={lote.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                                                    <span>Lote: <strong>{lote.numero_lote}</strong></span>
                                                    <span>Vence: <strong>{lote.fecha_vencimiento || 'N/A'}</strong></span>
                                                    <span>Stock: <strong>{lote.stock_disponible}</strong></span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </fieldset>
                            </div>
                        )}
                        {activeTab === 'Precios y Promociones' && (
                            <div className="space-y-6">
                                <fieldset className="border p-4 rounded-lg"><legend className="text-sm font-medium text-gray-700 px-2">Precios</legend>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        <div><label htmlFor="product-price-base" className="block mb-1 text-sm font-medium">Precio Unitario Base</label><input type="number" id="product-price-base" name="precio_base" value={formData.precio_base} onChange={handleChange} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="Ej: 310000" min="0" /></div>
                                        <div className="flex items-end pb-2"><div className="flex items-center"><input id="product-promo-combinable" name="permite_combinacion" type="checkbox" checked={formData.permite_combinacion} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" /><label htmlFor="product-promo-combinable" className="ml-2 text-sm font-medium">Permite combinación en promos</label></div></div>
                                    </div>
                                </fieldset>
                                <fieldset className="border p-4 rounded-lg"><legend className="text-sm font-medium text-gray-700 px-2">Precios Escalonados</legend>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 items-end">
                                        <div><label htmlFor="tier-quantity" className="block mb-1 text-sm font-medium">Cantidad Mínima</label><input type="number" id="tier-quantity" value={newPriceTier.cantidad_minima} onChange={e => setNewPriceTier({...newPriceTier, cantidad_minima: e.target.value})} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" min="1" /></div>
                                        <div><label htmlFor="tier-price" className="block mb-1 text-sm font-medium">Precio por Unidad</label><input type="number" id="tier-price" value={newPriceTier.precio} onChange={e => setNewPriceTier({...newPriceTier, precio: e.target.value})} className="input-field bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" min="0" /></div>
                                        <div><button type="button" onClick={handleAddPriceTier} className="w-full bg-green-500 text-white px-4 py-2.5 rounded-md hover:bg-green-600">Añadir Tramo</button></div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {formData.precios_escalonados.map(tier => (
                                            <div key={tier.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                                                <span>Desde <strong>{tier.cantidad_minima}</strong> uds. a <strong>${tier.precio}</strong> c/u</span>
                                                <button type="button" onClick={() => handleRemovePriceTier(tier.id)} className="text-red-500 hover:text-red-700 font-bold">&times;</button>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                        )}
                        {activeTab === 'Documentación' && (
                            <fieldset className="border p-4 rounded-lg">
                                <legend className="text-sm font-medium text-gray-700 px-2">Documentación</legend>
                                <p className="text-sm text-gray-600 pt-2">Funcionalidad para adjuntar archivos en construcción.</p>
                            </fieldset>
                        )}
                    </div>
                </div>
                <div className="flex items-center p-6 border-t">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isSaving}>
                        {isSaving ? 'Guardando...' : 'Guardar Producto'}
                    </button>
                    <button type="button" onClick={onClose} className="ml-3 text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5">
                        Cancelar
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ProductModal;