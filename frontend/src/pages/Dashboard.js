import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));

  const logout = () => {
    if (!window.confirm("Yakin ingin logout?")) return;
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>ANP Computer</h2>
          <p style={styles.subtitle}>
            Selamat datang{admin?.username ? `, ${admin.username}` : ""}
          </p>
        </div>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* STAT CARD */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3 style={styles.statTitle}>Status Halaman</h3>
          <p style={styles.statValue}>Dashboard Admin</p>
        </div>

        <div style={styles.statCard}>
          <h3 style={styles.statTitle}>Status Sistem</h3>
          <p style={{ ...styles.statValue, color: "#4caf50" }}>Online</p>
        </div>

        <div style={styles.statCard}>
          <h3 style={styles.statTitle}>Role</h3>
          <p style={styles.statValue}>Administrator</p>
        </div>
      </div>

      {/* MENU */}
      <div style={styles.menu}>
        <div style={styles.menuCard}>
          <h3>Manajemen Produk</h3>
          <p>Kelola Produk, Accesories, Sparepart Komputer</p>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/produk")}
          >
            Kelola Produk
          </button>
        </div>

        <div style={styles.menuCard}>
          <h3>Informasi</h3>
          <p>Aplikasi CRUD Toko Komputer</p>
          <span style={styles.badge}>Laravel + React</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "linear-gradient(135deg, #1C4D8D)",
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    marginBottom: "30px"
  },
  subtitle: {
    marginTop: "5px",
    color: "#ffffffff"
  },
  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  statTitle: {
    margin: 0,
    marginBottom: "10px",
    color: "#555"
  },
  statValue: {
    fontSize: "18px",
    fontWeight: "bold"
  },
  menu: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },
  menuCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "260px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  primaryBtn: {
    marginTop: "15px",
    padding: "10px 15px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  badge: {
    display: "inline-block",
    marginTop: "10px",
    padding: "6px 12px",
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold"
  }
};

export default Dashboard;
