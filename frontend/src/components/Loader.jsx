import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <Oval
        height={50}
        width={50}
        color="#ffbf00"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#333"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
