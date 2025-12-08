//Adminsivun käyttäjätietojen hallinta

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:8080/api";

const ADMINS_URL = `${API_BASE}/admins`;

/** Authorization header helper */
const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function AdminUserInfo() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit states
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  // Controlled inputs in edit mode
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // For disabling controls during save
  const [savingField, setSavingField] = useState(null);

  /** Load current admin info — tries several common endpoints safely */
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    const headers = { ...getAuthHeaders() };

    const tryEndpoints = async () => {
      // 1) /admins/me
      try {
        const res = await axios.get(`${ADMINS_URL}/me`, { headers });
        return res.data;
      } catch (_) {}

      // 2) /admins/current
      try {
        const res = await axios.get(`${ADMINS_URL}/current`, { headers });
        return res.data;
      } catch (_) {}

      // 3) /admins (fallback: first item)
      try {
        const res = await axios.get(ADMINS_URL, { headers });
        const data = Array.isArray(res.data) ? res.data : res.data?.items || [];
        return data[0];
      } catch (e) {
        throw e;
      }
    };

    (async () => {
      try {
        const data = await tryEndpoints();
        if (!data) throw new Error("Admin data not found");
        const normalized = {
          id: data.id,
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          email: data.email ?? "",
        };
        if (mounted) {
          setAdmin(normalized);
          setNameValue(`${normalized.first_name} ${normalized.last_name}`.trim());
          setEmailValue(normalized.email);
        }
      } catch (e) {
        console.error(e);
        if (mounted) setError("Tiedon haku epäonnistui.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const fullName = admin
    ? `${admin.first_name} ${admin.last_name}`.trim()
    : "";

  /** Validation */
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  const validatePassword = (pwd) => typeof pwd === "string" && pwd.length >= 8;

  /** Split full name into first/last for backend */
  const splitName = (name) => {
    const parts = (name || "").trim().split(/\s+/);
    const first = parts[0] ?? "";
    const last = parts.slice(1).join(" ") ?? "";
    return { first_name: first, last_name: last };
  };

  /** Save name */
  const saveName = async () => {
    if (!nameValue.trim()) {
      setError("Nimi on pakollinen.");
      return;
    }
    setError("");
    setSavingField("name");
    const { first_name, last_name } = splitName(nameValue);
    try {
      const res = await axios.put(
        `${ADMINS_URL}/${admin.id}`,
        { first_name, last_name },
        { headers: { "Content-Type": "application/json", ...getAuthHeaders() } }
      );
      const updated = res.data || { first_name, last_name };
      setAdmin((prev) => ({
        ...prev,
        first_name: updated.first_name ?? first_name,
        last_name: updated.last_name ?? last_name,
      }));
      setEditingName(false);
    } catch (e) {
      console.error(e);
      setError("Nimen tallennus epäonnistui.");
    } finally {
      setSavingField(null);
    }
  };

  /** Save email */
  const saveEmail = async () => {
    if (!validateEmail(emailValue)) {
      setError("Sähköpostin muoto on virheellinen.");
      return;
    }
    setError("");
    setSavingField("email");
    try {
      const res = await axios.put(
        `${ADMINS_URL}/${admin.id}`,
        { email: emailValue.trim() },
        { headers: { "Content-Type": "application/json", ...getAuthHeaders() } }
      );
      const updated = res.data || { email: emailValue.trim() };
      setAdmin((prev) => ({ ...prev, email: updated.email ?? emailValue.trim() }));
      setEditingEmail(false);
    } catch (e) {
      console.error(e);
      setError("Sähköpostin tallennus epäonnistui.");
    } finally {
      setSavingField(null);
    }
  };

  /** Save password — tries /password endpoint, falls back to PUT /admins/{id} */
  const savePassword = async () => {
    if (!validatePassword(passwordValue)) {
      setError("Salasanan pituus vähintään 8 merkkiä.");
      return;
    }
    setError("");
    setSavingField("password");

    const headers = { ...getAuthHeaders() };
    try {
      // Preferred dedicated password endpoint
      try {
        await axios.put(
          `${ADMINS_URL}/${admin.id}/password`,
          { password: passwordValue },
          { headers: { "Content-Type": "application/json", ...headers } }
        );
      } catch (_) {
        // Fallback to general update with password field
        await axios.put(
          `${ADMINS_URL}/${admin.id}`,
          { password: passwordValue },
          { headers: { "Content-Type": "application/json", ...headers } }
        );
      }
      setPasswordValue("");
      setEditingPassword(false);
    } catch (e) {
      console.error(e);
      setError("Salasanan tallennus epäonnistui.");
    } finally {
      setSavingField(null);
    }
  };

  /** UI */
  return (
    <div className="admin-user-info-page">
      {/* Page header bar */}
      <div style={styles.toolbar}>
        <h2 style={styles.title}>TIEDOT</h2>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      {loading || !admin ? (
        <div style={styles.loading}>Ladataan…</div>
      ) : (
        <div style={styles.card}>
          {/* Name row */}
          <div style={styles.row}>
            <div style={styles.left}>
              <div style={styles.label}>NIMI:</div>
              {!editingName ? (
                <div style={styles.value}>{fullName || "—"}</div>
              ) : (
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  placeholder="Etunimi Sukunimi"
                  style={styles.input}
                />
              )}
            </div>
            <div style={styles.right}>
              {!editingName ? (
                <button
                  style={styles.mutateBtn}
                  onClick={() => setEditingName(true)}
                >
                  Muuta
                </button>
              ) : (
                <div style={styles.editActions}>
                  <button
                    style={styles.saveBtn}
                    onClick={saveName}
                    disabled={savingField === "name"}
                  >
                    {savingField === "name" ? "Tallennetaan…" : "Tallenna"}
                  </button>
                  <button
                    style={styles.cancelBtn}
                    onClick={() => {
                      setEditingName(false);
                      setNameValue(fullName);
                      setError("");
                    }}
                  >
                    Peruuta
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Email row */}
          <div style={styles.row}>
            <div style={styles.left}>
              <div style={styles.label}>SÄHKÖPOSTI:</div>
              {!editingEmail ? (
                <div style={styles.value}>{admin.email || "—"}</div>
              ) : (
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="nimi@esimerkki.fi"
                  style={styles.input}
                />
              )}
            </div>
            <div style={styles.right}>
              {!editingEmail ? (
                <button
                  style={styles.mutateBtn}
                  onClick={() => setEditingEmail(true)}
                >
                  Muuta
                </button>
              ) : (
                <div style={styles.editActions}>
                  <button
                    style={styles.saveBtn}
                    onClick={saveEmail}
                    disabled={savingField === "email"}
                  >
                    {savingField === "email" ? "Tallennetaan…" : "Tallenna"}
                  </button>
                  <button
                    style={styles.cancelBtn}
                    onClick={() => {
                      setEditingEmail(false);
                      setEmailValue(admin.email);
                      setError("");
                    }}
                  >
                    Peruuta
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Password row */}
          <div style={styles.row}>
            <div style={styles.left}>
              <div style={styles.label}>SALASANA:</div>
              {!editingPassword ? (
                <div style={styles.value}>XXXXXXXXXXXXXXXXXX</div>
              ) : (
                <input
                  type="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="Uusi salasana"
                  style={styles.input}
                />
              )}
            </div>
            <div style={styles.right}>
              {!editingPassword ? (
                <button
                  style={styles.mutateBtn}
                  onClick={() => setEditingPassword(true)}
                >
                  Muuta
                </button>
              ) : (
                <div style={styles.editActions}>
                  <button
                    style={styles.saveBtn}
                    onClick={savePassword}
                    disabled={savingField === "password"}
                  >
                    {savingField === "password" ? "Tallennetaan…" : "Tallenna"}
                  </button>
                  <button
                    style={styles.cancelBtn}
                    onClick={() => {
                      setEditingPassword(false);
                      setPasswordValue("");
                      setError("");
                    }}
                  >
                    Peruuta
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Inline styles to match the wireframe look */
const styles = {
  toolbar: {
    display: "flex",
    alignItems: "center",
    background: "#3c3c3c",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: 6,
    marginBottom: 16,
  },
  title: { margin: 0, fontSize: 18, letterSpacing: 1 },
  error: {
    background: "#ffe9e9",
    color: "#8a0000",
    border: "1px solid #ffb4b4",
    padding: "8px 12px",
    borderRadius: 6,
    marginBottom: 12,
  },
  loading: { padding: 12, color: "#555" },
  card: {
    margin: "24px auto",
    maxWidth: 720,
    border: "2px solid #333",
    borderRadius: 8,
    padding: 0,
    background: "#fafafa",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 20px",
  },
  divider: { height: 1, background: "#cfcfcf" },
  left: { flex: "1 1 auto", marginRight: 16 },
  right: { flexShrink: 0, display: "flex", alignItems: "center" },
  label: { fontSize: 12, color: "#555", marginBottom: 6, fontWeight: 700 },
  value: { fontSize: 14, color: "#222", fontWeight: 700 },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: 4,
    border: "1px solid #bbb",
    background: "#fff",
    color: "#222",
  },
  mutateBtn: {
    background: "#e6e6e6",
    color: "#222",
    border: "1px solid #bdbdbd",
    padding: "8px 12px",
    borderRadius: 4,
    cursor: "pointer",
    minWidth: 96,
    fontWeight: 600,
  },
  editActions: { display: "flex", gap: 8 },
  saveBtn: {
    background: "#2f7d32",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 4,
    cursor: "pointer",
    minWidth: 110,
    fontWeight: 600,
  },
  cancelBtn: {
    background: "#fff",
    color: "#333",
    border: "1px solid #bbb",
    padding: "8px 12px",
    borderRadius: 4,
    cursor: "pointer",
    minWidth: 90,
  },
};
