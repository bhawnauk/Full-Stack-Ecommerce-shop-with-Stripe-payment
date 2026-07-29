-- Reverting Europe/London session timezone: it caused Prisma's Postgres
-- driver to misparse timestamptz values (dropping the returned UTC offset
-- and treating the local wall-clock digits as if they were already UTC),
-- adding a spurious extra hour. Keep the DB session timezone at UTC
-- (the standard default) and let application/display layers convert to
-- local time instead.
ALTER DATABASE neondb SET timezone TO 'UTC';
