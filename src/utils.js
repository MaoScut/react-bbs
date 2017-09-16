export function timeDistance(date) {
  const now = new Date();
  const pass = new Date(date);
  const distance = now - pass;
  if (distance >= 24 * 3600 * 1000) {
    return `${Math.floor(distance / (24 * 3600 * 1000))}天前`;
  }
  if (distance >= 3600 * 1000) {
    return `${Math.floor(distance / (3600 * 1000))}小时前`;
  }
  if (distance >= 5 * 60 * 1000) {
    return `${Math.floor(distance / (5 * 60 * 1000))}分钟前`;
  }
  return '刚刚';
}
export function h() {

}
