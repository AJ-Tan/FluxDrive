import { Link } from "react-router";
import "./columnSiteMaps.css";

type ColumnSiteMapsProps = {
  siteMaps: {
    col: number;
    title: string;
    links: {
      text: string;
      link: string;
    }[];
  }[];
};

// [[{title, links}]]

type ColumnsDataType = {
  title: string;
  links: {
    text: string;
    link: string;
  }[];
}[][];

function ColumnSiteMaps({ siteMaps }: ColumnSiteMapsProps) {
  return (
    <div className="sitemaps-columns">
      {siteMaps
        .reduce((prev: ColumnsDataType, { col, title, links }) => {
          if (!prev[col - 1]) prev[col - 1] = [];
          prev[col - 1].push({ title, links });
          return prev;
        }, [])
        .map((group, groupIndex) => (
          <div key={`columns-group-${groupIndex}`} className="columns-group">
            {group.map((item, itemIndex) => (
              <div
                key={`${item.title}-${itemIndex}`}
                className={`columns-item`}
              >
                <span className="item-title">{item.title}</span>
                <ul className="item-links">
                  {item.links.map((linkItem, linkIndex) => (
                    <li key={`${linkItem.text}-${linkIndex}`}>
                      <Link
                        to={linkItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {linkItem.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default ColumnSiteMaps;
