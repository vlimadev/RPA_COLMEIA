FROM debian:buster

ARG COLMEIA_SENHA
ARG COLMEIA_SENHA

ENV NODE_ENV='production' \
    COLMEIA_EMAIL=$COLMEIA_EMAIL \
    COLMEIA_SENHA=$COLMEIA_SENHA \
    LD_LIBRARY_PATH="/opt/oracle/instantclient_21_3:${LD_LIBRARY_PATH}" \
    OCI_HOME="/opt/oracle/instantclient_21_3" \
    OCI_LIB_DIR="/opt/oracle/instantclient_21_3" \
    OCI_INC_DIR="/opt/oracle/instantclient_21_3/sdk/include"

RUN apt-get update && apt-get install -y \
    wget gnupg ca-certificates \
    curl \
    libpango1.0-0 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 \
    libxi6 libxrandr2 libgtk-3-0 libatk1.0-0 libatk-bridge2.0-0 libxss1 libnss3 libasound2 \
    fonts-liberation xdg-utils cron \
    libaio1 unzip \
    sudo

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y google-chrome-stable nodejs

RUN mkdir /opt/oracle \
    && cd /opt/oracle \
    && wget https://download.oracle.com/otn_software/linux/instantclient/213000/instantclient-basiclite-linux.x64-21.3.0.0.0.zip \
    && unzip instantclient-basiclite-linux.x64-21.3.0.0.0.zip \
    && rm instantclient-basiclite-linux.x64-21.3.0.0.0.zip

# Create a non-root user
RUN useradd -m -d /home/appuser -s /bin/bash appuser && \
    echo "appuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER appuser

RUN mkdir ~/.npm-global
RUN npm config set prefix '~/.npm-global'
RUN export PATH="~/.npm-global/bin:$PATH"

WORKDIR /app

# RPA
COPY --chown=appuser:appuser package.json package-lock.json ./rpa/
COPY --chown=appuser:appuser src ./rpa/src/
RUN cd rpa && npm ci

# MS
COPY --chown=appuser:appuser back-RPA ./service/
RUN cd service && npm ci

# SCRIPT
COPY --chown=appuser:appuser script.sh .

RUN sudo npm install -g pm2 oracledb

CMD pm2 start ./service/index.js & sh ./script.sh
