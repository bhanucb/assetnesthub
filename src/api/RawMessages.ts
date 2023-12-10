import { getMockRawMessages } from "../mocks/RawMessage";
import { RawMessage } from "../models/RawMessage";

export function getRawMessages(): Promise<Array<RawMessage>> {
  const count = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
  const data = getMockRawMessages(count);
  return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
}

export function getStreamingMessages() {}
