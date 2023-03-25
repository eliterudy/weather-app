import { useState } from "react";
import { Card, Button, Form, FloatingLabel, InputGroup } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import "../index.scss";

const CitySearchForm = ({ callApi }: { callApi: Function }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="col col-12 ">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchValue && searchValue.length > 0) callApi(searchValue);
        }}
      >
        <InputGroup className="d-flex align-items-center position-relative rounded search-input-group">
          <div className="position-relative z-0 flex-grow-1 ">
            <Form.Control
              type="text"
              placeholder="Search City"
              className="m-0 pe-4"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && searchValue.length > 0 && (
              <X
                className="position-absolute  "
                size={24}
                color="rgba(255,255,255,0.8)"
                onClick={() => setSearchValue("")}
              />
            )}
          </div>
          <Button
            disabled={searchValue.length < 1}
            onClick={() => callApi(searchValue)}
          >
            Go
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default CitySearchForm;
