SQLite setup for Knowledge Hub

Files
- `db/sqlite/schema.sql` — Tables, indexes, FTS5, and `content_cards` view.
- `db/sqlite/seed.sql` — Sample data (matches UI mock: videos, article, tags, counts).
- `db/sqlite/queries.sql` — Single query supporting filters, search and sort.

Usage (sqlite3 CLI)
- Initialize DB: `sqlite3 kh.db < db/sqlite/schema.sql`
- Seed data: `sqlite3 kh.db < db/sqlite/seed.sql`
- Test query (relevance):
  - `sqlite3 kh.db ".read db/sqlite/queries.sql" "-cmd" ".parameter set :q 'upcycling'" ".parameter set :types '[]'" ".parameter set :creators '[]'" ".parameter set :tag ''" ".parameter set :date 'Anytime'" ".parameter set :sort 'relevance'"`

Binding parameters
- The query expects parameters: `:q, :types, :creators, :tag, :date, :sort`.
- For arrays (`:types`, `:creators`) pass JSON arrays, e.g. `'["video","article"]'`.

Integrating with Next.js
- Use any API route or server action to call SQLite, bind UI params to the query, and return rows.
- Map `tags_csv` back to an array with `split(',')` if needed.

