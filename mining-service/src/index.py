from util import database, convert, tree, train, user

import pandas as pd
import numpy as np

import copy

import json
import requests
from quart_cors import cors
from quart import Quart, request, jsonify

app = Quart(__name__) 
app = cors(app, allow_origin='*')

compoundFields = ['player_perspectives', 'game_modes', 'genres', 'themes']
targets = ['follows', 'rating']

def getGeneralDataframe(userDataframe):
    # DATA TREATMENT
    query = database.loadQuery('sql/main.sql')

    connection = database.createConnection()

    columns, result = database.getQueryResult(connection, query)

    rawDataframe = convert.queryResultToDataframe(result, columns)

    rawDataframe = pd.concat([rawDataframe, userDataframe])

    dataframe, decoderDict, encoderDict, encoders = convert.encodeStringFields(
        rawDataframe, 
        compoundFields
    )
    
    requestDataframe = pd.DataFrame(dataframe.tail(1))

    dataframe.drop(dataframe.tail(1).index, inplace=True)

    return dataframe, requestDataframe, decoderDict, encoderDict, encoders

def createGeneralTree(dataframe):
    columns = dataframe.columns.tolist()

    dataframeLength = len(dataframe.index)

    dataframe = dataframe.head(dataframeLength - 1)

    # GENERATING PARAMS
    features = [x for x in columns if x not in targets]

    X = dataframe[features]
    y = dataframe[targets]

    X_train, X_test, y_train, y_test = train.generateParams(X, y)

    # TREE CREATION
    decisionTree = tree.createDecisionTree(X_train, y_train)

    accuracy = tree.getAccuracy(decisionTree, X_test, y_test)

    return decisionTree, accuracy, features

def convertBodyToDataframe(body: dict):
    noneColumns = [key for key in body.keys() if body[key] == None]
    existingColumns = set(body) - set(noneColumns)

    bodyCopy = copy.copy(body)

    for existingColumn in existingColumns:
        if existingColumn in compoundFields:
            composition = convert.createComposition(bodyCopy[existingColumn])
            bodyCopy[existingColumn] = composition

    requestDataframe = pd.DataFrame(bodyCopy, index=[0])

    return requestDataframe, existingColumns

def chooseOptionsChampion(dataframe, tree, encoders):
    predictions = tree.predict(dataframe)

    maxAverage = 0
    chosenIndex = -1

    for index, prediction in enumerate(predictions):
        predictionList = prediction.tolist()

        average = predictionList[0]/1697 + predictionList[1]/100

        if average >= maxAverage:
            maxAverage = average
            chosenIndex = index

    suggestedDf = pd.DataFrame(dataframe.iloc[[chosenIndex]])

    for column in compoundFields:
        suggestedDf[column] = encoders[column].inverse_transform(suggestedDf[[column]])
    
    suggestedDict = suggestedDf.to_dict()

    for key in suggestedDict.keys():
        value = list(suggestedDict[key].values())[0]
        
        if key in compoundFields:
            value = value.split('!')

        suggestedDict[key] = value

    return suggestedDict

def runMiningProcess(body: dict):
    requestDataframe, existingColumns = convertBodyToDataframe(body)
    existingColumns = list(existingColumns)

    dataframe, requestDataframe, decoderDict, encoderDict, encoders = getGeneralDataframe(requestDataframe)

    existingColumnsAndTargets = copy.deepcopy(existingColumns)
    existingColumnsAndTargets.extend(targets)

    userTree, userAccuracy, features = createGeneralTree(dataframe[existingColumnsAndTargets])
    userPrediction = userTree.predict(requestDataframe[existingColumns])

    decisionTree, decisionAccuracy, features = createGeneralTree(dataframe)

    selectedRows = pd.DataFrame(dataframe)

    for column in existingColumns:
        userValue = requestDataframe[column].values.tolist()[0]

        tempDf = pd.DataFrame(selectedRows[selectedRows[column] == userValue])

        if len(tempDf.index) == 0:
            continue

        selectedRows = pd.DataFrame(tempDf)

    if len(selectedRows.index) == 0:
        selectedRows = pd.DataFrame(dataframe)

        selectedRows[existingColumns] = pd.DataFrame(requestDataframe[existingColumns].values.tolist() * len(dataframe.index))
    else:
        selectedRows = copy.deepcopy(selectedRows)
        selectedRows[existingColumns]= pd.DataFrame(requestDataframe[existingColumns].values.tolist() * len(dataframe[features].index))

    userPrediction = userPrediction.tolist()[0]
    userAccuracy = userAccuracy.tolist()

    suggestions = chooseOptionsChampion(selectedRows[features], decisionTree, encoders)

    return {
        'user_prediction': {
            'follows': userPrediction[0],
            'rating': userPrediction[1],
            'accuracy': {
                'follows': userAccuracy[0],
                'rating': userAccuracy[1]
            }
        },
        'suggestions': suggestions
    }

@app.route('/', methods=['POST'])
async def makeMining():
    request_body = await request.get_data()

    parsedBody = json.loads(request_body)

    result = runMiningProcess(parsedBody)

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500)