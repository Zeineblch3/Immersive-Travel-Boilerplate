#!/bin/bash

# Define colors
NC='\033[0m'  # No Color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'

# Welcome message
echo -e "${BLUE}Welcome to the Immersive Travel Boilerplate setup!${NC}"

# Ask for number of portals
echo -e "${YELLOW}How many portals do you want? (Minimum: 1, Maximum: 5)${NC}"
read numPortals

# Validate input
if [[ "$numPortals" -lt 1 || "$numPortals" -gt 5 ]]; then
  echo -e "${RED}Please enter a number between 1 and 5.${NC}"
  exit 1
fi

# Modify Experience.jsx based on the user input (numPortals)
echo -e "${GREEN}Updating Experience.jsx to include $numPortals portals...${NC}"

# Path to the existing Experience.jsx file
experience_file="C:/Users/Lenovo/Desktop/immersive-travel-boilerplate/src/components/Experience.jsx"

# Check if the file exists
if [ ! -f "$experience_file" ]; then
  echo -e "${RED}Error: $experience_file not found! Please ensure this is the correct project directory.${NC}"
  exit 1
fi

# Use sed to replace the numPortals value with the user input
sed -i -e "s/const numPortals = [0-9]\+/const numPortals = $numPortals;/g" "$experience_file"

echo -e "${GREEN}Experience.jsx has been updated to show $numPortals portals.${NC}"

# Final message
echo -e "${BLUE}Setup complete! You can now run the project with the updated number of portals.${NC}"
