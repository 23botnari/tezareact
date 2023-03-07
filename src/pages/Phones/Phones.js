import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  setPanelTitle,
  setPanelType,
} from "../../redux/actions/sidePanelActions.js";
import { setPhones } from "../../redux/actions/phonesActions.js";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import "./Phones.scss";

function Phones() {
  const { phones } = useSelector((state) => state.PhonesReducer);
  const dispatch = useDispatch();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getPhones = async () => {
    fetch("https://mockend.com/23botnari/teza/phones")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setPhones(data));
        return [...Button(data || [])].map((d) => {
          return d;
        });
      });
  };

  useEffect(() => {
    getPhones();
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const actionButtons = () => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info mr-2"
          onClick={() => {
            dispatch(setIsOpen(true));
            dispatch(setPanelType("Phones"));
            dispatch(setPanelTitle("Update Number"));
          }}
        />
        <Button
          icon="pi pi-envelope"
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => {
            dispatch(setIsOpen(true));
            dispatch(setPanelType("ReadMessages"));
            dispatch(setPanelTitle("Messages - "));
          }}
        />
        <Button
          icon="pi pi-send"
          className="p-button-rounded p-button-help mr-2"
          onClick={() => {
            dispatch(setIsOpen(true));
            dispatch(setPanelType("SendMessages"));
            dispatch(setPanelTitle("Send Message -"));
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger mr-2"
        />
      </>
    );
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const searchKeywords = () => {
    return (
      <>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search keyword"
          />
        </span>
      </>
    );
  };

  return (
    <div>
      <div className="PhoneHeader">
        <div className="PhoneHeader__text">
          <h2>Numbers</h2>
          <div className="PhoneHeader__button">
            <Button
              label="Buy a number"
              icon="pi pi-plus"
              className="p-button-info mr-2"
              onClick={() => {
                dispatch(setIsOpen(true));
                dispatch(setPanelType("Phones"));
                dispatch(setPanelTitle("New Number"));
              }}
            />
            <Button
              icon="pi pi-replay"
              className="p-button-secondary p-button-rounded p-button-outlined mr-2"
              aria-label="Bookmark"
              onClick={refreshPage}
            />
          </div>
        </div>
      </div>
      <DataTable
        value={phones}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        paginator
        rows={10}
        responsiveLayout="scroll"
        dataKey="id"
        filters={filters}
        globalFilterFields={[
          "phoneNumber",
          "company",
          "driverName",
          "truckNumber",
          "trailerNumber",
          "mpMobileUserId",
        ]}
      >
        <Column field="phoneNumber" header="Phone" style={{ width: "200px" }} />
        <Column field="company" header="Company	" />
        <Column field="driverName" header="Driver name	" />
        <Column field="truckNumber" header="Truck number	" />
        <Column field="trailerNumber" header="Trailer number" />
        <Column field="mpMobileUserId" header="MP mobile user id	" />
        <Column body={actionButtons} header={searchKeywords}></Column>
      </DataTable>
    </div>
  );
}
export default Phones;
