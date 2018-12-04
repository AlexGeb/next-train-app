from pymongo import MongoClient
import os


class Db():
    MONGODB_ADDON_URI = os.environ['MONGODB_ADDON_URI'] if 'MONGODB_ADDON_URI' in os.environ else 'localhost'
    DB_NAME = 'b2tldipfksar9fs'

    def __init__(self):
        self.client = MongoClient(self.MONGODB_ADDON_URI)
        self.db = self.client.get_database(self.DB_NAME)

    def getCollection(self, collectionName):
        return self.db[collectionName]
