import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: "center", padding: "10px", color: "#000" }}>
      &copy; {currentYear} All rights reserved Cardinals Design.
    </footer>
  );
}

export default Footer;
