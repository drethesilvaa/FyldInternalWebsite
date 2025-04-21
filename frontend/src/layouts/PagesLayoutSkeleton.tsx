export default function PagesLayoutSkeleton() {
  return (
    <>
      <div className="">
        <div className="skeleton  h-14 w-full"></div>
        <div className="skeleton h-40 w-full"></div>
        <div className="skeleton h-10 w-full "></div>
      </div>
      <div className="custom-container mt-8">
        <div className="flex justify-center">
          <div className="flex gap-2">
            <div className="skeleton h-12 w-80"></div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex w-full flex-col gap-4">
            <div className="skeleton h-52 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-2/3"></div>
            <div className="skeleton h-4 w-2/3"></div>
            <div className="skeleton h-4 w-2/3"></div>
            <div className="skeleton h-4 w-2/3"></div>
          </div>
        </div>
      </div>
      <div className=" skeleton h-60 mt-20"></div>
    </>
  );
}
