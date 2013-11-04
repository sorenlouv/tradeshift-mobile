from bottle import route, run, template, request, put, abort
import requests, uuid, json, random

@route('/hello/<name>')
def index(name='World'):
    return template('<b>Hello {{name}}</b>!', name=name)

@put('/sendDocument')
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

run(host='0.0.0.0', port=8081, debug=True)