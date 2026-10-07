# Your website — how to change it

Hi Saranyaa! Your portfolio is live at
**https://saranyaaramesh2104.github.io/portfolio/**

You never need a terminal or any installs. Everything below happens in a browser.

There are two parts:

1. [Changing text and images](#part-1--change-things)
2. [The list of things still to do](#part-2--what-still-needs-you)

---

## Already set up

You do not need to do any of this again, it is just here so you know how it
works:

- The files live in your GitHub repository called **portfolio**.
- GitHub Pages is switched on, serving from the `main` branch at the root. You
  can see the setting under **Settings → Pages**.
- Every time you commit a change, the site rebuilds itself and goes live about a
  minute later. There is no publish button.
- It is free, with no bandwidth limit you are realistically going to hit, and no
  badge or branding on your site.

---

## Part 1 — Change things

### Editing text

1. Go to your `portfolio` repository on GitHub.
2. Click `index.html`.
3. Click the **pencil icon** near the top right.
4. Find the words you want to change and type over them.
5. Scroll down, click **Commit changes**.

Your site updates itself about a minute later.

The file has comment blocks that look like this to help you find your way:

```html
<!-- ── Other work ───────────────────────────────────────── -->
```

Two rules and you cannot really break anything:

- Only change words that appear *between* `>` and `<`. In
  `<h3>Mental health app</h3>` you can safely rewrite `Mental health app`.
- Leave anything inside angle brackets alone.

If something does go wrong, GitHub keeps every previous version. Click the
**History** button on the file and you can restore an earlier one.

### How much text fits

Most of the site simply reflows, so there is no limit you can "break" — longer
writing just takes more lines. Only a few slots are genuinely tight, because the
type is very large.

I measured all of these on a 360-pixel-wide phone, which is the narrowest screen
worth designing for. If it fits there, it fits everywhere.

**The three that actually break.** Go over these and the text drops onto an
extra line and the layout looks lopsided:

| Slot | Keep it under | Example |
|---|---|---|
| Big heading, first line | 14 characters | `Selected`, `Off the` |
| Big heading, second line | 9 characters | `Work`, `& Social` |
| The big numbers in the stats strip | 7 characters | `3,000+`, `64.7K` |

Those two-part headings are the giant ones like **Selected / Work**. Wide
capitals eat more room than narrow ones, so `& Identity` fits at ten characters
while `Case Study` does not. When in doubt, go shorter — one word per line is
what the design is built around.

**Worth staying on one line.** These will wrap rather than break, and a second
line is not a disaster. But they read best short:

| Slot | One line if under |
|---|---|
| Work card title (`Morphic`, `Headout`) | 28 characters |
| Box heading (`Anya’s Newsletter`) | 30 characters |
| Heading inside a case study | 28 characters |
| Link title (`College newsletter`) | 34 characters |
| Link description (`2024 edition — PDF`) | 44 characters |
| Image caption | 38 characters |

**Paragraphs have no limit at all.** Write what the work needs. The only real
constraint is attention, so as a rough guide:

| Where | Comfortable length |
|---|---|
| The two intro paragraphs on the front page | 200–300 characters each, roughly 35–50 words |
| The short intro under a section heading | up to about 350 characters |
| A paragraph inside a case study | up to about 400 characters, then start a new one |
| The text beside a featured project | about 150 characters — that column is narrow |

Two or three short paragraphs always beat one long one. The text column is
capped at a comfortable reading width on purpose, so it will never stretch into
those very long lines that are hard to follow.

**One thing to know.** On a phone, `Case Study` is a hair too long and drops
onto a second line on each case study page. It is not broken, just slightly less
tidy than the others.

### Adding a box

Two places on the site use the same box: **Off the clock** and **What I can
do for you**. Learn it once and both work the same way. (Other work is a list
rather than boxes; see "Adding a row to Other work" below.)

To add one, copy a whole block from `<a class="tile"` down to `</a>` and change
the words:

```html
<a class="tile" href="https://wherever-it-lives.com" target="_blank" rel="noopener">
  <p class="tile-kicker">Category</p>
  <h3>Name of the thing</h3>
  <p>One or two sentences on what it was and what you did.</p>
  <span class="tile-go">Open →</span>
</a>
```

If there is nowhere to send people, use `<article class="tile">` and `</article>`
instead of `<a ...>` and `</a>`, and delete the `tile-go` line. A box that looks
clickable but goes nowhere is worse than one that doesn't.

### Adding a row to Other work

Other work is a slim list. On a computer, hovering a row shows its picture next
to the cursor; on a phone each row shows a small thumbnail. Copy a whole row
from `<li>` down to `</li>` and change the link, the picture (it appears twice:
in `data-preview` and in the `<img>`), and the words:

```html
<li>
  <a class="wi-row" href="https://wherever-it-lives.com" target="_blank" rel="noopener" data-preview="assets/your-picture.jpg">
    <img class="wi-thumb" src="assets/your-picture.jpg" loading="lazy" alt="What the picture shows.">
    <span class="wi-kicker">Category</span>
    <span class="wi-title">Name of the thing</span>
    <span class="wi-line">One or two sentences on what it was and what you did.</span>
    <span class="wi-go"><span class="visually-hidden">Where the link goes</span><span aria-hidden="true">→</span></span>
  </a>
</li>
```

Nowhere to send people? Copy the **Peer support server** row instead: it uses
`<div class="wi-row" ...>` and has no arrow.

The boxes arrange themselves. Two, three, five — they will lay out sensibly on
every screen, so you never need to touch the layout.

**One section is switched off right now.** *What I can do for you* is on the
site but invisible, so nobody sees empty boxes while you are still writing it.
When it is ready, find its line and delete the single word `hidden`:

```html
<section class="section section--hair reveal" id="services" hidden>
```

becomes

```html
<section class="section section--hair reveal" id="services">
```

That one word is the whole switch.

### Adding a new image

1. Open the `assets` folder in your repository.
2. Click **Add file** → **Upload files** and drag your image in.
3. Commit.
4. Edit `index.html` and copy an existing image block, changing the filename
   and the description:

```html
<figure>
  <img class="shot shot--cover" src="assets/YOUR-NEW-FILE.jpg" loading="lazy"
       alt="Short description of what is in the picture.">
  <figcaption>Caption shown under the image</figcaption>
</figure>
```

Always write the `alt` text. It is what screen readers read out, and it is also
what Google reads — you of all people will appreciate that.

Keep images under about 500 KB so pages stay quick.

### Getting a proper web address (optional, later)

`yourname.github.io/portfolio` is perfectly respectable. But a domain like
`saranyaaramesh.com` costs roughly ₹1,000 a year and looks considerably better
in an email signature. GitHub Pages supports it for free — the hosting stays
free, you are only paying the domain registrar. When you want to do it, there is
a **Custom domain** box on the same Settings → Pages screen.

---

## Part 2 — What still needs you

Ordered by how much difference it makes.

### 1. Write the three empty case studies

This is the big one. In your Notion page, **Headout**, **YAAS Media**, and
**Decoding Draupadi** had only a one-line tagline each — no actual content.
Only **Morphic** was written up.

I have built all four pages and put a dashed box inside each empty section
telling you exactly what to write. Once you have written a section, delete the
dashed `<div class="todo">...</div>` block and your words take its place.

**Headout first.** You already have the Grévin and Agafay landing pages plus a
Google screenshot showing your page ranking above Viator. That is a
before-and-after with a measurable result, which is the most persuasive thing in
the whole portfolio. It just needs the story around it.

**YAAS Media** has no content *and* no images. Either write it up or delete its
card from the Selected work section for now. An empty page reads worse than a
missing one.

### 2. Check your LinkedIn link actually goes to you

It is now set to `linkedin.com/in/saranyaaramesh`. I cannot verify that from
here — LinkedIn blocks automated checks — so please click it on the live site
while you are signed in and confirm it lands on your profile. If your profile
address is different, search `index.html` for `saranyaaramesh` and you will find
it in two places: the link itself and the small grey label under it. Change both.

Your other links are all in and working:

| | |
|---|---|
| Email | saranyaar2104@gmail.com |
| LinkedIn | in/saranyaaramesh |
| Twitter | @holasaranyahere |
| Instagram | @helloitsmeanyaaa |
| Photography | @throughanyaslens |
| Letterboxd | anya_2104 |

### 3. Make the wording yours

Three bits of copy are mine rather than yours, and you will write them better:

- The small red line above your name, currently **Writer & Creative Strategist**.
  Search `class="eyebrow"` to find it.
- The scrolling strip of words under the hero — Content, Brand, Social, Growth,
  SEO, Storytelling and so on. Search `marquee-track`. Whatever you change, put
  the same words in **both** copies of the list; the strip loops by running two
  identical lists back to back.
- The three floating labels on your photo: **Content · Brand**,
  **Psychology-trained**, **@holasaranyahere**. Search `class="tag`.

### 4. Replace the hero photo, if you want

The current one is your lavender-eyeshadow selfie, saved as `assets/home-profile.jpg`.
To change it, save a new portrait over that file. Keep it under about 250 KB (roughly
800px wide is plenty) so the page stays quick; the frame crops it to a 4:5 arch.

---

## What is in the folder

| File | What it is |
|---|---|
| `index.html` | The whole site — all your words and page structure |
| `assets/styles.css` | Colours, fonts, spacing |
| `assets/app.js` | Dark mode, accessibility menu, image zoom, page switching, movement |
| `assets/shape-*.svg` | The circle, asterisk and rays, redrawn from your own artwork |
| `assets/og-card.jpg` | The picture that shows up when someone shares your link. See the note below |
| `assets/*.jpg`, `*.png`, `*.pdf` | Your images and documents, copied out of Notion |
| `404.html` | What someone sees if they mistype a web address |
| `content.json` | A record of what was pulled from Notion. Not used by the site |
| `tools/export_notion.py` | The script that did the copying. Already run; kept for reference |
| `README.md` | A short note for anyone who finds the code |
| `.nojekyll` | Tells GitHub to publish the files exactly as they are |

### About the sharing picture

When you paste your link into WhatsApp, LinkedIn or a message, the preview card
that appears comes from `assets/og-card.jpg`. It is a **picture**, not live text,
so it does not update itself — it has your name and the "I write things, make
things" line baked in.

That only matters if you change your tagline and want the card to match. If you
do, tell me and I will regenerate it. Everything else about the site updates on
its own, so this is the one exception worth remembering.

## A few things the site does that are easy to miss

- **Dark and light mode.** The button in the top right. It remembers the choice,
  and it follows the visitor's system setting by default.
- **An accessibility menu.** Bottom-right corner. Text size, high contrast, a
  dyslexia-friendly font, wider letter spacing, highlighted links, reduced
  motion, and a large cursor. Worth knowing it is there, because very few
  portfolios have one and it is a genuinely nice thing to be asked about.
- **Click any image** to see it full size.
- **The page alternates cream and dark spreads** like a magazine, and it flips
  the other way round in dark mode, so both versions have contrast and rhythm.
- **The shapes are yours.** The quartered circle, the ten-petal asterisk and the
  radiating lines are redrawn from your Decoding Draupadi posts, in the exact
  reds and creams sampled out of those files. So is the site's whole palette.
- **So is the logo.** The mark next to your name in the top left is your own
  ten-petal asterisk, not a typed character, and it turns slowly when someone
  hovers over it. "Saranyaa" is set in the serif and "RAMESH" in the wide face,
  which is the same split as the big hero name, just small.
- **Things move a little.** The word strip scrolls, the shapes drift as you
  scroll, and the big feature card leans toward your cursor. Beyond that:
  sections fade up as you reach them with their contents arriving one after
  another rather than all at once, a soft light follows the cursor on desktop,
  hovering one launch tile pushes the others back slightly, and your name
  arrives in two beats when the page loads. All of it switches off if a visitor
  has "reduce motion" set on their phone or laptop, or ticks Reduce motion in
  the accessibility menu.
- **Your name waits for the fonts before it animates.** Worth knowing because
  it looks like a bug if you do not expect it: on a slow connection the name
  appears a moment after everything else. That is deliberate. The entrance used
  to play while the browser was still loading the proper typefaces, so most of
  it was spent animating a substitute font nobody ends up seeing.
- **The contact form** opens the visitor's own email app with the message
  already written. Nothing is sent to a server, so there is nothing to maintain
  and no inbox to check but your own.
- **Your case studies are readable by Google.** They are written into the page
  itself rather than drawn in by a script, which is the thing your Notion site
  could not do.
