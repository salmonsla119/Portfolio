#!/usr/bin/env python3
"""엑셀(.xlsx) 시트를 assets/sheets.js 의 표 데이터로 바꿔 주는 보조 스크립트.

브라우저는 주소가 file:// 일 때 외부 파일을 읽지 못하므로(CLAUDE.md 참고),
엑셀 내용을 미리 JS 파일에 넣어 두어야 페이지에서 표로 보여 줄 수 있습니다.
원본 .xlsx 파일은 그대로 두고 다운로드용으로 함께 씁니다.

사용법:
    python tools/xlsx-to-sheets.py <엑셀파일> <키이름> [표제목]
예:
    python tools/xlsx-to-sheets.py assets/documents/work-calendar-2026-08.xlsx work-calendar-2026-08
"""
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET

N = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
SHEETS_JS = 'assets/sheets.js'


def col_index(ref):
    """A1 형식의 셀 주소에서 열 번호(0부터)를 얻는다."""
    letters = re.match(r'[A-Z]+', ref).group(0)
    n = 0
    for ch in letters:
        n = n * 26 + (ord(ch) - 64)
    return n - 1


def row_index(ref):
    return int(re.search(r'\d+', ref).group(0)) - 1


def read_xlsx(path):
    z = zipfile.ZipFile(path)
    strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        for si in ET.fromstring(z.read('xl/sharedStrings.xml')):
            strings.append(''.join(t.text or '' for t in si.iter(N + 't')))

    styles = ET.fromstring(z.read('xl/styles.xml'))
    fills = []
    for fill in styles.find(N + 'fills'):
        pat = fill.find(N + 'patternFill')
        rgb = ''
        if pat is not None and pat.get('patternType') not in (None, 'none'):
            fg = pat.find(N + 'fgColor')
            if fg is not None and fg.get('rgb'):
                rgb = fg.get('rgb')[-6:]
        fills.append(rgb)
    bolds = [f.find(N + 'b') is not None for f in styles.find(N + 'fonts')]
    xf_fill, xf_bold = [], []
    for xf in styles.find(N + 'cellXfs'):
        xf_fill.append(fills[int(xf.get('fillId', 0))] if fills else '')
        xf_bold.append(bolds[int(xf.get('fontId', 0))] if bolds else False)

    name = ET.fromstring(z.read('xl/workbook.xml')).find(N + 'sheets')[0].get('name')
    sheet = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))

    widths = [float(c.get('width', 10)) for c in (sheet.find(N + 'cols') or [])]

    spans = {}          # 병합 시작 칸 -> (가로 칸수, 세로 칸수)
    covered = set()     # 병합에 먹혀 사라지는 칸
    merge_root = sheet.find(N + 'mergeCells')
    for m in (merge_root if merge_root is not None else []):
        a, b = m.get('ref').split(':')
        r0, c0, r1, c1 = row_index(a), col_index(a), row_index(b), col_index(b)
        spans[(r0, c0)] = (c1 - c0 + 1, r1 - r0 + 1)
        for r in range(r0, r1 + 1):
            for c in range(c0, c1 + 1):
                if (r, c) != (r0, c0):
                    covered.add((r, c))

    grid = {}
    max_row = max_col = 0
    for row in sheet.iter(N + 'row'):
        for cell in row:
            ref = cell.get('r')
            r, c = row_index(ref), col_index(ref)
            v = cell.find(N + 'v')
            if v is None or v.text is None:
                value = ''
            elif cell.get('t') == 's':
                value = strings[int(v.text)]
            else:
                value = v.text
            s = int(cell.get('s', 0))
            fill = xf_fill[s] if s < len(xf_fill) else ''
            bold = xf_bold[s] if s < len(xf_bold) else False
            if value or fill:
                grid[(r, c)] = (value, fill, bold)
                max_row, max_col = max(max_row, r), max(max_col, c)

    rows = []
    for r in range(max_row + 1):
        line = []
        for c in range(max_col + 1):
            if (r, c) in covered:
                continue
            value, fill, bold = grid.get((r, c), ('', '', False))
            cell = {'v': value}
            cs, rs = spans.get((r, c), (1, 1))
            if cs > 1:
                cell['cs'] = cs
            if rs > 1:
                cell['rs'] = rs
            if fill and fill.lower() not in ('ffffff', '000000'):
                cell['f'] = '#' + fill
            if bold:
                cell['b'] = 1
            line.append(cell)
        rows.append(line)

    return {'sheet': name, 'cols': widths[:max_col + 1], 'rows': rows}


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    path, key = sys.argv[1], sys.argv[2]
    data = read_xlsx(path)
    data['title'] = sys.argv[3] if len(sys.argv) > 3 else (data['rows'][0][0]['v'] or key)

    try:
        old = open(SHEETS_JS, encoding='utf-8').read()
        store = json.loads(re.search(r'=\s*(\{.*\});?\s*$', old, re.S).group(1))
    except Exception:
        store = {}
    store[key] = data

    body = json.dumps(store, ensure_ascii=False, separators=(',', ':'))
    with open(SHEETS_JS, 'w', encoding='utf-8') as f:
        f.write('/* 엑셀(.xlsx) 표 데이터. tools/xlsx-to-sheets.py 로 만들어집니다. 직접 고치지 마세요. */\n')
        f.write('window.PORTFOLIO_SHEETS=' + body + ';\n')
    print('wrote %s (%s), %d행' % (SHEETS_JS, key, len(data['rows'])))


if __name__ == '__main__':
    main()
