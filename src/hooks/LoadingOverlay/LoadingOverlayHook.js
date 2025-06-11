import {useState} from 'react'; 

const useLoadingOverlay = () => {
	const [showLoadingOverlay, setLoadingOverlay] = useState(false);

	const triggerLoadingOverlay = () => {
		setLoadingOverlay(true)
	}

	const hideLoadingOverlay = () => {
		setLoadingOverlay(false)
	}
	return {showLoadingOverlay, triggerLoadingOverlay, hideLoadingOverlay}
}

export default useLoadingOverlay;