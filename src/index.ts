import {clearInterval, setInterval} from "worker-timers";
import {useState} from "react";

type TOptions = {
  onTick?: (eta: number) => void;
  onStopped?: () => void;
  onDone?: () => void;
};

type TStartOptions = {
  tickMs?: number;
};

export const useCountdown = (options?: TOptions) => {
  const [eta, setEta] = useState<number>();
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
