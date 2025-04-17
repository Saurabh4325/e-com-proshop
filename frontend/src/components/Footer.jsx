const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="">
        <div className="footer__container">
          <div className="copyright">Proshop &copy; {currentYear}</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
