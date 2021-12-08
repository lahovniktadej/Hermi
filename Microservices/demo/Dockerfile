FROM maven as build

WORKDIR /app
COPY src ./src
COPY pom.xml ./
RUN mvn clean package

FROM openjdk:11

WORKDIR /app
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar ./
CMD ["java", "-jar", "demo-0.0.1-SNAPSHOT.jar"]

EXPOSE 8080
