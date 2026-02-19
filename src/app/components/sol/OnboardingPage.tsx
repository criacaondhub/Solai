import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { Loader2, CheckCircle2, AlertCircle, Phone, UserPlus, MessageCircle } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────
interface UserData {
    id: string;
    email: string;
    phone: string | null;
    max_dependents: number;
    plan_type: string;
    subscription_status: string;
}

interface Dependent {
    id: string;
    phone: string;
}

type PageState = "loading" | "success" | "error";

// ─── Phone Validation ────────────────────────────────────────────────
/** Strips everything except digits from the input */
function sanitizePhone(value: string): string {
    return value.replace(/\D/g, "");
}

/** 
 * Validates WhatsApp international format: 
 * Country code (2 digits) + Area code (2 digits) + Number (8-9 digits) 
 * Example: 5511966113170
 */
function isValidWhatsAppPhone(phone: string): boolean {
    const digits = sanitizePhone(phone);
    return digits.length >= 12 && digits.length <= 13;
}

/** Formats phone for display: +55 (11) 96611-3170 */
function formatPhoneDisplay(phone: string): string {
    const d = sanitizePhone(phone);
    if (d.length === 13) {
        return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 9)}-${d.slice(9)}`;
    }
    if (d.length === 12) {
        return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 8)}-${d.slice(8)}`;
    }
    return phone;
}

// ─── Constants ───────────────────────────────────────────────────────
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;
const WHATSAPP_BOT_URL = "https://wa.me/5511966113170"; // Placeholder

