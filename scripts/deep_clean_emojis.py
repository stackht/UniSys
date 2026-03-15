#!/usr/bin/env python3
import re
from pathlib import Path

html_path = Path("c:/Users/Admin/Documents/Ajinkya_pdf/Enginnering/Program/Python_Program/UniSys/edusys/erp.html")
html = html_path.read_text(encoding='utf-8')

# More comprehensive emoji and ZWJ remover
# Remove all emoji variations and zero-width joiners
emoji_pattern = re.compile(
    r'[\U0001F300-\U0001F9FF]'  # Emojis
    r'|[\u200D\u200C\uFE0F]'  # ZWJ, ZWNJ, Variation Selector
    r'|[\U0001F1E6-\U0001F1FF]'  # Flags
)

html = emoji_pattern.sub('', html)

# Clean extra spaces
html = re.sub(r'>(\s+)<', '><', html)  # Remove whitespace between tags

html_path.write_text(html, encoding='utf-8')
print("Removed all emojis and variation selectors")

js_path = Path("c:/Users/Admin/Documents/Ajinkya_pdf/Enginnering/Program/Python_Program/UniSys/edusys/edusys.js")
js = js_path.read_text(encoding='utf-8')
js = emoji_pattern.sub('', js)
js = re.sub(r'>(\s+)<', '><', js)
js_path.write_text(js, encoding='utf-8')
print("Removed all emojis from JS")

print("Done!")
