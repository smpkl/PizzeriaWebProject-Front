// Adminsivun kuponkienhallinta

import React, { useEffect, useMemo, useState } from "react";
//import axios from "axios";

const API_BASE =
  (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:8080/api";

const COUPONS_URL = `${API_BASE}/coupons`;

/** Helpers: timestamp ↔️ input[type="date"] */
const toDateInputValue = (ts) => {
  if (!ts) return "";
  try {
    const d = new Date(ts);
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
      .toISOString()
      .slice(0, 10);
  } catch {
    return "";
  }
};
const fromDateInputValue = (yyyyMMdd) => {
  if (!yyyyMMdd) return null;
  const [y, m, d] = yyyyMMdd.split("-").map(Number);
  return new Date(y, m - 1, d).toISOString();
};

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const emptyCoupon = () => ({
  coupon: "",
  discount_percentage: 0,
  start_date: "",
  end_date: "",
  _dirty: true,
});

/** Basic validation */
const validateCoupon = (c) => {
  const errors = {};
  if (!c.coupon || c.coupon.trim().length === 0) {
    errors.coupon = "Kuponki-koodi on pakollinen";
  }
  const pct = Number(c.discount_percentage);
  if (Number.isNaN(pct) || pct < 0 || pct > 100) {
    errors.discount_percentage = "Alennusprosentti 0–100";
  }
  if (c.start_date && c.end_date) {
    const s = new Date(c.start_date);
    const e = new Date(c.end_date);
    if (s > e) errors.date_range = "Alkamispäivä ei voi olla päättymispäivän jälkeen";
  }
  return errors;
};

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  /** Load coupons from backend */
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    axios
      .get(COUPONS_URL, { headers: { ...getAuthHeaders() } })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.items || [];
        const mapped = data.map((c) => ({
          id: c.id,
          coupon: c.coupon ?? "",
          discount_percentage: c.discount_percentage ?? 0,
          start_date: toDateInputValue(c.start_date),
          end_date: toDateInputValue(c.end_date),
          _dirty: false,
        }));
        if (isMounted) setCoupons(mapped);
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setError("Kuponkien hakeminen epäonnistui.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const items = coupons.slice().sort((a, b) => {
      const ad = a.start_date || "";
      const bd = b.start_date || "";
      return ad.localeCompare(bd);
    });
    if (!q) return items;
    return items.filter((c) => (c.coupon || "").toLowerCase().includes(q));
  }, [coupons, search]);

  const addCoupon = () => {
    setCoupons((prev) => [emptyCoupon(), ...prev]);
  };

  const updateField = (idx, field, value) => {
    setCoupons((prev) =>
      prev.map((c, i) =>
        i === idx ? { ...c, [field]: value, _dirty: true } : c
      )
    );
  };

  const saveCoupon = async (idx) => {
    const c = coupons[idx];
    const errors = validateCoupon(c);
    if (Object.keys(errors).length) {
      setError(Object.values(errors).join(" • "));
      return;
    }
    setError("");
    setSavingId(c.id ?? `new-${idx}`);

    const payload = {
      coupon: c.coupon.trim(),
      discount_percentage: Number(c.discount_percentage),
      start_date: fromDateInputValue(c.start_date),
      end_date: fromDateInputValue(c.end_date),
    };

    try {
      let res;
      if (c.id == null) {
        // Create
        res = await axios.post(COUPONS_URL, payload, {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
      } else {
        // Update
        res = await axios.put(`${COUPONS_URL}/${c.id}`, payload, {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
      }

      // Normalize response -> update state
      const saved = res.data || payload;
      setCoupons((prev) =>
        prev.map((it, i) =>
          i === idx
            ? {
                id: saved.id ?? it.id,
                coupon: saved.coupon ?? it.coupon,
                discount_percentage:
                  saved.discount_percentage ?? it.discount_percentage,
                start_date: toDateInputValue(saved.start_date) || it.start_date,
                end_date: toDateInputValue(saved.end_date) || it.end_date,
                _dirty: false,
              }
            : it
        )
      );
    } catch (e) {
      console.error(e);
      setError("Tallennus epäonnistui.");
    } finally {
      setSavingId(null);
    }
  };

  const deleteCoupon = async (idx) => {
    const c = coupons[idx];
    const confirmMsg = `Poistetaanko kuponki "${c.coupon || "(uusi)"}"?`;
    if (!window.confirm(confirmMsg)) return;

    const idToDelete = c.id;
    setDeletingId(idToDelete ?? `new-${idx}`);

    try {
      if (idToDelete != null) {
        await axios.delete(`${COUPONS_URL}/${idToDelete}`, {
          headers: { ...getAuthHeaders() },
        });
      }
      setCoupons((prev) => prev.filter((_, i) => i !== idx));
    } catch (e) {
      console.error(e);
      setError("Poisto epäonnistui.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-coupons-page">
      {/* Header row */}
      <div className="admin-toolbar" style={styles.toolbar}>
        <h2 style={styles.title}>KUPONGIT</h2>
        <div style={styles.actions}>
          <button onClick={addCoupon} style={styles.primaryBtn}>
            LISÄÄ KUPONKI
          </button>
          <div style={styles.searchWrap}>
            <label htmlFor="search" style={styles.searchLabel}>
              ETSI KUPONKI:
            </label>
            <input
              id="search"
              type="text"
              placeholder="Etsi kuponki hakusanalla"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      {loading ? (
        <div style={styles.loading}>Ladataan…</div>
      ) : filtered.length === 0 ? (
        <div style={styles.empty}>Ei kuponkeja</div>
      ) : (
        <div style={styles.list}>
          {filtered.map((c, idx) => {
            const errors = validateCoupon(c);
            const saving = savingId === (c.id ?? `new-${idx}`);
            const deleting = deletingId === (c.id ?? `new-${idx}`);
            const invalid = Object.keys(errors).length > 0;

            return (
              <div key={c.id ?? `new-${idx}`} style={styles.card}>
                {/* Name / code */}
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>NIMI/KUPONKI:</label>
                    <input
                      type="text"
                      value={c.coupon}
                      onChange={(e) =>
                        updateField(idx, "coupon", e.target.value)
                      }
                      placeholder="Esim. JOULU25"
                      style={styles.input}
                    />
                  </div>

                  {/* Discount */}
                  <div style={styles.field}>
                    <label style={styles.label}>ALENNUS:</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={c.discount_percentage}
                      onChange={(e) =>
                        updateField(
                          idx,
                          "discount_percentage",
                          e.target.value
                        )
                      }
                      placeholder="Alennusprosentti (0–100)"
                      style={styles.input}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>ALKAMISPÄIVÄ:</label>
                    <input
                      type="date"
                      value={c.start_date || ""}
                      onChange={(e) =>
                        updateField(idx, "start_date", e.target.value)
                      }
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>PÄÄTTYMISPÄIVÄ:</label>
                    <input
                      type="date"
                      value={c.end_date || ""}
                      onChange={(e) =>
                        updateField(idx, "end_date", e.target.value)
                      }
                      style={styles.input}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div style={styles.actionsRow}>
                  <button
                    onClick={() => deleteCoupon(idx)}
                    disabled={saving || deleting}
                    style={styles.deleteBtn}
                  >
                    {deleting ? "Poistetaan…" : "Poista"}
                  </button>
                  <button
                    onClick={() => saveCoupon(idx)}
                    disabled={saving || invalid || !c._dirty}
                    style={{
                      ...styles.saveBtn,
                      opacity: invalid || !c._dirty ? 0.6 : 1,
                    }}
                  >
                    {saving ? "Tallennetaan…" : "Tallenna"}
                  </button>
                </div>

                {/* Per-card validation note */}
                {Object.keys(errors).length > 0 && (
                  <div style={styles.validationNote}>
                    {Object.values(errors).join(" • ")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Inline styles to match the wireframe feel quickly */
const styles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#3c3c3c",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "6px",
    marginBottom: 16,
  },
  title: { margin: 0, fontSize: 18, letterSpacing: 1 },
  actions: { display: "flex", alignItems: "center", gap: 12 },
  primaryBtn: {
    background: "#2f7d32",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: 600,
  },
  searchWrap: { display: "flex", alignItems: "center", gap: 8 },
  searchLabel: { fontSize: 12, color: "#e0e0e0" },
  searchInput: {
    padding: "6px 8px",
    borderRadius: 4,
    border: "1px solid #bbb",
    width: 220,
    background: "#fff",
    color: "#222",
  },
  error: {
    background: "#ffe9e9",
    color: "#8a0000",
    border: "1px solid #ffb4b4",
    padding: "8px 12px",
    borderRadius: 6,
    marginBottom: 12,
  },
  loading: { padding: 12, color: "#555" },
  empty: { padding: 12, color: "#777" },
};
