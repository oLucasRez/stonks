# Default Libraries
import json
import requests
from time import sleep

# PyPi packages
from quart_cors import cors
from quart import Quart, request, jsonify

STEAM_API = 'https://store.steampowered.com/api/appdetails?appids='
TIME_INTERVAL = 0.67

app = Quart(__name__) 
app = cors(app, allow_origin='http://localhost:3000')

neededFields = ['price_overview', 'is_free', 'package_groups']

def sanitizeResponse(appid: str, gameInfo: dict) -> dict:
    sanitizedResponse = {'appid': appid}
        
    if not gameInfo['success']:
        sanitizedResponse['success'] = False
        
    else:
        gameData = gameInfo['data']

        for field in neededFields:
            if field in gameData:
                sanitizedResponse[field] = gameData[field]

    return sanitizedResponse

@app.route('/', methods=['POST']) 
async def getSteamInfo() -> list:
    request_body = await request.get_data()
    
    parsedBody = json.loads(request_body)

    if not 'appids' in parsedBody:
        return jsonify([])

    appids = parsedBody['appids']

    responses = []

    for appid in appids:
        try:
            steamResponse = requests.get(STEAM_API + str(appid)).json()

            if steamResponse == None:
                continue

            gameInfo = steamResponse[str(appid)]

            sanitizedResponse = sanitizeResponse(appid, gameInfo)
            
            responses.append(sanitizedResponse)

            print(f'Making request for appid: {appid}')
            print(sanitizedResponse)
        except:
            print('Error on request')

        sleep(TIME_INTERVAL)

    return jsonify(responses)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)