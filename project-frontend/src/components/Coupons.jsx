import React, { useEffect, useMemo, useState } from "react";

export default function Coupon({
  subtotal,
  onApply,
  apiBaseUrl,
  bearerToken,
  showSuggestions = true,
}) {
  const [codeInput, setCodeInput] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [applied, setApplied] = useState(null);

  const baseUrl = apiBaseUrl || process.env.REACT_APP_API_URL || "";
  const token = bearerToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  
  const formatCurrency = (value) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(value);

  const headers = useMemo(() => {
    const h = { "Content-Type": "application/json" };
    if (token) h["Authorization"] = `Bearer ${token}`;
    return h;
  }, [token]);

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();
    async function fetchCoupons() {
      if (!baseUrl) return; 
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${baseUrl}/coupons`, {
          method: "GET",
          headers,
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to fetch coupons (HTTP ${res.status})`);
        const data = await res.json();
        if (!abort && Array.isArray(data)) {
          setCoupons(data);
        }
      } catch (err) {
        
        if (!abort) {
          console.warn("Coupon fetch error:", err);
        }
      } finally {
        if (!abort) setLoading(false);
      }
    }

    fetchCoupons();
    return () => {
      abort = true;
      controller.abort();
    };
  }, [baseUrl, headers]);

  function isDateInRange(c) {
    const now = new Date();
    const start = c.start_date ? new Date(c.start_date) : null;
    const end = c.end_date ? new Date(c.end_date) : null;
    const afterStart = !start || now >= start;
    const beforeEnd = !end || now <= end;
    return afterStart && beforeEnd;
  }

  function validateCouponObj(c) {
    if (!c || typeof c !== "object") return "Coupon not found.";
    if (!c.discount_percentage && c.discount_percentage !== 0)
      return "Invalid coupon: missing discount percentage.";
    if (c.discount_percentage <= 0 || c.discount_percentage > 100)
      return "Invalid coupon: discount percentage must be between 1–100.";
    if (!isDateInRange(c)) return "This coupon is not active or has expired.";
    return null; 
  }

  async function findCouponByCode(code) {
    const normalized = String(code || "").trim();
    if (!normalized) return null;
    const fromList =
      coupons.find((c) => String(c.coupon).toLowerCase() === normalized.toLowerCase()) || null;

    if (fromList) return fromList;

    
    if (baseUrl) {
      try {
        const res = await fetch(`${baseUrl}/coupons/${encodeURIComponent(normalized)}`, {
          method: "GET",
          headers,
        });
        if (res.ok) {
          const data = await res.json();
          return data || null;
        }
      } catch (e) {
        
      }
    }
    return null;
  }

  async function handleApply(e) {
    e?.preventDefault?.();
    setApplying(true);
    setError("");
    setSuccess("");
    setApplied(null);

    try {
      const code = codeInput.trim();
      if (!code) {
        setError("Please enter a coupon code.");
        return;
      }

      const couponObj = await findCouponByCode(code);
      const validationError = validateCouponObj(couponObj);

      if (validationError) {
        setError(validationError);
        return;
      }

      const pct = Number(couponObj.discount_percentage);
      const discountAmount = roundToTwo((Number(subtotal || 0) * pct) / 100);
      const newTotal = roundToTwo(Number(subtotal || 0) - discountAmount);

      const payload = {
        code: couponObj.coupon,
        discountPercentage: pct,
        discountAmount,
        newTotal,
      };

      setApplied(payload);
      setSuccess(
        `Applied ${couponObj.coupon}: -${formatCurrency(discountAmount)} (${pct}%)`
      );

      
      onApply?.(payload);
    } catch (err) {
      setError("Something went wrong while applying the coupon. Please try again.");
    } finally {
      setApplying(false);
    }
  }

  function roundToTwo(n) {
    return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  }

  const activeCoupons = useMemo(
    () => (Array.isArray(coupons) ? coupons.filter((c) => validateCouponObj(c) === null) : []),
    [coupons]
  );

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <input
          type="text"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Enter coupon code"
          aria-label="Coupon code"
          style={styles.input}
          disabled={applying}
        />
        <button onClick={handleApply} style={styles.button} disabled={applying}>
          {applying ? "Applying..." : "Apply"}
        </button>
      </div>

      {loading && <p style={styles.muted}>Loading coupons…</p>}
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      {applied && (
        <div style={styles.appliedBox}>
          <div>
            <strong>Coupon:</strong> {applied.code} ({applied.discountPercentage}%)
          </div>
          <div>
            <strong>Discount:</strong> -{formatCurrency(applied.discountAmount)}
          </div>
          <div>
            <strong>New total:</strong> {formatCurrency(applied.newTotal)}
          </div>
        </div>
      )}

      {showSuggestions && activeCoupons?.length > 0 && (
        <>
          <p style={styles.muted}>
            Available coupons:
            {" "}
            {activeCoupons.map((c) => (
              <button
                key={c.id ?? c.coupon}
                style={styles.chip}
                onClick={() => setCodeInput(String(c.coupon))}
                title={`${c.coupon} (${c.discount_percentage}%)`}
              >
                {String(c.coupon).toUpperCase()}
              </button>
            ))}
          </p>
        </>
      )}

      <p style={styles.tiny}>
        Tip: Make sure your API base URL is set (e.g., <code>REACT_APP_API_URL</code>) and, if your
        backend requires auth, a JWT in <code>localStorage</code> under <code>token</code>.
      </p>
    </div>
  );
}

const styles = {
  container: { border: "1px solid #eee", borderRadius: 8, padding: 12, marginTop: 12 },
  row: { display: "flex", gap: 8 },
  input: { flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #ccc" },
  button: {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #222",
    background: "#222",
    color: "#fff",
    cursor: "pointer",
  },
  muted: { color: "#666", marginTop: 8 },
  error: { color: "#c00", marginTop: 8 },
  success: { color: "#0a750a", marginTop: 8 },
  appliedBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8,
    padding: 8,
    background: "#f6fff6",
    border: "1px solid #cde5cd",
    borderRadius: 6,
    marginTop: 8,
  },
  chip: {
    display: "inline-block",
    border: "1px solid #ddd",
    borderRadius: 16,
    padding: "4px 10px",
    marginRight: 6,
    background: "#fafafa",
    cursor: "pointer",
  },
  tiny: { fontSize: 12, color: "#888", marginTop: 8 },
};
