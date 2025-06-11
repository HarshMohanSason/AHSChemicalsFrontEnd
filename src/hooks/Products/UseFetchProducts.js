import { useCallback, useEffect, useState } from "react"
import { fetchProductsFromFirestore, handleFirebaseError } from "../../utils/firebase/firebase_utility"

const useFetchProducts = () => {

	const [products, setProducts] = useState([])
	const [error, setError] = useState("An error occurred");
	const [loading, setLoading] = useState(false);

	const fetchProducts = useCallback(async() => {
		setLoading(true)
		try{
			const getProducts = await fetchProductsFromFirestore();
			if (getProducts.length != 0){
				setProducts(getProducts)
			}
		}
		catch(error){
			setError(handleFirebaseError(error))
		}finally{
			setLoading(false)
		}
	}, []);

	useEffect(()=>{
		fetchProducts();
	}, [fetchProducts])

	return {
		products,
		error, 
		loading,
		refetch: fetchProducts,
	}
}

export default useFetchProducts;