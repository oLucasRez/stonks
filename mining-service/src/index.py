from util import database, convert, tree, train

# DATA TREATMENT
query = database.loadQuery('sql/main.sql')

connection = database.createConnection()

columns, result = database.getQueryResult(connection, query)

rawDataframe = convert.queryResultToDataframe(result, columns)

dataframe, decoderDict = convert.encodeStringFields(
    rawDataframe, 
    ['player_perspective', 'game_mode', 'genre', 'theme']
)

# GENERATING PARAMS
targets = ['follows', 'rating']
features = [x for x in columns if x not in targets]

X = dataframe[features]
y = dataframe[targets]

X_train, X_test, y_train, y_test = train.generateParams(X, y)

# TREE CREATION
decisionTree = tree.createDecisionTree(X_train, y_train)

tree.saveDecisionTree(decisionTree, features, decoderDict)

print(f'[INDEX]: Results saved!')

