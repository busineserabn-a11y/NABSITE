import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, Key, Lock, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export const OwnerGatewayPage: React.FC = () => {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { ownerLogin } = useAuth();
  const navigate = useNavigate();

  const handleOwnerAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await ownerLogin(passphrase || 'nabsite_root', 'owner@nabsite.io');
      navigate('/owner');
    } catch (err: any) {
      setError(err.message || 'Access Denied: Invalid Platform Key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-amber-500 selection:text-slate-950 font-sans">
      <div className="w-full max-w-md space-y-6">
        {/* Terminal Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl mx-auto shadow-2xl shadow-amber-500/20 border border-amber-400">
            ⚡
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold tracking-tight text-white uppercase">
              NABSITE Master Gateway
            </h1>
            <p className="text-xs text-slate-400">
              Platform-Wide God Mode & Infrastructure Authorization
            </p>
          </div>
        </div>

        {/* Access Box */}
        <Card variant="bordered" padding="lg" className="bg-slate-900 border-slate-800 space-y-6 shadow-2xl">
          {error && (
            <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs font-medium rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleOwnerAccess} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                Master Security Passphrase
              </label>
              <Input
                type="password"
                placeholder="Enter root passphrase..."
                icon={Key}
                autoFocus
                className="bg-slate-950 border-slate-700 text-white placeholder-slate-600 focus:border-amber-400 focus:ring-amber-400"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              size="md"
              className="w-full font-bold"
              isLoading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Authorize God Mode Session
            </Button>
          </form>

          {/* Root Info */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>root_auth: initialized</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Full administrative authority over multi-tenant database, lifecycle state machine, theme engine, and audit vault.
            </p>
          </div>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Exit to Public Platform
          </Link>
        </div>
      </div>
    </div>
  );
};
