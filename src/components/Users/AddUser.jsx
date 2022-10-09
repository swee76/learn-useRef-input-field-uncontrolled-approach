import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = ({ onAddUser }) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  //useRef is the uncontrolled approach of input fields
  //useState is the controlled approach of input fields - this trigger in every keystroke
  
  const [error, setError] = useState();

  const addUserHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      //string convert to a  number by adding a plus sign
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }

    onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={nameInputRef} />
          <label htmlFor="age">Age(Years)</label>
          <input type="number" id="age" min={0} ref={ageInputRef} />
          <Button buttonType="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
