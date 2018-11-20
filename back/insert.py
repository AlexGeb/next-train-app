from http.server import BaseHTTPRequestHandler
from pymongo import MongoClient
import datetime
import os

def insert_one_if_not_exist():
    mongodb_addon_uri = os.environ['MONGODB_ADDON_URI']
    client = MongoClient(mongodb_addon_uri)
    db_name = 'b2tldipfksar9fs'
    db = client.get_database(db_name) 
    collection_name = 'my-collection'
    collection = db[collection_name]
    id = collection.find_one()
    if id == None:
        document = {"name": "Mike",
                    "desc": "First doc",
                    "tags": ["mongodb", "python", "pymongo"],
                    "date": datetime.datetime.utcnow()}
        return collection.insert_one(document).inserted_id
    else:
        return id


class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(str(insert_one_if_not_exist()).encode())
        return
