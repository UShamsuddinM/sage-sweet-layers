import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type AuthDetails = {
  client?: { name?: string; redirect_uri?: string };
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};

// Local typed wrapper for the beta supabase.auth.oauth namespace.
const oauth = (supabase.auth as any).oauth as {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthDetails | null; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: any }>;
};

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) { setError("Missing authorization_id"); return; }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) { setError(error.message ?? String(error)); return; }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) { window.location.href = immediate; return; }
      setDetails(data);
    })();
    return () => { active = false; };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) { setBusy(false); setError(error.message ?? String(error)); return; }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) { setBusy(false); setError("No redirect returned by the authorization server."); return; }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "an app";

  return (
    <main className="min-h-screen bg-sl-cream noise-texture flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg bg-white border border-sl-gold/30 p-10 space-y-6">
        <div className="space-y-2">
          <p className="font-manrope text-[10px] uppercase tracking-[0.25em] text-sl-gold">Authorization request</p>
          <h1 className="font-cormorant text-3xl tracking-wide text-foreground">
            Connect {clientName} to Sweet Layers
          </h1>
        </div>

        {error && (
          <div className="border border-red-200 bg-red-50 px-4 py-3 font-manrope text-sm text-red-800">
            {error}
          </div>
        )}

        {!error && !details && (
          <p className="font-manrope text-sm text-foreground/60">Loading…</p>
        )}

        {details && (
          <>
            <p className="font-manrope text-sm text-foreground/80 leading-relaxed">
              This lets <span className="font-semibold">{clientName}</span> use Sweet Layers as you —
              calling enabled tools on your behalf while you're signed in.
            </p>
            {details.client?.redirect_uri && (
              <p className="font-manrope text-xs text-foreground/50 break-all">
                Redirect URI: {details.client.redirect_uri}
              </p>
            )}
            <p className="font-manrope text-xs text-foreground/50">
              This does not bypass Sweet Layers' permissions or backend policies.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => decide(true)}
                disabled={busy}
                className="flex-1 py-3 bg-sl-emerald text-sl-gold font-manrope font-semibold text-xs uppercase tracking-[0.2em] disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => decide(false)}
                disabled={busy}
                className="flex-1 py-3 border border-sl-gold/40 bg-white hover:bg-sl-sage font-manrope text-xs uppercase tracking-[0.2em] disabled:opacity-50"
              >
                Deny
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default OAuthConsent;
