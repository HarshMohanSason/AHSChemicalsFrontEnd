import os
import firebase_admin
from firebase_admin import credentials

ENV = os.environ.get("ENV")

if ENV == "DEV": #Set the env variable when running emulators start
    cred = credentials.Certificate("./keys/ahschemicalsdebug-firebase-adminsdk-fbsvc-febfd74a1c.json")
    firebase_admin.initialize_app(cred)
else:
    firebase_admin.initialize_app()
    print("Firebase initialized with default credentials.")

from handlers.create_account import create_account
from handlers.fetch_accounts import fetch_accounts
from handlers.delete_account import delete_account