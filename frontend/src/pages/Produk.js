import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Produk() {
  const navigate = useNavigate();

  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nama_produk: "",
    kategori: "",
    harga: "",
    stok: ""
  });

  const logout = () => {
    if (!window.confirm("Yakin ingin logout?")) return;
    localStorage.removeItem("admin");
    navigate("/");
  };

  const loadProduk = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products");
      setProduk(res.data);
    } catch {
      alert("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduk();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/api/products/${editId}`,
          form
        );
        setEditId(null);
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/products",
          form
        );
      }

      setForm({ nama_produk: "", kategori: "", harga: "", stok: "" });
      loadProduk();
    } catch {
      alert("Gagal menyimpan data");
    }
  };

  const edit = (p) => {
    setEditId(p.id);
    setForm({
      nama_produk: p.nama_produk,
      kategori: p.kategori,
      harga: p.harga,
      stok: p.stok
    });
  };

  const hapus = async (id) => {
    if (!window.confirm("Hapus produk ini?")) return;
    await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
    loadProduk();
  };

  if (loading) {
    return <h2 style={{ padding: 30 }}>Loading produk...</h2>;
  }

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Manajemen Produk</h2>
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            style={styles.dashboardBtn}
          >
            Dashboard
          </button>

          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* FORM */}
      <div style={styles.card}>
        <h3>{editId ? "Edit Produk" : "Tambah Produk"}</h3>

        <form onSubmit={submit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Nama Produk"
            value={form.nama_produk}
            onChange={e => setForm({ ...form, nama_produk: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Kategori"
            value={form.kategori}
            onChange={e => setForm({ ...form, kategori: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Harga"
            value={form.harga}
            onChange={e => setForm({ ...form, harga: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Stok"
            value={form.stok}
            onChange={e => setForm({ ...form, stok: e.target.value })}
            required
          />

          <button style={styles.saveBtn}>
            {editId ? "Update Produk" : "Simpan Produk"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div style={styles.card}>
        <h3>Daftar Produk</h3>

        <table style={styles.table}>
  <thead>
    <tr>
      <th style={styles.th}>Nama</th>
      <th style={styles.th}>Kategori</th>
      <th style={styles.th}>Harga</th>
      <th style={styles.th}>Stok</th>
      <th style={styles.th}>Aksi</th>
    </tr>
  </thead>
  <tbody>
    {produk.length === 0 ? (
      <tr>
        <td colSpan="5" style={styles.empty}>
          Belum ada produk
        </td>
      </tr>
    ) : (
      produk.map(p => (
        <tr
          key={p.id}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f9fafb"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
        >
          <td style={styles.td}>{p.nama_produk}</td>
          <td style={styles.td}>{p.kategori}</td>
          <td style={styles.td}>Rp {Number(p.harga).toLocaleString()}</td>
          <td style={styles.td}>{p.stok}</td>
          <td style={styles.td}>
            <button style={styles.editBtn} onClick={() => edit(p)}>
              Edit
            </button>
            <button style={styles.deleteBtn} onClick={() => hapus(p.id)}>
              Hapus
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
  
</table>

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
    marginBottom: "20px"
  },
  dashboardBtn: {
    padding: "8px 14px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px"
  },
  logoutBtn: {
    padding: "8px 14px",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  saveBtn: {
    gridColumn: "1 / -1",
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  editBtn: {
    marginRight: "5px",
    padding: "6px 10px",
    backgroundColor: "#ff9800",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  deleteBtn: {
    padding: "6px 10px",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  th: {
  backgroundColor: "#f1f5f9",
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  fontWeight: "600"
},
td: {
  padding: "10px",
  borderBottom: "1px solid #ddd"
},
empty: {
  textAlign: "center",
  padding: "20px",
  color: "#777"
},

};



export default Produk;
