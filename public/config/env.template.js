window["env"] = window["env"] || {};

window["env"]["REACT_APP_SERVER_URL"] = "https://${UWITHME_BACKEND_HOST}";
window["env"]["REACT_APP_AUTHORITY"] = "https://${UWITHME_KEYCLOAK_HOST}/realms/${UWITHME_KEYCLOAK_REALM}";
window["env"]["REACT_APP_TEST_SYSTEM"] = "https://${UWITHME_TESTSYSTEM_URL}";
window["env"]["REACT_APP_TELEGRAM_BOT"] = "https://t.me/${UWITHME_BOT_NAME}";
