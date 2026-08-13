import { useState } from "react";
import MagnifyingGlassIcon from "../../../../../../assets/icons/magnifying-glass.svg?react";
import FolderIcon from "../../../../../../assets/icons/folder.svg?react";
import useApp from "../../../../../../context/AppContext/useApp";
import "./searchbar.css";
import MyFileIcon from "../../../../../../components/MyFileIcon/MyFileIcon";
import ButtonClose from "../../../../../../components/Buttons/ButtonClose/ButtonClose";
import { useNavigate } from "react-router";

function Searchbar() {
  const [search, setSearch] = useState("");
  const { dispatchAppState, allContentItem } = useApp();
  const navigate = useNavigate();

  const handleChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearch(e.target.value);
  };

  const searchResult = search
    ? allContentItem()
        .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
        .slice(-4)
    : null;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchAppState({ type: "setSearch", payload: search });

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) activeElement.blur();
  };

  const openFolder = (id: string) => {
    navigate(`/app/folders/${id}`);

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) activeElement.blur();
  };
  const openFile = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) activeElement.blur();
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-controls">
          <button type="submit">
            <div className="icon-container">
              <MagnifyingGlassIcon />
            </div>
          </button>
          <input
            type="text"
            placeholder="Search in Drive"
            value={search}
            onChange={handleChangeSearch}
          />
          {search && <ButtonClose handleClose={() => setSearch("")} />}
        </div>
        {searchResult && (
          <div className="search-content">
            <ul>
              {searchResult?.map((i) => (
                <li key={i.id}>
                  <button
                    type="button"
                    onClick={() =>
                      i.type === "file" ? openFile(i.fileUrl) : openFolder(i.id)
                    }
                  >
                    <div className="item-icon">
                      {i.type === "file" ? (
                        <MyFileIcon fileName={i.name} />
                      ) : (
                        <div className="icon-container">
                          <FolderIcon />
                        </div>
                      )}
                    </div>
                    {i.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default Searchbar;
