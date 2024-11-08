interface DetailBoxProps {
  data: { title: string; value: React.ReactNode | string }[];
}

export const DetailBox = ({ data }: DetailBoxProps) => {
  return (
    <div className="p-4 rounded-lg bg-primary-100">
      <div className="grid grid-cols-1 gap-2">
        {data.map((item, index) =>
          item.value ? (
            <div key={index} className="flex gap-4 items-center">
              <div className="font-bold">{item.title}</div>
              {typeof item.value === 'string' ? (
                <div>{item.value}</div>
              ) : (
                item.value
              )}
            </div>
          ) : (
            ''
          )
        )}
      </div>
    </div>
  );
};
