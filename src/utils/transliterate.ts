// ─── Serbian Latin ↔ Cyrillic transliteration ────────────────────────────────
// Digraphs (Dž/Lj/Nj) MUST be replaced before single-letter passes.

const LAT_TO_CYR: Record<string, string> = {
  'A':'А','B':'Б','C':'Ц','Č':'Ч','Ć':'Ћ','D':'Д','Đ':'Ђ','E':'Е','F':'Ф',
  'G':'Г','H':'Х','I':'И','J':'Ј','K':'К','L':'Л','M':'М','N':'Н','O':'О',
  'P':'П','Q':'К','R':'Р','S':'С','Š':'Ш','T':'Т','U':'У','V':'В','W':'В',
  'Y':'Ј','Z':'З','Ž':'Ж',
  'a':'а','b':'б','c':'ц','č':'ч','ć':'ћ','d':'д','đ':'ђ','e':'е','f':'ф',
  'g':'г','h':'х','i':'и','j':'ј','k':'к','l':'л','m':'м','n':'н','o':'о',
  'p':'п','q':'к','r':'р','s':'с','š':'ш','t':'т','u':'у','v':'в','w':'в',
  'y':'ј','z':'з','ž':'ж',
};

const CYR_TO_LAT: Record<string, string> = {
  'А':'A','Б':'B','Ц':'C','Ч':'Č','Ћ':'Ć','Д':'D','Ђ':'Đ','Е':'E','Ф':'F',
  'Г':'G','Х':'H','И':'I','Ј':'J','К':'K','Л':'L','М':'M','Н':'N','О':'O',
  'П':'P','Р':'R','С':'S','Ш':'Š','Т':'T','У':'U','В':'V','З':'Z','Ж':'Ž',
  'Џ':'Dž','Љ':'Lj','Њ':'Nj',
  'а':'a','б':'b','ц':'c','ч':'č','ћ':'ć','д':'d','ђ':'đ','е':'e','ф':'f',
  'г':'g','х':'h','и':'i','ј':'j','к':'k','л':'l','м':'m','н':'n','о':'o',
  'п':'p','р':'r','с':'s','ш':'š','т':'t','у':'u','в':'v','з':'z','ж':'ž',
  'џ':'dž','љ':'lj','њ':'nj',
};

export const toCyrillic = (text: string): string =>
  text
    .replace(/DŽ/g,'Џ').replace(/Dž/g,'Џ').replace(/dž/g,'џ')
    .replace(/LJ/g,'Љ').replace(/Lj/g,'Љ').replace(/lj/g,'љ')
    .replace(/NJ/g,'Њ').replace(/Nj/g,'Њ').replace(/nj/g,'њ')
    .split('').map(ch => LAT_TO_CYR[ch] ?? ch).join('');

export const toLatin = (text: string): string =>
  text.split('').map(ch => CYR_TO_LAT[ch] ?? ch).join('');
