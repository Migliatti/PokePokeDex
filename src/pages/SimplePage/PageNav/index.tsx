import { useNavigate } from "react-router-dom";
import style from "./PageNav.module.css";
import { useEffect, useState } from "react";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface Props {
  currentPage: number;
  totalPages: number;
}

const PageNav = ({ currentPage, totalPages }: Props) => {
  const navigate = useNavigate();
  const [prevsPages, setPrevsPages] = useState<number[]>();
  const [nextsPages, setNextsPages] = useState<number[]>();

  useEffect(() => {
    let prevs = [];
    let nexts = [];
    let i_p = currentPage - 3;
    let i_n = currentPage + 3;

    while (i_p < currentPage) {
      prevs.push(i_p);
      i_p++;
    }
    setPrevsPages(prevs);

    while (i_n > currentPage) {
      nexts.push(i_n);
      i_n--;
    }
    setNextsPages(nexts.reverse());
  }, [currentPage]);

  if (!prevsPages && nextsPages) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.page__nav}>
      {currentPage === 1 ? (
        <div></div>
      ) : (
        <>
          <BiFirstPage
            className={style.arrow_page}
            onClick={() => {
              navigate(`/page/${1}`);
            }}
          />
          <MdNavigateBefore
            className={style.arrow_page}
            onClick={() => {
              navigate(`/page/${currentPage - 1}`);
            }}
          />
        </>
      )}

      {prevsPages?.map((prev, index) => {
        if (prev >= 1) {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`/page/${prev}`);
              }}
              className={style.page_button}
            >
              {prev}
            </div>
          );
        }
        return null;
      })}
      <div className={style.current_page}>{currentPage}</div>
      {nextsPages?.map((next, index) => {
        if (next <= totalPages) {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`/page/${next}`);
              }}
              className={style.page_button}
            >
              {next}
            </div>
          );
        }
        return null;
      })}
      {currentPage === totalPages ? (
        <div></div>
      ) : (
        <>
          <MdNavigateNext
            className={style.arrow_page}
            onClick={() => {
              navigate(`/page/${currentPage + 1}`);
            }}
          />
          <BiLastPage
            className={style.arrow_page}
            onClick={() => {
              navigate(`/page/${totalPages}`);
            }}
          />
        </>
      )}
    </div>
  );
};

export default PageNav;
