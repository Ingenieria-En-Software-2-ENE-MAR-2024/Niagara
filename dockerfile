FROM node:21-alpine3.18 AS base

FROM base AS deps
WORKDIR /src/app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g next


FROM base AS dev
WORKDIR /src/app
COPY --from=deps node_modules node_modules
COPY . .

FROM base AS builder
WORKDIR /src/app
COPY --from=deps node_modules node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /src/app
CMD ["npm", "start"]