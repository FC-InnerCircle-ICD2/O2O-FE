/**
 * 거리를 사용자 친화적인 형식으로 변환합니다
 * 1000m 미만일 경우 미터(m) 단위로,
 * 1000m 이상일 경우 킬로미터(km) 단위로 변환합니다
 * @param distance 미터 단위의 거리
 * @returns 포맷된 거리 문자열
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${Math.round(distance)}m`
  }
  return `${(distance / 1000).toFixed(1).toLocaleString()}km`
}
