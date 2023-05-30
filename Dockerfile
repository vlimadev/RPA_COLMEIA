FROM debian:buster

ARG PORT=3000
ARG COLMEIA_SENHA
ARG COLMEIA_SENHA

ENV NODE_ENV='production'
ENV PORT=$PORT
ENV COLMEIA_EMAIL=$COLMEIA_EMAIL
ENV COLMEIA_SENHA=$COLMEIA_SENHA

RUN apt-get update && \
    apt-get install -y wget gnupg ca-certificates && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

RUN apt-get install -y libpango1.0-0 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 \
    libxi6 libxrandr2 libgtk-3-0 libatk1.0-0 libatk-bridge2.0-0 libxss1 libnss3 libasound2 \
    fonts-liberation xdg-utils cron

WORKDIR /rpa

COPY ./package.json /rpa
COPY ./src /rpa/src

RUN npm install

RUN echo "*/5 * * * * cd /rpa && node src/index.js" >> /etc/crontab

EXPOSE $PORT

# CMD cron && tail -f /dev/null
CMD ["node", "src/index.js"]

