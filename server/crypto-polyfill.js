import { webcrypto } from "crypto";

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
  console.log("[polyfill] globalThis.crypto enabled ✅");
}
