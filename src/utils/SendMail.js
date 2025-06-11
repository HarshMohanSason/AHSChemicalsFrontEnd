import * as Sentry from "@sentry/react";

export async function sendMail (data){
	try{
		const response = await fetch(process.env.REACT_APP_SEND_MAIL, {
			method: "POST", 
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(data)
		})
		if(!response.ok){
			const message = await response.text()
			throw new Error(message)
		}
	}catch(error){
		Sentry.captureException(error);
	}
}