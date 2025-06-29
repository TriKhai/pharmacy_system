import EntityStats from "../../components/layout/EntityStats";
import RevenueLineChart from "../../components/layout/RevenueLineChart";

export default function ThongKe() {
  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold">Thống kê hệ thống</h2>
        <div className="grid gap-6 p-6">
            <EntityStats />
            <RevenueLineChart />
        </div>
    </div>
  );
}
