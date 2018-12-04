from flask import Flask, Blueprint
from flask_restplus import Resource, Api, fields
from werkzeug.contrib.fixers import ProxyFix
from pprint import pprint

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
blueprint = Blueprint('api', __name__, url_prefix='/api')
api = Api(blueprint,
          version='0.1',
          title='Our sample API',
          description='This is our sample API',
          doc='/swagger_doc/'
          )
app.register_blueprint(blueprint)


@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}


if __name__ == '__main__':
    app.run(debug=True)
