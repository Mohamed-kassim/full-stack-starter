#!/bin/bash

# Exclude the next-app directory (adjust the path as needed)
EXCLUDE_DIR="*/next-app"

# Find all workspace directories (replace "packages/*" with your pattern)
WORKSPACES=$(find ./packages/* -type d -mindepth 0 -depth 0 -not -path "*/$EXCLUDE_DIR" -not -path "*/app")
  echo ${WORKSPACES}

for DIR in $WORKSPACES; do
  echo $DIR

  # Change directory to each workspace
  cd "$DIR"

  # Execute the build command (replace "build" with your actual command)
  bun run build

   # Optionally, cd back to root directory
   cd ../../

done
