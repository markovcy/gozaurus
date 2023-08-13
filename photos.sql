COPY items FROM '/docker-entrypoint-initdb.d/photos.csv' (HEADER, DELIMITER ',', FORMAT csv);
select setval('photos_id_seq', (select max(id) from photos) + 1);