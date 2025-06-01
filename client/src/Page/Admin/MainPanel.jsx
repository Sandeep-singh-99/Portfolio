import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { CHECK_AUTH } from '../../graphql/queries'
import { AuthVerify } from '../../redux/Slice/userSlice'

export default function MainPanel() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, loading, error} = useQuery(CHECK_AUTH, {
    fetchPolicy: 'network-only',
  })

 useEffect(() => {
  if (loading) return;

  if (error) {
    navigate('/admin/login');
  } else if (data) {
    console.log("Auth data:", data.checkAuth);
    dispatch(AuthVerify(data.checkAuth));
  }
}, [loading, error, data, dispatch, navigate]);

  return (
    <>
    <Outlet/>
    </>
  )
}
