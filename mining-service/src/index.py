from util import database, convert, tree, train, user

import pandas as pd
import numpy as np

def createFeatureAndTargetDatasets():
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

    return X, y, X_train, X_test, y_train, y_test

def createGeneralTree():
    X, y, X_train, X_test, y_train, y_test = createFeatureAndTargetDatasets()

    features = X.columns.tolist()

    # TREE CREATION
    decisionTree = tree.createDecisionTree(X_train, y_train)

    accuracy = tree.getAccuracy(decisionTree, X_test, y_test)

    relations = train.getRelationsChampions(X)

    tree.saveDecisionTree(decisionTree, features, decoderDict, encoderDict, relations)

    return decisionTree, decoderDict, encoderDict, relations

decisionTree, decoderDict, encoderDict, relations = tree.loadDecisionTree()

if decisionTree is None:
    print(f'[INDEX]: Building non-existent tree params...')
    decisionTree, decoderDict, encoderDict, relations = createGeneralTree()
    print(f'[INDEX]: Non-existent tree params built!')
else:
    print(f'[INDEX]: Tree params are already')

print(relations)
