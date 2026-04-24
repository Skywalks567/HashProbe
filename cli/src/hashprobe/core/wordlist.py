from pathlib import Path

# Path relative to this file
BASE_DIR = Path(__file__).parent.parent
ADDITIONAL_FILE = BASE_DIR / "wordlists" / "additional.txt"

def generate_smart_wordlist():
    print("[*] Smart wordlist generator")

    name = input("Name (optional): ").strip()
    nickname = input("Nickname (optional): ").strip()
    birth = input("Birth year / date (optional): ").strip()
    extra = input("Other keywords (comma separated): ").strip()

    base_words = []
    modifiers = []

    #name
    if name:
        parts = name.replace(",", " ").split()

        for p in parts:
            base_words.append(p)

        for p2 in parts:
            base_words.append(p2.lower())

        if len(parts) > 1:
            base_words.append("".join(parts))

    #nick
    if nickname:
        parts = nickname.replace(","," ").split()

        for p in parts:
            base_words.append(p)
        
        for p2 in parts:
            base_words.append(p2.lower())

        if len(parts) > 1:
            base_words.append("".join(parts))

    #EXTRA
    if extra:
        for e in extra.replace(",", " ").split():
            base_words.append(e.lower())

    #modifier
    if birth:
        for b in birth.replace("/", " ").split():
            modifiers.append(b)

    # remove duplicates (keep order)
    def uniq(lst):
        seen = set()
        out = []
        for i in lst:
            if i not in seen:
                seen.add(i)
                out.append(i)
        return out

    base_words = uniq(base_words)
    modifiers = uniq(modifiers)

    final = []

    # base words only
    final.extend(base_words)

    # permutations: word + modifier
    for w in base_words:
        for m in modifiers:
            final.append(w + m)

    # OPTIONAL: modifier + word
    for m in modifiers:
        for w in base_words:
            final.append(m + w)

    # write (overwrite)
    path = Path(ADDITIONAL_FILE)
    path.parent.mkdir(parents=True, exist_ok=True)

    with open(path, "w", encoding="utf-8") as f:
        for w in uniq(final):
            f.write(w + "\n")

    print(f"[+] Additional wordlist generated: {path}")
    print(f"[+] Total words: {len(uniq(final))}")
