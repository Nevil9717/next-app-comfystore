// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const AdminRoute = ({ Component }) => {
//   // const router = useRouter();
//   let token;
//   let roleName;
//   useEffect(() => {
//     token = typeof window !== "undefined" && localStorage?.getItem("token");
//     roleName =
//       typeof window !== "undefined" && localStorage?.getItem("roleName");
//     if (!token || roleName !== "Admin") {
//       // router.push("/not-authorized");
//       console.log("Not Authorized");
//     } else {
//     }
//   }, []);
//   return <Component />;
// };

// export const customerRoute = ({ Component }) => {
//   const token = localStorage?.getItem("token");
//   const roleName = localStorage?.getItem("roleName");
//   if (token && roleName === "Customer") {
//     return <Component />;
//   } else {
//     return redirect("/not-authorized");
//   }
// };

// export const UnAuthRoute = ({ Component }) => {
//   const token = localStorage?.getItem("token");
//   if (token) {
//     return redirect("/");
//   } else {
//     return <Component />;
//   }
// };
// export default AdminRoute;
