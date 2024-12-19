// https://www.greatfrontend.com/questions/user-interface/file-explorer
import { useState, useEffect } from "react";

export default function FileExplorer({ data }) {
  const [isExpand, setIsExpand] = useState({});

  useEffect(() => {
    let newExpandData = {};

    for (let item of data) {
      if (item.hasOwnProperty("children")) {
        newExpandData = {
          ...newExpandData,
          [item.id]: false,
        };
      }
    }

    setIsExpand(newExpandData);
  }, [data]);

  const sortedData = data.sort((a, b) => {
    const aIsFolder = a.hasOwnProperty("children");
    const bIsFolder = b.hasOwnProperty("children");

    if (aIsFolder && !bIsFolder) {
      return -1;
    }

    if (aIsFolder === bIsFolder) {
      const aName = a.name;
      const bName = b.name;

      if (aName < bName) {
        return -1;
      }
    }
  });

  return (
    <div>
      {sortedData.map((item) => {
        const isFolder = item.hasOwnProperty("children");

        return (
          <>
            <div className="folder">
              {isFolder && (
                <button
                  onClick={() => {
                    setIsExpand({
                      ...isExpand,
                      [item.id]: !isExpand[item.id],
                    });
                  }}
                >
                  {isExpand[item.id] ? "v" : ">"}
                </button>
              )}
              <div>{item.name}</div>
            </div>
            {isFolder && isExpand[item.id] && (
              <div className="sub-folder">
                <span></span>
                <FileExplorer data={item.children} />
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
