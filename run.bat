if not exist ./boing/package-lock.json (
    cd ./boing/
    npm i --no-bin-links
    cd ..
)
cd ./boing/src && node launcher.js