window["env"] = window["env"] || {};

window["env"]["REACT_APP_SERVER_URL"] = "${UWITHME_BACKEND}";
window["env"]["REACT_APP_AUTHORITY"] = "${UWITHME_KEYCLOAK_URL}";
window["env"]["REACT_APP_TEST_SYSTEM"] = "${UWITHME_TESTSYSTEM_URL}";
window["env"]["REACT_APP_TELEGRAM_BOT"] = "${UWITHME_BOT_URL}";
