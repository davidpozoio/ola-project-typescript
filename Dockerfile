FROM node
WORKDIR /home/app
RUN cd /home/app
RUN mkdir src
RUN mkdir multimedia
RUN npm install pnpm -g
COPY package.json .
RUN pnpm install
COPY . .
CMD ["pnpm", "run", "dev"]