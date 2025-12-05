import React, { useEffect, useState } from 'react'
import { DB_SERVER_URL } from '../../../apis/commonApis'
import axios from 'axios'
import AdminLoctionModal from './AdminLoctionModal'
import AdminAddLoctionModal from './AdminAddLoctionModal'
import AdminLocationMapModal from './AdminLocationMapModal'

const AdminOrderLocationContainer = () => {

  const [location, setlocation] = useState([])
  const [tShop, setTShop] = useState();
  const [filterItem, setFilterItem] = useState([])
  const [search, setSearch] = useState('')
  

    const locationFn = (shopName) => {
      console.log(shopName);
      setTShop(shopName);
  
      setIsMapModal(true);
    };


  const fetchModalFn = async () => {
    const Lurl = `${DB_SERVER_URL}/order`
    try {
      const res = await axios.get(`${Lurl}`);

      // setlocation(res.data);
      setFilterItem(res.data)
      setIsModal(false);
      setIsAddModal(false);
      setIsMapModal(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect (()=>{
    const onLocationListFn = async () => {
      const Lurl = `${DB_SERVER_URL}/order`
      try {
        const res = await axios.get(`${Lurl}`)
        
        setlocation(res.data)
        setFilterItem(res.data)
        // console.log(res.data);
      } catch (err) {
        alert(err)
        
      }
    }
    onLocationListFn()
  },[])

  const searchChange = (e) => {
    const search = e.target.value;
    setSearch(search)
    
    const filtered = location.filter((item) => {
      return item.name.includes(search) 
      || item.number.includes(search)
    })
    setFilterItem(filtered)
    setCurrentPage(1)
  }

  const [currentPage, setCurrentPage] = useState(1)
      const locationPerPage = 10
    
      const lastlocation = currentPage * locationPerPage
      const firstlocation = lastlocation - locationPerPage
      const totallocation = filterItem.slice(firstlocation, lastlocation)
      const totalPages = 
      filterItem.length > 0 ? Math.ceil(filterItem.length / locationPerPage):1;
    
      const handleClick = (page) => {
        setCurrentPage(page);
      };

  const [isAddModal, setIsAddModal] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isMapModal, setIsMapModal] = useState(false);
  const [elId, setElId] = useState();

  const adminModalFn = (elId) => {
    console.log(elId);
    setIsModal(true);
    setElId(elId);
  };

  return (
    <>
      {isModal && (
        <AdminLoctionModal
          elId={elId}
          setIsModal={setIsModal}
          fetchLocationList={fetchModalFn}
          />
        )}
      {isAddModal && (
        <AdminAddLoctionModal
        setIsAddModal={setIsAddModal}
        fetchLocationList={fetchModalFn}
        />
      )}
      {isMapModal && (
        <AdminLocationMapModal
          tShop={tShop}
          setIsMapModal={setIsMapModal}
        />
      )}
      <div className="admin-list">
        <div className="admin-list-con">
        <div className="h2-con">
          <div className="h2-con1">
            <h2>지점목록 {currentPage}쪽</h2>
          </div>
          <div className="h2-con2">
            <input type="text" placeholder="검색어 입력"
            value={search} onChange={searchChange} />
            <button onClick={() => setIsAddModal(true)}>
            <img src="/images/admin/addlocation.png" alt="addloc" /></button>
          </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>지점명</th>
                <th>전화번호</th>
                <th>x좌표</th>
                <th>y좌표</th>
                <th>이미지</th>
                <th>지도보기</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {totallocation &&
                totallocation.map((el) => {
                  return (
                    <tr key={el.id}>
                      <td>{el.name}</td>
                      <td>{el.number}</td>
                      <td>{el.x}</td>
                      <td>{el.y}</td>
                      <td>
                        <img src={el.img} alt="img" />
                      </td>
                      <td
                        onClick={() => {
                          locationFn(el.name);
                        }}
                        style={{
                          backgroundColor: "#000000",
                          color: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        지도보기
                      </td>
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
                        상세보기
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
              disabled={lastlocation >= location.length}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminOrderLocationContainer