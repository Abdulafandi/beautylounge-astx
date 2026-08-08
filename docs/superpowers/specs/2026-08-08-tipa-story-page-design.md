# Tipa Wellness — "Who we are" section + story subpage

Date: 2026-08-08
Status: shell built and pushed; awaiting the owner's answers for final copy

## Goal

Give Tipa Wellness a place to explain who the business is and where it came from:
a short beat on the one-pager with a "Read our story" button, and a subpage that
goes deeper.

## Decisions

- **Placement (client-chosen):** the teaser sits between *How it's made* and
  *On the record*. Narrative: what's in it → how it's brewed → who brews it →
  officially verified → order.
- **Subpage:** `story.html`, flat at the repo root (workspace rule: never
  restructure the active demo into subfolders).
- **Concept:** the history is told as **ledger entries**, extending the site's
  "Brew House Ledger" language (batch stamps, mono labels, dotted rules) rather
  than as a generic about-page timeline. Each entry has a mono tag column
  (THE HOUSE, THE RECIPE, …), a date slot, a Young Serif headline, and body copy.
- **No entry numbering.** The design brief bans 01/02/03 markers outside the true
  brew sequence, so entries are tagged by name, not numbered.
- **Nothing invented.** The business's real history is unknown, so unverified
  facts are visible placeholders rather than plausible-sounding filler. This
  follows the standing rule against fake content on this site.

## Structure

**Homepage teaser** (`#story`, ink)
- Left: kicker, H2 "The house behind the gallon.", two verified paragraphs, a
  marked placeholder for the owner's story, and a `Read our story →` button
  (outlined, so Order stays the page's primary action).
- Right: `.house-card` — the business's own ledger card in batch-ticket
  vocabulary (cream, turmeric top rule, mono rows, dotted rules), holding both
  verified facts and the two "to confirm" slots.

**`story.html`**
1. Page head (ink): back-link, H1 "The people behind Tasiaeafe.", lead, and their
   real expo banner (`assets/expo-banner.webp`, cropped from `fb-expo-banner.jpg`).
2. The ledger (paper): seven entries — the house, the recipe, the name, the jugs,
   the expos, the record, what's next.
3. Order CTA (amber) — reuses the existing `.order-sec` component.
4. Footer — identical markup to the homepage, so the two pages stay coherent.

## Shared-asset refactor

A second page made the inline `<style>`/`<script>` in `index.html` a liability, so:
- All CSS moved to **`site.css`**, linked by both pages (extracted programmatically,
  byte-exact).
- The shared scroll-reveal code moved to **`site.js`**. The ingredient spotlight is
  page-specific and stays inline in `index.html`.
- Verified by pixel-diffing the homepage before and after the move: 0 differing
  pixels at both 1440×4423 and 390×7965.

## Content still owed by the owner

Every item below is a marked placeholder in the built pages.

| Where | Slot |
|---|---|
| Homepage card | FIRST BATCH — year |
| Homepage card | BREWED BY — names |
| Homepage teaser | why they started brewing, and who for |
| Entry: the house | year |
| Entry: the recipe | year + where the recipe came from |
| Entry: the name | year + what "Tasiaeafe" means, who chose it |
| Entry: the jugs | year |
| Entry: the expos | first expo date |
| Entry: the record | DOH permit date |
| Entry: what's next | the plan ahead |

Questions sent to the owner: founder name(s) and role; first-brew year and
registration year; why it started; recipe origin; meaning of "Tasiaeafe"; who is
involved now; milestone dates (first expo, DOH permit, SROS testing, move to
gallon jugs); what's next; and **photos** — the family, the brew house, early
days, or the permit certificate.

Photo note: the only existing photography is four 315×315 Facebook rips, which is
why the story page leans on type and ledger structure. If better photos arrive,
each ledger entry can host one without a layout change.

## Verified facts used (safe to keep)

Small-batch hand brewing in Petesa Tai, Pago Pago · nine label ingredients ·
pasteurized, gallon jugs, hand-stamped batch and best-by dates · Alofau SDA Health
Expo and Fagaitua High School gym · DOH permit and SROS verification · the stated
mission and the "Natural. Effective. Trusted." line · no medical claims, and the
"keep your doctor in the loop" note stays on both pages.

## Verification performed

27 automated checks across both pages, all passing: HTTP 200, no console or page
errors, no failed requests, stylesheet applied, reveals firing, every internal link
and in-page anchor resolving, header nav clear of the call button at 1440/1200/1100/
1000/980px, and the ingredient hover still lighting exactly one card (and clearing
on mouse-out) after the JS split. Plus visual review at 1440px and 390px.
