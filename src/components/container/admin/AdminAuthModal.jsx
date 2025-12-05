import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { DB_SERVER_URL } from '../../../apis/commonApis'

const AdminAuthModal = ({elId, setIsModal, fetchMemberList}) => {
  // console.log(elId)

  const [member, setMember] = useState({})
  const dataURL = `${DB_SERVER_URL}/members`

  useEffect(() => {

    const onAuthMemberGetFn = async (memberId) => {
      try {
        const res = await axios.get(`${dataURL}?id=${memberId}`)  // 조회
        // console.log(res + " res")
        // console.log(res.data)
        // console.log(res.data[0])
        setMember(res.data[0])
      } catch (err) {
        alert(err)
      }
    }
    onAuthMemberGetFn(elId)
  }, [elId])  // id가 변할 때마다 
  const onChangeUpdateFn = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(name + " , " + value)
    // setUpdate({ ...update, [name]: value })
    setMember({ ...member, [name]: value })
  }

  const options = [
    { op: 'MEMBER', val: 'ROLE_MEMBER' },
    { op: 'ADMIN', val: 'ROLE_ADMIN' },
  ]

  const navigate = useNavigate()
  const updateOkFn = async () => {
    const updateAxiosFn = async (updatData) => {
      try {

        //=============================
        // 회원이 존재 하는 지 확인 -> 같은 아이디가 존재 하면 -> 회원수정 실행
        // 아이디가  없으면 -> 회원이 아님 -> 회원만 수정 가능
        const res1 = await axios.get(`${dataURL}`)  // 조회
        const num = res1.data.findIndex(el => {
          return el.id === member.id
        })
        if (num === -1) {
          alert('회원이 존재하지 않습니다! 회원가입 먼저해주세요~')
          return
        }
        //=============================
        alert('회원수정실행!')
        const res = await axios.put(`${dataURL}/${updatData.id}`, updatData)
        console.log(res + ' <<< 회원 수정 res')
        // setMember([...member, res.data[0]])
        console.log('닫기');
        
        setIsModal(false)
        fetchMemberList()
        
      } catch (err) {
      }
    }
    updateAxiosFn(member)
  }
  const deleteOkFn = (e) => {
    
    const deleteAxiosFn = async (memberId) => {
      try {
        
        const res1 = await axios.get(`${dataURL}`)  // 조회
        const num = res1.data.findIndex(el => {
          return el.id === member.id
        })
        if (num === -1) {
          alert('회원이 존재하지 않습니다! 회원가입 먼저해주세요~')
          return
        }
        if(window.confirm("회원삭제실행")){
          const res = await axios.delete(`${dataURL}/${memberId}`)
          console.log(res + ' <<< 회원 삭제 res')
          fetchMemberList()
        }else {
          alert('회원삭제취소')
        }  
      } catch (err) {
      }
    }
    deleteAxiosFn(member.id)
  }

  return (
    <div className="admin-modal">
      <div className="admin-modal-con">
        <span className="close" onClick={() => { setIsModal(false) }}>X</span>
        <h1>{member.userName}님 상세정보</h1>
        <div className="admin-modal-container">

        <ul>
          {/* 아이디 숨기기*/}
          <li>
            <label htmlFor="id">ID</label>
            <input type="text" name="id" id="id" value={member.id || ''} readOnly
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="userEmail">이메일</label>   {/* 이메일 수정 불가능 */}
            <input type="email" name="userEmail" id="userEmail" readOnly placeholder='EMAIL'
            // {/* <input type="email" name="userEmail" id="userEmail" placeholder='EMAIL' */}
            value={member.userEmail || ''}
            onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="userPw">비빌번호</label>
            <input type="password" name="userPw" id="userPw" placeholder='PASSOWR'
              value={member.userPw || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="userName">이름</label>
            <input type="text" name="userName" id="userName" placeholder='NAME'
              value={member.userName || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="age">나이</label>
            <input type="text" name="age" id="age" placeholder='AGE'
              value={member.age || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="address">주소</label>
            <input type="text" name="address" id="address" placeholder='ADDRESS'
              value={member.address || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="role">ROLE</label>
            <select name="role" id="role" value={member.role || ''}
              onChange={onChangeUpdateFn}>
              {options.map((el) => (
                <option key={el.val} value={el.val}>{el.op}</option>
              ))}
            </select>
          </li>
          <li>
            <button onClick={updateOkFn} >회원수정</button>
            <button onClick={deleteOkFn}>회원삭제</button>
            <button onClick={() => navigate('/')}>HOME</button>
          </li>

        </ul>
              </div>
      </div>
    </div>
  )
}
export default AdminAuthModal