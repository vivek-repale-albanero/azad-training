import React, { useState } from "react";
import "./Field.scss"
import { Trash2 } from "react-feather";
const FormikFieldArray = () => {
  const [owners, setOwners] = useState([
    {
      owner: "",
      subOwners: [""],
    },
  ]);
  const handleOwnerChange = (ownerIndex, value) => {
    const copyOwners = [...owners];
    copyOwners[ownerIndex].owner = value;
    setOwners(copyOwners);
  };

  const handleSubOwnerChange = (ownerIndex, SubOwnerIndex, value) => {
    const copyOwners = [...owners];
    copyOwners[ownerIndex].subOwners[SubOwnerIndex] = value;
    setOwners(copyOwners);
  };
  const AddOwner = () => {
    setOwners((prev) => [
      ...prev,
      {
        owner: "",
        subOwners: [""],
      },
    ]);
  };
  const DeleteOwner = (index) => {
    let copyOwners = [...owners];
    copyOwners.splice(index, 1);
    setOwners(copyOwners);
  };
  const AddSubOwner = (index) => {
    let copyOwners = [...owners];
    copyOwners[index].subOwners.push("");
    setOwners(copyOwners);
  };
  const DeleteSubOwner = (ownerIndex, SubOwnerIndex) => {
    let copyOwners = [...owners];
    copyOwners[ownerIndex].subOwners.splice(SubOwnerIndex, 1);
    setOwners(copyOwners);
  };
  console.log(owners)
  return (
    <div className="owners-container owner">
      {owners.map((el, i) => {
        return (
          <div className="owners-container" key={i}>
            <div >
                <h3>Owner</h3>
              <label>Owner</label>
              <input placeholder="Enter owner name" value={el.owner} onChange={(e)=>handleOwnerChange(i,e.target.value)} />
            </div>
            {el.subOwners.map((s, index) => {
              return (
                <div className="owners-container" key={index}>
                    <h3>SubOwner</h3>
                  <label>Subowner</label>
                  <input placeholder="Enter subowner name" value={s} onChange={(e)=>handleSubOwnerChange(i,index,e.target.value)} />
                  <button className="btn chan" onClick={()=>DeleteSubOwner(i,index)}>Remove</button>
                </div>
              );
            })}
            <button className="btn chan" onClick={() => DeleteOwner(i)}>Remove</button>
            <button className="addowner chan" onClick={() => AddSubOwner(i)}>Add subowner </button>
          </div>
        );
      })}
      <button className="addowner chan" onClick={AddOwner}>Add Owner</button>
    </div>
  );
};

export default FormikFieldArray;
