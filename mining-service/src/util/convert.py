import pandas as pd
import re

from itertools import product

from sklearn.preprocessing import OrdinalEncoder
from sklearn.impute import SimpleImputer

from numpy import nan
from apyori import apriori

def queryResultToDataframe(queryResult, columns):
    return pd.DataFrame(queryResult, columns=columns)

def encodeStringFields(dataframe, stringFields):
    ordinalEncoder = OrdinalEncoder()

    dataframe.replace(to_replace=[None], value=nan, inplace=True)

    imputer = SimpleImputer(missing_values=nan, strategy='most_frequent')
    imputer.fit(dataframe)

    dataframe = pd.DataFrame(imputer.transform(dataframe), columns=dataframe.columns)
   
    decoderDict = {}

    for stringField in stringFields:
            ordinalEncoder = ordinalEncoder.fit(dataframe[[stringField]])
            
            tempKeys = dataframe[stringField].values

            dataframe[stringField] = ordinalEncoder.transform(dataframe[[stringField]])

            tempValues = dataframe[stringField]

            decoderDict[stringField] = dict(zip(tempKeys, tempValues))
            
    return dataframe, decoderDict

def createComposition(items):
    result = []
    
    for index, item in enumerate(items):
        last = item[0]

        result.append(last)

        for nextItem in items[index + 1:]:
            nextItem = nextItem[0]

            last += f"${nextItem}"

            result.append(last)

    return result

def createCombinations(columnNames, data):
    combinations = list(product(*data))
    
    return pd.DataFrame(columns=columnNames, data=combinations)

def getAprioriMatrix(dataframe):
    rowMatrix = dataframe.values.tolist()
    columns = dataframe.columns

    finalMatrix = []

    for row in rowMatrix:
        rowValues = []
        
        for i in range(len(columns)):
            rowValues.append(f'{str(row[i])}@{columns[i]}')

        finalMatrix.append(rowValues)
        
    aprioriResult = apriori(finalMatrix, min_support=0.001, min_confidence=0.001)

    return list(aprioriResult)

def isOptionSuitable(x, observations, userData):
        if len(x.items) != len(observations):
            return False

        noneR = re.compile('^None.*')

        if any(noneR.match(item) for item in x.items):
            return False

        for dataKey in userData:
            regex = f'^{userData[dataKey]}.*@{dataKey}'

            regexTemp = re.compile(regex)

            matches = [regexTemp.match(item) for item in x.items]

            if not any(matches):
                return False

        return True

def betterAprioriOptions(dataframe, observations, userData):
    aprioriResult = getAprioriMatrix(dataframe[observations])

    filteredAprioriResult = filter(lambda x: isOptionSuitable(x, observations, userData), aprioriResult)

    sortedAprioriResult = sorted(filteredAprioriResult, key=lambda x : x.ordered_statistics[0].confidence, reverse=True)

    return [result.items for result in sortedAprioriResult[:10]]

def aprioriToDataframe(aprioriResult):
    listOfDicts = []

    for item in aprioriResult:
        _dict = {}

        for string in item:
            string_arr = string.split('@')

            _dict[string_arr[1]] = string_arr[0]

        listOfDicts.append(_dict)

    return pd.DataFrame(listOfDicts)

