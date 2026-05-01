import os

css_dir = "css"

for fn in os.listdir(css_dir):
    if fn.endswith("-fixed.css"): continue
    if fn.endswith(".css"):
        fp = os.path.join(css_dir, fn)
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()

        mod = False
        if ".mob-menu{display:none !important}" not in content.replace(" ", ""):
            content += "\n@media(min-width:901px){.mob-menu{display:none !important;}}\n"
            mod = True

        if mod:
            with open(fp, "w", encoding="utf-8") as f:
                f.write(content)

print("Second fix applied to CSS files.")
