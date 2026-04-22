import baklava from "@/assets/patisserie-baklava.png";
import cinnamonClassic from "@/assets/patisserie-cinnamon-roll.jpg";
import cinnamonBlueberry from "@/assets/cinnamon-blueberry.jpg";
import cinnamonPistachio from "@/assets/patisserie-pistachio-roll.png";
import cinnamonStrawberry from "@/assets/cinnamon-strawberry.png";
import { useState, useEffect } from "react";

const cinnamonGallery = [
  { src: cinnamonClassic, alt: "Classic cinnamon roll with cream cheese frosting" },
  { src: cinnamonBlueberry, alt: "Cinnamon roll topped with blueberry compote" },
  { src: cinnamonPistachio, alt: "Cinnamon roll dusted with crushed pistachios" },
  { src: cinnamonStrawberry, alt: "Cinnamon roll glazed with strawberry sauce" },
];

const CinnamonRollCard = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % cinnamonGallery.length), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="group">
      <div className="aspect-square rounded-none mb-4 overflow-hidden border border-[hsl(var(--sl-gold)/0.2)] bg-sl-cream relative">
        {cinnamonGallery.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {cinnamonGallery.map((_, i) => (
            <span
              key={i}
              className={`block h-1 w-1 rounded-full transition-colors ${
                i === index ? "bg-sl-gold" : "bg-primary-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
      <h3 className="font-cormorant text-base font-semibold text-foreground tracking-wide">
        Cinnamon Rolls
      </h3>
      <p className="font-manrope text-xs text-muted-foreground mt-1 italic">
        Classic, blueberry, pistachio &amp; strawberry — visit our menu to order.
      </p>
    </div>
  );
};

const StaticCard = ({
  name,
  image,
  alt,
}: {
  name: string;
  image: string | null;
  alt?: string;
}) => (
  <div className="group">
    <div className="aspect-square rounded-none mb-4 overflow-hidden border border-[hsl(var(--sl-gold)/0.2)] bg-sl-cream">
      {image ? (
        <img
          src={image}
          alt={alt ?? name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-[#E8F3EE] flex items-center justify-center">
          <span className="font-cormorant italic text-sm tracking-wide text-[#2C3E36]/40">
            {name}
          </span>
        </div>
      )}
    </div>
    <h3 className="font-cormorant text-base font-semibold text-foreground tracking-wide">
      {name}
    </h3>
    <p className="font-manrope text-xs text-muted-foreground mt-1 italic">
      Available to order — visit our menu to place your order.
    </p>
  </div>
);

const Patisserie = () => {
  return (
    <section className="bg-sl-cream cream-grain py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-manrope font-medium text-muted-foreground mb-3">
            Small Indulgences
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-foreground tracking-wide">
            The Patisserie
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StaticCard name="Baklava" image={baklava} />
          <CinnamonRollCard />
          <StaticCard name="Cream Rolls" image={null} />
          <StaticCard name="Pistachio Roll Cake" image={null} />
        </div>
      </div>
    </section>
  );
};

export default Patisserie;
