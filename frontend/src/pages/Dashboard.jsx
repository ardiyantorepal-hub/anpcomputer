function Dashboard() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin) {
    window.location.href = "/";
    return null;
  }

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <p>Selamat datang, {admin.username}</p>

      <button
        onClick={() => {
          localStorage.removeItem("admin");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
