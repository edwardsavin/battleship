function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const footerWrapper = document.createElement("div");
  footerWrapper.classList.add("footer-wrapper");

  const p = document.createElement("p");
  p.innerHTML = `Copyright © ${new Date().getFullYear()}`;

  const a = document.createElement("a");
  a.classList.add("footer-link");
  a.href = "https://edwardcs.com";
  a.target = "_blank";
  a.textContent = "Edward Savin";

  footerWrapper.appendChild(p);
  footerWrapper.appendChild(a);
  footer.appendChild(footerWrapper);

  return footer;
}

export default createFooter;
