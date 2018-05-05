# Raspberry PI Dockerfile
#

# 베이스 이미지
FROM hypriot/rpi-node

# 정보
LABEL maintainer="bynaki <bynaki@icloud.com>"
LABEL title="ts-webapi.boilerplate"
LABEL version="latest"
LABEL description="https://github.com/bynaki/ts-webapi.boilerplate.git"

# 인프라 구성
RUN ["bin/sh", "-c", "ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime"]
ADD entrypoint /bin
RUN chmod 755 /bin/entrypoint \
    && ln -s /bin/entrypoint /
ENTRYPOINT ["entrypoint"]
CMD ["npm", "start"]
