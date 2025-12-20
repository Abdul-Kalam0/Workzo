export const Footer = () => {
  return (
    <>
      <footer
        className="my-4 border-bottom py-3"
        style={{ backgroundColor: "#f3f1f8" }}
      >
        <p>&copy; {new Date().getFullYear()} Workzo. All rights reserved.</p>
      </footer>
    </>
  );
};
