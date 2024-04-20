npx nx build backend

docker build -f ./apps/backend/Dockerfile . -t backend

docker run --rm -d -v todoapp:/data/db --name mongodb-server --network backend-net mongo

docker run --rm -it -d -p 5000:5000 --name express-server --network backend-net -v C:/dev/arsenyiy/apps/backend --env-file=./apps/backend/.env backend