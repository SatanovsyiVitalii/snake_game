export function getCssVariableValue(variableName: string, element: HTMLElement = document.documentElement): string {
  return getComputedStyle(element).getPropertyValue(variableName).trim();
}

export function getCssVariableValueAsNumber(variableName: string, element: HTMLElement = document.documentElement): number {
  return parseInt(getCssVariableValue(variableName, element), 10);
}