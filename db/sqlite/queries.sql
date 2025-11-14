-- Parameters expected (bind in your app or sqlite client):
-- :q         TEXT or NULL       -- search query
-- :types     TEXT JSON array    -- e.g. '["video","article"]'
-- :creators  TEXT JSON array    -- e.g. '["Upcycle Master","TrendSetter"]'
-- :tag       TEXT or NULL       -- single tag filter (case-insensitive)
-- :date      TEXT or NULL       -- 'Anytime' | 'Today' | 'This Week' | 'This Month'
-- :sort      TEXT               -- 'relevance' | 'date'

WITH
  types AS (
    SELECT value AS type FROM json_each(COALESCE(:types,'[]'))
  ),
  creators AS (
    SELECT value AS name FROM json_each(COALESCE(:creators,'[]'))
  ),
  base AS (
    SELECT
      cc.*,
      bm25(cfts) AS rank
    FROM content_cards cc
    LEFT JOIN content_fts cfts ON cfts.rowid = cc.id
    WHERE
      (json_array_length(COALESCE(:types,'[]')) = 0 OR cc.type IN (SELECT type FROM types)) AND
      (json_array_length(COALESCE(:creators,'[]')) = 0 OR cc.creator IN (SELECT name FROM creators)) AND
      (:tag IS NULL OR :tag = '' OR (',' || lower(IFNULL(cc.tags_csv,'')) || ',') LIKE '%,' || lower(:tag) || ',%') AND
      (:q IS NULL OR :q = '' OR cfts MATCH :q) AND
      (
        :date IS NULL OR :date = '' OR :date = 'Anytime' OR
        (:date = 'Today'      AND date(cc.date_published) = date('now')) OR
        (:date = 'This Week'  AND cc.date_published >= datetime('now','-7 days')) OR
        (:date = 'This Month' AND cc.date_published >= datetime('now','-30 days'))
      )
  )
SELECT *
FROM base
ORDER BY
  CASE WHEN :sort = 'date' THEN NULL ELSE rank END ASC,
  CASE WHEN :sort = 'date' THEN datetime(date_published) END DESC,
  datetime(date_published) DESC;

-- Example direct call (replace params inline if testing):
-- WITH types AS (SELECT value FROM json_each('[]')),
--      creators AS (SELECT value FROM json_each('[]')),
--      base AS (
--        SELECT cc.*, bm25(cfts) AS rank FROM content_cards cc
--        LEFT JOIN content_fts cfts ON cfts.rowid = cc.id
--        WHERE 1=1
--      )
-- SELECT title, creator, type, date_published, tags_csv, comments_count, likes_count
-- FROM base
-- ORDER BY datetime(date_published) DESC;

