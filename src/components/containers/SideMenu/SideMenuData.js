import React,{useState} from "react";
export  const SideMenuData = [
    {
      label: "Dashboard",
      icon: "pi pi-table",
      link: "/",
    },
    {
      label: "Trips",
      icon: "pi pi-directions",
    },
    {
      label: "Add Trip",
      icon: "pi pi-plus-circle",
    },
    {
      label: "Phones",
      icon: "pi pi-phone",
      link: "/phones",
    },
    {
      label: "Companies",
      icon: "pi pi-building",
      link: "/companies",
    },
    {
      label: "Log Out",
      icon: "pi pi-sign-out",
      link: "",
    },
  ];

export function TEXT(){
  const [open, setopen] = useState(true)
  const toggleOpen = () => {
        setopen(!open)
    }
  return(<>TEXT</>)
}
