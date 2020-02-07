FROM ustwo/browser-sync

COPY ./docker/utils/wait-for-it.sh /usr/bin/wait-for-it
COPY ./docker/browser-sync.entrypoint.sh /usr/bin/entrypoint

EXPOSE 80

ENTRYPOINT [ "entrypoint" ]
