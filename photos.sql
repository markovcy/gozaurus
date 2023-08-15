COPY photos FROM '/docker-entrypoint-initdb.d/_photos.csv' (HEADER, DELIMITER ',', FORMAT csv);
select setval('photos_id_seq', (select max(id) from _photos) + 1);