import React, { useEffect, useState } from "react";
import { DB_SERVER_URL } from "../../../apis/commonApis";
import axios from "axios";
import AdminAuthModal from "./AdminAuthModal";

const AdminMemberListContainer = () => {

  const [memberlist, setMemberlist] = useState([])
  const [filterMember, setFilterMember] = useState([])
  const [search, setSearch] = useState('')  
  const [memberRole, SetMemberRole] = useState('')

  const fetchModalFn = async ()=>{
    const Murl = `${DB_SERVER_URL}/members`
      try {
        const res = await axios.get(`${Murl}`)
        // console.log(res.data);
        
        // setMemberlist(res.data)
        setFilterMember(res.data)
        setIsModal(false)
      } catch (err) {
        alert(err)
        
      }
  }

  useEffect (()=>{
    const onMemberListFn = async () => {
      const Murl = `${DB_SERVER_URL}/members`
      try {
        const res = await axios.get(`${Murl}`)
        // console.log(res.data);
        
        setMemberlist(res.data)
        setFilterMember(res.data)
      } catch (err) {
        alert(err)
        
      }
    }
    onMemberListFn()
  },[])

  
    const searchChange = (e) => {
      const search = e.target.value;
      setSearch(search)
      
      const filtered = memberlist.filter((member) => {
        return member.userEmail.toLowerCase().includes(search.toLowerCase()) 
        || member.userName.toLowerCase().includes(search.toLowerCase())
        || member.address.includes(search)
      })
      setFilterMember(filtered)
      setCurrentPage(1)
    } 
    const roleChange = (e) => {
      const selectedRole = e.target.value;
      SetMemberRole(selectedRole)
      setCurrentPage(1)

      const filtered = selectedRole
      ? memberlist.filter((member) => member.role === selectedRole)
      : memberlist
      setFilterMember(filtered)
    }

    const [currentPage, setCurrentPage] = useState(1)
    const membersPerPage = 10
  
    const lastmember = currentPage * membersPerPage
    const firstmember = lastmember - membersPerPage
    const totalmember = memberlist.slice(firstmember, lastmember)
    const searchMember = filterMember.slice(firstmember, lastmember)
    const totalPages = memberlist.length > 0 ? Math.ceil(memberlist.length / membersPerPage):1;

    const handleClick = (page) => {
      setCurrentPage(page);
    };

  const [isModal, setIsModal] = useState(false)
  const [elId, setElId] = useState()

  const adminModalFn =(elId) => {
    // console.log(elId);
    setIsModal(true)
    setElId(elId)
  }
  
  
  return (
    <>
    {isModal && <AdminAuthModal elId={elId} setIsModal={setIsModal} 
    fetchMemberList={fetchModalFn} />}
    <div className="admin-list">
      <div className="admin-list-con">
        <div className="h2-con">
          <div className="h2-con1">
            <h2>회원목록{currentPage} 쪽</h2>
          </div>
          <div className="h2-con2">
            <input type="text" placeholder="검색어 입력"
              value={search} onChange={searchChange} />
            <select value={memberRole} onChange={roleChange}>
              <option value="">전체</option>
              <option value="ROLE_ADMIN">관리자</option>
              <option value="ROLE_MEMBER">일반회원</option>
              {/* 필요하면 카테고리 추가 */}
            </select>
          </div>
          </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>이메일</th>
              <th>비밀번호</th>
              <th>이름</th>
              <th>나이</th>
              <th>지역</th>
              <th>권한</th>
              <th>보기</th>
            </tr>
          </thead>
          <tbody>
            {searchMember && searchMember.map((el) => {
              return(
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.userEmail}</td>
                  <td>{el.userPw}</td>
                  <td>{el.userName}</td>
                  <td>{el.age}</td>
                  <td>{el.address}</td>
                  <td>{el.role}</td>
                  <td onClick={()=>{
                    adminModalFn(el.id)
                  }} style={{
                    backgroundColor: '#000000',
                    color: '#ffffff', cursor: 'pointer'
                  }}> 
                  보기</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="paging">
          <button onClick={() => setCurrentPage(prev => prev - 1)} 
          disabled={currentPage === 1}>이전</button>
          {[...Array(totalPages)].map((_,index)=>{
            const page = index +1
            const nowPage = currentPage === page
            return(
              <button
              key={page}
              onClick={()=> handleClick(page)}
              style={{backgroundColor : nowPage ?'red': null,
                color : nowPage ? 'white' : null
              }}>
                {page} 
              </button>
            )
          })}
          <button onClick={() => setCurrentPage(prev => prev + 1)} 
          disabled={lastmember >= memberlist.length}>다음</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminMemberListContainer;
