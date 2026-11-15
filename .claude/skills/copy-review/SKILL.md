---
name: copy-review
description: Review the English copy of this site's posts and pages — spelling, punctuation, grammar, house style — then apply the mechanical corrections directly, ask before touching anything that carries the author's voice, and record what was applied in the file's frontmatter. Use this skill whenever the author asks to review, proofread, copyedit, check the language of, or "look over" a post or page, or asks what needs fixing before publishing — including bulk requests like "review everything I changed today", and including pages outside content/blog/. Use it even when they don't name it or ask only for "a quick look".
---

# Copy review

This site is written in English by a Swedish author who uses a deliberately playful,
personal voice. That combination means two very different kinds of finding turn up in
the same read-through, and treating them the same way is the one thing that makes a
copy review useless here.

A missing comma is a mistake. A made-up word like "weehoo" is a choice. Correcting the
first is a service; "correcting" the second quietly deletes the author from his own
writing. So this skill applies the first kind directly and never touches the second
without asking.

## What to review

Resolve the target before reading anything:

| The author says | Review |
| --- | --- |
| a path | that file |
| a name, like "about" or "the Sunday post" | match it against filenames and `title` fields under `content/` |
| nothing | everything changed in the working tree: `git diff --name-only main -- "*.md"` plus untracked `.md` files under `content/` |
| "since <ref>", "today", "this week" | copy touched by commits since that point: `git diff --name-only <ref>..HEAD -- "*.md"` |

The scope is all prose under `content/` — posts, `about/index.md`, `changelog.md`, slash
pages. Not `_includes/`, not config, not `README.md`.

The last three forms can match several files; that's the bulk mode. Review one file at a
time and summarise at the end, because mixing approval questions from different files
makes it impossible to tell what you are agreeing to. If more than about five files
match, list them and confirm before starting.

## Show the diff honestly

The author wants to see exactly what the review changed — and he often runs this on copy
he has already been editing, so his own uncommitted work is sitting in the same file.

Before editing, copy the file to the scratchpad. After editing, show `diff -u <snapshot>
<file>`. That isolates the review's changes from his, and it works no matter what state
git is in. Don't ask for a clean working tree; that would mean refusing to review a draft
in progress, which is when review is most useful.

## Two kinds of finding

**Mechanical — apply directly.** Things that are wrong by a rule someone else wrote down:

- misspellings and typos
- doubled words and doubled prepositions ("Inspiration from this came from")
- a missing comma before a direct address ("you're getting there, champ")
- hyphenation of compound modifiers
- punctuation placement around quotation marks
- subject–verb agreement
- broken Markdown link syntax, missing image alt text
- house style: American English

**Voice — always ask.** Things that are only "wrong" if you assume the author meant
something more conventional:

- invented words, interjections and onomatopoeia ("weehoo", "woo-hoo")
- slang and playful coinages ("man-baby")
- deliberate repetition and anaphora
- sentence fragments used for rhythm
- register choices (`who` where a grammarian wants `whom`)
- word choices that are regional rather than wrong (`dreamt` for `dreamed`)
- emoji, and Swedishisms that look intentional

The boundary is not about severity. `who` for `whom` is a real grammatical point and it
still belongs in the voice bucket, because enforcing it would make a casual sentence
sound starched. Ask yourself whether a reader would hear the change. If they would, ask
first.

## Leave these alone

- **Wording inside quoted speech.** Fix the punctuation around a quote; never edit what
  the person said. The author is quoting himself, often imperfectly, on purpose.
- **Anaphoric patterns.** This site has a post built entirely out of lines starting "And
  then I…". That is the form of the piece, not forty instances of a weak sentence opener.
- **`title` and `description` in frontmatter.** These are published in feeds and search
  results. Propose, don't apply.
- **Bare URLs on their own line.** The YouTube embed plugin depends on them. Rewrapping
  one as a Markdown link silently removes a video from the page.
- **Trailing backslashes** at end of line. They are Markdown hard line breaks and carry
  the visual rhythm of list-like posts.
- **Straight quotes and apostrophes in markdown prose.** `typographer` is enabled, so the
  build renders them curly. Editing them in the source is churn that changes nothing in
  the output. The exceptions are the two strings markdown never sees — `title` and
  `description` front matter, and `aiFeedback` `before`/`after` — where a straight quote
  does survive to the page and *is* a mechanical fix.
