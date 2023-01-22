import Stomp from "stompjs";

import { SCExec, SCUseOptions } from "../types";

class SC {
  static #client: Stomp.Client;
  static #initialized: boolean;

  static #initialize({ token }: SCUseOptions, execute: SCExec) {
    SC.#initialized = true;
    SC.#client = Stomp.over(
      new WebSocket(`${import.meta.env.VITE_SOCKET_CONN_URL}?token=${token}`)
    );
    if (import.meta.env.PROD) {
      this.#client.debug = () => {};
    }
    SC.#connect(execute);
  }

  static #connect(execute: SCExec) {
    SC.#client.connect({}, (frame) => {
      execute(SC.#client);
    });
  }

  static use({ token }: SCUseOptions, execute: SCExec) {
    if (!SC.#initialized) {
      SC.#initialize({ token }, execute);
    } else if (!SC.#client.connected) {
      SC.#connect(execute);
    } else if (SC.#initialized && SC.#client.connected) {
      execute(SC.#client);
    }
  }
}

export { SC };