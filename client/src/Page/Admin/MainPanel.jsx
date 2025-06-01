import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CHECK_AUTH } from "../../graphql/queries";
import { AuthVerify } from "../../redux/Slice/userSlice";

export default function MainPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, loading, error } = useQuery(CHECK_AUTH, {
    fetchPolicy: "no-cache",
    onError: (err) => {
      console.error("CHECK_AUTH error:", err.message);
    },
  });

  useEffect(() => {
    if (loading) return;

    if (error) {
      console.error("Error checking authentication:", error.message);
    } else if (data?.checkAuth) {
      dispatch(AuthVerify(data.checkAuth));

      navigate("/admin/dashboard");
    }
  }, [loading, error, data, dispatch, navigate, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}
