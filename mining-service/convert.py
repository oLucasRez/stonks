import pandas as pd
from sklearn.preprocessing import OrdinalEncoder

def queryResultToDataframe(queryResult, columns):
    return pd.DataFrame(queryResult, columns=columns)

def encodeStringFields(dataframe, stringFields):
    ordinalEncoder = OrdinalEncoder()

    for stringField in stringFields:
        dataframe[stringField] = ordinalEncoder.fit_transform(dataframe[[stringField]])

    return dataframe