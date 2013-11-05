from copy import deepcopy
from bottle import route, run, template, request, put, get, response
import requests, uuid, json, random

# the decorator
def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors

@route('/hello/<name>')
def index(name='World'):
    return template('<b>Hello {{name}}</b>!', name=name)

@route('/sendDocument', method=['OPTIONS', 'PUT'])
@enable_cors
def sendDocument():
  documentJson = request.json
  documentJson = mergeJson(documentJson)
  docUUID = uuid.uuid1()
  print str(docUUID)
  print json.dumps(documentJson, sort_keys=True)
  draftResponse = putDraft(docUUID, documentJson)
  if draftResponse != 204:
    return draftResponse
  dispatchUUID = uuid.uuid1()
  sendResponse = dispatchDraft(docUUID, dispatchUUID)
  if sendResponse != 201:
    return sendResponse
  return '{"uuid": "'+str(docUUID)+'"}'

def mergeJson(documentJson):
  json_data=open('template.json')
  data = json.load(json_data)
  return dict_merge(data, documentJson)

def putDraft(docUUID, documentJson):
  url = 'http://localhost:8888/tradeshift-backend/rest/external/documents/'+str(docUUID)+'?documentProfileId=nes.p5.invoice.ubl.2.1.dk&draft=true'
  headers = {'X-Tradeshift-TenantId': '8ba90b5c-c287-4811-96e9-0b7bdf865d1b', 'X-Tradeshift-ActorId': '4ae44e7c-4d3c-4ba8-bf74-ddc0c60f0549', 'Content-Type': 'application/json'}
  randomId = random.choice('abcdefghij') + str(random.randrange(1000,10000))
  documentJson['ID']['value'] = randomId
  r = requests.put(url, data=json.dumps(documentJson), headers=headers)
  return r.status_code

def dispatchDraft(docUUID, dispatchUUID):
    url = 'http://localhost:8888/tradeshift-backend/rest/external/documents/'+str(docUUID)+'/dispatches/'+str(dispatchUUID)
    headers = {'X-Tradeshift-TenantId': '8ba90b5c-c287-4811-96e9-0b7bdf865d1b', 'X-Tradeshift-ActorId': '4ae44e7c-4d3c-4ba8-bf74-ddc0c60f0549', 'Content-Type': 'application/json'}
    data={'ConnectionId':'9d501ed9-d6c8-4ce0-84ec-2872c5d9b492'}
    r = requests.put(url, data=json.dumps(data), headers=headers)
    return r.status_code

@get('/getPDF/<docUUID>')
def getPDF(docUUID):
  url = 'http://localhost:8888/tradeshift-backend/rest/external/documents/'+str(docUUID)
  headers = {'X-Tradeshift-TenantId': '8ba90b5c-c287-4811-96e9-0b7bdf865d1b', 'X-Tradeshift-ActorId': '4ae44e7c-4d3c-4ba8-bf74-ddc0c60f0549', 'Accept': 'application/pdf'}
  r = requests.get(url, headers=headers)
  if r.status_code != 200:
    return r.status_code
  response.content_type = 'application/pdf'
  response.body = r._content
  return response

def dict_merge(target, *args):
  if len(args) > 1:
    for obj in args:
      dict_merge(target, obj)
    return target
  obj = args[0]
  if not isinstance(obj, dict):
    return obj
  for k, v in obj.iteritems():
    if k in target and isinstance(target[k], dict):
      dict_merge(target[k], v)
    else:
      target[k] = deepcopy(v)
  return target

run(host='0.0.0.0', port=8081, debug=True)