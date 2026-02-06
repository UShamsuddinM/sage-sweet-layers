import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const flavors = ["Chocolate", "Vanilla", "Red Velvet", "Lemon", "Carrot", "Strawberry"];

const CakeFinder = () => {
  const [date, setDate] = useState<Date>();
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [flavor, setFlavor] = useState("");

  return (
    <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-xl border border-border p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-4 items-center">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button className={cn(
              "flex items-center gap-3 w-full px-4 py-3 rounded-md border border-input bg-background text-left font-manrope text-sm",
              !date && "text-muted-foreground"
            )}>
              <CalendarIcon size={16} className="text-primary" />
              {date ? format(date, "PPP") : "Select Date"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        {/* Pickup / Delivery Toggle */}
        <div className="flex bg-secondary rounded-md p-1">
          <button
            className={cn(
              "px-4 py-2 rounded text-xs font-manrope font-semibold uppercase tracking-wider transition-colors",
              mode === "pickup" ? "bg-primary text-primary-foreground" : "text-foreground hover:text-primary"
            )}
            onClick={() => setMode("pickup")}
          >
            Pickup
          </button>
          <button
            className={cn(
              "px-4 py-2 rounded text-xs font-manrope font-semibold uppercase tracking-wider transition-colors",
              mode === "delivery" ? "bg-primary text-primary-foreground" : "text-foreground hover:text-primary"
            )}
            onClick={() => setMode("delivery")}
          >
            Delivery
          </button>
        </div>

        {/* Flavor Selector */}
        <select
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-sm font-manrope text-foreground appearance-none cursor-pointer"
        >
          <option value="" disabled>Select Flavor</option>
          {flavors.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        {/* CTA */}
        <button className="bg-primary hover:bg-sl-gold-hover text-primary-foreground font-manrope font-semibold text-sm tracking-[0.1em] uppercase px-6 py-3 rounded-sm transition-colors whitespace-nowrap">
          Find Your Cake
        </button>
      </div>
    </div>
  );
};

export default CakeFinder;
