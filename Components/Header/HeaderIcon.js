function HeaderIcon({ Icon, active }) {
  return (
    <div className="group flex items-center cursor-pointer md:px-8 sm:h-14 hover:bg-gray-100 rounded-xl active:border-b-2 active:border-blue-100 ">
      <Icon
        className={`h-7 text-gray-500 text-center  mx-auto group-hover:text-blue-500 ${
          active && "text-blue-500"
        }`}
      />
    </div>
  );
}

export default HeaderIcon;
