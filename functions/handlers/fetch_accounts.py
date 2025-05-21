from firebase_functions import https_fn
from firebase_admin import auth, firestore
from utils.cors import apply_cors
import json

@https_fn.on_request()
def fetch_accounts(req: https_fn.Request) -> https_fn.Response:
    if req.method == "OPTIONS":  # Pre-flight request
        return apply_cors(https_fn.Response("", status=204))

    try: 
        users = []
        page = auth.list_users() # Firebase returns 50 users per page
        db = firestore.client()
        for user in page.users: 
                user_doc_ref = db.collection("users").document(user.uid)
                doc = user_doc_ref.get()
                if doc.exists:
                    data = doc.to_dict()
                    properties = data.get('properties', [])
                    users.append({
                        "uid": user.uid,
                        "email": user.email,
                        "properties": properties,
                        "displayName": user.display_name,
                    })

        return apply_cors(https_fn.Response(response=json.dumps(users),status=200,headers={"Content-Type": "application/json"}))

    except Exception as e:
        return apply_cors(https_fn.Response(response=json.dumps({"error": str(e)}),status=500,headers={"Content-Type": "application/json"}))

