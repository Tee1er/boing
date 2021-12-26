if not exist ./boing/package-lock.json (
    echo "Installing dependencies."
    cd ./boing/
    npm i --no-bin-links
    cd ..
    echo "Installation complete."
)
cd ./boing/src && node launcher.js