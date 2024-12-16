#!/bin/bash
# Build the plugins
echo "Building plugins..."
cd plugins/gatsby-remark-header-ids
npm install
npm run build

# Build the site
echo "Building site..."
cd ../..
npm run build