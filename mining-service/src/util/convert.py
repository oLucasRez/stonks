import pandas as pd

from sklearn.preprocessing import OrdinalEncoder
from sklearn.impute import SimpleImputer

from numpy import nan

def queryResultToDataframe(queryResult, columns):
    return pd.DataFrame(queryResult, columns=columns)

def encodeStringFields(dataframe, stringFields):
    ordinalEncoder = OrdinalEncoder()

    for stringField in stringFields:
        dataframe[stringField] = ordinalEncoder.fit_transform(dataframe[[stringField]])

    dataframe.replace('?', nan, inplace=True)

    imputer = SimpleImputer(missing_values=nan, strategy='mean')
    imputer.fit(dataframe)

    dataframe = pd.DataFrame(imputer.transform(dataframe), columns=dataframe.columns)

    return dataframe