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
	docUUID = uuid.uuid1()
	draftResponse = putDraft(docUUID, documentJson)
	if draftResponse != 204:
		return draftResponse
	dispatchUUID = uuid.uuid1()
	sendResponse = dispatchDraft(docUUID, dispatchUUID)
	if sendResponse != 201:
		return sendResponse
	return str(docUUID)

def putDraft(docUUID, documentJson):
	url = 'http://localhost:8888/tradeshift-backend/rest/external/documents/'+str(docUUID)+'?documentProfileId=nes.p5.invoice.ubl.2.1.dk&draft=true'
	headers = {'X-Tradeshift-TenantId': '3fd7d621-7f89-481f-9647-b2edf2ee9a30', 'X-Tradeshift-ActorId': '5832d481-2e54-4574-9676-0f51fe6513df', 'Content-Type': 'application/json'}
	randomId = random.choice('abcdefghij') + str(random.randrange(1000,10000))
	documentJson['ID']['value'] = randomId
	r = requests.put(url, data=json.dumps(documentJson), headers=headers)
	return r.status_code

def dispatchDraft(docUUID, dispatchUUID):
    url = 'http://localhost:8888/tradeshift-backend/rest/external/documents/'+str(docUUID)+'/dispatches/'+str(dispatchUUID)
    headers = {'X-Tradeshift-TenantId': '3fd7d621-7f89-481f-9647-b2edf2ee9a30', 'X-Tradeshift-ActorId': '5832d481-2e54-4574-9676-0f51fe6513df', 'Content-Type': 'application/json'}
    data={'ConnectionId':'94977f3a-0e97-5e76-9f99-2e7d219fce64'}
    r = requests.put(url, data=json.dumps(data), headers=headers)
    return r.status_code

@get('/getPDF/<docUUID>')
def getPDF(docUUID):
	url = 'http://localhost:8888/tradeshift-backend/rest/external/documents/'+str(docUUID)
	headers = {'X-Tradeshift-TenantId': '3fd7d621-7f89-481f-9647-b2edf2ee9a30', 'X-Tradeshift-ActorId': '5832d481-2e54-4574-9676-0f51fe6513df', 'Accept': 'application/pdf'}
	r = requests.get(url, headers=headers)
	if r.status_code != 200:
		return r.status_code
	return r._content

run(host='0.0.0.0', port=8081, debug=True)