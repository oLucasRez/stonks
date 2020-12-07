from util import database, convert, tree, train, user

import pandas as pd
import numpy as np

# DATA TREATMENT
query = database.loadQuery('sql/main.sql')

connection = database.createConnection()

columns, result = database.getQueryResult(connection, query)

rawDataframe = convert.queryResultToDataframe(result, columns)

sortedAprioriResult = convert.betterAprioriOptions(rawDataframe, ['theme', 'genre'], {'theme':'Action!Fantasy'})

pintao = convert.aprioriToDataframe(sortedAprioriResult)

userDataframe = pd.DataFrame(rawDataframe.head(1))

dataframe, decoderDict = convert.encodeStringFields(
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

champion = train.chooseAprioriChampion(pintao, userDataframe, 'genre', decisionTree)

print(champion)

accuracy = tree.getAccuracy(decisionTree, X_test, y_test)

print(f'Decision tree generated with RMSE of: {accuracy}')

tree.saveDecisionTree(decisionTree, features, decoderDict)

print(f'[INDEX]: Results saved!')

print(f'[INDEX]: Caching database data...')

