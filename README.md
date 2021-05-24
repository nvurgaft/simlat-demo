# simlat-demo
Managing Remote Devices - Code Challenge

## Overall

The backend uses Spring Boot and is configured to connect to a PostgreSQL database.

The frontend uses Vue.js (with Modules)

## Building

This application uses Maven to fetch dependencies and build itself.
The Maven configuration exposes the goal `spring-boot:run` goal.
Either build/run from a supporting IDE (e.g. Netbeans), or from the command line
    
>./mvnw spring-boot:run

## Running

The application is self contained `.jar` file it can be run from the command line or using an IDE that supports Spring.
The UI is accessible at port 9000 (e.g. http://localhost:9000)
The application is configured to access PostgreSQL at port (default) 5432
The above options are configurable from the `application.properties` file.
