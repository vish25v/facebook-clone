import Image from "next/image";

function SidebarRow({ src, Icon, title }) {
  return (
    <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
      {src && (
        <Image
          className="rounded-full"
          src={src}
          width={30}
          height={30}
          layout="fixed"
        />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <span className="hidden xl:inline-flex font-medium pr-28">{title}</span>
    </div>
  );
}

export default SidebarRow;
