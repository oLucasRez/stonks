import database
import convert
import tree

from sklearn.tree import export_text

query = database.loadQuery('sql/main.sql')

connection = database.createConnection()

columns, result = database.getQueryResult(connection, query)

rawDataframe = convert.queryResultToDataframe(result, columns)

dataframe = convert.encodeStringFields(
    rawDataframe, 
    ['player_perspective', 'game_mode', 'genre', 'game_engine']
)

y = dataframe[['hype', 'follows', 'rating']]

decisionTree = tree.createDecisionTree(dataframe, y)

tree.saveDecisionTree(decisionTree)

treeResult = export_text(decisionTree, feature_names=columns)

print(treeResult)