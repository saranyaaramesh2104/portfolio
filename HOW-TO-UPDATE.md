# Your website — how to put it online and change it later

Hi Saranyaa! This is your portfolio, rebuilt as a real website. You never need
to use a terminal or install anything. Everything below happens in a browser.

There are three parts:

1. [Putting it online](#part-1--put-it-online) — about 10 minutes, once
2. [Changing text and images later](#part-2--change-things-later)
3. [The list of things still to do](#part-3--what-still-needs-you)

---

## Part 1 — Put it online

### Step 1. Make a GitHub account

Go to [github.com/signup](https://github.com/signup) and sign up. Pick your
username carefully, because it becomes part of your web address. Something like
`saranyaaramesh` is ideal.

Free is all you need.

### Step 2. Make a place for the site to live

1. Click the **+** in the top-right of GitHub, then **New repository**.
2. Name it exactly `portfolio` (all lowercase).
3. Leave it set to **Public**. It has to be public for the site to work.
4. Do not tick "Add a README file".
5. Click **Create repository**.

### Step 3. Upload the files

On the page that appears, click the link that says
**uploading an existing file**.

Now open the `saranyaa-portfolio` folder on your computer. Select everything
*inside* it — `index.html`, the `assets` folder, and the rest — and drag it all
into the browser window.

> Important: drag the *contents* of the folder, not the folder itself.
> `index.html` has to end up at the top level, or the site will not load.

Wait for the uploads to finish, then click **Commit changes** at the bottom.

### Step 4. Switch the website on

1. In your repository, click **Settings** (the tab along the top).
2. In the left sidebar, click **Pages**.
3. Under "Branch", change `None` to `main`, leave the folder as `/ (root)`, and
   click **Save**.

Wait two or three minutes, then visit:

```
https://YOUR-USERNAME.github.io/portfolio/
```

That is your website. It is live, it is yours, and it costs nothing.

### Step 5. One small fix once you know the address

Open `index.html` (see Part 2 for how) and use your browser's find function to
look for `USERNAME`. It appears five times near the top. Replace each one with
your actual GitHub username.

This is what makes your photo and your name show up when you paste the link
into LinkedIn, Instagram, or WhatsApp. Worth doing — right now your Notion link
shows Notion's logo and Notion's marketing text instead of yours, which is
exactly the problem we were fixing.

---

## Part 2 — Change things later

### Editing text

1. Go to your repository on GitHub.
2. Click `index.html`.
3. Click the **pencil icon** near the top right.
4. Find the words you want to change and type over them.
5. Scroll down, click **Commit changes**.

Your site updates itself about a minute later.

The file has comment blocks that look like this to help you find your way:

```html
<!-- ── Writing & Marketing ─────────────────────────────── -->
```

Two rules and you cannot really break anything:

- Only change words that appear *between* `>` and `<`. In
  `<h3>Landing pages</h3>` you can safely rewrite `Landing pages`.
- Leave anything inside angle brackets alone.

If something does go wrong, GitHub keeps every previous version. Click the
**History** button on the file and you can restore an earlier one.

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

## Part 3 — What still needs you

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

### 2. Add your LinkedIn link

Search `index.html` for `YOUR-LINKEDIN-HERE` and paste your profile address over
it. I could not recover this one from Notion — the link was stored in a way the
public page does not expose.

I did find the others, so these are already in and working:

| | |
|---|---|
| Email | saranyaar2104@gmail.com |
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

The current one is the selfie from your Notion page. It is warm and it works. If
you have something you like more, save it as `assets/home-1.jpg` and it will
swap straight in.

---

## What is in the folder

| File | What it is |
|---|---|
| `index.html` | The whole site — all your words and page structure |
| `assets/styles.css` | Colours, fonts, spacing |
| `assets/app.js` | Dark mode, accessibility menu, image zoom, page switching, movement |
| `assets/shape-*.svg` | The circle, asterisk and rays, redrawn from your own artwork |
| `assets/*.jpg`, `*.png`, `*.pdf` | Your images and documents, copied out of Notion |
| `content.json` | A record of what was pulled from Notion. Not used by the site |
| `tools/export_notion.py` | The script that did the copying. Already run; kept for reference |
| `.nojekyll` | Tells GitHub to publish the files exactly as they are |

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
- **Things move a little.** The word strip scrolls, the shapes drift as you
  scroll, and the work cards lean toward your cursor. All of it switches off if
  a visitor has "reduce motion" set on their phone or laptop, or ticks Reduce
  motion in the accessibility menu.
- **The contact form** opens the visitor's own email app with the message
  already written. Nothing is sent to a server, so there is nothing to maintain
  and no inbox to check but your own.
- **Your case studies are readable by Google.** They are written into the page
  itself rather than drawn in by a script, which is the thing your Notion site
  could not do.
