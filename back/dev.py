from flask import Flask, request, abort
from flask_cors import CORS
from http.server import HTTPServer
from importlib import import_module
import _thread
import os
import requests
import json
from glob import glob
from pprint import pprint


def loadNowConfig():
    nowConfig = {}
    with open('now.json') as json_config:
        nowConfig = json.load(json_config)
        json_config.close()
    return nowConfig


def getRouteMapping():
    nowConfig = loadNowConfig()
    routeMapping = []
    for routes in nowConfig['routes']:
        if '.py' in routes['dest']:
            routeMapping.append(
                dict(path=routes['src'].replace('/api/', ''),
                     module=routes['dest'].replace('/', '.')[6:-3]
                     )
            )
    return routeMapping


app = Flask(__name__)
CORS(app)

os.environ["MONGODB_ADDON_URI"] = "localhost"

routes = getRouteMapping()

pprint(routes)


def now_handler(handler):
    lambda_port = 8000
    new_server_host = 'http://' + request.host[:-4] + str(lambda_port)
    _thread.start_new_thread(HTTPServer(
        ('', lambda_port), handler).handle_request, ())
    return requests.request(request.method, new_server_host)


@app.route('/api/<path>', methods=['GET', 'POST'])
def handle(path):
    pprint(path)
    module = [route['module']
              for route in routes if path == route['path']]
    if module == []:
        abort(404)
    print(module)
    handler = import_module(module[0]).handler
    res = now_handler(handler)
    return res.text


if __name__ == '__main__':
    app.run(debug=True)
