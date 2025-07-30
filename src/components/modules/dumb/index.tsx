import { Link } from "react-router-dom";

import AppLayout from "@/components/layouts/app-layout";

import { RouteNames } from "@/services/app/route-names";

import SomeCard from "./some-card";

function DumbPage() {
  return (
    <div>
      <h1>DumbPage</h1>
      <p>
        Go back to <Link to={RouteNames.Home}>Home</Link>
      </p>
      <SomeCard>Hello</SomeCard>
      <AppLayout></AppLayout>
    </div>
  );
}

export default DumbPage;
