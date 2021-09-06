FROM golang:1.17 AS backend_builder
WORKDIR /source
COPY backend ./
RUN CGO_ENABLED=0 GOOS=linux go build

FROM node:16 AS webapp_builder
WORKDIR /source
COPY webapp ./
RUN npm install && npm run build

FROM alpine:latest
WORKDIR /app
COPY --from=backend_builder /source/chatthingy /app/chatthingy
COPY --from=webapp_builder /source/build/ /app/webapp/build/
CMD ["./chatthingy"]