FROM node:16

WORKDIR /app
ENV NODE_ENV production
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "start"]