import pandas as pd

from itertools import product

from sklearn.preprocessing import OrdinalEncoder
from sklearn.impute import SimpleImputer

from numpy import nan

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