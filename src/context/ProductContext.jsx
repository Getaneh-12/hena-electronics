import { createContext, useContext, useState } from "react";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {

    const [products, setProducts] = useState(() => {

        const savedProducts =
            localStorage.getItem("henaProducts");

        return savedProducts
            ? JSON.parse(savedProducts)
            : [];
    });


    const saveProducts = (updatedProducts) => {

        setProducts(updatedProducts);

        localStorage.setItem(
            "henaProducts",
            JSON.stringify(updatedProducts)
        );
    };


    const addProduct = (product) => {

        const newProduct = {
            ...product,
            id: Date.now(),
        };

        saveProducts([
            ...products,
            newProduct,
        ]);
    };


    const updateProduct = (id, updatedProduct) => {

        const updatedProducts = products.map(
            (product) =>
                product.id === Number(id)
                    ? {
                        ...product,
                        ...updatedProduct,
                        id: product.id,
                    }
                    : product
        );

        saveProducts(updatedProducts);
    };


    const deleteProduct = (id) => {

        const updatedProducts = products.filter(
            (product) =>
                String(product.id) !== String(id)
        );

        saveProducts(updatedProducts);
    };


    const removePromotion = (id) => {

        const updatedProducts = products.map(
            (product) =>
                product.id === Number(id)
                    ? {
                        ...product,
                        promotion: "inactive",
                        discount: 0,
                    }
                    : product
        );

        saveProducts(updatedProducts);
    };


    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
                removePromotion,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}


export function useProducts() {

    return useContext(ProductContext);

}