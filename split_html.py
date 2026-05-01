import re
import os

html_file = 'Advanguard Studio.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract styles
style_matches = re.findall(r'<style>(.*?)</style>', content, re.DOTALL)
css_content = "\n".join(style_matches).strip()

# Extract scripts
script_matches = re.finditer(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
js_content = ""
for m in script_matches:
    if m.group(1).strip():
        js_content += m.group(1).strip() + "\n"

# Create css and js directories
os.makedirs('css', exist_ok=True)
os.makedirs('js', exist_ok=True)

if css_content:
    with open('css/style.css', 'w', encoding='utf-8') as f:
        f.write(css_content)

if js_content:
    with open('js/main.js', 'w', encoding='utf-8') as f:
        f.write(js_content)

# Replace in html
new_content = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="css/style.css">', content, count=1, flags=re.DOTALL)
# Remove remaining style tags
new_content = re.sub(r'<style>.*?</style>', '', new_content, flags=re.DOTALL)

# Find first script with content and replace it with script tag, remove others
first_script_removed = False
def script_repl(m):
    global first_script_removed
    if m.group(1).strip():
        if not first_script_removed:
            first_script_removed = True
            return '<script src="js/main.js"></script>'
        else:
            return ''
    return m.group(0)

new_content = re.sub(r'<script[^>]*>(.*?)</script>', script_repl, new_content, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done")
