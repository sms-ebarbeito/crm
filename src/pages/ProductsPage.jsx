/*
* =================================================================
* ARCHIVO NUEVO: src/pages/ProductsPage.jsx
* Responsabilidad: Contener toda la lógica del nuevo módulo de Productos.
* =================================================================
*/
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { PlusIcon } from '@heroicons/react/24/solid';
import ProductTable from '../components/product/ProductTable';
import ProductModal from '../components/product/ProductModal';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            // Usamos la nueva función de la API
            const data = await api.getProductsWithStock();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleOpenModal = (product = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };


    const handleSave = () => {
        fetchProducts(); // Refresca la lista de productos
        handleCloseModal();
    };

    const handleDelete = async (productId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await api.deleteProduct(productId);
                fetchProducts(); // Refresca la lista
            } catch (error) {
                console.error("Failed to delete product", error);
                alert("Error al eliminar el producto.");
            }
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestionar Productos</h1>
                <button onClick={() => handleOpenModal()} className="bg-[#0062E0] text-white px-4 py-2 rounded-md hover:bg-[#004AAD] flex items-center">
                    <PlusIcon className="w-5 h-5 mr-2"/>
                    Crear Producto
                </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
                {isLoading ? (
                    <p>Cargando productos...</p>
                ) : (
                    <ProductTable products={products} onEdit={handleOpenModal} onDelete={handleDelete} />
                )}
            </div>

            {isModalOpen && (
                <ProductModal
                    product={editingProduct}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default ProductsPage;