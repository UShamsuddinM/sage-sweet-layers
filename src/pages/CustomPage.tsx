import { useState } from "react";
import { CalendarIcon, Upload } from "lucide-react";
import WeddingConcierge from "@/components/WeddingConcierge";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const guestOptions = ["Under 50", "50–100", "100–200", "200–300", "300+"];
const budgetOptions = ["$500 – $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000+"];

const CustomPage = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [guestCount, setGuestCount] = useState("");
  const [budget, setBudget] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Sent",
      description: "Thank you! We'll be in touch within 24 hours.",
    });
  };

  const inputClass =
    "w-full rounded-none border border-sl-gold/50 bg-transparent px-4 py-3 text-sm font-manrope text-foreground placeholder:text-foreground/40 focus:border-sl-gold focus:outline-none transition-colors";

  const labelClass = "block text-xs font-manrope font-semibold uppercase tracking-[0.15em] text-foreground mb-2";

  return (
    <div className="min-h-screen bg-sl-cream">
      <Navbar />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
        {/* ─── LEFT: The Dream ─── */}
        <div className="relative lg:sticky lg:top-0 lg:h-screen lg:w-1/2 w-full h-[50vh] lg:h-auto flex-shrink-0">
          <div className="absolute inset-0 bg-sl-sage" />
          <img
            src="/placeholder.svg"
            alt="Wedding cake inspiration"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
          <div className="absolute bottom-12 left-8 right-8 lg:bottom-20 lg:left-12 lg:right-12">
            <p className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-white leading-tight tracking-wide">
              Let's create something
              <br />
              <span className="italic">unforgettable.</span>
            </p>
            <div className="w-16 h-[1px] bg-sl-gold mt-6" />
          </div>
        </div>

        {/* ─── RIGHT: The Form ─── */}
        <div className="lg:w-1/2 w-full bg-sl-cream">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-8 py-12 lg:py-20 space-y-8">
            <div>
              <h1 className="font-cormorant text-3xl lg:text-4xl text-foreground tracking-wide mb-2">
                Inquire for your Date
              </h1>
              <p className="text-xs font-manrope text-foreground/60 tracking-wide">
                Tell us about your celebration and we'll craft something extraordinary.
              </p>
            </div>

            {/* ── Contact ── */}
            <div className="space-y-4">
              <p className="text-[10px] font-manrope font-bold uppercase tracking-[0.2em] text-sl-gold">
                Contact
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input type="text" placeholder="Jane" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input type="text" placeholder="Doe" className={inputClass} required />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" placeholder="jane@example.com" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input type="tel" placeholder="(555) 000-0000" className={inputClass} />
              </div>
            </div>

            {/* ── Event Details ── */}
            <div className="space-y-4">
              <p className="text-[10px] font-manrope font-bold uppercase tracking-[0.2em] text-sl-gold">
                Event Details
              </p>

              <div>
                <label className={labelClass}>Event Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(inputClass, "flex items-center justify-between text-left", !date && "text-foreground/40")}
                    >
                      {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                      <CalendarIcon size={16} className="text-sl-gold" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-sl-cream border-sl-gold/30 rounded-none z-[60]" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className={labelClass}>Venue Name</label>
                <input type="text" placeholder="The Grand Ballroom" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Guest Count</label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className={cn(inputClass, "appearance-none cursor-pointer")}
                >
                  <option value="" disabled>Select range</option>
                  {guestOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── Design Vision ── */}
            <div className="space-y-4">
              <p className="text-[10px] font-manrope font-bold uppercase tracking-[0.2em] text-sl-gold">
                Design
              </p>

              <div>
                <label className={labelClass}>Tell us about your vision</label>
                <textarea
                  rows={4}
                  placeholder="Describe your dream cake — colors, themes, flavors, anything that inspires you..."
                  className={cn(inputClass, "resize-none")}
                />
              </div>

              <div>
                <label className={labelClass}>Budget Range</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={cn(inputClass, "appearance-none cursor-pointer")}
                >
                  <option value="" disabled>Select budget</option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Upload Box */}
              <div>
                <label className={labelClass}>Inspiration</label>
                <div
                  className={cn(
                    "border border-dashed border-sl-gold/50 rounded-none px-6 py-10 text-center cursor-pointer transition-colors",
                    isDragging ? "bg-sl-sage/50 border-sl-gold" : "bg-transparent hover:bg-sl-sage/20"
                  )}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
                >
                  <Upload size={24} className="mx-auto text-sl-gold/60 mb-3" />
                  <p className="text-xs font-manrope text-foreground/60">
                    Drag & drop inspiration images here
                  </p>
                  <p className="text-[10px] font-manrope text-foreground/40 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              className="w-full rounded-none bg-sl-emerald text-sl-gold py-4 text-xs font-manrope font-bold uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
            >
              Send Inquiry
            </button>

            <p className="text-[10px] font-manrope text-foreground/40 text-center">
              We typically respond within 24 hours.
            </p>
          </form>

          {/* ─── Wedding Concierge AI Chat ─── */}
          <div className="max-w-lg mx-auto px-8 pb-12 lg:pb-20">
            <div className="mb-6">
              <p className="text-[10px] font-manrope font-bold uppercase tracking-[0.2em] text-sl-gold mb-2">
                Or chat with our AI
              </p>
              <p className="text-xs font-manrope text-foreground/60 leading-relaxed">
                Not sure where to start? Our Wedding Concierge can help you choose flavors,
                designs, and build a complete sweets package — instantly.
              </p>
            </div>
            <WeddingConcierge />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomPage;
