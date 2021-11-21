# /bin/env sh

# Install node modules
echo "Installing required NPM dependencies. This may take a while."
if [ ! -f ./boing/package-lock.json ]; then
    (cd ./boing && npm i --no-bin-links)
fi

# Run boing
cd ./boing/src/ && node launcher.js
