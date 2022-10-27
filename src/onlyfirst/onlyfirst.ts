
/**
 *
 * 处理单行文本，返回处理后的文本
 * @param text 需要处理的文本
 * @throws {Error}
 * @returns
 */
function processSingle(text: string): string {
  const inx = text.indexOf('=');
  if (inx === -1) {
    throw new Error(`${text} contains no =`);
  }
  if (text.split('\n').length > 2) {
    throw new Error(`too many \\n`);
  }
  return text.substring(0, inx+1);
}

export function processParagraph(text: string): string {
  let res = "";
  for (let short of text.split('\n')) {
    short = short.trim();
    if (short) {
      res += processSingle(short);
    }
  }
  return res;
}
