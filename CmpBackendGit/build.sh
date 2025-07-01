#!/bin/bash

export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

echo "==== Starting Maven Build in CmpBackendGit ===="

cd CmpBackendGit

./mvnw clean install -DskipTests
