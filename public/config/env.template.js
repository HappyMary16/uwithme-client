window["env"] = window["env"] || {};

window["env"]["REACT_APP_SERVER_URL"] = "${SCHEMA}${UWITHME_BACKEND_HOST}";
window["env"]["REACT_APP_AUTHORITY"] = "${SCHEMA}${UWITHME_KEYCLOAK_HOST}/realms/${UWITHME_KEYCLOAK_REALM}";
window["env"]["REACT_APP_TEST_SYSTEM"] = "${SCHEMA}${UWITHME_TESTSYSTEM_URL}";
window["env"]["REACT_APP_TELEGRAM_BOT"] = "https://t.me/${UWITHME_BOT_NAME}";
