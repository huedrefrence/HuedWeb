PRAGMA foreign_keys = ON;

-- Creators table
CREATE TABLE IF NOT EXISTS creators (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL UNIQUE,
  title      TEXT,
  avatar_url TEXT
);

-- Platforms table
CREATE TABLE IF NOT EXISTS platforms (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Content table
CREATE TABLE IF NOT EXISTS content (
  id             INTEGER PRIMARY KEY,
  external_id    TEXT UNIQUE,
  type           TEXT NOT NULL CHECK (type IN ('video','article','photo')),
  title          TEXT NOT NULL,
  creator_id     INTEGER NOT NULL REFERENCES creators(id),
  date_published TEXT NOT NULL,
  cover_url      TEXT,
  duration_text  TEXT,
  excerpt        TEXT,
  url            TEXT,
  platform_id    INTEGER REFERENCES platforms(id),
  comments_count INTEGER NOT NULL DEFAULT 0,
  likes_count    INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Tags
CREATE TABLE IF NOT EXISTS tags (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Content-Tag mapping
CREATE TABLE IF NOT EXISTS content_tags (
  content_id INTEGER NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  tag_id     INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, tag_id)
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_content_type_date ON content(type, date_published DESC);
CREATE INDEX IF NOT EXISTS idx_content_creator    ON content(creator_id);
CREATE INDEX IF NOT EXISTS idx_content_platform   ON content(platform_id);
CREATE INDEX IF NOT EXISTS idx_creators_name      ON creators(name);
CREATE INDEX IF NOT EXISTS idx_tags_name          ON tags(name);

-- Full‑text search (title + excerpt)
CREATE VIRTUAL TABLE IF NOT EXISTS content_fts
USING fts5(title, excerpt, content='content', content_rowid='id');

CREATE TRIGGER IF NOT EXISTS content_ai AFTER INSERT ON content BEGIN
  INSERT INTO content_fts(rowid, title, excerpt) VALUES (new.id, new.title, new.excerpt);
END;
CREATE TRIGGER IF NOT EXISTS content_au AFTER UPDATE OF title, excerpt ON content BEGIN
  UPDATE content_fts SET title=new.title, excerpt=new.excerpt WHERE rowid=new.id;
END;
CREATE TRIGGER IF NOT EXISTS content_ad AFTER DELETE ON content BEGIN
  DELETE FROM content_fts WHERE rowid=old.id;
END;

-- One-row-per-card view matching the UI shape
CREATE VIEW IF NOT EXISTS content_cards AS
SELECT
  c.id,
  c.external_id,
  c.type,
  c.title,
  cr.name        AS creator,
  cr.title       AS creator_title,
  cr.avatar_url  AS avatar_url,
  c.date_published,
  c.cover_url,
  c.duration_text,
  c.excerpt,
  c.url,
  p.name         AS platform,
  GROUP_CONCAT(DISTINCT t.name) AS tags_csv,
  c.comments_count,
  c.likes_count
FROM content c
JOIN creators       cr ON cr.id = c.creator_id
LEFT JOIN platforms p  ON p.id = c.platform_id
LEFT JOIN content_tags ct ON ct.content_id = c.id
LEFT JOIN tags t         ON t.id = ct.tag_id
GROUP BY c.id;

