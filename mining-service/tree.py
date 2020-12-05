import joblib

from os import path, makedirs
from sklearn.tree import DecisionTreeRegressor

TREE_DIRECTORY='data'
TREE_FILE=f'{TREE_DIRECTORY}/tree.pkl'

def createDecisionTree(X, y):
    classifierTree = DecisionTreeRegressor()

    classifierTree.fit(X, y)

    return classifierTree

def saveDecisionTree(decisionTree):
    if not path.exists(TREE_DIRECTORY):
        makedirs(TREE_DIRECTORY)

    joblib.dump(decisionTree, TREE_FILE)

def loadDecisionTree():
    try:
        decisionTree = joblib.load(TREE_FILE)

        return decisionTree
    except:
        return None