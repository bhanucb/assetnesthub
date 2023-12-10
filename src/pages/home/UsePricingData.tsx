import { EMPTY } from "rxjs";
import { RawMessage } from "../../models/RawMessage";
import { useEffect } from "react";
import { getRawMessages } from "../../api/RawMessages";

export type StreamData = {
  add: Array<RawMessage>;
  update: Array<RawMessage>;
  full: Array<RawMessage>;
};

export function usePricingData() {
  useEffect(() => {}, []);

  function getPricingData(
    onSnapshotLoad: (snapshot: Array<RawMessage>) => void,
    onLiveUpdateLoad: (streamData: StreamData) => void,
    predicate?: (
      value: RawMessage,
      index: number,
      array: RawMessage[]
    ) => unknown
  ) {
    getRawMessages().then((rawMessages) => onSnapshotLoad(rawMessages));

    console.log(!!onSnapshotLoad, !!onLiveUpdateLoad, !!predicate);
    const subscription = EMPTY.subscribe();
    return subscription;
  }

  return {
    getPricingData,
  };
}
