from firebase_functions import https_fn
from firebase_admin import auth, firestore
from utils.cors import apply_cors

@https_fn.on_request()
def create_account(req: https_fn.Request) -> https_fn.Response:
    if req.method == "OPTIONS":  # Pre-flight request
        return apply_cors(https_fn.Response("", status=204))

    data = req.get_json()

    try: 
        # Create the user
        user = auth.create_user(
            email=data["email"],
            password=data["password"],
            display_name=f"{data['firstName']} {data['lastName']}",
        )

        # Set the Firestore document for the user
        db = firestore.client()
        user_doc_ref = db.collection("users").document(user.uid)
        user_doc_ref.set({
            "properties": data.get("properties", []),
            "createdAt": firestore.SERVER_TIMESTAMP,
        })

        return apply_cors(https_fn.Response("Successfully added the product", status=200))

    except Exception as e:
        return apply_cors(https_fn.Response(f"Error: {str(e)}", status=500))