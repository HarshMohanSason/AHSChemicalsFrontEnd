import {useState} from 'react'; 

export default function useLoadingOverlay(){
	const [showLoadingOverlay, setLoadingOverlay] = useState(false);

	const triggerLoadingOverlay = () => {
		setLoadingOverlay(true)
	}

	const hideLoadingOverlay = () => {
		setLoadingOverlay(false)
	}
	return {showLoadingOverlay, triggerLoadingOverlay, hideLoadingOverlay}
}