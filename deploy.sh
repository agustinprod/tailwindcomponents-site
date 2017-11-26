echo "Cleaning previous build"
rm -rf dist/
mkdir dist


VERSION=$(date +%s)

echo "Building code"
npm run build --production

echo "{
  \"version\": \"${VERSION}\",
  \"path\": \"https://come-and-go.agustin.pro/build/latest.zip\"
}" > dist/manifest.json



echo "Uploading web"
rsync -avz ./dist/ -e ssh forge@agustin.pro:~/come-and-go-client.agustin.pro

echo "Compressing package"

cd dist/
rm *.map
zip -r latest.zip *
cd ..

echo "Uploading manifest"
rsync -avz ./dist/latest.zip -e ssh forge@agustin.pro:~/come-and-go.agustin.pro/public/build/

echo "Uploading package"
rsync -avz ./dist/manifest.json -e ssh forge@agustin.pro:~/come-and-go.agustin.pro/public/build/

echo "Uploading Landing"
rsync -avz ./landing -e ssh forge@agustin.pro:~/come-and-go-client.agustin.pro/

