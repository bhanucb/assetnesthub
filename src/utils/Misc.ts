export const sleep = (milliseconds: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function removeSlashes(value: string) {
  return value.replace(/^\/|\/$/g, "");
}

export function hasPageReloaded() {
  const performanceNavigationTiming = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  return performanceNavigationTiming.type === "reload";
}

export function formatCurrency(value: number, comapct?: true) {
  if (value === null || value === undefined) return value;

  if (comapct) {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return `$ ${formatter.format(value)}`;
  }

  return `$ ${value.toLocaleString()}`;
}

export function formatPercentage(value: number) {
  if (value === null || value === undefined) return value;

  return `${value}%`;
}
