from sklearn.model_selection import train_test_split
from numpy import average, float64

import pandas as pd

from util import convert

def generateParams(X, y):
    # 70% training and 30% test
    return train_test_split(X, y, test_size=0.25, random_state=1) 

def chooseAprioriChampion(aprioriDataframe, userDataframe, target, decisionTree, encoder):
    listOfResults = []

    for i in range(len(aprioriDataframe.index)):
        row = aprioriDataframe[target].iloc[i]

        userDataframeCopy = pd.DataFrame(userDataframe)

        userDataframeCopy[target] = row

        for column in userDataframeCopy.columns:
            if not column in encoder.keys():
                continue

            value = userDataframeCopy[column].values[0]

            if isinstance(value, float64):
                continue

            newValue = encoder[column][value]

            userDataframeCopy[column] = newValue

        result = decisionTree.predict(userDataframeCopy).tolist()[0]

        listOfResults.append([result, row])

    sortedListOfResults = sorted(listOfResults, key=lambda x: x[0][0]/1697 + x[0][1]/100, reverse=True)

    return sortedListOfResults[0][1]
