from util import database, convert, tree, train, user

import pandas as pd
import numpy as np

def createGeneralTree():
    # DATA TREATMENT
    query = database.loadQuery('sql/main.sql')

    connection = database.createConnection()

    columns, result = database.getQueryResult(connection, query)

    rawDataframe = convert.queryResultToDataframe(result, columns)

    dataframe, decoderDict, encoderDict = convert.encodeStringFields(
        rawDataframe, 
        ['player_perspective', 'game_mode', 'genre', 'theme']
    )

    # GENERATING PARAMS
    targets = ['follows', 'rating']
    features = [x for x in columns if x not in targets]

    X = dataframe[features]
    y = dataframe[targets]

    X_train, X_test, y_train, y_test = train.generateParams(X, y)

    # TREE CREATION
    decisionTree = tree.createDecisionTree(X_train, y_train)

    accuracy = tree.getAccuracy(decisionTree, X_test, y_test)

    tree.saveDecisionTree(decisionTree, features, decoderDict, encoderDict)

    return decisionTree, decoderDict, encoderDict

decisionTree, decoderDict, encoderDict = tree.loadDecisionTree()

if decisionTree is None:
    print(f'[INDEX]: Building non-existent tree params...')
    decisionTree, decoderDict, encoderDict = createGeneralTree()
    print(f'[INDEX]: Non-existent tree params built!')
else:
    print(f'[INDEX]: Tree params are already')

features = ['age_rating', 'release_date_month', 'hours_to_beat', 'price', 'genre', 'game_mode', 'player_perspective', 'theme']

query = database.loadQuery('sql/main.sql')
connection = database.createConnection()
columns, result = database.getQueryResult(connection, query)
rawDataframe = convert.queryResultToDataframe(result, columns)

sortedAprioriResult = convert.betterAprioriOptions(rawDataframe, ['game_mode'], 'hours_to_beat')
pintao = convert.aprioriToDataframe(sortedAprioriResult, 'hours_to_beat')

userDataframe = pd.DataFrame(rawDataframe.iloc[1589:1590,])

print(userDataframe)

champion = train.chooseAprioriChampion(pintao, userDataframe[features], 'hours_to_beat', decisionTree, encoderDict)

print(champion)