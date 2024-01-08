import { memo } from "react";

const Square = ({ item, onClick }: { item: any; onClick: any }) => {
  return (
    <div
      className="aspect-square border-2 border-white grid place-content-center cursor-pointer"
      onClick={onClick}
    >
      <div className="text-[50px]">{item?.value}</div>
    </div>
  );
};

export default memo(Square);
