import React from "react";

export default function Header() {
  return (
    <header className="header">
      <h1>COVID-19 Status</h1>
      <select>
        <option value="">국내</option>
        <option value="">해외</option>
      </select>
    </header>
  );
}
