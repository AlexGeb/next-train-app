from http.server import BaseHTTPRequestHandler
from bson.json_util import dumps
from mongoDb import MongoDb


class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        collection = MongoDb().getCollection('users')
        users = collection.find({}, {'_id': 0})
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(str(dumps(users)).encode())
        return

    def do_POST(self):
        collection = MongoDb().getCollection('users')
        insertResult = collection.insert_one({'name': 'Alex'})
        insertedUser = collection.find_one(
            {'_id': insertResult.inserted_id}, {'_id': 0})
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(str(dumps(insertedUser)).encode())
        return
