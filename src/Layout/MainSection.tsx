const MainSection: React.FC = props => {
  return (
    <section className="flex flex-col grow-[3] max-w-[1000px] min-w-[600px] shadow-lg h-screen pt-28 overflow-auto bg-white">
      {props.children}
    </section>
  );
};

export default MainSection;
