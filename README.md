# Capitec Angular front end

## Run locally
    npm install
    npm start            # http://localhost:4200

## Build the image and run it
    docker build -t capitec-app .
    docker run -d -p 8080:80 --name capitec-app capitec-app   # http://localhost:8080

## Push to Docker Hub (replace YOUR_USERNAME)
    docker login
    docker build -t YOUR_USERNAME/capitec-app:1.0.0 -t YOUR_USERNAME/capitec-app:latest .
    docker push YOUR_USERNAME/capitec-app:1.0.0
    docker push YOUR_USERNAME/capitec-app:latest

## Pull and run anywhere
    docker pull YOUR_USERNAME/capitec-app:latest
    docker run -d -p 8080:80 YOUR_USERNAME/capitec-app:latest
