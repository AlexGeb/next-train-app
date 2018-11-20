import os
import datetime
from pymongo import MongoClient

mongodb_addon_uri = os.environ['MONGODB_ADDON_URI']
client = MongoClient(mongodb_addon_uri)

db_name = 'b2tldipfksar9fs'
db = client.get_database(db_name)

collection_name = 'my-collection'
collection = db[collection_name]

if collection.find_one() == None:
    document = {"name": "Mike",
                "desc": "First doc",
                "tags": ["mongodb", "python", "pymongo"],
                "date": datetime.datetime.utcnow()}
    inserted_id = collection.insert_one(document).inserted_id
