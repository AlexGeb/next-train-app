from flask import Flask, Blueprint
from flask_cors import CORS
from flask_restplus import Resource, Api, fields
from flask_restplus.reqparse import Argument
from werkzeug.contrib.fixers import ProxyFix
from bson.json_util import dumps

from .parse_params import parse_params
from .db import Db

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
        return dumps(Db().getCollection('users').find({}, {'_id': 0}))

    @parse_params(Argument('name', required=True, location='json', type=str))
    def post(self, name):
        userCollection = Db().getCollection('users')
        user_id = userCollection.insert_one({'name': name}).inserted_id
        return dumps(userCollection.find_one({'_id': user_id}, {'_id': 0}))


if __name__ == '__main__':
    app.run(debug=True)
