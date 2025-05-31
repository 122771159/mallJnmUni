export function getHeight() {
  const topHeight = uni.$uv.sys().statusBarHeight + 44;
  const bottomHeight = uni.$uv.sys().safeAreaInsets.bottom + 50;
  const screenHeight = uni.$uv.sys().windowHeight;
  return {
    topHeight,
    bottomHeight,
    tabberHeight: `calc(100vh - ${topHeight}px - ${bottomHeight}px)`,
    navHeight: `calc(100vh - ${topHeight}px)`,
    tabberFreeHeight: screenHeight - topHeight - bottomHeight,
  };
}
