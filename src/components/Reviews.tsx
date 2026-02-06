const reviews = [
  {
    text: "The best cake I've ever had. The layers were perfect, and the flavors were out of this world. Everyone at the party was asking where I got it.",
    name: "Sarah M.",
    source: "Google Review",
  },
  {
    text: "Sweet Layers made our wedding cake exactly how we envisioned it. The attention to detail was incredible, and it tasted even better than it looked.",
    name: "James & Lily R.",
    source: "Wedding Wire",
  },
  {
    text: "I order from Sweet Layers every month. Their baklava is phenomenal, and the cookies are always fresh. Can't recommend them enough!",
    name: "Amira K.",
    source: "Yelp",
  },
];

const Reviews = () => {
  return (
    <section className="bg-sl-sage py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">What Our Customers Say</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">Customer Reviews</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="bg-background rounded-lg p-8 shadow-sm">
              <span className="font-playfair text-5xl text-primary leading-none block mb-4">"</span>
              <p className="font-manrope text-sm text-muted-foreground leading-relaxed mb-6">{review.text}</p>
              <div>
                <p className="font-manrope font-semibold text-sm text-foreground">{review.name}</p>
                <p className="font-manrope text-xs text-muted-foreground">{review.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
