export class SessionStorage {

	static set(key, value) {
		try {
			sessionStorage.setItem(key, JSON.stringify(value));
		} catch (err) {
			console.error("SessionStorage.set error:", err);
		}
	}

	static get(key) {
		try {
			const value = sessionStorage.getItem(key);
			return value ? JSON.parse(value) : null;
		} catch (err) {
			console.error("SessionStorage.get error:", err);
			return null;
		}
	}

	static remove(key) {
		try {
			sessionStorage.removeItem(key);
		} catch (err) {
			console.error("SessionStorage.remove error:", err);
		}
	}
	
	static clear() {
		try {
			sessionStorage.clear();
		} catch (err) {
			console.error("SessionStorage.clear error:", err);
		}
	}
}