- **Code blocks and link targets.**

## Every finding needs a source

The author's standard: *you can't blindly trust an AI*. A correction he can't verify is
worth less than no correction, because it costs him the time to check it anyway.

So name an authority and state the rule in words. Merriam-Webster, the Chicago Manual of
Style, the AP Stylebook, Garner's Modern English Usage, or precedent elsewhere on this
site all work.

**Don't cite section numbers.** An earlier attempt at this feature cited "Chicago Manual
of Style (1.65: Direct Address)" — chapter 1 is about manuscript preparation; punctuation
is chapter 6. A fabricated citation is worse than a vague one, because it looks checkable
and isn't. Write "Chicago Manual of Style — a comma precedes a direct address" and let
him look it up. Cite a number only if you actually verified it.

If you can't name an authority, the finding isn't mechanical by definition. Move it to the
voice bucket and let him decide, or drop it.

## Steps

1. **Resolve the target.** List the files. Confirm if there are more than about five.
2. **Snapshot** the file to the scratchpad.
3. **Read the whole file** before editing. Mechanical findings in prose are often
   ambiguous until you see the sentence's neighbours.
4. **Apply the mechanical fixes** with Edit.
5. **Show the diff** against the snapshot.
6. **Ask about the voice findings** with AskUserQuestion — at most four per round, since
   that's the tool's limit. Give each one its own question with the sentence as context,
   and options along the lines of *Keep mine* / *Use the suggestion*, adding a third
   wording when there's a genuine middle option. Apply what he accepts.
7. **Record what was applied** in the frontmatter, in English (see below).
8. **Report what he declined** in the chat and nowhere else.

Talk to the author in whatever language he's writing in. Everything written into a file
stays in English, because the site and this skill are public.

## Recording applied changes

Applied changes go in the file's own frontmatter. The post page renders them as a
transparency note, and `/copy-feedback/` builds a lesson index from them across the site.

```yaml
aiFeedback:
  reviewed: 2026-11-15
  model: "Claude Opus 5"
  changes:
    - rule: comma-before-direct-address
      category: punctuation
      before: 'I said to myself "wee hoo you are getting there champ."'
      after: 'I said to myself, "weehoo, you''re getting there, champ."'
      why: "A comma precedes a direct address, and in American English the period belongs inside the closing quotation mark."
      source: "Chicago Manual of Style — commas with direct address; punctuation inside quotation marks"
```

- `rule` is a kebab-case identity for the *kind* of error, not this instance. Reuse the
  same slug when the same rule applies again — the index groups on it and shows one
  example per rule, so a slug invented fresh each time turns the index back into a log.
- `category` is one of `spelling`, `punctuation`, `grammar`, `style`, `voice`.
- `before` and `after` are short — the phrase, not the paragraph — and they must be
  the *same* phrase, differing only by the correction. The page renders them as a
  single line with just the changed part marked, which it can only do if the
  surrounding words line up. `before: 'man baby'` / `after: 'a man-baby'` would mark
  the stray `a` as part of the fix.

  Check the rendered diff, not just the YAML. If the two share almost no words the line
  comes out shredded — `<del>my</del><ins>how</ins> <del>AI</del><ins>I</ins>
  <del>usage</del><ins>use AI</ins>` — which is noise, not a lesson. That is the signal
  that what happened was a rewrite rather than a correction. Don't widen the phrase until
  it lines up and don't publish an `after` that isn't on the page: drop the entry and
  tell him in chat why it isn't recorded.
- `reviewed` is written unquoted so Eleventy parses it as a date.
- A `voice` entry appears here only if he accepted it. Declined suggestions are never
  written to a file; the whole point is that visitors see what changed, not what was
  proposed and refused.

`_data/eleventyDataSchema.js` validates this shape and the build fails if `source`, `why`
or `rule` is missing. That's deliberate: the citation rule is enforced by the build rather
than by good intentions.

## After the review

Mention that `npm start` will show the rendered note, and that the build will reject a
malformed entry. Don't commit anything — the author reviews the diff and commits himself.
