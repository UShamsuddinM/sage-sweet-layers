import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useToast } from "@/hooks/use-toast";

const isSameOriginPath = (v: string | null): v is string =>
  !!v && v.startsWith("/") && !v.startsWith("//");

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { toast } = useToast();
  const rawNext = params.get("next");
  const next = isSameOriginPath(rawNext) ? rawNext : "/";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(next, { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate(next, { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, next]);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth?next=${encodeURIComponent(next)}` },
        });
        if (error) throw error;
        toast({ title: "Check your email", description: "Confirm to finish sign-up." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast({ title: "Auth error", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/auth?next=${encodeURIComponent(next)}`,
    });
    if (result.error) {
      toast({ title: "Google sign-in failed", description: String(result.error?.message ?? result.error), variant: "destructive" });
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-sl-cream noise-texture flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white border border-sl-gold/30 p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-cormorant text-3xl tracking-wide text-foreground">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="font-manrope text-xs text-foreground/60 tracking-wide">
            Sweet Layers
          </p>
        </div>

        <button
          onClick={handleGoogle}
          disabled={busy}
          className="w-full py-3 border border-sl-gold/40 bg-white hover:bg-sl-sage font-manrope text-sm tracking-wide transition-colors disabled:opacity-50"
        >
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-sl-gold/20" />
          <span className="font-manrope text-[10px] uppercase tracking-[0.2em] text-foreground/40">or</span>
          <div className="flex-1 h-px bg-sl-gold/20" />
        </div>

        <form onSubmit={handleEmail} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-sl-gold/30 focus:border-sl-gold bg-transparent font-manrope text-sm outline-none rounded-none"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-sl-gold/30 focus:border-sl-gold bg-transparent font-manrope text-sm outline-none rounded-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 bg-sl-emerald text-sl-gold font-manrope font-semibold text-xs uppercase tracking-[0.2em] disabled:opacity-50"
          >
            {mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-center font-manrope text-xs text-sl-gold hover:text-primary tracking-wide"
        >
          {mode === "signin" ? "No account? Create one" : "Have an account? Sign in"}
        </button>
      </div>
    </main>
  );
};

export default Auth;
