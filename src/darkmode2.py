import re
css_path = 'index.css'

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Make primary button glow
css = css.replace('.btn-primary:hover {\n    background-color: var(--color-accent-hover);\n    transform: scale(1.02);\n    box-shadow: 0 4px 20px rgba(10, 132, 255, 0.25);\n}', 
'''.btn-primary:hover {
    background-color: var(--color-accent-hover);
    transform: scale(1.02);
    box-shadow: 0 0 25px rgba(59, 130, 246, 0.5); /* Glowing effect */
}''')

# Orbs for AI feel
css = css.replace('.orb-blue {\n    background: radial-gradient(circle,\n        rgba(10, 132, 255, 0.15) 0%,\n        rgba(90, 200, 250, 0.08) 60%,\n        transparent 100%);\n}',
'''.orb-blue {
    background: radial-gradient(circle,
        rgba(59, 130, 246, 0.25) 0%,
        rgba(96, 165, 250, 0.1) 50%,
        transparent 100%);
}''')

css = css.replace('.orb-indigo {\n    background: radial-gradient(circle,\n        rgba(90, 200, 250, 0.12) 0%,\n        rgba(10, 132, 255, 0.06) 60%,\n        transparent 100%);\n}',
'''.orb-indigo {
    background: radial-gradient(circle,
        rgba(139, 92, 246, 0.2) 0%, /* Purple AI feel */
        rgba(167, 139, 250, 0.1) 50%,
        transparent 100%);
}''')

css = css.replace('.orb-cyan {\n    background: radial-gradient(circle,\n        rgba(10, 132, 255, 0.10) 0%,\n        rgba(255, 255, 255, 0.2) 60%,\n        transparent 100%);\n}',
'''.orb-cyan {
    background: radial-gradient(circle,
        rgba(45, 212, 191, 0.2) 0%, /* Teal/Cyan */
        rgba(20, 184, 166, 0.1) 50%,
        transparent 100%);
}''')

# Background sections
css = re.sub(r'\.pain-points\s*\{\s*background:\s*rgba\(255, 255, 255, 0\.25\);\s*\}', '.pain-points {\n    background: rgba(24, 24, 27, 0.3);\n}', css)
css = re.sub(r'\.use-cases\s*\{\s*background:\s*rgba\(245, 245, 247, 0\.20\);\s*\}', '.use-cases {\n    background: rgba(24, 24, 27, 0.3);\n}', css)
css = re.sub(r'\.pricing-section\s*\{\s*background:\s*rgba\(255, 255, 255, 0\.25\);\s*\}', '.pricing-section {\n    background: rgba(24, 24, 27, 0.3);\n}', css)
css = re.sub(r'\.faq\s*\{\s*background:\s*rgba\(245, 245, 247, 0\.20\);\s*\}', '.faq {\n    background: rgba(24, 24, 27, 0.3);\n}', css)
css = re.sub(r'\.demo-section\s*\{\s*background:\s*rgba\(255, 255, 255, 0\.20\);\s*\}', '.demo-section {\n    background: rgba(24, 24, 27, 0.2);\n}', css)

# Glass panel inner and container replacements
css = re.sub(r'background:\s*rgba\(255, 255, 255, 0\.6\);', 'background: rgba(39, 39, 42, 0.5);', css)
css = re.sub(r'border: 1px solid rgba\(255, 255, 255, 0\.7\);', 'border: 1px solid rgba(255, 255, 255, 0.08);', css)

# Fix black labels
css = re.sub(r'background:\s*rgba\(0, 0, 0, 0\.025\);', 'background: rgba(255, 255, 255, 0.05);', css)

# Text that should be white but is #111111 or #000, EXCEPT wa-lead and wa-ai
# Let's target specific components:
css = re.sub(r'\.mockup-text\s*\{\s*(.*?)\s*color:\s*var\(--color-text-primary\);\s*(.*?)\s*\}', '.mockup-text {\n    \\1\n    color: var(--color-text-primary);\n    \\2\n}', css)

# Fix dark borders
css = re.sub(r'border-bottom:\s*1px solid rgba\(0, 0, 0, 0\.05\);', 'border-bottom: 1px solid rgba(255, 255, 255, 0.08);', css)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Second pass complete!")
