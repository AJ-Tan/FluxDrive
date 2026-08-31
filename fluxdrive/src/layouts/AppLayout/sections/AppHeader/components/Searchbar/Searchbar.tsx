import { useEffect, useState } from "react";
import MagnifyingGlassIcon from "../../../../../../assets/icons/magnifying-glass.svg?react";
import FolderIcon from "../../../../../../assets/icons/folder.svg?react";
import "./searchbar.css";
import MyFileIcon from "../../../../../../components/MyFileIcon/MyFileIcon";
import ButtonClose from "../../../../../../components/Buttons/ButtonClose/ButtonClose";
import { useNavigate, useSearchParams } from "react-router";
import { fetch_searchContent } from "../../../../../../services/search-service";
import type { AllContentItemType } from "../../../../../../context/AppContext/AppProvider";

function Searchbar() {
  const [search, setSearch] = useState("");
  const [searchContent, setSearchContent] = useState<AllContentItemType[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const clearSearch = () => {
      const searchQuery = searchParams.get("search");
      if (!searchQuery) setSearch("");
    };

    clearSearch();
  }, [searchParams]);

  const handleChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetch_searchContent(search).then((res) => {
      if (!res.ok) return res;
      setSearchContent([
        ...res.data.searchFolder.map((folder) => ({
          ...folder,
          type: "folder" as const,
        })),
        ...res.data.searchFile.map((file) => ({
          ...file,
          type: "file" as const,
        })),
      ]);
    });
  }, [search]);

  const searchResult = search
    ? searchContent
        .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
        .slice(-4)
    : null;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatchAppState({ type: "setSearch", payload: search });
    if (search) navigate(`/app?search=${search}`);
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

  const handleClose = () => {
    setSearch("");
    navigate("/app");
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
          {search && <ButtonClose handleClose={handleClose} />}
        </div>
        {searchResult && searchResult.length > 0 && (
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
