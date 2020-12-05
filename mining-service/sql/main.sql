SELECT
    AGE_RATING,
    EXTRACT(MONTH FROM FIRST_RELEASE_DATE) AS RELEASE_DATE_MONTH,
    TIME_TO_BEAT / 3600 AS HOURS_TO_BEAT,
    FOLLOWS,
    HYPE,
    TOTAL_RATING AS RATING,
    PRICE,
    GAME_ENGINES.NAME AS GAME_ENGINE,
    GENRES.NAME AS GENRE,
    GAME_MODE.NAME AS GAME_MODE,
    PLAYER_PERSPECTIVES.NAME AS PLAYER_PERSPECTIVE
FROM
    GAME
    JOIN
    GAME_ENGINES
    ON GAME_ENGINES.ID = GAME.ID_GAME_ENGINE
    JOIN
    GAME_GENRES
    ON GAME_GENRES.ID_GAME = GAME.ID
    JOIN
    GENRES
    ON GAME_GENRES.ID_GENRE = GENRES.ID
    JOIN
    GAME_THEMES
    ON GAME_THEMES.ID_GAME = GAME.ID
    JOIN
    THEMES
    ON GAME_THEMES.ID_THEME = THEMES.ID
    JOIN
    GAME_MODE_GAME
    ON GAME_MODE_GAME.ID_GAME = GAME.ID
    JOIN
    GAME_MODE
    ON GAME_MODE_GAME.ID_GAME_MODE = GAME_MODE.ID
    JOIN
    GAME_PLAYER_PERSPECTIVES
    ON GAME_PLAYER_PERSPECTIVES.ID_GAME = GAME.ID
    JOIN
    PLAYER_PERSPECTIVES
    ON GAME_PLAYER_PERSPECTIVES.ID_PLAYER_PERSPECTIVE = PLAYER_PERSPECTIVES.ID
WHERE
    GAME.IS_USER = FALSE
    AND
    HYPE IS NOT NULL
    AND
    FOLLOWS IS NOT NULL
    AND
    TOTAL_RATING IS NOT NULL
    AND
    TOTAL_RATING_COUNT IS NOT NULL
    AND
    TOTAL_RATING_COUNT >=
    (
        SELECT
            AVG(TOTAL_RATING_COUNT)
        FROM
            GAME
    )
LIMIT 50

