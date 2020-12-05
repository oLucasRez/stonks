import psycopg2
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