#!/bin/bash
# echo "Cleaning project..."
# npm run clean
echo "Building project..."
./build.sh
# npm run build
echo "Cleaning remote S3 bucket..."
aws s3 rm s3://$S3_BUCKET --recursive \
  --cache-control "no-store, no-cache, must-revalidate, max-age=0"
echo "Deploying build artifacts to S3..."
aws s3 sync ./public s3://$S3_BUCKET --delete
echo "Deployment complete!"
