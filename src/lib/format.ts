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


/**
 * 전화번호를 포맷팅합니다
 * @param value 전화번호 문자열
 * @returns 포맷된 전화번호 문자열
 */
export const formatPhoneNumber = (value: string) => {
  const number = value.replace(/[^\d]/g, '')
  if (number.length <= 2) return number
  
  // 서울 지역 번호로 시작하는 경우
  if (number.startsWith('02')) {
    if (number.length <= 5) return `${number.slice(0, 2)}-${number.slice(2)}`
    // 02-xxxx-xxxx 또는 02-xxx-xxxx 형식
    return number.length >= 10
      ? `${number.slice(0, 2)}-${number.slice(2, 6)}-${number.slice(6)}`
      : `${number.slice(0, 2)}-${number.slice(2, 5)}-${number.slice(5)}`
  }
  
  // 기존 로직
  if (number.length <= 3) return number
  if (number.length <= 6) return `${number.slice(0, 3)}-${number.slice(3)}`
  // 전체 길이가 11자리면 xxx-xxxx-xxxx 형식으로,
  // 그 외에는 xxx-xxx-xxxx 형식으로 반환
  return number.length === 11 
    ? `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`
    : `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`
}


/**
 * 전화번호 포맷팅 해제합니다.
 * @param value 포맷팅된 전화번호 문자열
 * @returns 포맷팅 해제된 전화번호 문자열
 */
export const unformatPhoneNumber = (value: string) => {
  return value.replace(/-/g, '')
}
