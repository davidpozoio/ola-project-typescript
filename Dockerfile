FROM node
WORKDIR /home/app
RUN npm install pnpm -g
COPY package.json .
RUN pnpm install
COPY . .
CMD ["pnpm", "run", "dev"]