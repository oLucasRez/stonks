import pandas as pd
import re

from itertools import product

import copy

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
    encoderDict = {}

    encoders = {}

    for stringField in stringFields:
            ordinalEncoder = ordinalEncoder.fit(dataframe[[stringField]])
            
            encoders[stringField] = copy.deepcopy(ordinalEncoder)

            tempKeys = dataframe[stringField].values

            dataframe[stringField] = ordinalEncoder.transform(dataframe[[stringField]])

            tempValues = dataframe[stringField]

            encoderDict[stringField] = dict(zip(tempKeys, tempValues))
            decoderDict[stringField] = dict(zip(tempValues, tempKeys))
            
    return dataframe, decoderDict, encoderDict, encoders

def createComposition(items):
    result = ''

    for item in items:
        if result == '':
            result += item
        else:
            result += f'!{item}'

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
        
    aprioriResult = apriori(finalMatrix, min_support=0.01, min_confidence=0.01)

    return list(aprioriResult)

def isOptionSuitable(x, observations, userData):
        if len(x.items) != len(observations):
            return False

        noneR = re.compile('^(None|nan)@.*')

        if any(noneR.match(item) for item in x.items):
            return False

        for dataKey in userData:
            regex = f'^{userData[dataKey]}.*@{dataKey}'

            regexTemp = re.compile(regex)

            matches = [regexTemp.match(item) for item in x.items]

            if not any(matches):
                return False

        return True

def filterAndSortedApriori(dataframe, observations, target):
    aprioriFactors = [observation for observation in observations]
    aprioriFactors.append(target)

    aprioriResult = getAprioriMatrix(dataframe[aprioriFactors])

    userData = {}

    columns = dataframe[observations].columns

    for column in columns:
        userData[column] = dataframe[column].values[0]

    filteredAprioriResult = filter(lambda x: isOptionSuitable(x, aprioriFactors, userData), aprioriResult)

    sortedAprioriResult = sorted(filteredAprioriResult, key=lambda x : x.ordered_statistics[0].confidence, reverse=True)

    return sortedAprioriResult

def betterAprioriOptions(filteredAprioriResult, target):
    uniqueResults = []

    for result in filteredAprioriResult:
        item = list(filter(lambda item: target in item, result.items))[0]

        if item not in uniqueResults:
            uniqueResults.append(item)

    topTen = [item.split('@')[0] for item in uniqueResults[:10]]

    return topTen

def aprioriToDataframe(aprioriResult, target):
    return pd.DataFrame(aprioriResult, columns=[target])

