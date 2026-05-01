import os
import re

css_dir = "css"

correct_burger_and_menu = """
/* SHARED NAV/BURGER/MOB-MENU STYLES */
.nav-links{display:flex;gap:28px}
.nav-links a{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;position:relative;padding:4px 0;text-decoration:none;color:inherit}
.nav-links a::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:1px;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .3s ease}
.nav-links a:hover::after{transform:scaleX(1)}

.nav-cta{display:flex;justify-content:flex-end;gap:10px;align-items:center}
.pill{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--ink);padding:9px 14px;border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;background:transparent;cursor:pointer;transition:all .2s;text-decoration:none}
.pill:hover{background:var(--ink);color:var(--bone)}
.pill.filled{background:var(--ink);color:var(--bone)}
.pill.filled:hover{background:var(--orange);color:var(--bone);border-color:var(--orange)}

.burger{display:none;flex-direction:column;justify-content:center;gap:5px;width:36px;height:36px;background:none;border:none;cursor:pointer;padding:4px;border-radius:6px;transition:background .2s}
.burger:hover{background:none}
.burger span{display:block;height:1.5px;background:var(--ink);border-radius:2px;transform-origin:center;transition:transform .3s ease,opacity .3s ease,width .3s ease}
.burger span:nth-child(1){width:22px}
.burger span:nth-child(2){width:16px}
.burger span:nth-child(3){width:22px}
.burger[aria-expanded="true"] span:nth-child(1){transform:translateY(6.5px) rotate(45deg);width:22px}
.burger[aria-expanded="true"] span:nth-child(2){opacity:0;transform:scaleX(0)}
.burger[aria-expanded="true"] span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);width:22px}

.mob-menu{position:fixed;inset:0;z-index:49;background:var(--bone);display:flex;flex-direction:column;padding:100px 28px 48px;pointer-events:none;opacity:0;transform:translateY(-12px);transition:opacity .35s ease,transform .35s ease}
.mob-menu.open{opacity:1;transform:translateY(0);pointer-events:all}
.mob-menu-inner{display:flex;flex-direction:column;justify-content:space-between;height:100%}
.mob-links{display:flex;flex-direction:column;gap:4px}
.mob-link{font-family:'Space Grotesk',sans-serif;font-size:clamp(32px,8vw,52px);font-weight:500;letter-spacing:-.03em;line-height:1.15;color:var(--ink);padding:10px 0;border-bottom:1px solid var(--rule);transition:color .2s;text-decoration:none;display:block}
.mob-link:hover{color:var(--orange)}
.mob-cta{align-self:flex-start;font-size:12px;margin-top:32px}

@media(max-width:900px){
  .nav-links{display:none}
  .burger{display:flex}
}
@media(max-width:600px){
  .nav-cta .pill.filled:not(.mob-cta){display:none}
}
@media(min-width:901px){
  .mob-menu{display:none !important}
}
"""

for fn in os.listdir(css_dir):
    if fn.endswith("-fixed.css"): continue
    if fn.endswith(".css"):
        fp = os.path.join(css_dir, fn)
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()

        # We will try to strip out existing burger and menu code.
        # But wait, style.css and style.min.css are structured differently.
        # It might be safer to apply targeted Regex replacements for z-index and media queries.
        if "style.css" in fn or "style.min.css" in fn:
            # fix z-index for mob-menu just in case, though it's already 49 in style.css
            content = re.sub(r'z-index:\s*100\s*;', 'z-index: 49;', content)
            
            # Add the min-width:901px media query if not present
            if ".mob-menu{display:none !important}" not in content.replace(" ", ""):
                 content += "\n@media(min-width:901px){.mob-menu{display:none !important;}}\n"
        else:
            # For the hashed ones, we can just replace the injected full nav styles section
            # Or manually do replacements:
            # 1. z-index: 100 -> z-index: 49
            content = re.sub(r'z-index:\s*100\s*;?', 'z-index:49;', content)
            
            # 2. Fix burger animation: we can check if it has aria-expanded
            if 'aria-expanded' not in content:
                # the hashed one is missing animation. We can inject it after .burger span{...}
                content = re.sub(r'(\.burger\s*span\s*\{[^}]+\})', r'\1\n.burger span:nth-child(1){width:22px}\n.burger span:nth-child(2){width:16px}\n.burger span:nth-child(3){width:22px}\n.burger[aria-expanded="true"] span:nth-child(1){transform:translateY(6.5px) rotate(45deg);width:22px}\n.burger[aria-expanded="true"] span:nth-child(2){opacity:0;transform:scaleX(0)}\n.burger[aria-expanded="true"] span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);width:22px}\n', content)
            
            # 3. Fix nav-cta pill display hiding at 900px
            # In hashed css: @media(max-width:900px){.nav-links{display:none}.burger{display:flex}.nav-cta .pill.filled{display:none}}
            content = re.sub(r'\.nav-cta\s*\.pill\.filled\s*\{\s*display\s*:\s*none\s*\}', '', content)
            
            # 4. Hide CTA at 600px instead
            if ".nav-cta .pill.filled:not(.mob-cta)" not in content:
                content += "\n@media(max-width:600px){.nav-cta .pill.filled:not(.mob-cta){display:none}}\n"

            # 5. Add min-width 901
            if "min-width:901px" not in content and "min-width: 901px" not in content:
                content += "\n@media(min-width:901px){.mob-menu{display:none !important}}\n"

        with open(fp, "w", encoding="utf-8") as f:
            f.write(content)

print("Fixes applied to CSS files.")
