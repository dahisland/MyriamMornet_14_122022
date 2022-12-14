import React, { useContext } from "react";
import { tableListContext } from "./ListTableContext";

const ListTableBody = () => {
  const { dataFiltered } = useContext(tableListContext);
  const { stateTablePage } = useContext(tableListContext);
  const { actionDeleteListItem } = useContext(tableListContext);
  const { tableBodyLabels } = useContext(tableListContext);
  const { contentDeleteEntry } = useContext(tableListContext);
  const { contentSearchNotFound } = useContext(tableListContext);
  const { formatDate } = useContext(tableListContext);
  const { numberDataDisplayed } = useContext(tableListContext);

  // Function to filter data displayed by page.
  // Max 10 data elements are displayed
  // Depend on useState() "table Page", who set page number depending on array data length
  function getDataDisplayedByPage() {
    return dataFiltered.filter(
      (item) =>
        numberDataDisplayed * (stateTablePage + 1) - numberDataDisplayed <=
          dataFiltered.indexOf(item) &&
        dataFiltered.indexOf(item) < numberDataDisplayed * (stateTablePage + 1)
    );
  }

  return (
    <React.Fragment>
      {getDataDisplayedByPage().length !== 0 ? (
        <React.Fragment>
          {getDataDisplayedByPage().map((item, index) => (
            <div key={"listBody-row-" + index} className="listTable-bodyRow">
              {Object.entries(item).map((keyValue, index) => (
                <p
                  key={"bodyRowContent-" + index}
                  className={"bodyRow-content bodyRowContent-" + keyValue[0]}
                >
                  {tableBodyLabels.find((tab) => tab.keyRef === keyValue[0]) ? (
                    <span className="bodyRowContent-label">
                      {tableBodyLabels.find((tab) => tab.keyRef === keyValue[0])
                        .label + " : "}
                    </span>
                  ) : null}
                  <span className="bodyRowContent-value">
                    {typeof keyValue[1] === "number"
                      ? formatDate(new Date(keyValue[1]))
                      : keyValue[1]}
                  </span>
                </p>
              ))}
              <div
                className="bodyRowContent--delete"
                id={"bodyRowContent-delete-" + index}
                onClick={() => actionDeleteListItem(item)}
              >
                {contentDeleteEntry}
              </div>
            </div>
          ))}
        </React.Fragment>
      ) : (
        <div>{contentSearchNotFound}</div>
      )}
    </React.Fragment>
  );
};

export default ListTableBody;
