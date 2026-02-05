/**
 * 한국어 마지막 글자에 받침(종성)이 있는지 확인
 * 받침이 있으면 "이", 없으면 "가" 반환
 */
export function getSubjectParticle(word: string): string {
  if (!word || word.length === 0) return "가";

  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);

  // 한글 유니코드 범위: 0xAC00 ~ 0xD7A3
  if (code < 0xac00 || code > 0xd7a3) {
    // 한글이 아닌 경우 (영어 등) - 기본값 "가"
    return "가";
  }

  // 받침 계산: (유니코드 - 0xAC00) % 28
  // 0이면 받침 없음, 그 외는 받침 있음
  const jongseong = (code - 0xac00) % 28;

  return jongseong === 0 ? "가" : "이";
}
