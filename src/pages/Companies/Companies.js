import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CompaniesService } from "./CompaniesService";
import "./Companies.scss";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import SidePanelTemplate from "../../components/containers/SidePanel/SidePanelTemplate";
function Companies() {
  const [companies, setCompanies] = useState("");
  const [companiesName, setCompaniesName] = useState("");
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [companiesIsActive, setCompanieIsActive] = useState();
  const onClose = () => setPanelOpen(false);

  useEffect(() => {
    CompaniesService.getCompanies().then((data) => setCompanies(data));
  }, []);

  const statusCircle = (rowData) => {
    return (
      <i
        className={"pi pi-circle-fill"}
        style={{ color: rowData.isActive ? "green" : "red" }}
      ></i>
    );
  };
  const editButton = () => {};
  const actionButtons = () => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info mr-2"
          onClick={() => setPanelOpen(!isPanelOpen)}
        ></Button>
      </React.Fragment>
    );
  };

  const handleAddElement = () => {
    setCompanies([
      ...companies,
      {
        id: companies.length + 1,
        name: companiesName,
        isActive: companiesIsActive,
        createdAt: new Date().toLocaleDateString("en-GB"),
        updatedAt: new Date().toLocaleDateString("en-GB"),
      },
    ]);
  };
  const handleElementNameChange = (event) => {
    setCompaniesName(event.target.value);
  };

  return (
    <div className="CompaniesContent">
      <div className="CompaniesTable">
        <div className="CompaniesTableHeader">
          <div className="CompaniesTableHeader__text">
            <h3>Companies</h3>
            <div className="CompaniesTableHeader__button">
              <Button
                label="Add Company"
                icon="pi pi-plus"
                className="p-button-info mr-2"
                onClick={handleAddElement}
              />
              <InputText
                id="name"
                value={companies.name}
                onChange={handleElementNameChange}
              />
              <label htmlFor="active" className="ml-2">
                Active:
              </label>
              <Checkbox
                inputId="active"
                checked={companiesIsActive}
                onChange={(e) => setCompanieIsActive(e.checked)}
              />
            </div>
          </div>
          <DataTable value={companies} responsiveLayout="scroll">
            <Column field="name" header="Name" />
            <Column body={statusCircle} dataType="boolean" header="Is active	" />
            <Column field="createdAt" header="Created at	" dataType="date" />
            <Column field="updatedAt" header="Updated at	" />
            <Column body={actionButtons} header="Actions"></Column>
          </DataTable>
        </div>
      </div>
      <div className="sidepanela">
        {isPanelOpen && (
          <SidePanelTemplate  title="si ti doare" content="help"/>
        )}
      </div>
    </div>
  );
}
export default Companies;