export function getContainer(container: string | HTMLElement): HTMLElement {
  if (typeof container === 'string') {
    const element = document.getElementById(container);
    if (!element) {
      throw new Error(`Container with id "${container}" not found`);
    }
    return element;
  }
  return container;
}

export function getContainerSize(container: HTMLElement): { width: number; height: number } {
  return {
    width: container.clientWidth,
    height: container.clientHeight
  };
}
