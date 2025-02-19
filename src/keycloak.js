import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  url: "https://sso.thusns.net",
  realm: "SNS",
  clientId: "SNS-realm",
});

export default keycloak;
