import React, { useState, useEffect } from "react";
import {} from "./schema.css";
//
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const Schema = () => {
  const [schemaType, setSchemaType] = useState("class");
  const [schemaName, setSchemaName] = useState("");
  const [titlemain, setTitle] = useState("");
  const [titleXdm, setTitleXdm] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionXdm, setDescriptionXdm] = useState("");
  const [behaviour, setBehaviour] = useState("record");
  const [className, setClassName] = useState("profile");
  const [typemain, setType] = useState("string");
  const [metaStatus, setmetastatus] = useState("experimental");
  const [jsonOutput, setjsonOutput] = useState("");

  const [inputList, setInputList] = useState([
    { titleID: "", titleXDM: "", typeXDM: "", descriptionXDM: "" },
  ]);

  const schema_Type = ["class", "mixin", "datatype"];
  const behaviours = ["record", "timeseries"];
  const classname = ["profile", "experience event", "product"];
  const types = ["string", "integer", "data-time", "date", "array", "object"];
  const metastatus = ["experimental", "stable"];

  const [labeloption, setlabel] = useState("Behaviour");
  const [valueoption, setvalue] = useState(behaviours);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    // console.log(e.target.name);

    const list = [...inputList];
    // console.log(list);
    list[index][name] = value;
    setInputList(list);
    console.log(inputList);
  };
  //
  // constructor(props) {
  //   super(props);

  //   this.toggle = this.toggle.bind(this);
  //   this.state = {
  //     isOpen: false
  //   }
  // };
  //
  // toggle() {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // }
  //

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { titleID: "", titleXDM: "", typeXDM: "", descriptionXDM: "" },
    ]);
    console.log(inputList);
  };

  const submitApi = () => {
    var details = {
      metaStatus: metaStatus,
      descriptionXdm: descriptionXdm,
      type: typemain,
      description: description,
      title: titlemain,
      titleXdm: titleXdm,
      // type:typeXdm,
      behaviour: behaviour,
      className: className,
      schemaName: schemaName,
      schemaType: schemaType,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const pdfData = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    };
    fetch("http://localhost:5000/getData", pdfData)
      .then((response) => response.json())
      .then((response) => {
        setjsonOutput(JSON.stringify(response, undefined, 4));
        console.log(response);
        clearText();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const clearText = () => {
    setSchemaName("");
    setSchemaType("");
    setDescriptionXdm("");
    setDescription("");
    setTitleXdm("");
    setSchemaType("class");
    setmetastatus("");
    setType("");
    setTitle("");
  };

  //let labeloption = 'Behaviour', valueoption = behaviours;
  const handleOption = (e) => {
    setSchemaType(e.target.value);
    if (e.target.value === "class") {
      setlabel("Behaviour");
      setvalue(behaviours);
    } else if (e.target.value === "mixin") {
      setlabel("Class Name");
      setvalue(classname);
    }
  };

  const handleclass = (e) => {
    if (schemaType === "class") {
      setBehaviour(e.target.value);
    } else if (schemaType === "mixin") {
      setClassName(e.target.value);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>XDM Tool</h2>

      <div class="split left">
        <div class="centered ">
          <label className="form">Schema Type </label>
          <select onChange={handleOption}>
            {schema_Type.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>{" "}
          <br />
          <br />
          <label>{labeloption}</label>
          <select onChange={handleclass}>
            {valueoption.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>{" "}
          <br />
          <br />
          <label>Schema Name</label>
          <input
            type="text"
            value={schemaName}
            onChange={(e) => setSchemaName(e.target.value)}
          />{" "}
          <br /> <br />
          <label>Schema Title</label>
          <input
            type="text"
            value={titlemain}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br /> <br />
          <label>Schema Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
          <br /> <br />
          {inputList.map((x, i) => {
            return (
              <div>
                <label> XDM TitleID</label>
                <input
                  type="text"
                  name="titleID"
                  value={x.titleID}
                  onChange={(e) => handleInputChange(e, i)}
                />{" "}
                <br />
                <br />
                <label> XDM Title </label>
                <input
                  type="text"
                  name="titleXDM"
                  value={x.titleXDM}
                  onChange={(e) => handleInputChange(e, i)}
                />{" "}
                <br /> <br />
                <label> XDM Type </label>
                <select onChange={(e) => handleInputChange(e, i)}>
                  {types.map((item) => (
                    <option key={item} name="typeXDM" value={x.typeXDM}>
                      {item}
                    </option>
                  ))}
                </select>{" "}
                <br />
                <br />
                <label> XDM Description </label>
                <input
                  type="text"
                  value={x.descriptionXDM}
                  name="descriptionXDM"
                  onChange={(e) => handleInputChange(e, i)}
                />{" "}
                <br /> <br />
              </div>
            );
          })}
          <label>Meta Status </label>
          <select onChange={(e) => setmetastatus(e.target.value)}>
            {metastatus.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>{" "}
          <br />
          <br />
          <button className="container" onClick={handleAddClick}>
            Add Properties
          </button>{" "}
          &nbsp;&nbsp;&nbsp;
          <button onClick={submitApi}> Add Object </button>
          <br />
          <br />
          <button onClick={submitApi}> Submit </button>
          <NavLink
            href="https://github.com/manvithchandra19/test/compare"
          >
            {" "}
            Submit to GitHub
          </NavLink>
          <br />
          <br />
        </div>
      </div>
      <div class="split right">
        <textarea class="textArea" value={jsonOutput}></textarea>
      </div>
    </div>
  );
};

export default Schema;