// ─── Component ───────────────────────────────────────────────────────
export function OnboardingPage() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");

    // States
    const [pageState, setPageState] = useState<PageState>("loading");
    const [user, setUser] = useState<UserData | null>(null);
    const [dependents, setDependents] = useState<Dependent[]>([]);
    const [retryCount, setRetryCount] = useState(0);

    // Form states
    const [phoneInputs, setPhoneInputs] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState<number | null>(null);
    const [successMessages, setSuccessMessages] = useState<Record<number, boolean>>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);


    // ─── Fetch user with retry ──────────────────────────────────────
    const fetchUser = useCallback(async () => {
        if (!email) {
            setPageState("error");
            return;
        }

        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            setRetryCount(attempt + 1);

            const { data, error } = await supabase
                .from("users")
                .select("id, email, phone, max_dependents, plan_type, subscription_status")
                .eq("email", email)
                .single();

            if (data && data.max_dependents !== null && data.max_dependents !== undefined) {
                setUser(data as UserData);
                // Fetch existing dependents
                await fetchDependents(data.id);
                setPageState("success");
                return;
            }

            // Wait before retrying
            if (attempt < MAX_RETRIES - 1) {
                await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
            }
        }

        // All retries exhausted
        setPageState("error");
    }, [email]);

    // ─── Fetch existing dependents ─────────────────────────────────
    const fetchDependents = async (parentId: string) => {
        const { data } = await supabase
            .from("users")
            .select("id, phone")
            .eq("parent_id", parentId);

        if (data) {
            setDependents(data as Dependent[]);
        }
    };

    // ─── Register a dependent ─────────────────────────────────────
    const registerDependent = async (index: number) => {
        if (!user) return;

        const rawPhone = phoneInputs[index];
        const phone = sanitizePhone(rawPhone);

        if (!isValidWhatsAppPhone(phone)) {
            setErrorMessage(
                "Número inválido. Use o formato internacional: 5511999999999 (código do país + DDD + número)"
            );
            return;
        }

        setErrorMessage(null);
        setSubmitting(index);

        try {
            const { error } = await supabase.from("users").insert({
                phone,
                parent_id: user.id,
                subscription_status: "active",
                funnel_stage: "new",
                plan_type: "dependent",
            });

            if (error) {
                setErrorMessage("Erro ao cadastrar número. Tente novamente.");
                setSubmitting(null);
                return;
            }

            // Refresh dependents list
            await fetchDependents(user.id);

            // Show success for this slot
            setSuccessMessages((prev) => ({ ...prev, [index]: true }));

            // After a short delay to show the success message, remove this slot
            setTimeout(() => {
                setPhoneInputs((prev) => prev.filter((_, i) => i !== index));
                setSuccessMessages((prev) => {
                    const next = { ...prev };
                    delete next[index];
                    return next;
                });
            }, 2000);
        } catch {
            setErrorMessage("Erro de conexão. Verifique sua internet e tente novamente.");
        } finally {
            setSubmitting(null);
        }
    };

    // ─── Effects ────────────────────────────────────────────────────
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // Initialize phone inputs ONLY ONCE when the user is first loaded
    // This prevents resetting other fields when one is registered
    useEffect(() => {
        if (user && user.max_dependents > 0 && phoneInputs.length === 0) {
            const slotsAvailable = user.max_dependents - dependents.length;
            if (slotsAvailable > 0) {
                setPhoneInputs(new Array(Math.max(0, slotsAvailable)).fill(""));
            }
        }
    }, [user]); // Only run when user data arrives

    // Update phone inputs ONLY if we haven't initialized them yet or if they were empty
    useEffect(() => {
        if (user && user.max_dependents > 0 && dependents.length > 0 && phoneInputs.length === 0) {
            const slotsAvailable = user.max_dependents - dependents.length;
            if (slotsAvailable > 0) {
                setPhoneInputs(new Array(Math.max(0, slotsAvailable)).fill(""));
            }
        }
    }, [user, dependents.length]);

    // ─── Computed ───────────────────────────────────────────────────
    const slotsRemaining = user ? user.max_dependents - dependents.length : 0;
    const planLabel =
        user?.plan_type === "duo"
            ? "Duo"
            : user?.plan_type === "familia"
                ? "Família"
                : "Individual";

    // ─── Render ─────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 py-12 font-[Roboto]">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#CC3300]/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#CC3300]/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-lg">
                {/* ── Loading State ── */}
                {pageState === "loading" && (
                    <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#CC3300]/20 rounded-full blur-xl animate-pulse" />
                            <div className="relative bg-[#CC3300]/10 p-6 rounded-full border border-[#CC3300]/20">
                                <Loader2 className="w-10 h-10 text-[#CC3300] animate-spin" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-white text-2xl font-bold mb-3">
                                Validando seu pagamento...
                            </h1>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Estamos preparando seu acesso. Isso pode levar alguns segundos.
                            </p>
                            <div className="flex items-center justify-center gap-1.5 mt-4">
                                {Array.from({ length: MAX_RETRIES }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i < retryCount
                                            ? "bg-[#CC3300] scale-100"
                                            : "bg-white/10 scale-75"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Error State ── */}
                {pageState === "error" && (
                    <div className="flex flex-col items-center gap-6 text-center animate-in fade-in duration-500">
                        <div className="bg-white/5 p-6 rounded-full border border-white/10">
                            <AlertCircle className="w-10 h-10 text-white/40" />
                        </div>
                        <div>
                            <h1 className="text-white text-2xl font-bold mb-3">
                                Não encontramos seu cadastro
                            </h1>
                            <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
                                {!email
                                    ? "O link de acesso está incompleto. Verifique se você usou o link correto enviado após a compra."
                                    : "Seu pagamento pode ainda estar sendo processado. Aguarde alguns minutos e tente novamente, ou entre em contato com o suporte."}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            {email && (
                                <button
                                    onClick={() => {
                                        setPageState("loading");
                                        setRetryCount(0);
                                        fetchUser();
                                    }}
                                    className="flex-1 py-3.5 px-6 rounded-2xl bg-[#CC3300] text-white font-bold text-sm hover:bg-[#CC3300]/90 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Tentar novamente
                                </button>
                            )}
                            <a
                                href={WHATSAPP_BOT_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-3.5 px-6 rounded-2xl border border-white/10 text-white font-bold text-sm text-center hover:bg-white/5 transition-all duration-300"
                            >
                                Falar com suporte
                            </a>
                        </div>
                    </div>
                )}

                {/* ── Success State ── */}
                {pageState === "success" && user && (
                    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
                        {/* Header Card */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-8 backdrop-blur-xl">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#25D366]/20 rounded-full blur-lg" />
                                    <div className="relative bg-[#25D366]/10 p-4 rounded-full border border-[#25D366]/20">
                                        <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
                                        Pagamento confirmado!
                                    </h1>
                                    <p className="text-white/50 text-sm">
                                        Seu Plano <span className="text-[#CC3300] font-semibold">{planLabel}</span> já está ativo.
                                    </p>
                                </div>

                                {/* Plan badge */}
                                <div className="inline-flex items-center gap-2 bg-[#CC3300]/10 border border-[#CC3300]/20 rounded-full px-4 py-2 mt-2">
                                    <div className="w-2 h-2 bg-[#CC3300] rounded-full animate-pulse" />
                                    <span className="text-[#CC3300] text-xs font-bold uppercase tracking-wider">
                                        Plano {planLabel}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ── Individual Plan: Just WhatsApp Button ── */}
                        {user.max_dependents === 0 && (
                            <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-8 backdrop-blur-xl text-center">
                                <MessageCircle className="w-8 h-8 text-[#25D366] mx-auto mb-4" />
                                <h2 className="text-white text-lg font-bold mb-2">
                                    Tudo pronto!
                                </h2>
                                <p className="text-white/50 text-sm mb-6 max-w-xs mx-auto">
                                    Seu número já está ativo. Envie uma mensagem para começar a conversar com a SOL.
                                </p>
                                <a
                                    href={WHATSAPP_BOT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#25D366]/90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#25D366]/20"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Conversar com a SOL
                                </a>
                            </div>
                        )}

                        {/* ── Duo/Family Plan: Dependent Registration ── */}
                        {user.max_dependents > 0 && (
                            <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-8 backdrop-blur-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-[#CC3300]/10 p-2.5 rounded-xl border border-[#CC3300]/20">
                                        <UserPlus className="w-5 h-5 text-[#CC3300]" />
                                    </div>
                                    <div>
                                        <h2 className="text-white text-lg font-bold">
                                            Cadastrar números adicionais
                                        </h2>
                                        <p className="text-white/40 text-xs">
                                            {slotsRemaining > 0
                                                ? `Você ainda pode adicionar ${slotsRemaining} número${slotsRemaining > 1 ? "s" : ""} (Inclua o DDD)`
                                                : "Todas as vagas foram preenchidas"}
                                        </p>
                                    </div>
                                </div>

                                {/* Already registered dependents */}
                                {dependents.length > 0 && (
                                    <div className="mb-6">
                                        <p className="text-white/30 text-xs font-bold uppercase tracking-wider mb-3">
                                            Números cadastrados
                                        </p>
                                        <div className="flex flex-col gap-2">
                                            {dependents.map((dep) => (
                                                <div
                                                    key={dep.id}
                                                    className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                                                    <span className="text-white/70 text-sm font-mono">
                                                        {formatPhoneDisplay(dep.phone)}
                                                    </span>
                                                    <span className="ml-auto text-[#25D366] text-[10px] font-bold uppercase tracking-wider">
                                                        Ativo
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Input slots for remaining dependents */}
                                {slotsRemaining > 0 && (
                                    <div className="flex flex-col gap-4">
                                        {phoneInputs.map((value, index) => (
                                            <div key={index} className="flex flex-col gap-2">
                                                {successMessages[index] ? (
                                                    <div className="flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl px-4 py-3">
                                                        <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                                                        <span className="text-[#25D366] text-sm font-medium">
                                                            Número cadastrado com sucesso!
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <div className="relative flex-1">
                                                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                            {(focusedIndex === index || value.length > 0) && (
                                                                <span className="absolute left-10 top-1/2 -translate-y-1/2 text-white/40 text-sm font-mono select-none">
                                                                    +
                                                                </span>
                                                            )}
                                                            <input
                                                                type="tel"
                                                                value={value}
                                                                onFocus={() => {
                                                                    setFocusedIndex(index);
                                                                    if (value === "") {
                                                                        setPhoneInputs((prev) => {
                                                                            const updated = [...prev];
                                                                            updated[index] = "55";
                                                                            return updated;
                                                                        });
                                                                    }
                                                                }}
                                                                onBlur={() => setFocusedIndex(null)}
                                                                onChange={(e) => {
                                                                    const sanitized = sanitizePhone(e.target.value);
                                                                    setPhoneInputs((prev) => {
                                                                        const updated = [...prev];
                                                                        updated[index] = sanitized;
                                                                        return updated;
                                                                    });
                                                                    setErrorMessage(null);
                                                                }}
                                                                placeholder="11 99999-9999"
                                                                maxLength={13}
                                                                className={`w-full bg-white/[0.04] border border-white/10 rounded-xl pr-4 py-3 text-white text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-[#CC3300]/50 focus:ring-1 focus:ring-[#CC3300]/20 transition-all duration-300 ${(focusedIndex === index || value.length > 0) ? "pl-14" : "pl-10"}`}
                                                            />
                                                        </div>
                                                        <button
                                                            onClick={() => registerDependent(index)}
                                                            disabled={submitting === index || !value}
                                                            className="px-5 py-3 rounded-xl bg-[#CC3300] text-white font-bold text-sm transition-all duration-300 hover:bg-[#CC3300]/90 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
                                                        >
                                                            {submitting === index ? (
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                            ) : (
                                                                "Adicionar"
                                                            )}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* All slots filled message */}
                                {slotsRemaining <= 0 && dependents.length > 0 && (
                                    <div className="text-center py-4">
                                        <p className="text-white/40 text-sm">
                                            ✨ Todos os números do seu plano já estão ativos!
                                        </p>
                                    </div>
                                )}

                                {/* Error message */}
                                {errorMessage && (
                                    <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mt-4">
                                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-red-400 text-xs">{errorMessage}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* WhatsApp CTA for Duo/Family too */}
                        {user.max_dependents > 0 && (
                            <div className="text-center">
                                <a
                                    href={WHATSAPP_BOT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#25D366]/90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#25D366]/20"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Conversar com a SOL no WhatsApp
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
