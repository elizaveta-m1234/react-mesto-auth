function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer page__footer">
      <p className="footer__text">
        &copy; {year} Mesto Russia
      </p>
  </footer>
  )
}

export default Footer