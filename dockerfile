FROM node:21-alpine3.18 AS base

ARG POSTGRES_PRISMA_URL
ENV POSTGRES_PRISMA_URL=${POSTGRES_PRISMA_URL}

WORKDIR /niagara
COPY ./package.json ./package-lock.json ./
COPY ./prisma ./prisma
COPY . .
RUN npm install
RUN npm install -g next
RUN npm install -g prisma
RUN prisma generate

FROM base AS dev
WORKDIR /niagara
COPY --from=deps node_modules node_modules
COPY . .

FROM base AS builder
WORKDIR /niagara
COPY --from=deps node_modules node_modules
COPY . .
#RUN npm run build

FROM base AS runner
WORKDIR /niagara

CMD ["npm", "run", "start:migrate:build:run"]
