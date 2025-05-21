from firebase_functions import https_fn
from firebase_admin import auth, firestore
from utils.cors import apply_cors

@https_fn.on_request()
def delete_account(req: https_fn.Request) -> https_fn.Response:
    if req.method == "OPTIONS":  # Pre-flight request
        return apply_cors(https_fn.Response("", status=204))

    data = req.get_json() 
    uid = data["uuid"]
    try: 
        user = auth.get_user(uid)
        if user: 
            auth.delete_user(uid)
            user_doc_ref = db.collection("users").document(user.uid)
            if user_doc_ref: 
                user_doc_ref.delete()

        return apply_cors(https_fn.Response("Successfully deleted the user", status=200))

    except Exception as e: 
        return apply_cors(https_fn.Response(f"Error: {str(e)}", status=500))

