import joblib

from os import path, makedirs
from math import sqrt

from sklearn.tree import DecisionTreeRegressor, export_text
from sklearn.metrics import mean_squared_error

TREE_DIRECTORY='data'
TREE_FILE=f'{TREE_DIRECTORY}/tree.pkl'
TREE_LOG=f'{TREE_DIRECTORY}/log.txt'
DECODER_FILE=f'{TREE_DIRECTORY}/decoder_dict.obj'

def createDecisionTree(X, y):
    classifierTree = DecisionTreeRegressor()

    classifierTree.fit(X, y)

    return classifierTree

def saveDecisionTree(decisionTree, features, decoderDict):
    if not path.exists(TREE_DIRECTORY):
        makedirs(TREE_DIRECTORY)

    treeResult = export_text(decisionTree, feature_names=features, max_depth=100, show_weights=True)

    importances = decisionTree.feature_importances_

    with open(TREE_LOG, 'w') as file:
        file.write(f'Importances:\n')

        for x in range(len(importances)):
            feature = features[x] 
            value = importances[x] * 100

            file.write(f'[{feature}]: {round(value, 2)}%\n')

        file.write('\n')

        file.writelines(treeResult)

    joblib.dump(decisionTree, TREE_FILE)
    joblib.dump(decoderDict, DECODER_FILE)

def loadDecisionTree():
    try:
        decisionTree = joblib.load(TREE_FILE)
        transformDict = joblib.load(DECODER_FILE)

        return decisionTree, transformDict
    except:
        return None

def getAccuracy(decisionTree, X_test, y_test):
    results = decisionTree.predict(X_test)

    return mean_squared_error(y_test, results, multioutput='raw_values', squared=False)