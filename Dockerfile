# === STAGE 1: BUILD ===
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci # Instala TUDO (incluindo devDependencies)
COPY . .
# === STAGE 2: PRODUCTION ===
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev # Instala APENAS dependências de produção
COPY --from=builder /app/server.js ./
EXPOSE 3000
CMD ["node", "server.js"]