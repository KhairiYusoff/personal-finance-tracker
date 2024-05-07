const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center mt-8">{children}</div>
  );
};

export default Layout;
