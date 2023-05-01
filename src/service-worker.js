/* eslint-disable no-restricted-globals */

import {clientsClaim} from "workbox-core";
import {precacheAndRoute, createHandlerBoundToURL} from "workbox-precaching";
import {registerRoute} from "workbox-routing";
import {NetworkFirst} from "workbox-strategies";
import {ExpirationPlugin} from "workbox-expiration";

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(({request}) => request.mode === 'navigate',
    createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

registerRoute(({request}) => request.method === "GET" && request.headers.get("X-Cache") === "api",
    new NetworkFirst({
        cacheName: 'api',
        plugins: [
            new ExpirationPlugin({maxEntries: 1000}),
        ],
    })
);

registerRoute(({request}) => request.method === "GET" && request.headers.get("X-Cache") === "files",
    new NetworkFirst({
      cacheName: 'files',
      plugins: [
        new ExpirationPlugin({maxEntries: 100}),
      ],
    })
);