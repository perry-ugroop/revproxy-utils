FROM nginx:1.13.3
RUN apt-get update && apt-get install -y curl gnupg2
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
RUN curl -O http://http.us.debian.org/debian/pool/main/libp/libpng/libpng12-0_1.2.49-1+deb7u2_amd64.deb
RUN dpkg -i libpng12-0_1.2.49-1+deb7u2_amd64.deb

# Copy source files
WORKDIR /home/revproxy-utils
ADD assets/ assets/
ADD libs/ libs/
COPY .gitignore .
COPY config.json .
COPY package.json .
COPY server.js .
COPY template.html.tpl .

RUN npm install

EXPOSE 4005
CMD npm run start

