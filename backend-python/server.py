from bottle import route, run, template, request, put, abort
import requests, uuid, json

@route('/hello/<name>')
def index(name='World'):
    return template('<b>Hello {{name}}</b>!', name=name)

@put('/sendDocument')
def sendDocument():
	documentJson = request.json
	docUUID = uuid.uuid1()
	response = putDraft(docUUID, documentJson)

def putDraft(docUUID, documentJson):
	url = 'http://localhost:8888/tradeshift-backend/rest/external/documents/'+str(docUUID)+'?documentProfileId=nes.p5.invoice.ubl.2.1.dk&draft=true'
	headers = {'X-Tradeshift-TenantId': '3fd7d621-7f89-481f-9647-b2edf2ee9a30', 'X-Tradeshift-ActorId': '5832d481-2e54-4574-9676-0f51fe6513df', 'Content-Type': 'application/json'}
	r = requests.put(url, data=json.dumps(documentJson), headers=headers)
	return r.status_code

run(host='0.0.0.0', port=8081, debug=True)