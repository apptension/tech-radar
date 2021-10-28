export const getMoveImageBy = (isMobile: boolean): number => {
  const MIN_WINDOW_HEIGHT_FOR_MOBILE_RADAR_IMAGE = 740;
  const windowImageHeightDifference = window.innerHeight - MIN_WINDOW_HEIGHT_FOR_MOBILE_RADAR_IMAGE;
  const isWindowTooShort = windowImageHeightDifference < 0;
  return isMobile && isWindowTooShort ? windowImageHeightDifference : 0;
};
