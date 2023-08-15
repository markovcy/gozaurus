COPY events FROM '/docker-entrypoint-initdb.d/events.csv' (HEADER, DELIMITER ',', FORMAT csv);
select setval('events_id_seq', (select max(id) from events) + 1);