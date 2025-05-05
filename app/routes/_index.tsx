import type { MetaFunction } from "@remix-run/node";
import { Outlet, useNavigate } from '@remix-run/react';
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, []);
  return (
    <>
    <Outlet></Outlet>
    </>
  )
}

