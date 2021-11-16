# Search Layers

This allows the user to search for layers.

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_searchlayers/index.html

## Installation Guide
**Requirements:**
- map.apps 4.12.0 or later

[dn_printingenhanced Documentation](https://github.com/conterra/mapapps-search-layers/tree/master/src/main/js/bundles/dn_searchlayers)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
   `mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
   Change the mapapps.remote.base in the build.properties file and run:
   `mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
