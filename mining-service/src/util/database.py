import psycopg2
from util.convert import createCombinations, createComposition

from os import getenv
from dotenv import load_dotenv

load_dotenv(override=True)

def loadQuery(path: str) -> str:
    query = ''

    with open(path, 'r') as file:
        lines = file.readlines()

        query = query.join(lines)

    return query

def createConnection():
    host = getenv('HOST')
    database = getenv('DATABASE')
    user = getenv('USER')
    password = getenv('PASSWORD')

    connection = psycopg2.connect(
        host=host, 
        database=database, 
        user=user, 
        password=password
    )

    return connection

def getQueryResult(connection, query: str):
    cursor = connection.cursor()

    cursor.execute(query)

    columns = [description[0] for description in cursor.description]

    result = cursor.fetchall()

    print(f'[DB]: Got {len(result)} rows')

    return columns, result

def generateProductData(connection, keys):
    queries = {
        'game_mode': { 'path':'sql/game_modes.sql', 'composite': True }, 
        'genre': { 'path':'sql/genres.sql', 'composite': True }, 
        'player_perspective': { 'path':'sql/player_perspectives.sql', 'composite': True }, 
        'theme': { 'path':'sql/themes.sql', 'composite': True },
        'age_rating': { 'path':'sql/age_ratings.sql', 'composite': False },
        'hours_to_beat': { 'path':'sql/hours_to_beat.sql', 'composite': False },
        'price': { 'path':'sql/prices.sql', 'composite': False },
        'release_date_month': { 'path':'sql/release_date_months.sql', 'composite': False },
    }

    chosenQueries = [queries[key] for key in keys]

    composites = {}

    for query in chosenQueries:
        sql = loadQuery(query['path'])

        columns, result = getQueryResult(connection, sql)

        name = columns[0]

        if query['composite']:
            composites[name] = createComposition(result)
        else:
            composites[name] = [x[0] for x in result]

    keys = composites.keys()
    values = composites.values()

    combinations = createCombinations(keys, values)

    return combinations