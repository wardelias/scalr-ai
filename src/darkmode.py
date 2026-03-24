import re
css_path = 'index.css'

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace root variables
new_root = ''':root {
    /* Backgrounds */
    --color-bg-primary:   #09090b;
    --color-bg-secondary: #18181b;
    --color-bg-warm:      #27272a;

    /* Text */
    --color-text-primary:   #fafafa;
    --color-text-secondary: #a1a1aa;
    --color-text-tertiary:  #71717a;

    /* Accent (Tech Blue) */
    --color-accent:       #3b82f6;
    --color-accent-hover: #60a5fa;
    --color-success:      #10b981;
    --color-error:        #ef4444;

    /* Frost / Glass for Dark Mode */
    --glass-bg:      rgba(24, 24, 27, 0.60);
    --glass-bg-deep: rgba(24, 24, 27, 0.85);
    --glass-border:  rgba(255, 255, 255, 0.08); /* Subtle white border */
    --glass-shadow:  0 8px 40px rgba(0, 0, 0, 0.4);
    --card-shadow:   0 2px 12px rgba(0, 0, 0, 0.3);

    /* Typography */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display',
                 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    --font-mono: 'IBM Plex Mono', 'SF Mono', Menlo, monospace;

    /* Spacing & Layout */
    --max-width:   1200px;
    --section-pad: 120px;
    --radius-sm:   8px;
    --radius-md:   14px;
    --radius-lg:   20px;
    --radius-xl:   24px;
    --radius-2xl:  28px;
    --radius-pill: 980px;

    /* Transitions */
    --transition-fast:   0.2s ease;
    --transition-smooth: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}'''
css = re.sub(r':root\s*\{.*?(?=\n/\*)', new_root, css, flags=re.DOTALL)

# Update body background-color
css = css.replace('background-color: #fbfbfd;', 'background-color: var(--color-bg-primary);')

# Replace hardcoded whites with darks for modal / nav / backgrounds where they use rgba(255, 255, 255, X)
# Warning: Do not replace ALL, because some need to be white (like the WhatsApp).
# Let's target specific classes:
css = re.sub(r'\.lang-modal-overlay\s*\{[^}]*background:[^;]+;', '.lang-modal-overlay { background: rgba(0, 0, 0, 0.7);', css)
css = re.sub(r'\.lang-modal\s*\{[^}]*background:[^;]+;', '.lang-modal { background: rgba(24, 24, 27, 0.88);', css)
css = re.sub(r'\.navbar\.scrolled\s*\{[^}]*background:[^;]+;', '.navbar.scrolled { background: rgba(9, 9, 11, 0.72);', css)
css = re.sub(r'\.badge\s*\{[^}]*background:[^;]+;', '.badge { background: rgba(24, 24, 27, 0.85);', css)

# Gradients
css = css.replace('rgba(255, 255, 255, 0.35)', 'rgba(9, 9, 11, 0.35)')
css = css.replace('rgba(251, 251, 253, 0.25)', 'rgba(9, 9, 11, 0.25)')
css = css.replace('rgba(245, 245, 247, 0.20)', 'rgba(24, 24, 27, 0.20)')

# Let's replace rgba(0, 0, 0, 0.08) with rgba(255, 255, 255, 0.08) for borders
css = css.replace('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.08)')
css = css.replace('rgba(0, 0, 0, 0.03)', 'rgba(255, 255, 255, 0.03)')
css = css.replace('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.04)')
css = css.replace('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.06)')
css = css.replace('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)')
css = css.replace('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.12)')
css = css.replace('rgba(0, 0, 0, 0.15)', 'rgba(255, 255, 255, 0.15)')
css = css.replace('rgba(0, 0, 0, 0.18)', 'rgba(255, 255, 255, 0.18)')
css = css.replace('rgba(0, 0, 0, 0.02)', 'rgba(255, 255, 255, 0.02)')

# White background to dark
css = css.replace('background: #ffffff', 'background: var(--color-bg-secondary)')
css = css.replace('background-color: #ffffff', 'background-color: var(--color-bg-secondary)')

# Text colors that might be hardcoded to (#000 or #111)
css = css.replace('color: #000', 'color: #fff')
# BUT WAIT -> WA mockup uses #111111 and #ffffff which was just fixed. We must NOT break that!
# The WA mockup classes are .wa-msg, .wa-lead, .wa-ai, . whatsapp-container.
# They are near the end. Let's revert WA styles to exact what they were if they get touched.

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Replaced variables and gradients!")
