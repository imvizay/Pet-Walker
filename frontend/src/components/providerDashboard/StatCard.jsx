function StatCard({ value, label }) {
  return (
    <div className="statCard">
      <h3>{value}</h3>
      <span>{label}</span>
    </div>
  );
}
export default StatCard;
