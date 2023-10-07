import {clearInterval, setInterval} from "worker-timers";
import {useState} from "react";

export type TOptions = {
  initialEta?: number;
  onTick?: (eta: number) => void;
  onStopped?: () => void;
  onDone?: () => void;
};

export type TStartOptions = {
  tickMs?: number;
};
export type TCountdown = {
  eta: number;
  setEta: (eta: number) => void;
  start: (eta: number, options?: TStartOptions) => void;
  stop: () => void;
};

export const useCountdown = (options?: TOptions): TCountdown => {
  const [eta, setEta] = useState<number>(options?.initialEta ?? 0);
  const [intervalId, setIntervalId] = useState<number | undefined>();
  const stop = (intervalId?: number) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      options?.onStopped?.();
    }
  };

  const start = (etaMs: number, {tickMs = 1000}: TStartOptions = {}) => {
    stop(intervalId);
    if (etaMs <= 0) {
      options?.onStopped?.();
      return;
    }
    setEta(etaMs);
    const id = setInterval(() => {
      setEta(eta => {
        const next = tick(eta ?? etaMs, tickMs);
        options?.onTick?.(next);
        if (next === 0) {
          stop(id);
          options?.onDone?.();
        }
        return next;
      });
    }, tickMs);
    setIntervalId(id);
  };

  return {
    eta,
    setEta,
    start,
    stop: () => stop(intervalId),
  };
};

const tick = (eta: number, step: number) => {
  return eta - step < 0 ? 0 : eta - step;
};
