import { Card } from "~/components";
import TransactionForm from "./_parts/TransactionForm";
import PoolDetails from "./_parts/PoolDetails";

export default function page() {
  return (
    <Card>
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
        <div className="col-span-full lg:col-span-7">
          <PoolDetails />
        </div>
        <div className="col-span-full lg:col-span-4">
          <TransactionForm />
        </div>
      </div>
    </Card>
  );
}
