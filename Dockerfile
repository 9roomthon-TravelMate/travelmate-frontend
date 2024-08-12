FROM node:20-bookworm-slim AS build
WORKDIR /usr/src/app
COPY . .
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_KAKAO_API_JAVASCRIPT_KEY
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
ENV REACT_APP_KAKAO_API_JAVASCRIPT_KEY=${REACT_APP_KAKAO_API_JAVASCRIPT_KEY}
RUN npm ci
RUN npm run build


FROM node:20-bookworm-slim AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build ./build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]