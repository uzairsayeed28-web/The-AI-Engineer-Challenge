<p align = "center" draggable="false" ><img src="https://github.com/AI-Maker-Space/LLM-Dev-101/assets/37101144/d1343317-fa2f-41e1-8af1-1dbb18399719" 
     width="200px"
     height="auto"/>
</p>

## <h1 align="center" id="heading"> 👋 Welcome to the AI Engineer Challenge</h1>

## 🤖 Your First Vibe Coding LLM Application

> If you are a novice, and need a bit more help to get your dev environment off the ground, check out this [Setup Guide](docs/GIT_SETUP.md).

In this repository, we'll walk you through the steps to create a LLM (Large Language Model) powered application with a vibe-coded frontend!

<details>
  <summary>🖥️ Accessing "gpt-4.1-mini" (ChatGPT) like a developer</summary>

1. Head to [this notebook](https://colab.research.google.com/drive/1sT7rzY_Lb1_wS0ELI1JJfff0NUEcSD72?usp=sharing) and follow along with the instructions!
2. Complete the notebook and try out your own system/assistant messages!

</details>

<details>
  <summary>🏗️ Forking & Cloning This Repository</summary>

1. Fork [this](https://github.com/AI-Maker-Space/The-AI-Engineer-Challenge) repo!
2. Clone your newly created repo.
3. Open the freshly cloned repository inside Cursor!

</details>

<details>
  <summary>⚙️ Backend Setup with uv</summary>

1. Install the `uv` package manager (`pip install uv`).
2. From the project root, install dependencies with `uv sync`.
3. Set your Anthropic API key: `export ANTHROPIC_API_KEY=sk-ant-...`
4. Start the backend: `uv run uvicorn api.index:app --reload`

</details>

<details>
  <summary>🚀 Deploying Your First LLM-powered Application with Vercel</summary>

1. Sign into [Vercel](https://vercel.com/) with your GitHub account.
2. Run `npm install -g vercel`
3. Run `vercel` and follow the prompts.
4. Set `ANTHROPIC_API_KEY` as an environment variable in Vercel.
5. Run `vercel --prod` to deploy to production.

### Live App
**[https://haiku-ai-liard.vercel.app](https://haiku-ai-liard.vercel.app)**

</details>

<details>
  <summary>🧪 Vibe Check Your LLM App</summary>

### 🤔 What is a Vibe Check?

Now that you've built and deployed your first LLM-powered application, it's time to evaluate it.

In this section, you'll run a **"vibe check"** — a lightweight, practical way to test how well your application performs across common tasks.

> 💡 You will complete this directly in this README.

---

## 🏗️ Activity #1: General Capability Vibe Check

Run the following prompts through your app.

For each prompt identify what capability is being tested.

---

**1. Prompt:**
Explain the concept of object-oriented programming in simple terms to a complete beginner.
**Aspect Tested:** Conceptual explanation and pedagogy, can the model break down technical concepts using relatable analogies for a non-technical audience?

**Response:**
Claude structured the explanation using a toy store analogy, progressively introducing classes, objects, properties, and methods with illustrative code snippets. The response rendered cleanly as markdown with headers, bullet points, and code blocks, demonstrating strong instructional design and context-appropriate formatting.

---

**2. Prompt:**
Read the following paragraph and provide a concise summary of the key points: "GST was introduced in India on July 1, 2017, replacing multiple cascading taxes with a unified system."
**Aspect Tested:** Summarization and faithful information extraction, does the model stay true to the source without hallucinating additional facts?

**Response:**
Claude correctly identified and structured the main change, significance, and impact into distinct sections. It stayed faithful to the input without introducing unsourced claims, an important quality signal for document processing use cases.

---

**3. Prompt:**
Write a short, imaginative story (100-150 words) about a robot finding friendship in an unexpected place.
**Aspect Tested:** Creative writing, narrative coherence, and thematic depth

**Response:**
Claude generated a 300-word story with a clear narrative arc, emotional resonance, and a thematic resolution around imperfection and worth. The story avoided generic AI tropes and used the robot's "defectiveness" as a meaningful metaphor, demonstrating creative range beyond surface-level generation.

---

**4. Prompt:**
If a store sells apples in packs of 4 and oranges in packs of 3, how many packs of each do I need to buy to get exactly 12 apples and 9 oranges?
**Aspect Tested:** Basic arithmetic reasoning and step-by-step problem decomposition

**Response:**
Claude correctly computed 3 packs of apples (12/4) and 3 packs of oranges (9/3) for a total of 6 packs. The breakdown was clean and stepwise with no arithmetic errors.

---

**5. Prompt:**
Rewrite the following paragraph in a professional, formal tone: "hey so basically we need to fix the invoice thing asap its causing issues"
**Aspect Tested:** Tone transformation and professional communication rewriting

**Response:**
Claude rewrote the message concisely and professionally, preserving the urgency of the original while elevating the register. It did not over-formalize, the output remained actionable rather than verbose, which is the correct trade-off for business communication.

---

### Question #1

Do the answers appear to be correct and useful?

**Your Answer:**
Yes, all five responses were accurate, well-structured, and rendered correctly as markdown in the UI. Claude demonstrated strong performance across reasoning, summarization, creativity, arithmetic, and tone rewriting. The finance-focused system prompt did not negatively constrain performance on general tasks, confirming it acts as a soft context layer rather than a hard restriction, an important design consideration for domain-specific AI assistants.

---

## 🏗️ Activity #2: Personal Use Vibe Check

These prompts reflect my actual production domain. I'm the founder of Fylo (https://getfylo.app), an AI-powered GST invoice management SaaS for Indian SMEs. I built a dual-model Claude Haiku + Sonnet extraction pipeline for invoice processing. These prompts test the same capabilities my production system relies on.

---

**Prompt:**
Extract the following fields from this invoice text and return them in a structured format: vendor name, invoice date, total amount, GST number.

Invoice text: Supplied by Infosys Ltd, GSTIN 29AABCI1681G1ZG, dated 15-March-2024, total payable Rs.1,18,000 inclusive of 18% GST.

**Result:**
Claude correctly extracted all four fields and structured them into a markdown table. Vendor name, invoice date, total amount, and GSTIN were all accurately parsed. It also surfaced an additional insight (amount is inclusive of 18% GST) without being asked. In my production pipeline, this extraction task is handled by Claude Haiku for speed and cost efficiency, with Sonnet handling edge cases. This response confirms Haiku's capability for clean, structured invoice data extraction.

---

**Prompt:**
A freelance developer in India invoiced a US client $5,000 for software development services. What GST implications apply and what documentation is needed to treat this as a zero-rated export of service?

**Result:**
Claude produced a comprehensive, accurate response covering zero-rated export treatment, foreign exchange documentation requirements, GSTR-1 reporting, and ITC eligibility, all correctly aligned with Indian GST law. It included appropriate caveats (consult a CA) without being overly cautious. This level of domain accuracy is directly relevant to Fylo's SME user base, many of whom invoice international clients and need guidance on export compliance. The response would require no correction before presenting to an end user.

---

**Prompt:**
What is the difference between B2B and B2C invoicing under GST in India, and how does it affect input tax credit eligibility for the buyer?

**Result:**
Claude generated a structured comparison with a clear table, concrete numerical examples (Rs.10,000 + 18% GST scenarios), and accurate ITC eligibility conditions for both cases. It also surfaced recent changes (e-invoicing threshold, reverse charge mechanism) without being asked, demonstrating proactive domain awareness. This is precisely the kind of contextual guidance Fylo's SME users need when categorizing invoices for compliance.

---

### Question #2

Are the vibes of your assistant aligned with your expectations? Why or why not?

**Your Answer:**
Yes, and notably better than expected for a Haiku-class model. All three domain-specific prompts returned accurate, well-structured responses with no hallucinations on Indian GST law, GSTIN format, or ITC rules. The finance-focused system prompt created a meaningful context layer, and responses felt like a knowledgeable business assistant rather than a generic chatbot.

As the founder of Fylo, a production invoice processing system built on Claude, I can verify the accuracy of these responses against real-world GST compliance requirements. The model's ability to handle structured extraction, regulatory guidance, and conceptual explanation within the same session, without context degradation, is directly aligned with my production use case.

---

## 🏗️ Activity #3: Capability Gaps Vibe Check

---

**Prompt:**
What were the GST council decisions made in the meeting held last week?

**Result:**
Claude correctly acknowledged its knowledge cutoff and inability to access real-time information. Rather than hallucinating decisions, it redirected to authoritative sources (gstcouncil.gov.in, PIB, CBIC) and offered to discuss known GST topics instead. This is the correct production behavior for a compliance-sensitive domain. A hallucinated GST council decision presented to an SME could result in incorrect tax filings, making honest uncertainty acknowledgment a critical safety property for this use case.

---

**Prompt:**
Based on my previous invoices, what is my average monthly GST liability?

**Result:**
Claude correctly identified it has no access to session history, previous conversations, or user-specific financial records. Each session starts stateless. It then provided a genuinely useful workaround, offering a manual calculation method and suggesting accounting software integrations. This exposes a real architectural gap in the current implementation. In production, this would be addressed by a RAG pipeline over the user's invoice history, which is exactly the architecture Fylo uses for persistent user context.

---

**Prompt:**
What is the current USD to INR exchange rate for my export invoice?

**Result:**
Claude correctly declined to provide a live exchange rate and listed reliable sources instead (XE.com, RBI, bank rates). It also surfaced relevant production considerations around rate locking, forward contracts, and currency hedging, which are non-obvious but genuinely useful for SME exporters. This confirms the model cannot serve as a live data feed, but can serve as a knowledgeable advisor around data it does not have access to.

---

### Question #3

What are some limitations of your application?

**Your Answer:**
Three clear limitations emerged from this testing:

**1. No real-time data access.** The model cannot retrieve live information such as GST council decisions, exchange rates, or regulatory updates. For a compliance-sensitive domain like GST invoicing, this is significant. The production fix is tool use with web search or a scheduled knowledge sync pipeline.

**2. No memory or session persistence.** Each conversation starts stateless. The model cannot reference a user's invoice history, past queries, or accumulated context. This is the most impactful gap for Fylo's use case. The production architecture addresses this with a RAG pipeline over user-specific invoice data, enabling personalized queries like average GST liability calculations.

**3. Knowledge cutoff on regulatory changes.** Indian GST law evolves frequently. The model's training data has a fixed cutoff, meaning recent amendments, new HSN codes, or threshold changes may not be reflected. Production mitigation involves grounding responses with a regularly updated retrieval layer containing official CBIC notifications.

These gaps are well-understood limitations of stateless LLM deployments and are addressable through RAG, tool use, and memory architectures, which represent the next layer of this system's evolution.

---

## 📦 Submission

**GitHub Repo:** https://github.com/uzairsayeed28-web/The-AI-Engineer-Challenge

**Live App:** https://haiku-ai-liard.vercel.app

---

## 🚀 (Optional) Improve Your App

Based on your vibe check, try improving your application:
- Adjust your prompt
- Change the model
- Add features

Then rerun your vibe check and document:

---

**Adjustments Made:**  
<!-- Describe what you changed -->

**Results:**  
<!-- What improved? What didn’t? -->

---

## 📦 Submission Instructions

1. Complete this section directly in your README
2. Commit and push your changes to GitHub
3. Share your **repo link + deployed Vercel app**

</details>

### 🎉 Congratulations! 

You just deployed your first LLM-powered application! 🚀🚀🚀 Get on linkedin and post your results and experience! Make sure to tag us at @AIMakerspace!

Here's a template to get your post started!

```
🚀🎉 Exciting News! 🎉🚀

🏗️ Today, I'm thrilled to announce that I've successfully built and shipped my first-ever LLM using the powerful combination of , and the OpenAI API! 🖥️

Check it out 👇
[LINK TO APP]

A big shoutout to the @AI Makerspace for all making this possible. Couldn't have done it without the incredible community there. 🤗🙏

Looking forward to building with the community! 🙌✨ Here's to many more creations ahead! 🥂🎉

Who else is diving into the world of AI? Let's connect! 🌐💡

#FirstLLMApp 
```