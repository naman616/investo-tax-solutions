import React from "react";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main style={{ paddingTop: 88 }}>{children}</main>
  </>
);

export default Layout; 