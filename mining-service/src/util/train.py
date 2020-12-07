from sklearn.model_selection import train_test_split
from numpy import average

from util import convert

def generateParams(X, y):
    # 70% training and 30% test
    return train_test_split(X, y, test_size=0.25, random_state=1) 

def chooseAprioriChampion(aprioriDataframe, userDataframe, target, decisionTree):
    listOfResults = []
    
    for i in range(len(aprioriDataframe.index)):
        row = aprioriDataframe[target].iloc[i]

        userDataframe[target] = row

        newDataframe, transform = convert.encodeStringFields(userDataframe, ['player_perspective', 'game_mode', 'genre', 'theme'])

        del newDataframe['follows']
        del newDataframe['rating']

        result = decisionTree.predict(newDataframe)

        listOfResults.append([result, row])

    sortedListOfResults = sorted(listOfResults, key=lambda x: average(x[0], axis=1, weights=[0.001, 0.1]))

    return sortedListOfResults[0][1]
