import database
import convert

query = database.loadQuery('sql/main.sql')

connection = database.createConnection()

result, columns = database.getQueryResult(connection, query)

rawDataframe = convert.queryResultToDataframe(result, columns)

dataframe = convert.encodeStringFields(
    rawDataframe, 
    ['PLAYER_PERSPECTIVE', 'GAME_MODE', 'GENRE', 'GAME_ENGINE']
)

print(dataframe.head(10))