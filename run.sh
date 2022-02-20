# /bin/env sh

# Install node modules
echo "Checking / installing dependencies."
if [ ! -f ./boing/package-lock.json ]; then
    echo "Installing dependencies. This may take a while. "
    (cd ./boing && npm i --no-bin-links)
fi

# Run boing
cd ./boing/src/ && node launcher.js
