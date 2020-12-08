import joblib

from os import path, makedirs
from math import sqrt

from sklearn.tree import DecisionTreeRegressor, export_text
from sklearn.metrics import mean_squared_error

TREE_DIRECTORY='data'
TREE_FILE=f'{TREE_DIRECTORY}/tree.pkl'
TREE_LOG=f'{TREE_DIRECTORY}/log.txt'
DECODER_FILE=f'{TREE_DIRECTORY}/decoder_dict.obj'
ENCODER_FILE=f'{TREE_DIRECTORY}/encoder_dict.obj'
DATAFRAME_FILE=f'{TREE_DIRECTORY}/dataframe.obj'
RELATIONS_FILE=f'{TREE_DIRECTORY}/relations.obj'
ENCODERS_FILE=f'{TREE_DIRECTORY}/encoders.obj'

def createDecisionTree(X, y):
    classifierTree = DecisionTreeRegressor()

    classifierTree.fit(X, y)

    return classifierTree

def getAccuracy(decisionTree, X_test, y_test):
    results = decisionTree.predict(X_test)

    return mean_squared_error(y_test, results, multioutput='raw_values', squared=False)