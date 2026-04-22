import { Star } from "lucide-react";

const reviews = [
  {
    text: "There are three things that need to be explained to understand the experience with Sweet Layers — ordering process, presentation, and the cake itself. All three are shockingly good. The presentation was stunning. A very elegant cake box wrapped around a perfectly iced tall slim cake trimmed with beautiful flowers and gold leaf. The cake itself was a light buttery vanilla cake layered with perfectly whipped vanilla buttercream and a tangy lemon curd. I cannot recommend Munisa enough. She is a master of her craft.",
    name: "Eli Anderson",
    rating: 5,
  },
  {
    text: "Ordered a custom birthday cake in pistachio and she made sure I was happy with the design and flavor. The cake came out beautifully as promised and the pistachio flavor was delicious with generous amounts of pistachio pieces in the cake.",
    name: "Brian Abrigana",
    rating: 5,
  },
  {
    text: "We were ordering for my grandmas 102nd birthday from out of state and my expectations were exceeded. Even being a couple states away, Munisa was easy to communicate with and went above and beyond to bring my inspiration for a cake to life.",
    name: "Maria Felipe",
    rating: 5,
  },
  {
    text: "I had a different request since my daughters 8th birthday theme was a Roblox theme. She was able to do the cake almost identical to what the picture looked like. The cake was delicious, my guests were actually complimenting the chocolate she used instead of icing. Honestly 10 out of 10!",
    name: "Michelle Izaguirre",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section className="bg-sl-sage py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">Real reviews from Google</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground tracking-wide">What Our Customers Are Saying</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="bg-background rounded-none p-8 shadow-sm flex flex-col">
              <div className="flex gap-1 mb-4" aria-label={`${review.rating} star rating`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-sl-gold text-sl-gold" />
                ))}
              </div>
              <p className="font-manrope text-xs text-muted-foreground leading-relaxed mb-6 flex-1">{review.text}</p>
              <div>
                <p className="font-manrope font-semibold text-xs text-foreground">{review.name}</p>
                <p className="font-manrope text-[11px] text-muted-foreground">Google Review</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
