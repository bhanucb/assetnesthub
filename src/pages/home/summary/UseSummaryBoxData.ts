import { StreamData, usePricingData } from "../UsePricingData";
import { useEffect, useState } from "react";
import { RawMessage } from "../../../models/RawMessage";
import { defaultPositionData, PositionData } from "./PositionData";
import { defaultPnlData, PnlData } from "./PnlData";

function UseSummaryBoxData() {
  const { getPricingData } = usePricingData();
  const [position, setPosition] = useState<PositionData>(defaultPositionData);
  const [pnl, setPnl] = useState<PnlData>(defaultPnlData);

  useEffect(() => {
    const subscription = getPricingData(processSnapshot, processLiveData);

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  function processSnapshot(messages: Array<RawMessage>) {
    calcData(messages);
  }

  function processLiveData({ full }: StreamData) {
    calcData(full);
  }

  function calcData(messages: Array<RawMessage>) {
    const position = calcRoi(messages);
    setPosition(position);

    const pnl = calcDividends(messages);
    setPnl(pnl);
  }

  function calcRoi(messages: Array<RawMessage>): PositionData {
    return messages.reduce((previousValue, currentValue) => {
      const { roi } = currentValue;
      const positionValue = roi ?? 0;

      return {
        total: previousValue.total + positionValue,
        long: previousValue.long + (positionValue > 0 ? positionValue : 0),
        short: previousValue.short + (positionValue < 0 ? positionValue : 0),
      } as PositionData;
    }, defaultPositionData);
  }

  function calcDividends(messages: Array<RawMessage>): PnlData {
    return messages.reduce((previousValue, currentValue) => {
      const { dividends } = currentValue;
      const realizedPnLValue = dividends ?? 0;
      const unrealizedPnLValue = dividends ?? 0;

      return {
        total: previousValue.total + realizedPnLValue + unrealizedPnLValue,
        real: previousValue.real + realizedPnLValue,
        unreal: previousValue.unreal + unrealizedPnLValue,
      } as PnlData;
    }, defaultPnlData);
  }

  return { position, pnl };
}

export default UseSummaryBoxData;
