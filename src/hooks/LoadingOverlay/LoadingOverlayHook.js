import {useState} from 'react'; 

const useLoadingOverlay = () => {
	const [show, setLoadingOverlay] = useState(false);

	const trigger = () => {
		setLoadingOverlay(true)
	}

	const hide = () => {
		setLoadingOverlay(false)
	}
	return {show, trigger, hide}
}

export default useLoadingOverlay;