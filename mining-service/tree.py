import database
import convert

query = database.loadQuery('sql/main.sql')

connection = database.createConnection()

columns, result = database.getQueryResult(connection, query)

rawDataframe = convert.queryResultToDataframe(result, columns)

dataframe = convert.encodeStringFields(
    rawDataframe, 
    ['player_perspective', 'game_mode', 'genre', 'game_engine']
)