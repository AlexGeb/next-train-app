from flask import Flask, Blueprint
from flask_cors import CORS
from flask_restplus import Resource, Api, fields
from flask_restplus.reqparse import Argument
from werkzeug.contrib.fixers import ProxyFix
from bson.json_util import dumps

from utils.db import Db
from utils.parse_params import parse_params


app = Flask(__name__)
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app)
blueprint = Blueprint('api', __name__, url_prefix='/api')
api = Api(blueprint,
          version='1',
          title='Next Train API',
          description='This is the next train API',
          doc='/swagger_doc/'
          )
app.register_blueprint(blueprint)


@api.route('/users')
class Users(Resource):
    def get(self):
        return dumps(Db().getCollection('users').find({}))

    @parse_params(Argument('name', required=True, location='json', type=str))
    def post(self, name):
        userCollection = Db().getCollection('users')
        user_id = userCollection.insert_one({'name': name}).inserted_id
        return dumps(userCollection.find_one({'_id': user_id}))

    def delete(self):
        Db().getCollection('users').delete_many({})
        return dumps({'result': 'ok'})


@api.route('/users/<int:user_id>')
class User(Resource):
    def get(self, user_id):
        return dumps(Db().getCollection('users').find({'_id': user_id}))

    @parse_params(Argument('name', required=True, location='json', type=str))
    def post(self, user_id, name):
        userCollection = Db().getCollection('users')
        user_id = userCollection.insert_one({'name': name}).inserted_id
        return dumps(userCollection.find_one({'_id': user_id}))

    def delete(self, user_id):
        Db().getCollection('users').delete_one({'_id': user_id})
        return dumps({'result': 'ok'})


if __name__ == '__main__':
    app.run(debug=True)
