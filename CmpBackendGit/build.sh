#!/bin/bash

set -e

# Verify Java version
java -version

# Verify Maven (if using mvnw, skip installing Maven separately)
if command -v mvn &> /dev/null
then
    echo "Maven is installed"
else
    echo "Maven is not installed"
    exit 1
fi

# Make Maven wrapper executable
chmod +x mvnw

# Run Maven build, skipping tests for faster build
./mvnw clean package -DskipTests
