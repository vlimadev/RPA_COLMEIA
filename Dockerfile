FROM registry.access.redhat.com/ubi8/ubi:8.1

ARG CHROME_VERSION=92.0.4515.107
ENV CHROME_VERSION=$CHROME_VERSION

RUN dnf update -y
RUN dnf install unzip wget -y

RUN wget -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/${CHROME_VERSION}/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip
RUN mv chromedriver /usr/bin

RUN wget https://dl.google.com/linux/linux_signing_key.pub
RUN rpm --import linux_signing_key.pub
RUN dnf install https://dl.google.com/linux/chrome/rpm/stable/x86_64/google-chrome-stable-${CHROME_VERSION}-1.x86_64.rpm -y

CMD ["google-chrome-stable"]
