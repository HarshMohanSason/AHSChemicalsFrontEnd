export class LocalStorage {
	
	static set(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (err) {
			console.error("LocalStorage.set error:", err);
		}
	}

	static get(key) {
		try {
			const value = localStorage.getItem(key);
			return value ? JSON.parse(value) : null;
		} catch (err) {
			console.error("LocalStorage.get error:", err);
			return null;
		}
	}

	static remove(key) {
		try {
			localStorage.removeItem(key);
		} catch (err) {
			console.error("LocalStorage.remove error:", err);
		}
	}

	static clear() {
		try {
			localStorage.clear();
		} catch (err) {
			console.error("LocalStorage.clear error:", err);
		}
	}
}