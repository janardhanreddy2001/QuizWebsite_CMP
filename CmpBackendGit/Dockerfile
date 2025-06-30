FROM node:22.16.0-slim

RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    curl \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://bun.sh | bash
ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app
COPY . .

RUN chmod +x build.sh
CMD ["./build.sh"]
