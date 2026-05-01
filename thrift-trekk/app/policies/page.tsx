import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const SECTIONS = [
  {
    n: '01',
    t: 'Shipping',
    items: [
      { k: 'Order processing', v: 'Orders ship within 2–3 business days. You\'ll get a confirmation with tracking once it goes out.' },
      { k: 'Delivery timeline', v: 'Standard delivery is 5–7 business days. Express options exist in select metros.' },
      { k: 'Free shipping', v: 'Free on orders above ₹1499. Below that, flat ₹99.' },
      { k: 'Tracking', v: 'You get a live tracking link via email + SMS.' },
      { k: 'Issues?', v: 'If your package is delayed, hit us up on WhatsApp or email and we\'ll sort it.' },
    ],
  },
  {
    n: '02',
    t: 'Returns & Exchanges',
    items: [
      { k: '30-day window', v: 'Hassle-free returns within 30 days. Item must be unworn, unwashed, tags intact.' },
      { k: 'How to return', v: 'WhatsApp us your order number + reason. We\'ll send a return label and instructions.' },
      { k: 'Refunds', v: 'Processed within 5–7 business days after we get the return.' },
      { k: 'Exchanges', v: 'Free size/color exchanges within 30 days. No drama.' },
      { k: 'Not eligible', v: 'Worn, washed, or damaged items aren\'t returnable.' },
    ],
  },
  {
    n: '03',
    t: 'Privacy',
    items: [
      { k: 'What we collect', v: 'Name, email, phone, address — only what we need to ship orders and chat with you.' },
      { k: 'Security', v: 'Industry-standard encryption. We don\'t sell your data. Ever.' },
      { k: 'Cookies', v: 'We use them to make the site work better. You can disable them in your browser.' },
      { k: 'Newsletter', v: 'Subscriber-only drops and updates. Unsubscribe in 1 click.' },
    ],
  },
  {
    n: '04',
    t: 'Terms',
    items: [
      { k: 'Use license', v: 'Personal, non-commercial use only. Don\'t republish our stuff.' },
      { k: 'Product info', v: 'We aim for accuracy but reserve the right to fix errors.' },
      { k: 'Pricing', v: 'Subject to change. We may limit quantities or cancel orders if needed.' },
      { k: 'IP', v: 'All content belongs to THRIFT TREKK — copyright protected.' },
      { k: 'Governing law', v: 'Indian law applies. Disputes resolved in appropriate courts.' },
    ],
  },
]

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12 md:pb-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-primary" />
            The fine print
          </p>
          <h1 className="text-huge font-display leading-[0.9]">
            Policies, <span className="text-primary italic">no fluff.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-6 max-w-xl leading-snug">
            Plain-English rules. If anything is unclear, hit us up — we&apos;d rather chat
            than hide behind legalese.
          </p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="space-y-16 md:space-y-24">
          {SECTIONS.map((s) => (
            <section key={s.n} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-3">
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-2">
                  / {s.n}
                </p>
                <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight leading-none">
                  {s.t}
                </h2>
              </div>
              <div className="md:col-span-8 md:col-start-5 space-y-px bg-border border border-border">
                {s.items.map((it) => (
                  <div key={it.k} className="bg-background p-5 md:p-6">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                      {it.k}
                    </p>
                    <p className="text-base md:text-lg text-foreground/85 leading-snug text-pretty">
                      {it.v}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
