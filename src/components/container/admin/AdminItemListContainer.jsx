import React, { useEffect, useState } from "react";
import { DB_SERVER_URL } from "../../../apis/commonApis";
import axios from "axios";
import AdminItemModal from "./AdminItemModal";
import AdminAddItemModal from "./AdminAddItemModal";

const AdminItemListContainer = () => {
  const [itemlist, setItemlist] = useState([]);
  const [filterItem, setFilterItem] = useState([])
  const [search, setSearch] = useState('') 
  const [categories, setCategories] = useState('')


  const fetchModalFn = async () => {
    const Iurl = `${DB_SERVER_URL}/items`;
    try {
      const res = await axios.get(`${Iurl}`);

      setItemlist(res.data);
      setFilterItem(res.data)
      setIsModal(false);
      setIsAddModal(false);
    } catch (err) {
      alert(err);
    }
  };
  
  useEffect(() => {
    const onItemListFn = async () => {
      const Iurl = `${DB_SERVER_URL}/items`;
      try {
        const res = await axios.get(`${Iurl}`);
        // console.log(res.data);
        
        setItemlist(res.data);
        setFilterItem(res.data)
      } catch (err) {
        alert(err);
      }
    };
    onItemListFn();
  }, []);

  const searchChange = (e) => {
    const search = e.target.value;
    setSearch(search)
    
    const filtered = itemlist.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase()) 
    })
    setFilterItem(filtered)
    setCurrentPage(1)
  } 

  const categoriesChange = (e) =>{
    const selectedCategories = e.target.value;
    setCategories(selectedCategories)
    setCurrentPage(1)

    const filtered = selectedCategories
    ? itemlist.filter((item) => item.categories ===  selectedCategories)
    : itemlist
    setFilterItem(filtered)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const totalItem = filterItem.slice(firstItem, lastItem);
  const totalPages =
  filterItem.length > 0 ? Math.ceil(filterItem.length / itemsPerPage) : 1;

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const [isModal, setIsModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [elId, setElId] = useState();

  const adminModalFn = (elId) => {
    console.log(elId);
    setIsModal(true);
    setElId(elId);
  };
  return (
    <>
      {isModal && (
        <AdminItemModal
          elId={elId}
          setIsModal={setIsModal}
          fetchItemList={fetchModalFn}
        />
      )}
      {isAddModal && (
        <AdminAddItemModal
          setIsAddModal={setIsAddModal}
          fetchItemList={fetchModalFn}
        />
      )}
      <div className="admin-list">
        <div className="admin-list-con">
          <div className="h2-con">

            <div className="h2-con1">
              <h2>상품목록 {currentPage}쪽</h2>
            </div>

            <div className="h2-con2">
              <input type="text" placeholder="검색어 입력"
                value={search} onChange={searchChange} />

              <select value={categories} onChange={categoriesChange}>
                <option value="">전체</option>
                <option value="Vodka">보드카</option>
                <option value="Wine">와인</option>
                <option value="Whiskey">위스키</option>
                <option value="Accessories">액세서리</option>
                {/* 필요하면 카테고리 추가 */}
              </select>

              <button onClick={() => setIsAddModal(true)}>
                <img src="/images/admin/addproduct.png" alt="addPrd" /></button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>이름</th>
                <th>가격</th>
                <th>이미지</th>
                <th>사진</th>
                <th>카테고리</th>
                <th>보기</th>
              </tr>
            </thead>
            <tbody>
              {totalItem &&
                totalItem.map((el) => {
                  return (
                    <tr key={el.id}>
                      <td>{el.id}</td>
                      <td>{el.name}</td>
                      <td>{el.price}</td>
                      <td>{el.img}</td>
                      <td>
                        <img src={el.img} alt="img" />
                      </td>
                      <td>{el.categories}</td>
                      <td
                        onClick={() => {
                          adminModalFn(el.id);
                        }}
                        style={{
                          backgroundColor: "#000000",
                          color: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        보기
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="paging">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const nowPage = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => handleClick(page)}
                  style={{
                    backgroundColor: nowPage ? "red" : null,
                    color: nowPage ? "white" : null,
                  }}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={lastItem >= itemlist.length}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminItemListContainer;
