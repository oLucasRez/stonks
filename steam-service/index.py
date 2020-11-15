import json
import requests
from time import sleep
from quart import Quart, request, jsonify

STEAM_API = 'https://store.steampowered.com/api/appdetails?appids='
TIME_INTERVAL = 0.833

app = Quart(__name__) 

@app.route('/')
async def getSteamInfo():
    request_body = await request.get_data()
    
    parsedBody = json.loads(request_body)

    appids = parsedBody['appids']

    responses = []

    for appid in appids:
        steamResponse = requests.get(STEAM_API + str(appid)).json()

        gameInfo = steamResponse[str(appid)]

        try:
            responses.append(gameInfo['data'])
        except:
            print(f'Response for {appid} wasn\'t successful')

        sleep(TIME_INTERVAL)

    return jsonify(responses)

app.run()