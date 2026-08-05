import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

import api from "../api/client";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

const ProductDetail = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data.product);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError('Failed to fetch product details. Please try again later.');
                console.error('Error fetching product:', error);
            }
        };



    useEffect(() => {
         
        fetchProduct();
  
},[])

return (
    <div className="container mx-auto p-4  w-full max-w-6xl">

    {loading && <ProductCardSkeleton className="w-full"/>}
    
    {error && <div className="text-red-500">{error}</div>}

    {product && <ProductCard product={product} />}




    </div>



)





}



export default ProductDetail