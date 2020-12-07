import pandas as pd

from util.database import generateProductData

from numpy import repeat


def fillNoneColumns(connection, userDataframe, noneColumns):
    productData = generateProductData(connection, noneColumns)

    userDataframeValues = userDataframe.head(1).values
    userDataframeColumns = userDataframe.columns

    finalUserValue = pd.DataFrame(repeat(userDataframeValues, len(productData.index), axis=0), columns=userDataframeColumns)

    for noneColumn in noneColumns:
        finalUserValue[noneColumn] = productData[noneColumn]

    return finalUserValue